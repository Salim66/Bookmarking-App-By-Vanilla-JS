// grab everything we need
const body      = document.body;
const input     = document.querySelector('input[type=text]');
const overlay   = document.querySelector('.overlay');

// bookmark
const bookmark_list     = document.querySelector('.bookmark-list');
const bookmark_form     = document.querySelector('.bookmark-form');
const bookmark_input    = document.querySelector('input[type=text]');
const bookmarks         = JSON.parse(localStorage.getItem('bookmarks')) || [];

fillBookmarksList(bookmarks);
// console.table(bookmarks);

// define all functions w'll need
function showFloater(){
    body.classList.add('show-floater');
}

function closeFloater(){
    if(body.classList.contains('show-floater')){
        body.classList.remove('show-floater');
    }
}

// bookmark
function createBookmark(e){
    e.preventDefault();

    // add a new bookmark to the bookmark
    const title     = bookmark_input.value;
    const bookmark  = {
        title : title
    }
    bookmarks.push(bookmark);
    fillBookmarksList(bookmarks);
    storeBookmarks(bookmarks);
    // console.table(bookmarks);
    
    // let title           = bookmark_input.value;
    // let bookmark        = document.createElement('a'); 
    // bookmark.className  = 'bookmark';
    // bookmark.innerHTML  = title;
    // bookmark.href       = '#';
    // bookmark.target     = '_blank';
    // bookmark_list.appendChild(bookmark);

    bookmark_form.reset();
}

function fillBookmarksList(bookmarks = []){

    bookmark_list.innerHTML = bookmarks.map((bookmark, i) => {
        return `<a class="bookmark" href="#" data-id="${i}">
                    <div class="img"></div>
                    <div class="title">${bookmark.title}</div>
                    <span class="glyphicon glyphicon-remove"></span>
                </a>`;
    }).join('');


    // let bookmarksHTML = '';
    // for(let i = 0; i < bookmarks.length; i++){
    //     bookmarksHTML += `<a class="bookmark" href="#">${bookmarks[i].title}</a>`;
    // }
    // console.log(bookmarksHTML);
    // bookmark_list.innerHTML = bookmarksHTML;
}

function storeBookmarks(bookmarks = []){
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function removeBookmark(e){
    if(!e.target.matches('.glyphicon-remove')) return ;

    // find the index
    // remove from the bookmark using splice
    // fill the list 
    // store back to localhost
    let index = e.target.parentNode.dataset.id;
    bookmarks.splice(index, 1);
    fillBookmarksList(bookmarks);
    storeBookmarks(bookmarks);
}


// add event linsteners
input.addEventListener('focusin', showFloater);
input.addEventListener('focusout', closeFloater);
overlay.addEventListener('click', closeFloater);
// bookmark
bookmark_form.addEventListener('submit', createBookmark);
bookmark_list.addEventListener('click', removeBookmark);
