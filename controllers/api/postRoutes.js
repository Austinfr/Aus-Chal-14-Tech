const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {

        let response = Post.create(req.body);

        if(!response.ok){
            res.status(500).json({message: 'post not formatted correctly'});
            return;
        }

        res.status(200);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/comment', async (req, res) => {
    try {
        
        let response = await Comment.create(req.body);

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;