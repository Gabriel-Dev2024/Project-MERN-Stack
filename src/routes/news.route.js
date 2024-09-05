const router = require('express').Router();
const newsController = require('../controllers/news.controller');

// Middleware para verificar se tem o Bearer e o id do user logado
const authMiddleware = require('../middlewares/auth.middleware');
const { validPost } = require('../middlewares/global.middleware');

router.post('/', authMiddleware, newsController.create);
router.get('/', newsController.findAll);
router.get('/top', newsController.topNews);
router.get('/search', newsController.searchByTitle);
router.get('/byUser', authMiddleware, newsController.byUser);
router.get('/:id', authMiddleware, newsController.findById);
router.patch('/:id', authMiddleware,  validPost, newsController.update);
router.delete('/:id', authMiddleware, newsController.deleteNews)

module.exports = router;