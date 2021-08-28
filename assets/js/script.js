// grab everything we need
const body      = document.body;
const input     = document.querySelector('input[type=text]');
const overlay   = document.querySelector('.overlay');

// bookmark
const bookmark_list     = document.querySelector('.bookmark-list');
const bookmark_form     = document.querySelector('.bookmark-form');
const bookmark_input    = document.querySelector('input[type=text]');


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
    
    let title           = bookmark_input.value;
    let bookmark        = document.createElement('a'); 
    bookmark.className  = 'bookmark';
    bookmark.innerHTML  = title;
    bookmark.href       = '#';
    bookmark.target     = '_blank';
    bookmark_list.appendChild(bookmark);

    bookmark_form.reset();
}


// add event linsteners
input.addEventListener('focusin', showFloater);
input.addEventListener('focusout', closeFloater);
overlay.addEventListener('click', closeFloater);
// bookmark
bookmark_form.addEventListener('submit', createBookmark);
