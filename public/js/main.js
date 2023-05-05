let logout, deletePostButton, updatePostButton, createPostForm;

try{
    logout = document.querySelector('#logout');
} catch (err) {}

try{
    deletePostButton = document.getElementById('deletePostBTN');
} catch (err) {}

try {
    updatePostButton = document.getElementById('updateFormBTN')
} catch (err) {}

try {
    createPostForm = document.getElementById('createFormBTN');
} catch (err) {}

if(logout){
    logout.addEventListener('click', async (event) => {
        event.preventDefault();
        const response = await fetch('/api/user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace('/login');
        } else {
            alert(response.statusText);
        }
    });
}

if(createPostForm){
    createPostForm.addEventListener('click', async (event) => {
        event.preventDefault();
        

        let postObject = {
            title: document.getElementById(`title`).value,
            content: document.getElementById('content').value
        }

        if(!postObject.title || ! postObject.content){
            alert("You have to put something in both fields!");
        }

        await fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postObject)
        }).then(() => {
            console.log('creayudate');
            window.location.href = '/dashboard'
        }).catch(err => {
            console.log(err);
        });
        
    });
}

if(deletePostButton){
    deletePostButton.addEventListener('click', async (event) => {
        event.preventDefault();

        let postId = deletePostButton.getAttribute('data-id');

        await fetch(`/api/post/delete/${postId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }).then(() => {
            console.log('deup');
            window.location.href = '/dashboard'
        }).catch(err => {
            console.log(err);
        });
    });
}

if(updatePostButton){
    updatePostButton.addEventListener('click', async (event) => {
        event.preventDefault();

        let postId = deletePostButton.getAttribute('data-id');

        let postObject = {
            title: document.getElementById(`title`).value,
            content: document.getElementById('content').value
        };

        await fetch(`/api/post/update/${postId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postObject)
        }).then(() => {
            console.log('update');
            window.location.href = '/dashboard'
        }).catch(err => {
            console.log(err);
        });
    });
}