// async function users_api() {
//     try {
//         let res = await fetch("https://63983534044fa481d694c51f.mockapi.io/users");
//         if (res.status) {
//             let data = await res.json();
//             // console.log(data);
//             renderUsers(data);
//         }
//         else {
//             console.log(res.status)
//         }

//     } catch (error) {
//         console.log(error)
//     }
// }
// users_api();
// function renderUsers(data) {
//     // console.log(1)
//     let container = document.getElementById("table_body");
//     container.innerHTML = `
//       ${data.map((elem) => {
//         return `<tr>
//          <td>${elem.username}</td>
//          <td>${elem.password}</td>
//          <td><button class="delete-btn" data-id="${elem.id}">Delete</button></td>
//      </tr>`
//     }).join("")}
//     `
//     let all_delete_btns = document.querySelectorAll(".delete-btn");
//     for (let delete_btn of all_delete_btns) {
//         delete_btn.addEventListener("click", (e) => {
//             console.log(e.target.dataset.id);
//             let id = e.target.dataset.id;
//             delete_user(data,id);
//             // setTimeout(()=>{
//             //     window.location.reload()
//             // },500);

//         })
//     }

// }
//  async function delete_user(data,id){
//    await fetch(`https://63983534044fa481d694c51f.mockapi.io/users/${id}`,{
//         method:"DELETE"
//     });

//     users_api();

// }
// ////display product here;
// async function product_data(){
//     let res = await fetch("https://63983534044fa481d694c51f.mockapi.io/items");

//     if(res.status){
//         let data = await res.json();
//         // console.log(data);
//         display_products(data)
//     }
// }
// product_data();
// function display_products(out){
//   let container=  document.querySelector(".bottom_section");
//   container.innerHTML=`
//    ${out.map((elem)=>{
//         return `<div>
//         <img src="${elem.img}">
//         <p>${elem.name}</p>
//         <p>1Kg/pc</p>
//         <p>MRP ₹${elem.price}</p>
//         <button class="delete_btn" data-id="${elem.id}">Delete</button>
//     </div>`
//    }).join("")}
//   `
//   let all_dlt_btns = document.querySelectorAll(".delete_btn");
//    for(let dlt_button of all_dlt_btns){
//      dlt_button.addEventListener("click",(e)=>{
//         let id=e.target.dataset.id;
//         delete_product(out,id)
//      })
//    }

//   }
// async function delete_product(out,id){
//    await fetch(`https://63983534044fa481d694c51f.mockapi.io/items/${id}`,{
//         method:"DELETE"
//     }

//     )
//     product_data(out);
// }
// /////////add product to api
// let form = document.querySelector("#add_item_form form");
// form.addEventListener("submit",(e)=>{
//     e.preventDefault();
//     // console.log(1)
//     let obj={
//         name:document.getElementById("name").value,
//         price:+(document.getElementById("price").value),
//         rating:+(document.getElementById("rating").value),
//         img:document.getElementById("img").value,
//         category:document.getElementById("category").value,
//     };
//     // console.log(obj);
//      post_product(obj);
// })
// async function post_product(obj){
//     let res =await fetch("https://63983534044fa481d694c51f.mockapi.io/items",{
//         method:'POST',
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify(obj)
//     })
//     if(res.status){
//         alert("added data successfully")
//         let data = await res.json();
//         // console.log(data);
//         product_data(data);
//     }

// }
const baseurl = `http://localhost:8088/users/`;
const alldataurl = `http://localhost:8088/data/`;

async function alldata() {
  let res = await fetch(baseurl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  if (res.ok) {
    let data = await res.json();
    displayuser(data);
  }
}
alldata();

function displayuser(data) {
  let container = document.getElementById("table_body");
  container.innerHTML = `
      ${data
        .map((elem) => {
          return `<tr>
         <td>${elem.name}</td>
         <td>${elem.email}</td>
     </tr>`;
        })
        .join("")}`;
}

async function displaydata() {
  let res = await fetch(alldataurl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  if (res.ok) {
    let data = await res.json();
    displaycarddata(data);
  }
}
displaydata();
function displaycarddata(data) {
  let container = document.querySelector(".bottom_section");
  container.innerHTML = `
   ${data
     .map((elem) => {
       return `<div>
        <img src="${elem.img}">
        <p>${elem.title}</p>
        <p>100pc/pack</p>
        <p>Rating :${elem.rating}</p>
        <p>MRP ₹${elem.price}</p>
        <button class="delete_btn" data-id="${elem["_id"]}">Delete</button>
    </div>`;
     })
     .join("")}
  `;
  let all_dlt_btns = document.querySelectorAll(".delete_btn");
  for (let dlt_button of all_dlt_btns) {
    dlt_button.addEventListener("click", (e) => {
      let id = e.target.dataset.id;
      delete_product(id);
    });
  }
}
 async function delete_product(id) {
   let res = await fetch(`${alldataurl}delete/${id}`,{
    method:"DELETE",
    headers:{
        "Content-Type": "application/json",
    }
   })
   console.log(res)
   if(res.ok){
    displaydata()
    alert("Product deleted successfully")
   }
 }
let form = document.querySelector("#add_item_form form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(1)
  let obj = {
    title: document.getElementById("name").value,
    price: +document.getElementById("price").value,
    rating: +document.getElementById("rating").value,
    img: document.getElementById("img").value,
  };
  // console.log(obj);
  post_product(obj);
});
async function post_product(obj) {
  let res = await fetch(`${alldataurl}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  if (res.status) {
      let data = await res.json();
      // console.log(data);
      product_data(data);
      alert("added data successfully");
  }
}
