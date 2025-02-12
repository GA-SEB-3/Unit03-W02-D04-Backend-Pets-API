// import the model
const Pet = require("../models/pet")
// import the router so we can make our routes
const router = require("express").Router()


// 1. endpoint path
// 2. function that will run when we get the request

router.get("/",async (req,res)=>{
    try{
        const allPets = await Pet.find()
        res.status(200).json(allPets)
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
})

router.post("/",async (req,res)=>{
    try{

        const createdPet = await Pet.create(req.body)
        res.status(201).json(createdPet)    
    }
    catch(err){
        res.status(500).json({err: err.message})
    }
})



// export the router
module.exports = router