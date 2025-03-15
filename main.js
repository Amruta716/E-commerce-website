// ! to add count this variable is declared => after click in product should add cart
let carditems = [];
let data = JSON.parse(localStorage.getItem("data"));
let oneuser = JSON.parse(localStorage.getItem("oneuser"));
let count = document.querySelector("#count");

console.log(data, oneuser);
if (oneuser.carditems) {
  count.innerHTML = oneuser.carditems.length;
  carditems = oneuser.carditems;
}

function loginlogout() {
  let login = document.querySelector("#right");
  //^ oneuser data from local storage
  let oneUserData = JSON.parse(localStorage.getItem("oneuser"));
  console.log(oneUserData);
  //^ user information
  if (oneUserData) {
    //^ providing informtion inside right division
    login.innerHTML = `<span>${oneUserData.first}</span> <button id="logout">LogOut</button>`;
    //^ accessing logout button
    let logout = document.querySelector("#logout");
    //^logout event
    logout.addEventListener("click", () => {
      //^ removing one user from local storage
      localStorage.removeItem("oneuser");
      window.open("./main.html");
    });
  }
}
loginlogout();

//! fetching data from server
async function allProductData() {
  let dataFromServer = await fetch(
    "https://www.shoppersstack.com/shopping/products/alpha"
  );
  let convertData = await dataFromServer.json();
  let allData = convertData.data;
  console.log(allData);
  //! filterdata from men
  let mendata = allData.filter((e) => {
    if (e.category == "men") {
      return e;
    }
  });
  //   console.log(mendata);
  //   console.log(allData);
  //! filterdata from women
  let womendata = allData.filter((e) => {
    if (e.category == "women") {
      return e;
    }
  });
  //   console.log(womendata);
  //   console.log(allData);
  //! filterdata from kids
  let kidsdata = allData.filter((e) => {
    if (e.category == "kids") {
      return e;
    }
  });
  //   console.log(kidsdata);

  let electrodata = allData.filter((e) => {
    if (e.category == "electronics") {
      return e;
    }
  });
  //   console.log(electrodata);

  //!  Men data output
  let MaleOutput = document.querySelector("#maleCont");

  mendata.map((e) => {
    MaleOutput.innerHTML += ` <div id="${e.productId}">
          <img src="${e.productImageURLs[0]}" alt="" />
          <h3>Name :${e.name}</h3>
          <h2>Price :${e.price}</h2>
          <h2>Rating :${e.rating}</h2>
          <button>Add to cart</button>
        </div>`;
    // console.log(e);
  });

  //! Women data output
  let WomenOutput = document.querySelector("#femaleCont");
  // women data output
  womendata.map((e) => {
    WomenOutput.innerHTML += ` <div id="${e.productId}">
          <img src="${e.productImageURLs[0]}" alt="" />
          <h3>Name :${e.name}</h3>
          <h2>Price :${e.price}</h2>
          <h2>Rating :${e.rating}</h2>
          <button>Add to cart</button>
        </div>`;
    // console.log(e);
  });
  //! kids data output
  let kidsoutput = document.querySelector("#kidsCont");
  kidsdata.map((e) => {
    kidsoutput.innerHTML += ` <div id="${e.productId}">
          <img src="${e.productImageURLs[0]}" alt="" />
          <h3>Name :${e.name}</h3>
          <h2>Price :${e.price}</h2>
          <h2>Rating :${e.rating}</h2>
          <button>Add to cart</button>
        </div>`;
  });
  //!electronic data output
  let electroutput = document.querySelector("#electroCont");
  electrodata.map((e) => {
    electroutput.innerHTML += ` <div id="${e.productId}">
          <img src="${e.productImageURLs[0]}" alt="" />
          <h3>Name :${e.name}</h3>
          <h2>Price :${e.price}</h2>
          <h2>Rating :${e.rating}</h2>
          <button>Add to cart</button>
        </div>`;
  });

  //! search input

  let input = document.querySelector("input");
  let searchBtn = document.querySelector("#searchBtn");
  let searchResult = document.querySelector("#searchResult");

  searchBtn.addEventListener("click", (e) => {
    searchResult.innerHTML = "";
    allData.map((e) => {
      if (e.name.toLowerCase().includes(input.value.trim().toLowerCase())) {
        searchResult.innerHTML += `
        <div>
          <img src="${e.productImageURLs[0]}" alt="" />
          <h3>Name :${e.name}</h3>
          <h2>Price :${e.price}</h2>
          <h2>Rating :${e.rating}</h2>
          <button>Add to cart</button>
        </div> 
        `;
      }
    });
  });

  //! accessing all add to cart button

  let main = document.querySelector("main");
  let allBtn = main.querySelectorAll("button");
  console.log(allBtn);

  //!adding event listner for each
  allBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      // console.log("hii");
      if (oneuser) {
        console.log(btn.parentElement);

        //! to find clicked product
        //? to remove duplicated product
        carditems = carditems.filter((e) => {
          if (e.productId != btn.parentElement.id) {
            return e;
          }
        });

        //! clicked product add to cart
        let product = allData.find((e) => {
          if (e.productId == btn.parentElement.id) {
            return e;
          }
        });

        carditems.push(product);

        oneuser.carditems = carditems;
        console.log(oneuser);
        //! Storing data in local storage
        localStorage.setItem("oneuser", JSON.stringify(oneuser));
        data = data.filter((e) => {
          if (e.phone != oneuser.mobile) {
            return e;
          }
        });

        // ! adding current user update details to data
        data.push(oneuser);
        console.log(data);

        //! storing updated data in local storage
        localStorage.setItem("data", JSON.stringify(data));
        count.innerHTML = oneuser.carditems.length;

        // console.log(carditems);

        //? if user as login then all product well add other wise alert mesg will be displayed
      } else {
        alert("login first ");
        window.location.href = "./login.html";
      }
    });
  });
}

allProductData();

let carticon = document.querySelector(".fa-cart-shopping");
carticon.addEventListener("click", () => {
  window.location.href = "./card.html";
});
