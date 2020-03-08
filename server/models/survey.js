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
      refChoices: [{
        choice: { type: String }
      }],
      choices: [{ type: String }],
      hasSelectAll: { type: Boolean },
      hasNone: { type: Boolean }
    }]
    
  }]

});

module.exports = getDb().model('survey', surveySchema, COLLECTION);