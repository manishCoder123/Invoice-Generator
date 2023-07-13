

function myFunction() {
    var flag =1;

    document.getElementById("id_add").addEventListener("click", function (event) {
     
        //
        const target = document.getElementById("index");
        const copyElement = target.cloneNode(true);
        copyElement.setAttribute("id", "index-" + (flag + 1))
        document.getElementById("addInputSection").appendChild(copyElement);

        //<h4 id="id_remove" onclick="deleteRow(this)"> X </h4>

        const createH4Element = document.createElement("h4");
        createH4Element.setAttribute("onclick", "deleteRow(this)");
        createH4Element.textContent = "X";
        copyElement.appendChild(createH4Element);

        flag++;
        event.preventDefault();
    });
}

function deleteRow(rowElementIndex){
    var element = rowElementIndex.parentNode;
    element.remove();
}

myFunction();
