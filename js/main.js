// activate footer
//create vars
const footer = document.querySelector('footer');
const controls = document.querySelector('#controls');

//append event listener to footer
footer.addEventListener('click', activateDropdown);
// auto hiding controls
controls.addEventListener('click', activateDropdown);

// adding text track to HTML section
//create vars
const vid = document.querySelector('#vid');
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
    console.log({vid});
});

/* by Troy Bennett 7-2010 (updated 12-2021) */
import { cueTimer } from "./modules/cuepoints.js";

document.addEventListener("DOMContentLoaded", init);

/* //end by Troy Bennett */
function init() {
    // event listener to show the language HTML sections
    vid.addEventListener('play', () => {
        if(!langSection.classList.contains('show')) {
            langSection.classList.add('show');
            //append langSection to document fragment
            langSection.appendChild(docFrag);
        };
    });
    
    var myVidCues = [
        { seconds: 10, callback: subtitleAttention },
        { seconds: 35, callback: learnChinese },
        { seconds: 50, callback: jjLin }
    ];

    //activates the cuepoints module
    cueTimer.setup("vid", myVidCues);

    //shortcut variables
    const selectList = document.querySelector("#video_select");

    // make the select list control what video format to play
    selectList.addEventListener("change", (e) => {
        selectMedia(e, vid);
    });
}

    //vid event listener to pause when seeking
    vid.addEventListener('seeking', (e) => {
        vid.pause();
    });

function subtitleAttention() { // pop-up to let user know they can change the sub/captions language from English to Chinese
    let pop = document.querySelector(".pop");

    // changes to pop
    //changing style & adding reveal animation
    pop.classList.add("styles");
    //changing contents
    pop.innerHTML = "<p>Prefer Chinese subtitles?</p>";
    
    // hiding
    pop.classList.toggle("hide");
    setTimeout(() => {
        pop.classList.toggle("hide");
    }, 2000);
    // remove styles
    setTimeout(() => {
        pop.classList.toggle("styles");
    }, 7000);
}

function learnChinese() { //links to where to learn chinese
    document.querySelector("#web").src =
        "https://www.cmuse.org/learn-chinese-lessons-online/";
}

function jjLin() { // about JJ Lin
    document.querySelector("#web").src =
        "https://en.wikipedia.org/wiki/JJ_Lin";
}

function activateDropdown(e) {
    //creating target var
    const target = e.target;
    // changing target & nav elem class lists
    target.classList.toggle('hide');
    target.nextElementSibling.classList.toggle('hidden');
}
