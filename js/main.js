// activate footer
//create vars
const footer = document.querySelector('#foothead');
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
const langList = ['en', 'zh'];
const redubChapterTrack = document.querySelector('#redubChapters');





/* by Troy Bennett 7-2010 (updated 12-2021) */
import { cueTimer } from "./modules/cuepoints.js";

document.addEventListener("DOMContentLoaded", init);

/* //end by Troy Bennett */
function init() {

    // function to make each language section
        langList.forEach(function(lang) {
            let section = document.createElement('section');
            section.classList.add('lang');
            section.setAttribute('id', lang);
            docFrag.appendChild(section);
            console.log({vid});
        });
    
    let engLang = document.getElementById('en');
    let chiLang = document.getElementById('zh');

    // add chapter links
    displayCaps(redubChapterTrack);

    // show the language HTML sections
    vid.addEventListener('play', () => {
        if(!langSection.classList.contains('show')) {
            langSection.classList.add('show');
            //append langSection to document fragment
            langSection.appendChild(docFrag);
        };
    });
    
    // defining iFrame cues
    var myVidCues = [
        { seconds: 10, callback: subtitleAttention },
        { seconds: 35, callback: learnChinese },
        { seconds: 90, callback: eastBayChineseSchool },
        { seconds: 170, callback: smithEastAsianLang }
    ];

    //activates the cuepoints module
    cueTimer.setup("vid", myVidCues);

    //shortcut variables
    const selectList = document.querySelector("#video_select");
    const selectOpts = selectList.querySelectorAll('option');
    console.log(selectOpts);
    selectOpts.forEach(source => {
        let srcType = source.value;
        /*if(srcType = type) {
        };*/
        let supported = vid.canPlayType(srcType);
        console.log(srcType);
        if(supported === "") {
            source.hidden = "true";
        }

    }

    );

    // make the select list control what video format to play
    selectList.addEventListener("change", (e) => {
        selectMedia(e, vid);
    });
}


/* adapted from Rex Barkdoll's "HTML5 Video with Chapters"
/ original: http://thenewcode.com/977/Create-Interactive-HTML5-Video-with-WebVTT-Chapters
/ updated source also referenced: https://codepen.io/rexbarkdoll/pen/XWMNwJM */
// chapters links
function displayCaps(chapElem){
	if (chapElem){
        const textTrack = chapElem.track;
		if (textTrack.kind === "chapters"){
			textTrack.mode = 'hidden';
			for (var i = 0; i < textTrack.cues.length; ++i) {
                let chapterList = document.querySelector('#chapterOl');
				let cue = textTrack.cues[i];
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
            
		current.track.addEventListener("cuechange",
			function(e) {
                let chapterCue = e.target.activeCues[0].text;
                const langElem = document.getElementById('selected');
                langElem.textContent = chapterCue;
				//let chapterCue = e.target.activeCues[0].startTime;
                
				/*if (chapterCue = document.getElementById(currentLocation)) {
					var locations = [].slice.call(document.querySelectorAll("#chapters li"));
					for (var i = 0; i < locations.length; ++i) { 
						locations[i].classList.remove("current");
					}
					chapter.classList.add("current");
					locationList.style.top = "-"+chapter.parentNode.offsetTop+"px";
				}*/
			},false);
		}
	}
}

function displayCapts(vidSrc, trackLang){

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
}

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

function eastBayChineseSchool() { // about the Saturday school
    document.querySelector("#web").src =
        "http://www.ebchinese.org";
}

function activateDropdown(e) {
    //creating target var
    const target = e.target;
    // changing target & nav elem class lists
    target.classList.toggle('hide');
    target.nextElementSibling.classList.toggle('hidden');
}

function smithEastAsianLang() { // about my college classes
    document.querySelector("#web").src =
        "https://www.smith.edu/academics/east-asian-languages-cultures";
}