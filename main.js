document.getElementById('myform').addEventListener("submit", saveBookMark);

function saveBookMark(e){
    console.log("It works");
    alert("Hii");
    e.preventDefault();
}