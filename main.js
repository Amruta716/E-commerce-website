// ===================== CART VARIABLES =====================
let carditems = [];
let data = JSON.parse(localStorage.getItem("data")) || [];
let oneuser = JSON.parse(localStorage.getItem("oneuser"));
let count = document.querySelector("#count");

if (oneuser && oneuser.carditems) {
  carditems = oneuser.carditems;
  count.innerHTML = carditems.length;
} else {
  count.innerHTML = 0;
}

// ===================== LOGIN LOGOUT =====================
function loginlogout() {
  let login = document.querySelector("#right");
  let oneUserData = JSON.parse(localStorage.getItem("oneuser"));

  if (oneUserData) {
    login.innerHTML = `<span>${oneUserData.first}</span> <button id="logout">LogOut</button>`;
    document.querySelector("#logout").addEventListener("click", () => {
      localStorage.removeItem("oneuser");
      window.location.href = "./main.html";
    });
  }
}
loginlogout();

// ===================== FETCH PRODUCTS =====================
let allData = [];

async function allProductData() {
  let res = await fetch(
    "https://www.shoppersstack.com/shopping/products/alpha"
  );
  let final = await res.json();
  allData = final.data;

  renderProducts(allData);
}
allProductData();

// ===================== RENDER PRODUCTS =====================
function renderProducts(data) {
  let MaleOutput = document.querySelector("#maleCont");
  let WomenOutput = document.querySelector("#femaleCont");
  let kidsoutput = document.querySelector("#kidsCont");
  let electroutput = document.querySelector("#electroCont");

  MaleOutput.innerHTML = "";
  WomenOutput.innerHTML = "";
  kidsoutput.innerHTML = "";
  electroutput.innerHTML = "";

  data.forEach((e) => {
    let cardHTML = `
      <div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" />
        <h3>${e.name}</h3>
        <h2>₹ ${e.price}</h2>
        <h2>⭐ ${e.rating}</h2>
        <button>Add to cart</button>
      </div>
    `;

    if (e.category === "men") MaleOutput.innerHTML += cardHTML;
    if (e.category === "women") WomenOutput.innerHTML += cardHTML;
    if (e.category === "kids") kidsoutput.innerHTML += cardHTML;
    if (e.category === "electronics") electroutput.innerHTML += cardHTML;
  });
}

// ===================== SEARCH FUNCTION =====================
let searchBtn = document.querySelector("#searchBtn");
let input = document.querySelector("#searchInput");
let searchResult = document.querySelector("#searchResult");

searchBtn.addEventListener("click", () => {
  let value = input.value.toLowerCase().trim();
  searchResult.innerHTML = "";

  let filtered = allData.filter((e) => e.name.toLowerCase().includes(value));

  filtered.forEach((e) => {
    searchResult.innerHTML += `
      <div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" />
        <h3>${e.name}</h3>
        <h2>₹ ${e.price}</h2>
        <h2>⭐ ${e.rating}</h2>
        <button>Add to cart</button>
      </div>
    `;
  });

  hideAll();
  searchResult.style.display = "grid";
});

// ===================== ADD TO CART (EVENT DELEGATION) =====================
document.addEventListener("click", function (e) {
  if (e.target.innerText === "Add to cart") {
    let productId = e.target.parentElement.id;

    if (!oneuser) {
      alert("Login first");
      location.href = "./login.html";
      return;
    }

    carditems = carditems.filter((i) => i.productId != productId);

    let product = allData.find((p) => p.productId == productId);
    carditems.push(product);

    oneuser.carditems = carditems;
    localStorage.setItem("oneuser", JSON.stringify(oneuser));

    let allUsers = JSON.parse(localStorage.getItem("data")) || [];
    allUsers = allUsers.filter((u) => u.phone != oneuser.mobile);
    allUsers.push(oneuser);
    localStorage.setItem("data", JSON.stringify(allUsers));

    count.innerHTML = carditems.length;
    alert("✅ Added to cart");
  }
});

// ===================== FILTER BUTTONS =====================
let menBtn = document.querySelector("#menBtn");
let womenBtn = document.querySelector("#womenBtn");
let kidsBtn = document.querySelector("#kidsBtn");
let electroBtn = document.querySelector("#electroBtn");

let male = document.querySelector("#maleCont");
let female = document.querySelector("#femaleCont");
let kids = document.querySelector("#kidsCont");
let electro = document.querySelector("#electroCont");

function hideAll() {
  male.style.display = "none";
  female.style.display = "none";
  kids.style.display = "none";
  electro.style.display = "none";
  searchResult.style.display = "none";
}

menBtn.addEventListener("click", () => {
  hideAll();
  male.style.display = "grid";
});

womenBtn.addEventListener("click", () => {
  hideAll();
  female.style.display = "grid";
});

kidsBtn.addEventListener("click", () => {
  hideAll();
  kids.style.display = "grid";
});

electroBtn.addEventListener("click", () => {
  hideAll();
  electro.style.display = "grid";
});

// ===================== CART CLICK =====================
let carticon = document.querySelector(".fa-cart-shopping");

if (carticon) {
  carticon.addEventListener("click", () => {
    window.location.href = "./card.html";
  });
}
