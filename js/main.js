document.getElementById('form1').addEventListener('submit',saveBookmark);


function saveBookmark(e){
var sitename=document.getElementById('sitename').value;
var siteurl=document.getElementById('siteurl').value;

if(!valid(sitename,siteurl) ){return false;}


var bookmark = {
name:sitename,
url:siteurl
}



//localStorage.setItem('test','Hi');
//console.log(localStorage.getItem('test'));
//localStorage.removeItem('test');
//console.log(localStorage.getItem('test'));

if(localStorage.getItem('bookmarks')=== null){

var bookmarks=[];
bookmarks.push(bookmark);
localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

}else{

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}

document.getElementById('form1').reset();

fetchBookmarks();
e.preventDefault();

}



function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}

function deleteBookmark(url)
{
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
for(i=0;i<bookmarks.length;i++){
  if(bookmarks[i].url==url){
    bookmarks.splice(i,1);
  }
}
localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
fetchBookmarks();
}


function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
console.log(bookmarks);

var bookmarkresults=document.getElementById('bookmarkresults');
bookmarkresults.innerHTML="";                                              //<div class="card bg-light text-dark card-body">Card test</div>
for(var i=0; i< bookmarks.length ; i++){

var name=bookmarks[i].name;
var url=bookmarks[i].url;

bookmarkresults.innerHTML+= '<div class="card bg-light text-dark card-body">'+
                          '<h3>'+name+'&nbsp'+
                           '<a class="btn btn-dark"  target="_blank"   href=" '+addhttp(url)+' "> visit</a>'+
                         ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                          '</h3>'+
                          '</div>';

}

}




function valid(sitename,siteurl){

if(!sitename|| !siteurl){

  alert('please enter details');
  return false;
}
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if(!siteurl.match(regex)){

alert('enter valid url');
return false;

}
return true;
}
