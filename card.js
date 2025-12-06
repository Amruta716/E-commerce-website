let oneuser = JSON.parse(localStorage.getItem("oneuser"));
let data = JSON.parse(localStorage.getItem("data"));
let carditems = oneuser.carditems;

let main = document.querySelector("#main");
let Total = document.getElementById("Total");
let subTotal = document.getElementById("subTotal");

function display(){
  main.innerHTML = "";
  carditems.forEach((e)=>{
    main.innerHTML += `
      <div id="${e.productId}">
        <img src="${e.productImageURLs[0]}">
        <div>
          <h3>${e.name}</h3>
          <h2>₹ ${e.price}</h2>
        </div>
        <button>X</button>
      </div>
    `;
  });
  del();
  grand();
}
display();

/* DELETE */
function del(){
  let allBtn = main.querySelectorAll("button");
  allBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
      let id = btn.parentElement.id;
      carditems = carditems.filter(e=> e.productId != id);
      oneuser.carditems = carditems;
      localStorage.setItem("oneuser", JSON.stringify(oneuser));
      display();
    });
  });
}

/* TOTAL */
function grand(){
  let sum = 0;
  carditems.forEach(e=> sum += e.price);
  subTotal.innerText = sum;
  Total.innerText = sum + 50;
}

let options = document.querySelectorAll(".delivery-box div");

options.forEach((btn) => {
  btn.addEventListener("click", () => {
    options.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// ===== PAYMENT BUTTON =====
document.getElementById("pay").addEventListener("click", () => {

  let inputs = document.querySelectorAll("input, select");
  let isChecked = document.querySelector(".terms input").checked;

  for (let i of inputs) {
    if (i.value.trim() === "") {
      alert("Please fill all required details");
      return;
    }
  }

  if (!isChecked) {
    alert("Please accept Terms & Conditions");
    return;
  }

  if (carditems.length === 0) {
    alert("Your cart is empty");
    return;
  }

  // Save Order Details
  let order = {
    user: oneuser.name,
    phone: oneuser.phone,
    items: carditems,
    total: Total.innerText,
    date: new Date().toLocaleString()
  };

  localStorage.setItem("lastOrder", JSON.stringify(order));

  // Clear cart after order
  oneuser.carditems = [];
  localStorage.setItem("oneuser", JSON.stringify(oneuser));

  // Redirect
  window.location.href = "./order-success.html";

});
