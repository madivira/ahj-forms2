const confirm = document.querySelector(".confirm");
const createTable = document.querySelector(".create-table");
const create = document.querySelector(".create");
const closeSubmit = document.querySelector(".close-submit");
const table = document.getElementsByTagName("table")[0];

let elTr;
let product = [
  {title: "IPhone XR", cost: 60000},
  {title: "Samsung", cost: 74000},
  {title: "Huawei", cost: 55000},
];
 rendering(product);

let updateProduct = document.getElementsByClassName("update");
let deleteProduct = document.getElementsByClassName("delete");

let update = Array.from(updateProduct);
let deleteEl = Array.from(deleteProduct);

updateElement();
deleteElement();

create.addEventListener("click", (e) => {
  createTable.style.display = "block";
})

createTable.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(updateProduct);
  let form = e.target.querySelectorAll("input");

  if(e.currentTarget.checkValidity()){
    
    if(elTr){
      for(let i = 0; i < product.length; i+=1){

        if(product[i].title === elTr.querySelector('.column-title').textContent && product[i].cost === Number(elTr.querySelector('.column-cost').textContent)) {
         
          product[i].title = form[0].value;
          product[i].cost = Number(form[1].value);
        }
      }
      rendering(product);
  
    } else{
      product.push({title: form[0].value, cost: Number(form[1].value)});
      rendering(product);
    }

    updateElement();
    deleteElement();
    createTable.style.display = "none";
    form[0].value = "";
    form[1].value = "";
    elTr = ""
  }

});

function updateElement(){
  
  update = Array.from(updateProduct);
  update.forEach(element => {
    element.addEventListener('click', (e)=>{
      createTable.style.display = "block";
      elTr = e.target.closest('tr');
      document.querySelector("input.title-form").value = elTr.querySelector('.column-title').textContent;
      document.querySelector("input.cost-form").value = elTr.querySelector('.column-cost').textContent;

    })
  });
}

function deleteElement(){
  deleteEl = Array.from(deleteProduct);

  deleteEl.forEach(element => {
    element.addEventListener("click", (e) => {
      confirm.style.display = "block";
      let btnYes = document.getElementById('yes');
      let btnNo = document.getElementById('no');
      btnYes.addEventListener('click',(e) =>{
        e.preventDefault();
        let parent = element.closest('tr');
        let parTitle = parent.querySelector('.column-title').textContent;
        let parCost = Number(parent.querySelector('.column-cost').textContent);
        let findIndexEl = product.findIndex(el=> el.title === parTitle && el.cost === parCost);
        if (findIndexEl != -1){
        product.splice(findIndexEl, 1);
        parent.remove();
        confirm.style.display = "none";
        }
      });
      btnNo.addEventListener("click", (e)=>{
        e.preventDefault();
        confirm.style.display = "none";
      })
    })
  })
}

closeSubmit.addEventListener("click", (e) =>{
  e.preventDefault();
  createTable.style.display = "none";
  let inputTable = createTable.querySelectorAll("input");
  for(let el of inputTable){
    el.value = ""
  }
});

function rendering(array){
  table.innerHTML = "";
  for(let i=0; i < array.length; i+=1){
    const element = document.createElement("tr");
    element.className = "table";
    element.innerHTML = `<td class="column-title">${array[i].title}</td>
    <td class="column-cost">${array[i].cost}</td>
    <td class="column">
      <span class='update'>&#9998</span>
      <span class='delete'>&#9587</span>
    </td>`;
    table.insertAdjacentElement("beforeend", element);
  }
}