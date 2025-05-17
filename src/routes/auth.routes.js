import { Router } from "express";
import { login, logout, refreshToken } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post('/login', login)
authRouter.get('/logout', logout)
authRouter.get('/refreshToken', refreshToken)

export {
    authRouter
}
