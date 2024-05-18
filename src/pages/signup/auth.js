const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info

    const username = signupForm['signup-username'].value;
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    console(username, email, password);

    //sign up the user

    newAuth.createUserWithEmailAndPassword(username, email, password);
})