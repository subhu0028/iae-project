const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

const LoginButton = document.getElementById("loginButton");
const RegisterButton = document.getElementById("registerButton");

const formLogin = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

let registerEmail = document.getElementById("registerEmail");
let registerName = document.getElementById("registerName");
let registerPassword = document.getElementById("registerPassword");

let pEmail = document.getElementById("input_email")
let pName = document.getElementById("input_name")
let pPassword = document.getElementById("input_password")

registerEmail.addEventListener('change' ,() => {
    if (!registerEmail.value.match(mailformat)) {
        pEmail.innerText = "Invalid Email Format"
    }
    else{
        pEmail.innerText = ""
    }
})

registerPassword.addEventListener('change' ,() => {
    if (!registerPassword.value.match(passwordFormat)) {
        pPassword.innerText = "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
    }
    else{
        pPassword.innerText = "";
    }
})

RegisterButton.addEventListener("click", () => {
    registerEmail = document.getElementById("registerEmail").value;
    registerName = document.getElementById("registerName").value;
    registerPassword = document.getElementById("registerPassword").value;
    console.log(registerEmail, registerName, registerPassword);
    if(!registerEmail || !registerName || !registerPassword){
        alert("Fields Can't be Empty")
    }
    else{
        sendToBackend();
    }
})

LoginButton.addEventListener("click", () => {
    var logEmail = document.getElementById("loginEmail").value;
    var logPassword = document.getElementById("loginPassword").value;
    const error = document.getElementById('error_prone');

    if(!logEmail || !logPassword){
        alert("Field can't be empty");
    }
    else if(!logEmail.match(mailformat)){
        // alert("Invalid Email Format");
        error.innerText = "Invalid Email Format"
    }
    else{
        loginSendBackend()
    }
})

function loginSendBackend(){
    formLogin.addEventListener("submit", () => {
    
    })
}

function sendToBackend(){
    registerForm.addEventListener("submit", () => {
        
    })
}

