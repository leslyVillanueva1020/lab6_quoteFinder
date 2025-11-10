$("#closeModal").addEventListener("click", () => {
    $("#authorName").textContent = "";
            $("#authorImage").src = "";
            $("#dob").textContent = `DOB:`;
            $("#dod").textContent = `DOD:`;
            $("#sex").textContent = `Sex:`;
            $("#profession").textContent = `Profession:`;
            $("#country").textContent = `Country:`;
            $("#bio").textContent = "";
    $("#authorModal").close(); 
})


        let authorLinks = document.querySelectorAll(".authors");
        for(let i of authorLinks){
            i.addEventListener("click", getAuthorInfo);
        }

        function $(selector) {
            return document.querySelector(selector);
        }

        async function getAuthorInfo() {
            let authorId = this.getAttribute("authorId");

            let url = "/api/authors/" + authorId;
            let response = await fetch(url);
            let data = await response.json();
            console.log(data);
            $("#authorName").textContent = data[0].firstName + " " + data[0].lastName;
            $("#authorImage").src = data[0].portrait;
            $("#dob").textContent += data[0].dob;
            $("#dod").textContent += data[0].dod;
            $("#sex").textContent += data[0].sex;
            $("#profession").textContent += data[0].profession;
            $("#country").textContent += data[0].country;
            $("#bio").textContent += data[0].biography;
            $("#authorModal").showModal();
        }