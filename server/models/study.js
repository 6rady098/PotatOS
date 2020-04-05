const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").STUDY_COLLECTION;

const studySchema = mongoose.Schema({
  type: { type: Number },
  creationDate: { type: Date },
  researcher: { type: String },

  title: { type: String },
  status: { type: Number },
  description: { type: String },

  upperAgeRange: { type: Number },
  lowerAgeRange: { type: Number },
  sex: { type: Number },

  component: { type: String }
});

module.exports = getDb().model('study', studySchema, COLLECTION);