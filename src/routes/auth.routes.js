import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"

import { registerUserSchema, loginUserSchema } from "../schemas/auth.schemas.js"

import { getUsers, signUp, signIn } from "../controllers/auth.controllers.js"
import { validateUserEmail, validateLoginUser } from "../middlewares/authValidation.middleware.js"


const authRouter = Router()

authRouter.get("/signup", getUsers);
authRouter.post("/signup", validateSchema(registerUserSchema), validateUserEmail, signUp)
authRouter.post("/signin", validateSchema(loginUserSchema), validateLoginUser, signIn)


export default authRouter;
