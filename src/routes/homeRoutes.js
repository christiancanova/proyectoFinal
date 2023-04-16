import { Router } from "express";
import HomeController from "../controllers/homeController.js";
const router = Router();

export default class HomeRoute {
  constructor() {
    this.homeController = new HomeController();
  }
  init = () => {
    router.get("/",this.homeController.getViewHome);
    return router;
  };

}