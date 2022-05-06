import { cueTimer } from "./modules/cuepoints.js"; // by Troy Bennett 7-2010 (updated 12-2021)

//create vars
const footer = document.querySelector('footer');
const vid = document.querySelector('#vid');
//differentiate between caps
const engSubs = document.getElementById('eng_subs');
const chiCaps = document.getElementById('chtrad_caps');
const sentences = document.getElementById('sentences');

document.addEventListener('DOMContentLoaded', init);

function init() {

    // auto hiding footer
    footer.addEventListener('click', activateDropdown);
    footer.addEventListener('onKeyDown', activateDropdown);
    
    // defining iFrame cues
    var myVidCues = [
        { seconds: 4, callback: subtitleAttention }
    ];

    //activates the cuepoints module
    cueTimer.setup('vid', myVidCues);

    //shortcut variables
    const selectList = document.querySelector('#video_select');

    // make the select list control what video format to play
    selectList.addEventListener('change', (e) => {
        const target = e.target.value;
        console.log(target);
        const mp4 = document.getElementById('mp4');
        const webm = document.getElementById('webm');
        let sources = [mp4, webm, engSubs, chiCaps, sentences];
        if (target == 'orig' || target == 'redubbed') {
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
        };
    });
};

function subtitleAttention() { // pop-up to let user know they can change the sub/captions language from English to Chinese
    let pop = document.querySelector('.pop');

    // changes to pop
    // add styles & reveal animation **b/c: if natively placed, popup will load and then unload when page starts
    pop.classList.add('styles');
    //changing contents
    pop.innerHTML = '<p>Prefer Chinese subtitles?</p>';
    
    // hiding pop after 2 seconds
    setTimeout(() => {
        pop.classList.toggle('hider');
    }, 2000);
}

function activateDropdown(e) { // toggle display of footer content
    // identify karet
    const carrot = document.querySelector('.carrot').classList;
    // do not enact code if keyDown not the Enter or Space key
    if (e instanceof KeyboardEvent && e.key !== 'Enter' && e.key !== ' ') {
        return;
    } else { // if Enter or Space key, or if e = click, then toggle display of footer
        //creating target var
        const activator = e.target;
        const target = activator.nextElementSibling.classList;
        if (target.contains('hidden')) {
            // changing nav elem class lists
            target.remove('hidden');
            target.toggle('show');
            carrot.toggle('rotate');
        } else if (target.contains('show')) {
            target.toggle('show');
            target.toggle('hider');
            carrot.toggle('rotate');
        } else if (target.contains('hider')) {
            target.toggle('show');
            target.toggle('hider');
            carrot.toggle('rotate');
        }
    };
};