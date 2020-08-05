;
'use strict'
const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      app = express(),
      path = require('path'),
      { join } = require('path'),
      cors = require('cors'),
      adminRutas = require('../routes/admin'),
      estudianteRutas = require('../routes/estudiante')             
     

app.use(morgan('dev')),



app.use(bodyParser.urlencoded({ extended: false })),
app.use(bodyParser.json()),

app.use('/uploads', express.static(path.resolve('uploads')));


app.use(cors());

app.use('/api', adminRutas);
app.use('/api', estudianteRutas);


module.exports = app;