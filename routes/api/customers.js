const express = require('express');
const router = express.Router({mergeParams: true});

// Kai URL bus /api/customers grazins tuos duomenis JSON formatu
// req - /api/customer route requestas galima paimt data is formu pvz. req.params 
// res - response ka grazina/daro kai gauna request i sita route. Siuo atveju grazina JSON objekta
router.get('/', (req, res) => {
    const customers = [
      {id: 1, firstName: 'John', lastName: 'Doe'},
      {id: 2, firstName: 'Brad', lastName: 'Traversy'},
      {id: 3, firstName: 'Mary', lastName: 'Swanson'},
    ];
  
    res.json(customers);
  });

// exportina routes
module.exports = router;