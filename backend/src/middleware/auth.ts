import { verifyToken } from "../lib/helper"

// "student", "instructor", "admin"
export const authMiddleWare = (roles: string[]) => {
  return function (req: any, res: any, next: any) {
    const headers = req.headers
    if (!headers["authorization"]) {
      return res.status(401).send({
        error: "No token provided",
      })
    }

    const token = headers["authorization"].split(" ")[1]
    const decoded: any = verifyToken(token)
    if (!decoded) {
      return res.status(401).send({
        error: "Unauthorized",
      })
    }
    const user: any = decoded.user
    req.user = user
    // role authorization
    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).send({
        error: "Forbidden",
      })
    }
    next()
  }
}

export const getExactRole = (req: any, res: any, next: any) => {
  const userId = req.params.userId
  const user = req.user
  if (user.role === "admin") {
    return next()
  }
  if (userId !== req.user._id) {
    return res.status(403).send({
      error: "Forbidden",
    })
  }
  next()
}
