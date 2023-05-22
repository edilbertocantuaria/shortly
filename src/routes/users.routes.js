import { Router } from "express"

import { getMe, getRank } from "../controllers/users.controllers.js"
import { authValidation } from "../middlewares/authValidation.middleware.js"


const usersRouter = Router();

usersRouter.get("/users/me", authValidation, getMe);
usersRouter.get("/ranking", getRank);

export default usersRouter;
