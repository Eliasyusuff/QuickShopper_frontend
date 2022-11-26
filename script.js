const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link");

const form = document.getElementById("reg-form");

const firstname = form.querySelector(".firstname");
const lastname = form.querySelector(".lastname");
const email = form.querySelector(".email");
const phoneNo = form.querySelector(".phoneNo");
const password = form.querySelector(".password");
//const pword1 = form.querySelector(".passw1");

//const mail = form.querySelector(".email");
//const pword = form.querySelector(".pass");
//To get information 
function handleform() {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    //console.log("I got here", data)
    console.log(JSON.stringify(data));
    return data;
}

// button
form.querySelector("#nxt-btn").addEventListener("click", (evt) => {
    evt.preventDefault();
    let data = handleform();
    console.log(data);
    const jsonString = JSON.stringify(data);
   // console.log(jsonString,"ha ha")
const xhr = new XMLHttpRequest();
  xhr.open("POST","http://localhost:8080/api/v1/auth/user/signup");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
 // xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
  xhr.send(jsonString);

})
// const jsonString = JSON.stringify(data);
// const xhr = new XMLHttpRequest();
//   xhr.open("POST","http://localhost:8080/api/users/saveuser")
//   xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//   xhr.send(jsonString);


//   js code to show or hide password and change icon 
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            } else {
                pwField.type = "password";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})

// js code to appear signup and login form
signUp.addEventListener("click", () => {
    container.classList.add("active");
});
login.addEventListener("click", () => {
    container.classList.remove("active");
    console.log('hi')
});
