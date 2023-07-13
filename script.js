function myFunction() {
    var flag =1;

    document.getElementById("id_add").addEventListener("click", function (event) {
     
        //
        const target = document.getElementById("index");
        const copyElement = target.cloneNode(true);
        copyElement.setAttribute("id", "index-" + (flag + 1))
        document.getElementById("addInputSection").appendChild(copyElement);
        flag++;
        event.preventDefault();
    });

    document.getElementById("id_remove").addEventListener("click", function(event){
        var target = document.getElementById("index");
        var rowCount = target.rows.length;
        console.log("rowCount", rowCount);
        if ( rowCount > '2'){
            var row = target.deleteRow(rowCount-1);
            rowCount--;
        }
        else{
            alert('There should be atleast one row');
        }
        event.preventDefault();
    });
}
myFunction();
