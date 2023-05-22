import { Router } from "express"
import authRouter from "./auth.routes.js"
import urlRouter from "./urls.routes.js"
import usersRouter from "./users.routes.js"

const router = Router();
router.use([authRouter, urlRouter, usersRouter]);

export default router