require("dotenv").config()
export const port = process.env.Port || 8000

export const info ={
    origin:"http://localhost:8000",
    accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  redisCacheExpiresIn: 60,

}