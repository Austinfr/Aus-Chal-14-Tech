//define variables
let loginB, logoutB;

//if the buttons are showing
try {
    loginB = document.querySelector('#login');
} catch (err) {}

try{
    logoutB = document.querySelector('#logout');
} catch (err) {}

//if the buttons are found we will add an event listener
if(loginB){
    loginB.addEventListener('click', (event) => {
        event.preventDefault();
        if(document.location.pathname !== '/login'){
            document.location.replace('/login');
        }
    });
}

//if logout button is availible
if(logoutB){
    logoutB.addEventListener('click', async (event) => {
        event.preventDefault();
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    });
}

//more mainpage functionality
//adds a link to the homepage
document.querySelector('#home').addEventListener('click', async (event) => {
    event.preventDefault();

    if(document.location.pathname != '/'){
        document.location.replace('/');
    }
});

document.querySelector('#dashboard').addEventListener('click', async (event) => {
    event.preventDefault();

    if(document.location.pathname != '/dashboard'){
        document.location.replace('/dashboard');
    }
});