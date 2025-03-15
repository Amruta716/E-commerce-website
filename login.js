let form = document.querySelector("form");
let userName = document.querySelectorAll("input")[0];
let password = document.querySelectorAll("input")[1];

let euser = document.querySelectorAll("span")[0];
let epass = document.querySelectorAll("span")[1];
let eform = document.querySelectorAll("span")[2];

let datafromstorage = JSON.parse(localStorage.getItem("data"));

console.log(form, userName, password, euser, epass, eform);

form.addEventListener("submit", (e) => {
  euser.innerHTML = "";
  epass.innerHTML = "";
  eform.innerHTML = "";

  //! Match data

  // e.preventDefault();
  let matchdata = datafromstorage.find((e) => {
    if (
      (e.phone == userName.value && e.pass == password.value) ||
      (e.email == userName.value && e.pass == password.value)
    ) {
      return e;
    }
  });
  console.log(matchdata);

  if (userName.value == "" && password.value == "") {
    euser.innerHTML = "Enter the email or phone no";
    epass.innerHTML = "Enter the password";
    e.preventDefault();
  } else if (userName.value == "") {
    euser.innerHTML = "Enter the email or phone no";
    e.preventDefault();
  } else if (password.value == "") {
    epass.innerHTML = "Enter the password";
    e.preventDefault();
  } else if (matchdata) {
    alert("Welcome to the page");
    localStorage.setItem("oneuser", JSON.stringify(matchdata));
  } else {
    eform.innerHTML = "Match not found";
    e.preventDefault();
  }
});

let h3 = document.querySelector("h3");

h3.addEventListener("click", () => {
  if (h3.innerHTML == "show") {
    password.type = "text";
    h3.innerHTML = "hide";
  } else {
    h3.innerHTML = "show";
    password.type = "hide";
  }
});
