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
        console.log(event);
    });
}

if(logoutB){
    logoutB.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(event);
    });
}