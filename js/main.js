// activate footer
//create vars
const footer = document.querySelector('#foothead');
const controls = document.querySelector('#controls');

// adding text track to HTML section
//create vars
const vid = document.querySelector('#vid');
let docFrag = new DocumentFragment();
let langSection = document.querySelector('#caps');
//differentiate between each section
const langElemList = ['selected', 'option'];

/* by Troy Bennett 7-2010 (updated 12-2021) */
import { cueTimer } from "./modules/cuepoints.js";

document.addEventListener("DOMContentLoaded", init);

/* //end by Troy Bennett */
function init() {
    // auto hiding footer
    footer.addEventListener('click', activateDropdown);
    // auto hiding controls
    /* NOT WORKING */controls.addEventListener('click', activateDropdown);

    // function to make each language section
        langElemList.forEach(function(lang) {
            let section = document.createElement('section');
            section.classList.add('lang');
            section.id = lang;
            docFrag.appendChild(section);
            console.log({section});
        });
            //append langSection to document fragment
            langSection.appendChild(docFrag);

    const selected = document.getElementById('#selected');
    const other = document.getElementById('#other');

    // show the language HTML sections
    vid.addEventListener('play', () => {
        if(!langSection.classList.contains('show')) {
            langSection.classList.add('show');
        };

        
        // add captions to 
        displayCaps(selected);
    });
    
    // defining iFrame cues
    var myVidCues = [
        { seconds: 4, callback: subtitleAttention }
    ];

    //activates the cuepoints module
    cueTimer.setup("vid", myVidCues);

    //shortcut variables
    const selectList = document.querySelector("#video_select");
    const selectOpts = selectList.querySelectorAll('OPTION');
    /*selectOpts.forEach(function(source) {
        let srcType = source.value;
        let supported = vid.canPlayType(srcType);
        if(supported === '') {
            source.hidden = true;
        }
    }, selectOpts); */

    // make the select list control what video format to play
    selectList.addEventListener("change", (e) => {
        selectMedia(e, vid);
    });
};


/* adapted from Rex Barkdoll's "HTML5 Video with Chapters"
/ original: http://thenewcode.com/977/Create-Interactive-HTML5-Video-with-WebVTT-Chapters
/ updated source also referenced: https://codepen.io/rexbarkdoll/pen/XWMNwJM */
// chapters links
function displayCaps(cap){
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
            
		cap.track.addEventListener("cuechange", switchCaps, false);
	}
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
            /*
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
			},false); 
		}*/
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

function switchCaps(e) {
    let chapterCue = e.target.activeCues[0].text;
    selected.textContent = chapterCue;
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