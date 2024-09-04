const router = require('express').Router();
const newsController = require('../controllers/news.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, newsController.create);
router.get('/', newsController.findAll);
router.get('/top', newsController.topNews);
router.get('/:id', newsController.findById)

module.exports = router;