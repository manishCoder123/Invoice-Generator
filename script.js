
var tax = 12;
var discount = 9;
var shippingFee = 10;

function myFunction() {
    var flag = 1;


    document.getElementById("id_add").addEventListener("click", function (event) {

        
        var currentFlag = flag + 1;

        const target = document.getElementById("index");
        const copyElement = target.cloneNode(true);
        copyElement.setAttribute("id", "index-" + (flag + 1))
        document.getElementById("addInputSection").appendChild(copyElement);

        //<h4 id="id_remove" onclick="deleteRow(this)"> X </h4>

        const createH4Element = document.createElement("h4");
        createH4Element.textContent = "X";
        const targetBlankDiv = document.querySelector("#index-"+(currentFlag)+" > #blank-div");
        targetBlankDiv.setAttribute("onclick", "deleteRow(this)");
        targetBlankDiv.appendChild(createH4Element)
        copyElement.appendChild(targetBlankDiv);
        
        document.querySelector("#index-" + (currentFlag) + "> .rateInput > input").value = "";
        document.querySelector("#index-" + (currentFlag) + "> .qtyInput > input").value = "";
        document.querySelector("#index-" + (currentFlag) + "> .amountInput > input").value = "";

        rateRow(currentFlag);

        flag++;
        event.preventDefault();
    });
}


function rateRow(index) {
    var indexName = getIndexNamedId(index);

    document.querySelector(indexName + "> .amountInput > input").readOnly = true;
    document.querySelector(indexName + "> .rateInput > input").onchange = function (e) {
        // some things
        var rate = e.target.value;
        console.log("Changed");

        qtyRow(index, rate);
        amount(index, rate);
        findTotal();
        
    }
}



function qtyRow(index, rate) {

    var indexName = getIndexNamedId(index);
    var initialQty = document.querySelector(indexName + "> .qtyInput > input").value;

    if (initialQty == "") {
        document.querySelector(indexName + "> .qtyInput > input").value = 1;
    }

    document.querySelector(indexName + "> .qtyInput > input").onchange = function (e) {
        console.log("qtyChanged", indexName + index);
        amount(index, rate);
    }
}

function amount(index, rate) {
    var indexName = getIndexNamedId(index);

    var initialQty = document.querySelector(indexName + "> .qtyInput > input").value;

    var totalAmt = initialQty * rate;
    document.querySelector(indexName + "> .amountInput > input").value = totalAmt;

    findTotal();
}

// get id name
function getIndexNamedId(index) {
    return index == 0 ? "#index" : ("#index-" + index)
}


// Delete Row
function deleteRow(rowElementIndex) {
    var element = rowElementIndex.parentNode;
    element.remove();
    findTotal();
}

// Subtotal
function findTotal() {
    var arr = document.getElementsByClassName('amount');
    var tot = 0;
    for (var i = 0; i < arr.length; i++) {
        if (parseFloat(arr[i].value))
            tot += parseFloat(arr[i].value);
    }

    var taxValue = (tot * tax) / 100;
    var afterTaxAmount = tot + taxValue
    var shippingValue = (tot * shippingFee) / 100;
    var beforeDiscount = afterTaxAmount + shippingValue
    var discountValue = (beforeDiscount * discount) / 100;
    var totalAmount = (tot + taxValue + shippingValue) - discountValue;

    document.getElementById("tax").textContent = "$" + parseFloat(taxValue).toFixed(2);
    document.getElementById("discount").textContent = "$" + parseFloat(discountValue).toFixed(2);
    document.getElementById("shippingFee").textContent = "$" + parseFloat(shippingValue).toFixed(2);
    document.getElementById("total").textContent = "$" + parseFloat(totalAmount).toFixed(2);
    document.getElementById('subtotal').value = "$ " + tot;
}


rateRow(0);
myFunction();