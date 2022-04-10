// activate footer
//create vars
const footer = document.querySelector('footer');

//append event listener to footer
footer.addEventListener('click', (e) => {
    //creating target var
    const target = e.target;
    // changing target & nav elem class lists
    target.classList.toggle('hide');
    target.nextElementSibling.classList.toggle('hidden');
});


// adding text track to HTML section
//create vars
const vid = document.getElementById('vid');
let docFrag = new DocumentFragment();
let langSection = document.querySelector('#caps');
//differentiate between each section
const langList = ['selected', 'other'];

// function to make each language section
langList.forEach(function(lang) {
    let section = document.createElement('section');
    section.classList.add('lang');
    section.id = lang;
    docFrag.appendChild(section);
});

vid.addEventListener('play', () => {
    if(!langSection.classList.contains('show')) {
        langSection.classList.add('show');
        //append langSection to document fragment
        langSection.appendChild(docFrag);
    };
});
