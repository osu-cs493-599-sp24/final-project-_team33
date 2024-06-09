import type { NextFunction, Request, Response } from "express"

import Redis from "../lib/redis"

// @TODO Implement type for request later
export const rateLimitAuth = async (req: any, res: Response, next: NextFunction) => {
  const client = Redis.client
  const ip = req.ip

  const email = req.user.email

  const userKey = `authenticated:${email}:${ip}`
  const limit = 10
  const windowSizeInMinutes = 1
  const windowSizeInSeconds = windowSizeInMinutes * 60
  await client.del(`unauthenticated:${ip}`)

  await client.incr(userKey)
  await client.expire(userKey, windowSizeInSeconds)
  const requestCount = await client.get(userKey)

  res.set("X-RateLimit-Limit", `${limit}`)
  res.set("X-RateLimit-Remaining", `${limit - +requestCount}`)

  if (+requestCount > limit) {
    console.log("== Rate limit exceeded")
    return res.status(429).send({
      error: `Rate limit exceeded. Try again in ${windowSizeInMinutes} minutes.`,
    })
  }

  next()
}

export const rateLimitUnAuth = async (req: Request, res: Response, next: NextFunction) => {
  const client = Redis.client
  const ip = req.ip
  const userKey = `unauthenticated:${ip}`
  const limit: number = 5
  const windowSizeInMinutes = 1
  const windowSizeInSeconds = windowSizeInMinutes * 60
  await client.incr(userKey)
  await client.expire(userKey, windowSizeInSeconds)
  const requestCount = await client.get(userKey)

  res.set("X-RateLimit-Limit", `${limit}`) // Convert limit to a string
  res.set("X-RateLimit-Remaining", `${limit - +requestCount}`) // Convert the result to a string
  if (+requestCount > limit) {
    console.log("== Rate limit exceeded")
    return res.status(429).send({
      error: `Rate limit exceeded. Try again in ${windowSizeInMinutes} minutes.`,
    })
  }

  next()
}
