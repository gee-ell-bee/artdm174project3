/** clipeo_helpers.js
 *  
 * Helper functions for controlling the clipeo element.
 * by Troy Bennett 7-2010
 *
 */


 function selectVideo(e, clip) 
 {
     clip.load();
 }

 function playVideo(clip) 
 {
     clip.play();
 }
 
 function pauseVideo(clip) 
 {
     clip.pause();
 }

 function stopVideo(clip) {
     clip.pause();
     clip.currentTime = 0;
     clip.play();
 }

 function seekVideo(clip, position) 
 {
     if(!position) position = 0;
     clip.currentTime = position;
     clip.play();
 }
 
 function playRate(clip, rate) 
 {
     if(clip.playbackRate != rate) {
         clip.playbackRate = rate;
     }
     else {
         clip.playbackRate = 1;
     }
     if(clip.paused = "true") {
         clip.play();
     }
 }

