// // Create Dynamic Form

// const addBtn = document.querySelector(".add");

// const input = document.querySelector(".inp-group");

// function removeInput(){
//     this.parentElement.remove();
// }

// function addInput(){

//     const item = document.createElement("input");
//     item.type = "text";
//     item.placeholder = "Enter the Item Name";

//     const rate = document.createElement("input");
//     rate.type = "Number";
//     rate.placeholder = "Enter the Rate";

//     const qty = document.createElement("input");
//     qty.type = "Number";
//     qty.placeholder = "Enter the Quantity";

//     const amount = document.createElement("input");
//     amount.type = "Number";
//     amount.placeholder = "Enter the Amount";

//     const btn = document.createElement("a");
//     btn.className = "delete";
//     btn.innerHTML = "&times";
//     btn.addEventListener("click", removeInput);

//     const flex = document.createElement("div");
//     flex.className = "flex";

//     input.appendChild(flex);
//     flex.appendChild(item);
//     flex.appendChild(rate);
//     flex.appendChild(qty);
//     flex.appendChild(amount);
//     flex.appendChild(btn);
// }


// addBtn.addEventListener("click", addInput);

// btn.addEventListener("click", removeInput);


function myFunction(){
    const node = document.getElementsByClassName("index-1");
    const clone = node.cloneNode(true);
    document.getElementsByClassName("addInputSection").appendChild(clone);
}