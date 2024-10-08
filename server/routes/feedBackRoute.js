const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel')

//add feedback
router.post("/addfeedback", async (req, res) => {

    const { driverid,userid,name,date, ratecount, description,img } = req.body; 

    try {
        const new_feedback = new Feedback({ 
            driverid,
            userid,
            name,
            date,
            ratecount,
            description,
            img,

        });

        const request = await new_feedback.save(); 

        res.send("Feedback added Successfully!");
    } catch (error) {
        return res.status(400).json({ error });
    }
});


//get all feedback
router.get("/getallfeedback",async(req,res)=>{

    try {
        const feedback = await Feedback.find()
        return res.json(feedback);
    } catch (error) {
        return res.status(400).json({massage : error})
    }
});



  //getfeedback
router.route("/getfeeedback/:id").post(async (req, res) => {
    const feedbackid = req.params.id;
  
    try {
      const feedback = await Feedback.findById(feedbackid);
      return res.status(200).json({ status: "feedback is fatched", feedback });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "Error with fatch feedback", message: error });
    }
  });
  

  

module.exports = router;
