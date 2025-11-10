document.querySelector("#searchByKeyWordForm").addEventListener("submit", validateKeyword);

function validateKeyword(){
    let keyword = document.querySelector("input[name=keyword]").value;
    let errMsg = document.querySelector("#errMsg")

    if(keyword.length < 3){
        errMsg.textContent = "Error, keyword must be at least 3 characters long. Please try again."
        errMsg.style.color = "red";
        event.preventDefault(); //prevents the submission of the form
    } else{
        errMsg.textContent = "";
    }
}