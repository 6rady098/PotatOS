const mongoose = require('mongoose');

const getDb = require("../db").getDb;
const COLLECTION = require("../db").SURVEY_COLLECTION;

const surveySchema = mongoose.Schema({
  title: { type: String },
  showProgressBar: { type: String },
  progressBarType: { type: String },
  questionsOnPageMode: { type: String },
  mode: { type: String },

  pages: [{

    name: { type: String },
    elements: [{

      type: { type: String },
      title: { type: String },
      name: { type: String },
      description: { type: String },
      isRequired: { type: Boolean },
      choices: [{ type: String }]

    }]
    
  }]

});

module.exports = getDb().model('survey', surveySchema, COLLECTION);