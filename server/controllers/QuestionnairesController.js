//creating questionnaire controller
var express = require("express"); // creating an express application which returns a function reference
var router = express.Router();
var bodyParser = require("body-parser");

const ObjectId = require("mongodb").ObjectID;

const Questionnaire = require("../models/questionnaire");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Create a document
// Creating a questionnaire for studies
router.post("/", (req, res) => { // req contains info about HTTP request that raised the event
  Questionnaire.create(req.body, (err, result) => {
    if (err) throw err;
    res.status(201); //set the status code of this response
    res.send({ message: "success" }); //send a response message saying success
  });
});

// Read a document
router.get("/", (req, res) => { // req contains info about HTTP request that raised the event
  Questionnaire.find({}, null, (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      res.status(200).json([]); //set the status code of this response
    } else {
      res.status(200).json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  Questionnaire.findOne({ _id: ObjectId(req.params.id)},
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

// Read filtered
router.post("/filtered", (req, res) => {
  Questionnaire.find(
    {
      'upperAgeRange': { $gte: req.body.age },
      'lowerAgeRange': { $lte: req.body.age },
      'sex': { $in: [req.body.sex, null] },
      '_id': { $nin: req.body.ids.map(ObjectId) }
    }, null, (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

// Update a document
router.put("/:id", (req, res) => {
  Questionnaire.updateOne(
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

// Delete a document
router.delete("/:id", (req, res) => {
  Questionnaire.deleteOne({ _id: ObjectId(req.params.id) }, (err, obj) => {
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
