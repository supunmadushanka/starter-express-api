const router = require('express').Router();
const stroge=require('../helpers/about')
const AboutController=require('../controllers/AboutController')
router.post('/documents',stroge,AboutController.saveAboutDetals)
router.get('/documents',AboutController.getdocument)
module.exports = router;