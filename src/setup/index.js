
;
'use strict'
const { sequelize } = require('../models/index');
const app = require('./app'),
      port =   process.env.PORT || 3500

      app.listen(port, function () {
          console.log(`Servidor funcionando en puerto ${port}` );

       sequelize.sync({}).then(() => {
           console.log("DB Conectada")
       })

      }) 