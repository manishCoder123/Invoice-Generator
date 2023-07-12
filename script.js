function myFunction() {
    var flag =0;

    document.getElementById("id_add").addEventListener("click", function (event) {
     
        //
        const target = document.getElementById("index");
        const copyElement = target.cloneNode(true);
        copyElement.setAttribute("id", "index-" + (flag + 1))
        document.getElementById("addInputSection").appendChild(copyElement);
        flag++;
        event.preventDefault();
    });

    // remove row
    
}


myFunction();
