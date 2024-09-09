const router = require('express').Router();
const newsController = require('../controllers/news.controller');

// Middleware para verificar se tem o Bearer e o id do user logado
const authMiddleware = require('../middlewares/auth.middleware');
const { validId, validPost } = require('../middlewares/global.middleware');

router.post('/create', authMiddleware, newsController.create);
router.get('/', newsController.findAll);
router.get('/top', newsController.topNews);
router.get('/search', newsController.searchByTitle);

router.get('/byIdNews/:id', validId, authMiddleware, newsController.findById);
router.get('/byUserId/', authMiddleware, newsController.byUser);
router.delete('/delete/:id', validId, authMiddleware, newsController.deleteNews);
router.patch('/update/:id', validId, authMiddleware,  validPost, newsController.update);
router.patch('/:id/like', validId, authMiddleware, newsController.likeNews);
router.patch('/:id/comment', validId, authMiddleware, newsController.commentNews);
router.patch('/comment/:id/:idComment', validId, authMiddleware, newsController.removeComment);

module.exports = router;