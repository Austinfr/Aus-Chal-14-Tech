let login, logout, deletePostButton, updatePostButton, createPostButton;

try {
    login = document.getElementById('login');
} catch (err) {}

try{
    logout = document.getElementById('logout');
} catch (err) {}

try{
    deletePostButton = document.getElementById('deletePostBTN');
} catch (err) {}

try {
    updatePostButton = document.getElementById('updatePostBTN')
} catch (err) {}

try {
    createPostButton = document.getElementById('createPostBTN');
} catch (err) {}

if(login){
    login.addEventListener('click', (event) => {
        event.preventDefault();

        document.location.replace('/login');
    });
}

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

if(createPostButton){
    createPostButton.addEventListener('click', async (event) => {
        event.preventDefault();
        

        let postObject = {
            title: document.getElementById(`title`).value,
            content: document.getElementById('content').value
        }

        if(postObject.title && postObject.content){
            let response = await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postObject)
            }).catch(err => {
                console.log(err);
            });

            if(response.ok){
                window.location.href = '/dashboard';
            }
        }else {
            alert("You need to put something in both fields");
        }
        
    });
}

if(deletePostButton){
    deletePostButton.addEventListener('click', async (event) => {
        event.preventDefault();

        let postId = deletePostButton.getAttribute('data-id');

        await fetch(`/api/post/delete/${postId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
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
        }).catch(err => {
            console.log(err);
        });
    });
}