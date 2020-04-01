var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

const ObjectId = require("mongodb").ObjectID;
const Answer = require("../models/surveyanswer");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Create a Survey
router.post("/", (req, res) => {
  Answer.create(req.body, (err, result) => {
    if(err)
      throw err;

    res.status(201);
    res.send({message: "success"});
  });
});

//Read a Survey
router.get("/", (req, res) => {
  Answer.find({}, null, (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

/**
 * Retrieves a survey response based on its unique ID
 */
router.getById("/:id", (req, res) => {
  Answer.findOne({ _id: ObjectId(req.params.id)},
   null, 
   (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

/**
 * Retrieves a response based on the unique ID of the user who submitted it.
 * ODO: Fix this to actually query answers, and not simply retrieve a user instead
 */
router.getByUserId("/:userid", (req, res) => {
  Answer.findOne({ user_id: ObjectId(req.params.userid)},
   null, 
   (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

/**
 * Retrieves a response based on the unique ID of the survey to which it corresponds
 * 
 * TODO: Fix this to actually query answers, and not simply retrieve a survey instead
 */
router.getBySurveyId("/:surveyid", (req, res) => {
  Answer.findOne({ survey_id: ObjectId(req.params.surveyid)},
   null, 
   (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

//Update a Survey
router.put("/:id", (req, res) => {
  Answer.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: req.body },
    (err, results) => {
      if (err) throw err;
      if (results.n == 0) {
        res.status(404);
        res.send({ message: "failed" });
      } else {
        res.send({ message: "success" });
      }
    }
  );
});

//Delete a Survey
router.delete("/:id", (req, res) => {
  Answer.deleteOne({ _id: ObjectId(req.params.id) }, (err, obj) => {
    if (err) throw err;
    if (obj.n == 0) {
      res.status(404);
      res.send({ message: "failed" });
    } else {
      res.send({ message: "success" });
    }
  });
});

module.exports = router;