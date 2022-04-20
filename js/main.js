import { cueTimer } from "./modules/cuepoints.js"; // by Troy Bennett 7-2010 (updated 12-2021)

// activate footer
//create vars
const footer = document.querySelector('#foothead');
const controls = document.querySelector('#controls');
const vid = document.querySelector('#vid');
let vidSubs = vid.textTracks;
let langSection = document.querySelector('#langSection');
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


    vidSubs.addEventListener('change', langLoop);

    // show the language HTML sections
    vid.addEventListener('play', () => {
        // show captions section if not already showing
        if(!langSection.classList.contains('show')) {
            langSection.classList.add('show');
        };

        langLoop();
    });

    // defining iFrame cues
    var myVidCues = [
        { seconds: 4, callback: subtitleAttention }
    ];

    //activates the cuepoints module
    cueTimer.setup('vid', myVidCues);

    //shortcut variables
    const selectList = document.querySelector('#video_select');

    // make the select list control what video to play
    selectList.addEventListener('change', (e) => {
        // create vars
        const target = e.target.value;
        const mp4 = document.getElementById('mp4');
        const webm = document.getElementById('webm');
        // create array of all #vid's tracks
        let sources = [mp4, webm, engSubs, chiCaps, sentences];
        // array loop to change src values
        for (let i = 0; i < sources.length; i++) {
            const idName = sources[i].id;
            // if source is video track
            if (sources[i].type) {
                sources[i].src = 'vid/' + target + '.' + idName;
            }
            else { // if source is text track
                sources[i].src = 'cap/' + target + '_' + idName + '.vtt';
            };
        };
        selectVideo(e, vid);
    });
};


/* adapted from Rex Barkdoll's "HTML5 Video with Chapters"
/ original: http://thenewcode.com/977/Create-Interactive-HTML5-Video-with-WebVTT-Chapters
/ updated source also referenced: https://codepen.io/rexbarkdoll/pen/XWMNwJM */
// place track's active cues in HTML captions section
function displayCaps(chosenCap){
    // get text track's active cues
    let chosenCue = chosenCap.activeCues[0].text;
    //place active cues in HTML captions section
    langSection.textContent = chosenCue;
    // when active cues change, replace with new cues
    chosenCap.addEventListener('cuechange', () => {
        chosenCue = chosenCap.activeCues[0].text;
        langSection.textContent = chosenCue;
    }, false);

/* TO REACTIVATE, MAKE changeCue FUNCTION WITH EVENT LISTENER F(X) ABOVE ^^

    // remove cuechange event when text track changes
    vidSubs.addEventListener('change', () => {
        chosenCap.removeEventListener('cuechange', changeCue, false);
        // logging caps to remove
        console.log('to remove EL: ', chosenCap);
    },
    // should run before other event listeners
    {capture: true}); */
};

function langLoop() {
    // loop through all text tracks
    for (let i = 0; i < vidSubs.length; i++) {
        // if active track, place active cues in HTML captions section
        if(vidSubs[i].mode == 'showing') {
            displayCaps(vidSubs[i]);
        };
    };
};

function changeCue() {
};


function displayCapts(vidSrc, trackLang) {
	if (trackLang){
        const textTrack = trackLang.track;
		textTrack.mode = 'hidden';
			for (var i = 0; i < textTrack.cues.length; ++i) {
                let chapterList = document.querySelector('#chapterOl');
				let cue = textTrack.cues[i];
				let chapterName = cue.text;
				let start = cue.startTime;
				const newChapter = document.createElement("li");
				newChapter.setAttribute('id', start);
				var chapterTitle = document.createTextNode(cue.text);
				newChapter.appendChild(chapterTitle);
				chapterList.appendChild(newChapter);
				newChapter.addEventListener("click",
				function() {
					vid.currentTime = this.id;
                    vid.play();
				},false);
			}
		textTrack.addEventListener("cuechange",
			function() {
				var currentLocation = this.activeCues[0].startTime;
				if (chapter = document.getElementById(currentLocation)) {
					var locations = [].slice.call(document.querySelectorAll("#chapters li"));
					for (var i = 0; i < locations.length; ++i) { 
						locations[i].classList.remove("current");
					}
					chapter.classList.add("current");
					locationList.style.top = "-"+chapter.parentNode.offsetTop+"px";
				}
			}, false);
	}
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
};

function activateDropdown(e) {
    //creating target var
    const target = e.target;
    // changing target & nav elem class lists
    target.classList.toggle('hide');
    target.nextElementSibling.classList.toggle('hidden');
};


/*function displayChapters(cap){
	if (cap){
        for (var i = 0; i < cap.cues.length; ++i) {
            let cue = cap.cues[i];
            //let chapterName = cue.text;
            let start = cue.startTime;
            const newChapter = document.createElement("li");
            newChapter.setAttribute('id', start);
            var chapterTitle = document.createTextNode(cue.text);
            newChapter.appendChild(chapterTitle);
            chapterList.appendChild(newChapter);
            newChapter.addEventListener("click",
            function() {
                vid.currentTime = this.id;
                vid.play();
            },false);
        }
    }
} */