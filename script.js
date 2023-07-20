
var tax = 12;
var discount = 9;
var shippingFee = 10;

function myFunction() {
    var flag = 1;

    document.getElementById("id_add").addEventListener("click", function (event) {

        
        const target = document.getElementById("index");
        const copyElement = target.cloneNode(true);
        copyElement.setAttribute("id", "index-" + (flag + 1))
        document.getElementById("addInputSection").appendChild(copyElement);

        //<h4 id="id_remove" onclick="deleteRow(this)"> X </h4>

        const createH4Element = document.createElement("h4");
        createH4Element.setAttribute("onclick", "deleteRow(this)");
        createH4Element.textContent = "X";
        copyElement.appendChild(createH4Element);

        var amtRs = 0;
        
        var currentFlag = flag + 1;

        document.querySelector("#index-" + (currentFlag) + "> .rateInput > input").value = "";
        document.querySelector("#index-" + (currentFlag) + "> .qtyInput > input").value = "";
        document.querySelector("#index-" + (currentFlag) + "> .amountInput > input").value = "";
        
        rateRow(currentFlag);
        
        flag++;
        event.preventDefault();
    });
}


function rateRow(index){
    var indexName = getIndexNamedId(index);
    document.querySelector(indexName + "> .rateInput > input").onchange = function (e) {
        // some things
        var rate = e.target.value;
        console.log("Changed");

        qtyRow(index, rate);
        amount(index, rate);
        taxAmount(index);
    }
}




function qtyRow(index, rate) {

    var indexName = getIndexNamedId(index);
    var initialQty = document.querySelector(indexName + "> .qtyInput > input").value;
    
    if(initialQty == ""){
        document.querySelector(indexName +  "> .qtyInput > input").value = 1;
    }

    document.querySelector(indexName +  "> .qtyInput > input").onchange = function(e) {
        console.log("qtyChanged", indexName + index);
        amount(index, rate);
    }
}

function amount(index, rate) {
    var indexName = getIndexNamedId(index);

    var initialQty = document.querySelector(indexName +  "> .qtyInput > input").value;

    var totalAmt = initialQty * rate;
    document.querySelector(indexName +"> .amountInput > input").value = totalAmt;

    // document.querySelector("#index-" + index + "> .amountInput > input").onchange = function(e){
    //     console.log("amountChanged", "index-" + index);
    // }
}

// get id name
function getIndexNamedId(index){
    return index == 0 ? "#index" : ("#index-"+ index)
}



// Delete Row
function deleteRow(rowElementIndex) {
    var element = rowElementIndex.parentNode;
    element.remove();
}



// Subtotal
function findTotal() {
    var arr = document.getElementsByClassName('amount');
    var tot = 0;
    for (var i = 0; i < arr.length; i++) {
        if (parseFloat(arr[i].value))
            tot += parseFloat(arr[i].value);
    }
    document.getElementById('subtotal').value = "$ " + tot;
}



// Tax
function taxAmount(index) {
    var indexName = getIndexNamedId(index);
    var initialAmount = document.querySelector(indexName + "> .amountInput > input").value;
    var taxCalculationAmount = (initialAmount * tax)/100;
    document.querySelector(indexName + "> .taxTitle > input").value = taxCalculationAmount;
}
 

rateRow(0);
myFunction();