import express from "express"
import { getTours, getTour, createTour, updateTour, deleteTour ,aliasCheapTours,getTourStats} from "../contollers/tours.js"
const router=express.Router()


router.get("/",getTours)
router.get("/top-5-cheap",aliasCheapTours,getTours)//aliasing
// router.get("/top-5-expensive",getTours)
// router.get("/cheap-tours",getTours)
// router.get("/expensive-tours",getTours)
router.get("/tour-stats",getTourStats)
router.get("/:id",getTour)
router.post("/add",createTour)
router.patch("/:id",updateTour)
router.delete("/:id",deleteTour)

export default router