db.createUser(
  {
      user: "userteam33",
      pwd: "passwordteam33",
      roles: [
          { role: "userAdminAnyDatabase", db: "admin" },
          { role: "readWriteAnyDatabase", db: "admin" },
          { role: "dbAdminAnyDatabase", db: "admin" },
          { role: "clusterAdmin", db: "admin" }
      ]
  }
)