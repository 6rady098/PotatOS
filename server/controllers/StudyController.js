var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

const ObjectId = require("mongodb").ObjectID;

const Study = require("../models/study");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Create a document
router.post("/", (req, res) => {
  Study.create(req.body, (err, result) => {
    if (err) throw err;
    res.status(201);
    res.send(result._id);
  });
});

// Read a document
router.get("/", (req, res) => {
  Study.find({}, null, (err, results) => {
    if (err) throw err;
    if (results.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  Study.findOne({ _id: ObjectId(req.params.id)},
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
/*
 * TODO: This function may need a rework, this was copied directly from
 *  the questionnaire's controller
 */
router.post("/filtered", (req, res) => {
  Study.find(
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
  Study.updateOne(
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
  Study.deleteOne({ _id: ObjectId(req.params.id) }, (err, obj) => {
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