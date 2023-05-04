const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// Handle create post form submission
router.post('/', async (req, res) => {
    // deconstructs to get the data we need from our request
    const { title, content } = req.body;
    const user_id = req.session.user_id;
    //gets the current date for the timestamp
    let now = new Date();
    
    //gets our username for the timestamp
    let userData = await User.findByPk(user_id);
    let user = userData.get({plain: true});

    //formats the timestamp so that it looks like:
    // Created by Austin on 04/15/2023
    let postStamp = `Created by ${user.name} on ${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`
  
    try {
      // Create a new post for the current user
      const post = await Post.create({ title, content, user_id, postStamp});
      res.redirect(`/dashboard`);
    } catch (err) {
      res.status(500).send('Unable to create post');
    }
});

router.post('/update/:id', async (req, res) => {
    try{
        const { title, content } = req.body;
        //gets the current date for the timestamp
        let now = new Date();

        //gets our username for the timestamp
        let userData = await User.findByPk(req.session.user_id);
        let user = userData.get({plain: true});

        //formats the timestamp so that it looks like:
        // Created by Austin on 04/15/2023
        let postStamp = `Created by ${user.name} on ${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`;

        let post = await Post.findByPk(req.params.id);

        if(post){
            post.title = req.body.title || post.title;
            post.content = req.body.content || post.content;

            post.postStamp = postStamp;

            await post.save();
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    }catch(err){
        console.log(err);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        let postData = await Post.findByPk(req.params.id);;

        await postData.destroy();

        
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// Handles posting a comment onto a post
router.post('/:id/comments', async (req, res) => {
    try {

        let now = new Date();
        //gets our username for the timestamp
        let userData = await User.findByPk(req.session.user_id);
        let user = userData.get({plain: true});

        //formats the timestamp so that it looks like:
        // Created by Austin on 04/16/2023
        let commentStamp = `-${user.name} ${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`
            
        //tries to create a comment based on the request
        let response = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.params.id,
            timestamp: commentStamp
        });

        //if we can't get a comment model we will let the user know
        if(!response.get({ plain:true })){
            res.status(500).json({message: 'Comment not formatted correctly'});
            return;
        }

        //shows you the post with the comment added
        res.redirect(`/post/${req.params.id}`);

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;