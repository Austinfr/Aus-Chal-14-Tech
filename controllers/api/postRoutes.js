const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {

        let response = Post.create(req.body);

        if(!response.ok){
            res.status(500).json({message: 'Post not formatted correctly'});
            return;
        }

        res.status(200);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:id/comments', async (req, res) => {
    try {
        
        let response = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.params.id,
        });

        if(!response.ok){
            res.status(500).json({message: 'Comment not formatted correctly'});
            return;
        }

        res.redirect(`/post/${req.params.id}`);

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;