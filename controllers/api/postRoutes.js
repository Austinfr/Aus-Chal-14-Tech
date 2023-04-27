const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// Handle create post form submission
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    const user_id = req.session.user_id;
    let now = new Date();

    let userData = await User.findByPk(user_id);
    let user = userData.get({plain: true});

    let postStamp = `Created by ${user.name} on ${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`
  
    try {
      // Create a new post for the current user
      const post = await Post.create({ title, content, user_id, postStamp});
      res.redirect(`/posts/${post.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Unable to create post');
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