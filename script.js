
var tax = 12;
var discount = 9;
var shippingFee = 10;

function myFunction() {
    var flag = 0;


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
        targetBlankDiv.setAttribute("onclick", "deleteRow(this, "+currentFlag+")");
        targetBlankDiv.appendChild(createH4Element);
        copyElement.appendChild(targetBlankDiv);
        
        document.querySelector("#index-" + (currentFlag) + "> .itemInput > input").value = "";
        document.querySelector("#index-" + (currentFlag) + "> .rateInput > input").value = "";
        document.querySelector("#index-" + (currentFlag) + "> .qtyInput > input").value = "";
        document.querySelector("#index-" + (currentFlag) + "> .amountInput > input").value = "";

        // Copy the Table data //
        const tableTarget = document.getElementById("tr_index");
        const copyTarget = tableTarget.cloneNode(true);
        copyTarget.setAttribute("id", "tr_index-" + (flag+1));
        document.getElementById("tbody").appendChild(copyTarget);

        document.querySelector("#tr_index-" + (currentFlag)+ "> .td_itemValue").textContent = "";
        document.querySelector("#tr_index-" + (currentFlag)+ "> .td_rate").textContent = "";
        document.querySelector("#tr_index-" + (currentFlag)+ "> .td_qtyValue").textContent = "";
        document.querySelector("#tr_index-" + (currentFlag)+ "> .td_amountValue").textContent = "";

        itemName(currentFlag);
        rateRow(currentFlag);

        flag++;
        event.preventDefault();
    });
}

// get id name
function getIndexNamedId(index) {
    return index == 0 ? "#index" : ("#index-" + index)
}

// get Table id name
function getIndexTableNamedId(index) {
    return index == 0 ? "#tr_index" : ("#tr_index-" + index)
}


function itemName(index){
    var indexName = getIndexNamedId(index);
    var indexTableName = getIndexTableNamedId(index);
    document.querySelector(indexName + "> .itemInput > input").onchange = function (e) {
        var itemName = e.target.value;
        document.querySelectorAll(indexTableName + "> td")[0].textContent = itemName;
    }
}

// Function for Rate
function rateRow(index) {
    var indexName = getIndexNamedId(index);
    var indexTableName = getIndexTableNamedId(index);
    document.querySelector(indexName + "> .amountInput > input").readOnly = true;
    document.querySelector(indexName + "> .rateInput > input").onchange = function (e) {
        // some things
        var rate = e.target.value;
        document.querySelectorAll(indexTableName + "> td")[1].textContent = rate;
        console.log("Changed");

        qtyRow(index, rate);
        amount(index, rate);
        // gettingTableValue(index);
        // findTotal();
        // ----------
        
    }

}


// Function for quantity 
function qtyRow(index, rate) {

    var indexName = getIndexNamedId(index);
    var indexTableName = getIndexTableNamedId(index);
    var initialQty = document.querySelector(indexName + "> .qtyInput > input").value;

    if (initialQty == "") {
        document.querySelector(indexName + "> .qtyInput > input").value = 1;
        document.querySelectorAll(indexTableName + "> td")[2].textContent = 1;
    }
    else{
        document.querySelectorAll(indexTableName + "> td")[2].textContent = initialQty;
    }

    
    document.querySelector(indexName + "> .qtyInput > input").onchange = function (e) {
        const qtyValue = e.target.value;
        document.querySelectorAll(indexTableName + "> td")[2].textContent = qtyValue;
        console.log("qtyChanged", indexName + index);
        amount(index, rate);
    }
}


// Function for Amount
function amount(index, rate) {

    var indexName = getIndexNamedId(index);
    var indexTableName = getIndexTableNamedId(index);

    var initialQty = document.querySelector(indexName + "> .qtyInput > input").value;

    var totalAmt = initialQty * rate;
    document.querySelector(indexName + "> .amountInput > input").value = totalAmt;

    document.querySelectorAll(indexTableName + "> td")[3].textContent = totalAmt;
    findTotal();
}


// Delete Row
function deleteRow(rowElementIndex, index) {
    var indexTableName = getIndexTableNamedId(index);

    if(index >= 1){
        var tableIndexElement = document.getElementById(indexTableName.replace("#",""));
        tableIndexElement.parentNode.removeChild(tableIndexElement);
    }
    var element = rowElementIndex.parentNode;
    element.remove();
    console.log("delete_index", index);
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
    var afterTaxAmount = tot + taxValue;
    var shippingValue = (tot * shippingFee) / 100;
    var beforeDiscount = afterTaxAmount + shippingValue;
    var discountValue = (beforeDiscount * discount) / 100;
    var totalAmount = beforeDiscount - discountValue;

    document.getElementById("tax").textContent = "$" + parseFloat(taxValue).toFixed(2);
    document.getElementById("discount").textContent = "$" + parseFloat(discountValue).toFixed(2);
    document.getElementById("shippingFee").textContent = "$" + parseFloat(shippingValue).toFixed(2);
    document.getElementById("total").textContent = "$" + parseFloat(totalAmount).toFixed(2);
    document.getElementById('subtotal').value = "$" + tot;

    document.getElementById('id_subtotal').textContent = "$" + tot;
    document.getElementById('id_tax').textContent = "$" + parseFloat(taxValue).toFixed(2);
    document.getElementById('id_discount').textContent = "$" + parseFloat(discountValue).toFixed(2);
    document.getElementById('id_shipping').textContent = "$" + parseFloat(shippingValue).toFixed(2);
    document.getElementById('id_total_amount').textContent = "$" + parseFloat(totalAmount).toFixed(2);
}

/* Getting Values */
function getValue(){
    /* Getting Invoice Details value */
    let invocie_number = document.getElementById("invoice_number").value;
    document.getElementById("copyInvocieNumber").innerHTML = invocie_number;

    /* Getting Company Details Value */
    let getCompanyDetails = document.getElementById("invoiceCompanyDetail").value;
    document.getElementById("companyDetail").innerHTML = getCompanyDetails;

    /* Getting Billing Details Value */
    let getbill = document.getElementById("invoiceBillingDEtail").value;
    document.getElementById("billTo").innerHTML = getbill;
}

// Getting Issued And Due Date //

function getDate(){
    document.getElementById("date").onchange = function(){
        var date = document.getElementById("date").value;
        document.getElementById("id_issued_date").textContent = date
    }
    document.getElementById("dateDue").onchange = function(){
        var dueDate = document.getElementById("dateDue").value;
        document.getElementById("id_due-date").textContent = dueDate
    }
}


$(document).ready(function () {
    var element = $("#screenShot")[0];

    // hide hightlish here
    $("#hide").css({ "background-color" : "transparent" })
    $("#companyDetail").hide();
    $("#hide1").css({"background-color" : "transparent"})
    $("#billTo").hide();

    $("#download").on("click", function () {

        // show hightlight here
        $("#hide").css({ "background-color" : "#daeefe" })
        $("#companyDetail").show();
        $("#hide1").css({"background-color" : "#daeefe"})
        $("#billTo").show();

        html2canvas(element).then((canvas) => {
            
            var imageData = canvas.toDataURL("image/webp");
            var newData = imageData.replace('/^data:image\/webp', "data:application/octet-stream");
           
            saveAs(newData, Math.floor((new Date() / 1000)).toString() + ".webp" );
            
        });
    })
});


function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}


getDate();
itemName(0)
rateRow(0);
myFunction();

