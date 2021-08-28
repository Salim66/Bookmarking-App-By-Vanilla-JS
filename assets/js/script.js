// grab everything we need
const body      = document.body;
const input     = document.querySelector('input[type=text]');
const overlay   = document.querySelector('.overlay');

// bookmark
const bookmark_list     = document.querySelector('.bookmark-list');
const bookmark_form     = document.querySelector('.bookmark-form');
const bookmark_input    = document.querySelector('input[type=text]');
const bookmarks         = JSON.parse(localStorage.getItem('bookmarks')) || [];
//Open Graph Url
const api_url           = 'https://opengraph.io/api/1.1/site';
const api_id            = '43c91d41-fb09-497c-8bf7-3585b7ab7262';




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

    if(!bookmark_input.value){
        alert('We need to info');
        return;
    }

    const my_url = encodeURIComponent(bookmark_input.value);

    fetch(`${api_url}/${my_url}?app_id=${api_id}`)
    // fetch(api_url + '/' + my_url + '?app_id=' + api_id)
    .then(response => response.json())
    .then(data => {

        const bookmark  = {
            title : data.hybridGraph.title,
            image : data.hybridGraph.image,
            link  : data.hybridGraph.url,
        }
        bookmarks.push(bookmark);
        fillBookmarksList(bookmarks);
        storeBookmarks(bookmarks);

        bookmark_form.reset();
    })
    // .then(error => {
    //     alert("There was a problem getting info!");
    // })
    
    // console.table(bookmarks);
    
    // let title           = bookmark_input.value;
    // let bookmark        = document.createElement('a'); 
    // bookmark.className  = 'bookmark';
    // bookmark.innerHTML  = title;
    // bookmark.href       = '#';
    // bookmark.target     = '_blank';
    // bookmark_list.appendChild(bookmark);

    // bookmark_form.reset();
}

function fillBookmarksList(bookmarks = []){

    bookmark_list.innerHTML = bookmarks.map((bookmark, i) => {
        return `<a class="bookmark" target="_blank" href="${bookmark.link}" data-id="${i}">
                    <div class="img" style="background-image:url('${bookmark.image}')"></div>
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
    e.preventDefault();

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
// input.addEventListener('focusout', closeFloater);
overlay.addEventListener('click', closeFloater);
// bookmark
bookmark_form.addEventListener('submit', createBookmark);
bookmark_list.addEventListener('click', removeBookmark);
