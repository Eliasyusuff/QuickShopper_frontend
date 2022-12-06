const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link");

const form = document.getElementById("reg-form");

const loginform = document.getElementById("login-form");

const loginEmail = loginform.querySelector(".login-email");
const loginPassword = loginform.querySelector(".login-password");

const firstname = form.querySelector(".firstname");
const lastname = form.querySelector(".lastname");
const email = form.querySelector(".email");
const phoneNo = form.querySelector(".phoneNo");
const password = form.querySelector(".password");
const errorDiv = form.querySelector("#errorDiv")
const fnameerror = form.querySelector("#fnameerror")
const lnameerror = form.querySelector("#lnameerror")
const phonenoerror = form.querySelector("#phonenoerror")
const passworderror = form.querySelector("#passworderror")
const loginEmailError= form.querySelector("#login-email-error")
const loginPasswordError = form.querySelector("#login-password-error")


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function handleLoginForm() {
    const formData = new FormData(loginform);
    const data = Object.fromEntries(formData);
    
    if(data.loginEmail === "" || data.loginPassword === "") {
        console.log("not working")
        // errorDiv.innerHTML = "Invalid data entered";
        // data.loginEmail === "" ? loginEmailError.innerHTML = "Invalid data entered": fnameerror.innerHTML = "";
        // data.loginPassword === "" ? loginPasswordError.innerHTML = "Invalid data entered": lnameerror.innerHTML = "";
        
    }else{
        console.log("hello")
        // loginEmailError.innerHTML = "";
        // loginPasswordError.innerHTML = "";
        // console.log(JSON.stringify(data),"yoyoyo");
        // return data;
        let data2 = {
            email:data.loginEmail,
            password:data.loginPassword
        }
        const jsonString = JSON.stringify(data2);
        
        let urlx = "http://localhost:8080/api/v1/auth/user/login"
        function callb(e) {

            let s = e
            let token = JSON.parse(e).accessToken
            sessionStorage.setItem("token", token);
        
            
            Swal.fire({
                icon:"success",
                title:"success",
                text:'Something hooge',
                // timer:2000
            }).then(() => {
                window.location = 'orderpage1.html'
            })
        }
        function load(url, callback){
            const xhr = new XMLHttpRequest();
           

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4 && xhr.status==200) {
                    console.log('got hererrrrr', xhr.status)
                    callback(xhr.response)
                }
                else{
                    // console.log(jsonString,"ererer")
                    console.log(xhr.status,"maddd")
                }
            }
            
            xhr.open("POST",url,true);
            // console.log(jsonString)
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
           xhr.send(jsonString);
        }

        try {
            load(urlx, callb)            
        } catch (error) {
            console.log("there was an error", error)
        }

    }

}


function handleform() {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    if(data.firstname === "" || data.lastname === ""  || 
      data.email === "" || data.phoneNo === "" || 
      data.password === ""
    ) {
        errorDiv.innerHTML = "Invalid data entered";
        data.firstname === "" ? fnameerror.innerHTML = "Invalid data entered": fnameerror.innerHTML = "";
        data.lastname === "" ? lnameerror.innerHTML = "Invalid data entered": lnameerror.innerHTML = "";
        data.email === "" ? emailerror.innerHTML = "Invalid data entered": emailerror.innerHTML = "";
        data.phoneNo === "" ? phonenoerror.innerHTML = "Invalid data entered": phonenoerror.innerHTML = "";
        data.password === "" ? passworderror.innerHTML = "Invalid data entered": passworderror.innerHTML = "";
    }else{
        errorDiv.innerHTML = "";
        fnameerror.innerHTML = "";
        lnameerror.innerHTML = "";
        phonenoerror.innerHTML = "";
        passworderror.innerHTML = "";
        console.log(JSON.stringify(data),"yoyoyo");
        // return data;

        const jsonString = JSON.stringify(data);
        let urlx = "http://localhost:8080/api/v1/auth/user/signup"
        function callb(e) {
            console.log(e, "hahahaha")
            let s = e
            console.log(s, "got here")
        
            Swal.fire({
                icon:"success",
                title:"success",
                text:s,
                timer:2000
            }).then(() => {
                location.reload()
            })
        }
        function load(url, callback){
            const xhr = new XMLHttpRequest();
        
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    callback(xhr.response)
                }
            }
            xhr.open("POST",url,true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            const result = xhr.send(jsonString);
        }

        load(urlx, callb)
    }
    //console.log("I got here", data)

}



// button
form.querySelector("#nxt-btn").addEventListener("click",(evt) => {
    evt.preventDefault();
    console.log("goooottt here")   
    handleform();
//     console.log(data);
//     const jsonString = JSON.stringify(data);
//    // console.log(jsonString,"ha ha")
//    if(!(data=== undefined)) {
//     console.log("got here")
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST","http://localhost:8080/api/v1/auth/user/signup");
//     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
//      const result = xhr.send(jsonString);
//      console.log(result,"ayeye")
//    }


})

loginform.querySelector("#bk-btn").addEventListener("click",(evt) => {
    evt.preventDefault();
    
    handleLoginForm();



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









