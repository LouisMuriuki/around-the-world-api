import express from "express"
import { getTours, getTour, createTour, updateTour, deleteTour } from "../contollers/tours.js"
const router=express.Router()


router.get("/",getTours)
router.get("/:id",getTour)
router.post("/add",createTour)
router.put("/:id",updateTour)
router.delete("/:id",deleteTour)

export default router