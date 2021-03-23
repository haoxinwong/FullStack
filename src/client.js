/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function logDate() {
    var obj1 = document.getElementById("dateData");
    obj1.innerHTML = "";

    var obj2 = document.getElementById("logMessage");
    obj2.innerHTML = "sending date to the txt file...";

    let request = new XMLHttpRequest();

    request.open("POST", "http://127.0.0.1:3000/logdate", true);

    request.onload = function ()
    {
        if(request.status===200){
            var obj2 = document.getElementById("logMessage");
            obj2.innerHTML = "Uploaded successfully";
        }
        else if(request.status===404){
            var obj2 = document.getElementById("logMessage");
            obj2.innerHTML = "Resource not available";
        }
    };

    request.send();

}

function viewLog() {
    var obj1 = document.getElementById("dateData");
    obj1.innerHTML = "Information";
    var obj2 = document.getElementById("logMessage");
    obj2.innerHTML = "";

    let request = new XMLHttpRequest();

    request.open("GET", "http://127.0.0.1:3000/dates", true);

    request.onload = function ()
    {

        if (request.status === 200)
        {
            obj1.innerHTML = request.response;
        }
        else if(request.status === 404){
            obj1.innerHTML = "Resource not available";
        }
    };

    request.send();
}
