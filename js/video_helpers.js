/** clipeo_helpers.js
 *  
 * Helper functions for controlling the clipeo element.
 * by Troy Bennett 7-2010 & Grey Larrain Bratt 2022
 *
 */


 function selectVideo(e, clip) 
 {
     clip.load();
     //playVideo(clip);
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

 function muteVideo(clip) 
 {
     clip.muted = true;
     if(document.getElementById("unmute").disabled = true) {
         document.getElementById("unmute").disabled = false;
     }
     document.getElementById("mute").disabled = true;
 }

 function unmuteVideo(clip) 
 {
     clip.muted = false;
     document.getElementById("mute").disabled = false;
     document.getElementById("unmute").disabled = true;
 }

 // rate can be a positive integer
 // .5 is half speed, 1 is normal speed,
 // 2 is double speed, etc.
 //Only Safari supports negative values (backwards)
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

