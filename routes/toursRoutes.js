import express from "express"
import { getTours, createTour, updateTour, deleteTour } from "../contollers/tours.js"
const router=express.Router()


router.get("/",getTours)
router.post("/add",createTour)
router.put("/:id",updateTour)
router.delete("/:id",deleteTour)

export default router