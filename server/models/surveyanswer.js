const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").SURVEY_ANSWER_COLLECTION;

const surveyAnswerSchema = mongoose.Schema({

  username: { type: String },
  survey_id: { type: String },
  responses: {}

});

module.exports = getDb().model('surveyanswer', surveyAnswerSchema, COLLECTION);