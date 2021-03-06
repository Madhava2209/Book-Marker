document.getElementById('myform').addEventListener("submit", saveBookMark);

function saveBookMark(e){
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;
    var d = new Date();
    var dd = String(d. getDate()). padStart(2, '0');
    var m = String(d. getMonth() + 1). padStart(2, '0');
    
    var y = d. getFullYear();
    var date1 = dd+ '/'+m+'/'+y;
    var bookmark={
        name: siteName,
        url: siteUrl,
        date : date1
    }

    var regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
    var regex = new RegExp(regexQuery);
    if(!siteUrl.match(regex)){
        alert("Please enter a valid URL.... 😀");
        return false;
    }

    if(localStorage.getItem("bookmarks")=== null){
        var bookmarks = [];
        bookmarks.push(bookmark);

        // set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }
    else{
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    document.getElementById("myform").reset();

    fetchBookmarks();

    e.preventDefault();
}

function deleteBookmark(url){
    var bookmarks= JSON.parse( localStorage.getItem("bookmarks"));
    for(var i=0; i<bookmarks.length;i++){
    if (bookmarks[i].url === url){
        bookmarks.splice(i,1);
     }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    fetchBookmarks();
}

function fetchBookmarks(){
    var bookmarks = JSON.parse( localStorage.getItem("bookmarks"));

    var bookmarksResults = document.getElementById("bookmarks");

    bookmarksResults.innerHTML="";

    for(var i=0; i<bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        var date = bookmarks[i].date;


        bookmarksResults.innerHTML+='<div class="container" style="padding:10px; background-color:rgb(230, 220, 220);flex:1 0 21%; margin:1%;"><h4>'+name+'</h4>'+
                                '<label>'+date+'</label>'+
                                '<a href="'+url+'" target="_blank" class="btn btn-default">Visit</a>'+
                                '<a href="#" onclick="deleteBookmark(\''+url+'\')" class="btn btn-primary">Delete</a>'+
                                
                                '</div>';
    }
}