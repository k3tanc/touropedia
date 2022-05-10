import express from "express";
const route = express.Router();

import { signup, signin } from "../controller/user.js";

route.post("/signup", signup);
route.post("/signin", signin);

export default route;