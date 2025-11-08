document.querySelector("#searchByKeyWordForm").addEventListener("submit", validateKeyword);

function validateKeyword(){
    let keyword = document.querySelector("input[name=keyword]").value;

    if(keyword.length < 3){
        alert("keyword must be longer than 2 characters");
        event.preventDefault(); //prevents the submission of the form
    }
}