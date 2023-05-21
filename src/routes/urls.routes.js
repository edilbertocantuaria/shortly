import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"

import { validateUrlSchema } from "../schemas/urls.schemas.js"

import { postUrlsShorten, getUrl, getOriginalUrl } from "../controllers/urls.controllers.js"
import { authValidation } from "../middlewares/authValidation.middleware.js"


const urlRouter = Router();

urlRouter.post("/urls/shorten", authValidation, validateSchema(validateUrlSchema), postUrlsShorten);
urlRouter.get("/urls/:id", getUrl);
urlRouter.get("/urls/open/:shortUrl", getOriginalUrl);

export default urlRouter;
