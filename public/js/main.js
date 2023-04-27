let logout;

try{
    logout = document.querySelector('#logout');
} catch (err) {}

if(logout){
    logout.addEventListener('click', async (event) => {
        event.preventDefault();
        const response = await fetch('/api/users/logout', {
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