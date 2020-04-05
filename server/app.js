var express = require('express');
var app = express();
const bodyParser= require('body-parser');
const cors = require('cors');
const compression = require('compression');

const publicweb = process.env.PUBLICWEB || './view';

app.use(compression());
app.use(cors());
app.use(express.static(publicweb));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var UsersController = require('./controllers/UsersController');
app.use('/api/users', UsersController);

var ChatController = require('./controllers/ChatController');
app.use('/api/chat', ChatController);

var CodetableController = require('./controllers/CodetableController');
app.use('/api/codetable', CodetableController);

var DiaryController = require('./controllers/DiaryController');
app.use('/api/diary', DiaryController);

var QuestionnairesController = require('./controllers/QuestionnairesController');
app.use('/api/questionnaires', QuestionnairesController);

var SurveyController = require('./controllers/SurveyController');
app.use('/api/surveys', SurveyController);

var StudyController = require('./controllers/StudyController');
app.use('/api/study', StudyController);

var SurveyAnswerController = require('./controllers/SurveyAnswerController');
app.use('/api/surveyanswer', SurveyAnswerController);

app.all('*', (req, res) => {
    res.status(200).sendFile('/', {root: publicweb});
});

module.exports = app;
