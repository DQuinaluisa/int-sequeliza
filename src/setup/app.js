;
'use strict'
const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      app = express(),
      path = require('path'),
      { join } = require('path'),
      cors = require('cors'),
      adminRutas = require('../routes/administrador'),
      estudianteRutas = require('../routes/estudiante'),
      profesorRutas = require('../routes/profesor'),
      cursosRutas  = require('../routes/cursos'),
      paraleloRutas = require('../routes/paralelos'),
      curMatRutas = require('../routes/curso_materia'),
      tareaRutas = require('../routes/tarea')             
     

app.use(morgan('dev')),



app.use(bodyParser.urlencoded({ extended: false })),
app.use(bodyParser.json()),

app.use('/uploads', express.static(path.resolve('uploads')));


app.use(cors());

app.use('/api', adminRutas);
app.use('/api', estudianteRutas);
app.use('/api', profesorRutas);
app.use('/api', cursosRutas);
app.use('/api', paraleloRutas);
app.use('/api', curMatRutas);
app.use('/api', tareaRutas);

module.exports = app;