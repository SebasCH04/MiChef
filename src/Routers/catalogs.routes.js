import { Router } from "express";
import { catalogsController } from "../Controllers/catalogs.Controller.js";

const router = Router();

router.get("/niveles-cocina", catalogsController.getNivelesCocina);
router.get("/tipos-dieta", catalogsController.getTiposDieta);

export default router;
