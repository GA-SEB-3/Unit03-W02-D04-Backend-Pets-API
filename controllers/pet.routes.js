// import the model
const Pet = require("../models/pet")
// import the router so we can make our routes
const router = require("express").Router()


// 1. endpoint path
// 2. function that will run when we get the request

router.get("/pets",(req,res)=>{
    res.json({message:"Success"})
})


// export the router
module.exports = router