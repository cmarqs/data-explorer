var express = require('express');
var router = express.Router();
const { db } = require('../db');


GET('/', () => db.acidentes.por_mes_ano());

GET('/semana_mes_ano/:ano', (req, res, next) => db.acidentes.semana_mes_ano(req.params.ano));

GET('/vitimas_causas_por_ano/:ano', (req, res, next) => db.acidentes.vitimas_causas_por_ano(req.params.ano));


// Generic GET handler;
function GET(url, handler) {
    router.get(url, async (req, res) => {
      try {
        const data = await handler(req);
        res.json({
          success: true,
          data
        });
      } catch (error) {
        res.json({
          success: false,
          error: error.message || error
        });
      }
    });
  }
  
  module.exports = router;