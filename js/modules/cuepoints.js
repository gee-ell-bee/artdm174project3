'use strict'

/**
* cuepoints.js
*
* Inspired by Bruce Lawson's HTML5 Captions Hack
* written using jQuery and formatted as an IIFE.
* by Troy Bennett
* 7-2010 (revised 12-2021 to be vanilla JS)
*
*
*/


const CueTimer = () => {

	let previous_cue;	// flag to prevent callback being triggered more than once.

	const init = function(vidId, cuesArray) {

		//add the event listener to the video element
		document.getElementById(vidId).addEventListener('timeupdate', (e) => 
		{
			const video = e.target || window.srcElement;
			let now = Math.floor(video.currentTime);

			// loop through all cuepoints looking for a current cue
			for (let i in cuesArray) 
			{
				const seconds = cuesArray[i].seconds;
				const mycallback = cuesArray[i].callback;
				
				// is now within the times specified for this cue?
				if (seconds == now) 
				{
					if(previous_cue == now)
					{
						continue;
					} 
					else
					{
						mycallback(e);
						previous_cue = now;
						break;
					}
				}
			}
		});
	}
	
	return {setup: init};
	
}

export const cueTimer = CueTimer();
