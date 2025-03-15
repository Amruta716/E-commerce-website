let form = document.querySelector("form");
let firstname = document.querySelectorAll("input")[0];
let lastname = document.querySelectorAll("input")[1];
let email = document.querySelectorAll("input")[2];
let mobile = document.querySelectorAll("input")[3];
let createpassword = document.querySelectorAll("input")[4];
let confirmpassword = document.querySelectorAll("input")[5];

let efirst = document.querySelectorAll("span")[0];
let elast = document.querySelectorAll("span")[1];
let eemail = document.querySelectorAll("span")[2];
let emobile = document.querySelectorAll("span")[3];
let epass = document.querySelectorAll("span")[4];
let ecpass = document.querySelectorAll("span")[5];
let storage = [];
let datafromstorage = JSON.parse(localStorage.getItem("data"));

if (datafromstorage) {
  storage = datafromstorage;
}

console.log(datafromstorage, storage);

let regularexpression = /^[a-zA-Z]{1,17}$/;
let regularexpression2 = /^[a-zA-Z0-9!@]{6,15}$/;
let regularexpression1 = /^[6-9][0-9]{9}$/;

form.addEventListener("submit", (e) => {
  let flag = true;

  if (firstname.value == "") {
    efirst.innerHTML = `*ENTER FIRST NAME`;
    flag = false;
    e.preventDefault();
  }
  //If op is true then this block executed
  else if (regularexpression.test(firstname.value)) {
    efirst.innerHTML = "";
  } else {
    efirst.innerHTML = "Invalid First name";
    flag = false;
    e.preventDefault();
  }

  //LAstNAme Validation
  if (lastname.value == "") {
    elast.innerHTML = `*ENTER LAST NAME`;
    flag = false;
    e.preventDefault();
  } else if (regularexpression.test(lastname.value)) {
    elast.innerHTML = "";
  } else {
    elast.innerHTML = "Invalid Last Name";
    flag = false;
    e.preventDefault();
  }

  //Email Validation
  if (email.value == "") {
    eemail.innerHTML = `ENTER EMAIL`;
    flag = false;
    e.preventDefault();
  } else {
    eemail.innerHTML = "";
  }

  //Mobile Validation
  let mobileCheck = storage.find((e) => {
    if (e.phone == mobile.value) {
      return e;
    }
  });

  if (mobileCheck) {
    emobile.innerHTML = "Mobile is already Registered";
    flag = false;
    e.preventDefault();
  } else if (mobile.value == "") {
    emobile.innerHTML = "*ENTER MOBILE NUMBER";
    flag = false;
    e.preventDefault();
  } else if (regularexpression1.test(mobile.value)) {
    emobile.innerHTML = "";
  } else {
    emobile.innerHTML = "Invalid Mobile Number";
    flag = false;
    e.preventDefault();
  }

  //Password Validation

  if (createpassword.value == "") {
    epass.innerHTML = "*ENTER PASSWORD";
    flag = false;
    e.preventDefault();
  } else if (regularexpression2.test(createpassword.value)) {
    epass.innerHTML = "";
  } else {
    epass.innerHTML = "Invalid Password";
    flag = false;
    e.preventDefault();
  }

  //Confirm Password.
  if (confirmpassword.value == "") {
    ecpass.innerHTML = "*ENTER CONFIRM PASSWORD";
    flag = false;
    e.preventDefault();
  } else if (confirmpassword.value == createpassword.value) {
    ecpass.innerHTML = "";
  } else {
    ecpass.innerHTML = "Password does not match which create password.";
    flag = false;
    e.preventDefault();
  }

  if (flag) {
    let details = {
      first: firstname.value,
      last: lastname.value,
      email: email.value,
      phone: mobile.value,
      pass: createpassword.value,
      // userCard: null,
      carditems: null,
    };
    storage.push(details);

    localStorage.setItem("data", JSON.stringify(storage));
    // console.log(data);
  }
});
