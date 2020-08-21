'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return Promise.all([ 

      queryInterface.bulkInsert('roles', [
        { roles: "admin", createdAt: new Date(), updatedAt: new Date()  },
        { roles: "profe", createdAt: new Date(), updatedAt: new Date()  },
        { roles: "alumno", createdAt: new Date(), updatedAt: new Date()  }
      ], {}),

      queryInterface.bulkInsert('personas_roles', [
        {  personasId : 1 , rolesId: 1,  createdAt: new Date(), updatedAt: new Date()  },
        {  personasId : 2 , rolesId:  2,  createdAt: new Date(), updatedAt: new Date()  },
        {  personasId : 3 , rolesId:  3,  createdAt: new Date(), updatedAt: new Date()  }
      ], {})

    ])
     
  
  },

  down: async (queryInterface, Sequelize) => {
    
     return Promise.all([
      queryInterface.bulkDelete('roles', null, {}),
      queryInterface.bulkDelete('personas_roles', null, {}),
     ])
     
  }
};
