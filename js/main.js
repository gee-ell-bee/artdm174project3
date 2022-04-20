import { cueTimer } from "./modules/cuepoints.js"; // by Troy Bennett 7-2010 (updated 12-2021)

//create vars
const footer = document.querySelector('footer');
const controls = document.querySelector('#controls');
const vid = document.querySelector('#vid');
//differentiate between caps
const engSubs = document.getElementById('eng_subs');
const chiCaps = document.getElementById('chtrad_caps');
const sentences = document.getElementById('sentences');

document.addEventListener('DOMContentLoaded', init);

function init() {
    // auto hiding footer
    footer.addEventListener('click', activateDropdown);
    // auto hiding controls
    controls.addEventListener('click', activateDropdown);
    
    // defining iFrame cues
    var myVidCues = [
        { seconds: 4, callback: subtitleAttention }
    ];

    //activates the cuepoints module
    cueTimer.setup('vid', myVidCues);

    //shortcut variables
    const selectList = document.querySelector('#video_select');
    const selectOpts = selectList.querySelectorAll('OPTION');

    // make the select list control what video format to play
    selectList.addEventListener('change', (e) => {
        const target = e.target.value;
        const mp4 = document.getElementById('mp4');
        const webm = document.getElementById('webm');
        let sources = [mp4, webm, engSubs, chiCaps, sentences];
        for (let i = 0; i < sources.length; i++) {
            const name = sources[i].id;
            if (sources[i].type) {
                sources[i].src = 'vid/' + target + '.' + name;
            }
            else {
                sources[i].src = 'cap/' + target + '_' + name + '.vtt';
            };
        };
        selectVideo(e, vid);
    });
};

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

function activateDropdown(e) {
    //creating target var
    const target = e.target;
    // changing target & nav elem class lists
    target.classList.toggle('hide');
    target.nextElementSibling.classList.toggle('hidden');
};