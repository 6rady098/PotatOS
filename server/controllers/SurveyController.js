var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

const ObjectId = require("mongodb").ObjectID;
const Survey = require("../models/survey");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


//Create a Survey
router.post("/", (req, res) => {
  Survey.create(req.body, (err, result) => {
    if(err)
      throw err;

    res.status(201);
    res.send(result._id);
  });
});

//Read a Survey
router.get("/", (req, res) => {
  Survey.find({}, null, (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  Survey.findOne({ _id: ObjectId(req.params.id)},
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
  Survey.updateOne(
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
  Survey.deleteOne({ _id: ObjectId(req.params.id) }, (err, obj) => {
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