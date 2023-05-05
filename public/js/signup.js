document.querySelector('.signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('#username-login').value.trim();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(username && email && password){
        const response = await fetch('/api/user',{
            method: 'POST',
            body: JSON.stringify({ name: username, email: email, password: password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok){
            window.location.href = '/dashboard';
        } else {
            alert("Failed to sign up");
        }
    }
});