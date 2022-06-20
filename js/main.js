//get inputs
var bookmarkName = document.getElementById('bookmarkName');
var bookmarkURL = document.getElementById('bookMarkURL');
//Get the alerts
var alert1 = document.getElementById('alert1');
var alert2 = document.getElementById('alert2');

function errName(msg, hide = false){
  if(hide){
    alert1.innerHTML = ''
  }else{
    alert1.innerHTML = `<div class="alert alert-danger" role="alert">${msg}<div>`
  }
}
function errUrl(msg, hide = false){
  if(hide){
    alert2.innerHTML = ''
  }else{
    alert2.innerHTML = `<div class="alert alert-danger" role="alert">${msg}<div>`
  }
}
//Get Container for Bookmarks
var bookmarksContainer = document.getElementById('bookmarksContainer');
//control btn 
var btnControl =  document.getElementById('control')

//Handle Events
bookmarkName.addEventListener('input', function(e){
  vilidateName();
  if(bookmarkName.value == ''){
    errName('', true);
    bookmarkName.classList.remove('is-invalid');
  }
  else if(bookmarkName.value[0] != bookmarkName.value[0].toUpperCase()){
    errName('The First litter should be upper case')
  }else if(bookmarkName.value.length < 3){
    errName('The Site Name should be 4 at less or more')
  }else if(bookmarkName.value.length > 29){
    errName('The site name can\'t be more than 30 characters')
  }else{
    errName('', true);
  }
 
})
bookMarkURL.addEventListener('input', function(e){
  vilidateUrl();
  if(bookmarkURL.value == ''){
    bookmarkURL.classList.remove('is-invalid');
    errUrl('', true)
  }else if(!vilidateUrl()){
    errUrl('Please Entr Correct URL Address');
  }
  else{
    errUrl('', true);
  }
})
btnControl.addEventListener('click', function(){
  if(btnControl.dataset.type == 'create'){
    createBookmarks();
  }else{
    update(btnControl.dataset.index)
  }
})



//Bookmarks container
var bookmarks;
if (localStorage.getItem('bookmarks') == null){
  bookmarks = [];
}else{
  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  display();
}

//BookMarks FUNCTIONs
//Create Function
function createBookmarks(){
    if(vilidateName() && vilidateUrl()){
      if(bookmarkName.value === ""){
        errName('Name is required');
      }else if(bookMarkURL.value === ""){
        errUrl('Url is required');
      }
      else{
        errName('', true);
        errUrl('', true);
        var bookmark = {
          siteName: bookmarkName.value,
          siteUrl: bookMarkURL.value
        }
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
      }
        display()
        clear();
    }
}
//Clear Function 
function clear(){
    bookmarkName.value  = "";
    bookmarkURL.value = "";
}
//Display Function
function display(){
    trs = "";
    for(var i = 0; i < bookmarks.length; i++){
       trs += `
       <div class="container bg-custome py-5 mb-5">
        <div class="row">
          <div class="col-md-6">
            <h3>${bookmarks[i].siteName}</h3>
          </div>
          <div class="col-md-6 text-end">
            <a href='${bookmarks[i].siteUrl}' target="_blank" class="btn btn-outline-primary me-3">Vist</a>
            <button class="btn btn-outline-success me-3" id='btnEdit' data-index=${i}>Edit</button>
            <button class="btn btn-outline-danger" id='btnDelete' data-index=${i}>Delete</button>
          </div>
        </div>
      </div>
      `
    }
    bookmarksContainer.innerHTML = trs;
}
// //Update function
bookmarksContainer.addEventListener('click', function(e){
  if(e.target.id == 'btnDelete'){
    removeBookmark(e.target.dataset.index)
  }else if(e.target.id == 'btnEdit'){
    getProduct(e.target.dataset.index)
  }
})

function getProduct(index){
  
    btnControl.innerHTML = `update`
    btnControl.dataset.type = 'update'
    btnControl.dataset.index = index

    bookmarkName.value  = bookmarks[index].siteName;
    bookMarkURL.value = bookmarks[index].siteUrl;
}
function update(index){
  console.log(index);
    bookmarks[index] = {
      siteName: bookmarkName.value,
      siteUrl: bookMarkURL.value
    };
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    clear();
    btnControl.innerHTML = `create`
    btnControl.dataset.type = 'create'
    btnControl.dataset.index = ''
    display();
}
//Dlete Function
function removeBookmark(index){
  bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    display();
}

function vilidateName(){
  var regExp = /^[A-Z][\w\s]{3,30}$/
  if(regExp.test(bookmarkName.value)){
    bookmarkName.classList.replace('is-invalid', 'is-valid');
    return true
  }else{
    bookmarkName.classList.add('is-invalid');
    return false
  }
}
function vilidateUrl(){
  var regExp = /^https?:\/\/www\.[\w\-_$]+\.[A-Za-z]{2,5}$/
  if(regExp.test(bookmarkURL.value)){
    bookmarkURL.classList.replace('is-invalid', 'is-valid');
    return true
  }else{
    bookmarkURL.classList.add('is-invalid');
    return false
  }
}