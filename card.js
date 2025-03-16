let oneuser = JSON.parse(localStorage.getItem("oneuser"));
let data = JSON.parse(localStorage.getItem("data"));
let carditems = oneuser.carditems;

console.log(oneuser);

let main = document.querySelector("main");

function display() {
  main.innerHTML = "";
  carditems.map((e) => {
    main.innerHTML += `

 <div id= "${e.productId}">
 <div>
  <img src="${e.productImageURLs[0]}" alt="">
 </div>
  <div>
  <h3>${e.name}</h3>
  <h2>${e.price}</h2>
  </div>
  <div>
  <button>delete</button>
  </div>
 </div>
`;
  });
  del();
  grand();
}
display();

function del() {
  let allBtn = main.querySelectorAll("button");
  allBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let confirmation = confirm("Are you sure u want to remove the product?");
      if (confirmation) {
        carditems = carditems.filter((e) => {
          if (btn.parentElement.parentElement.id != e.productId) {
            return e;
          }
        });
        display();

        oneuser.carditems = carditems;
        console.log(oneuser);
        //! Storing data in local storage
        localStorage.setItem("oneuser", JSON.stringify(oneuser));
        data = data.filter((e) => {
          if (e.phone != oneuser.phone) {
            return e;
          }
        });

        // ! adding current user update details to data
        data.push(oneuser);
        console.log(data);

        //! storing updated data in local storage
        localStorage.setItem("data", JSON.stringify(data));
      }
    });
  });
}
del();

function grand() {
  let sum = 0;
  carditems.map((e) => {
    sum = sum + e.price;
  });
  let total = document.querySelector("#Total");
  total.innerHTML = sum;
}
grand();
