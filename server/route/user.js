import express from "express";
const route = express.Router();

import { signup } from "../controller/user.js";

route.post("/signup", signup);

export default route;