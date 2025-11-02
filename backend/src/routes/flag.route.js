import { Router } from "express";
import * as flagsController from '../controllers/flag.controller.js'

const router = Router()

router.get('/flags', flagsController.getFlag)

router.patch('/flags/:key', flagsController.updateFlag)

router.get('/stats', flagsController.getStats)

export default router