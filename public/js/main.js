let logout;
let deletePostButton

try{
    logout = document.querySelector('#logout');
} catch (err) {}

try{
    deletePostButton = document.querySelector('#deletePost');
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

if(deletePostButton){
    deletePostButton.addEventListener('click', async (event) => {
        event.preventDefault();

        console.log(event, "pressed");

        await fetch(`/api/post/${event.target.dataset.id}/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    });
}