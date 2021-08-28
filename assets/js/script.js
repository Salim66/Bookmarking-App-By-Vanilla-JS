// grab everything we need
const body      = document.body;
const input     = document.querySelector('input[type=text]');
const overlay   = document.querySelector('.overlay');


// define all functions w'll need
function showFloater(){
    body.classList.add('show-floater');
}

function closeFloater(){
    if(body.classList.contains('show-floater')){
        body.classList.remove('show-floater');
    }
}


// add event linsteners
input.addEventListener('focus', showFloater);
overlay.addEventListener('click', closeFloater);