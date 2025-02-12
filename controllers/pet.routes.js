// import the model
const Pet = require("../models/pet")
// import the router so we can make our routes
const router = require("express").Router()
const mongoose = require("mongoose")


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

router.get("/:petId",async(req,res)=>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.petId)){
           return res.status(404).json({err:"Id Not in proper format"})
        }

        const foundPet = await Pet.findById(req.params.petId)
      
       
        if(!foundPet){
            return res.status(404).json({err:"Pet Not Found"})
        }
        res.status(200).json(foundPet)
    }catch(err){
        res.status(500).json({err:err.message})
    }
})
// Better Error Handling
router.get('/:petId', async (req, res) => {
    try {
      const foundPet = await Pet.findById(req.params.petId);
      if (!foundPet) {
        res.status(404);
        throw new Error('Pet not found.');
      }
      res.status(200).json(foundPet);
    } catch (err) {
      if (res.statusCode === 404) {
        res.json({ err: err.message });
      } else {
        // Add else statement to handle all other errors
        res.status(500).json({ err: err.message });
      }
    }
  });

  router.put("/:petId",async(req,res)=>{

    try{
        const updatedPet = await Pet.findByIdAndUpdate(req.params.petId,req.body,{new: true})
        if(!updatedPet){
            return res.status(404).json({err:"Pet not found"})
        }
        res.status(200).json(updatedPet)


    }catch(err){
        res.status(500).json({err:err.message})
    }
  })



// export the router
module.exports = router