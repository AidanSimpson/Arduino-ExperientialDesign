// JavaScript Document
(function() {

//Variables
var songImage = document.querySelector("#songCover");

var artistTitle = document.querySelector("#artistTitle");
var songTitle = document.querySelector("#songTitle");
var albumInfo = document.querySelector("#albumTitle");
var artistInfo = document.querySelector("#artistInfo");

// var refreshButton = document.querySelector("#refreshBtn");

var canadianAudio = document.querySelector("#allAudioFiles");
var playImage = document.querySelector("#playButImage");
var curtimetext = document.querySelector("#curtimetext");
var durtimetext = document.querySelector("#durtimetext");

var detectedImage = document.querySelector("#detectImg");

// var forwardSong = document.querySelector("#forwardButton");
// var backSong = document.querySelector("#backButton");
var flag = 0; //Keeps track of playing or paused
var titleFlag = 0; //Which title is selected
var songFlag = 0;
var albumFlag = 0;
var artistFlag = 0;
var count =0 ;
var showHide = document.getElementById('showHide');

var pushDetector = zig.controls.PushDetector();
var swipeDetector = zig.controls.SwipeDetector();
var waveDetector = zig.controls.WaveDetector();
var detected = document.querySelector("#detected");
var detect = document.querySelector("#detect");
var cover = document.querySelectorAll('#songCover');
var content = document.querySelectorAll('#mainContent');
var bar = document.querySelectorAll('.bottomBar');
var bandInfo = {
	bandName : "My Playlist/Various",

	artistName : ["Neil Young","Joni Mitchell","The Guess Who","Gordon Lightfoot","Gordon Downie","Feist","Drake","Leonard Cohen","Bruce Cockburn","Alanis Morissette"],
	trackName : ["Rockin' in the Free World","A Case of You","Undun","The Wreck of the Edmund Fitzgerald","Nautical Disaster","The Bad in Each Other","Headlines","Hallelujah","Lovers In A Dangerous Time","Ironic"],
	albumName : ["Freedom","Blue","Canned Wheat","Summertime Dream","Day for Night","Metals","Take Care","Various Positions","Play Everywhere for Everyone","Jagged Little Pill"],
	artistDesc : [  
				"Toronto-born Neil Young has been nicknamed the Godfather of Grunge due to his gritty guitar work. His signature tenor singing voice, deeply personal lyrics, and famed emotional outbursts have immortalized his iconic image.",
				"Alberta-born Joni Mitchell is a singer-songwriter and painter who is known as one of the most important female recording artists of the 20th century, and one of the best songwriters in the world. Her songs reflect social and environmental ideals and her feelings about romance, happiness, and confusion.",
				"The Guess Who's masterful approach to songwriting involved winning the crowd over with memorable pop hooks while sneaking in a little something extra. A simple song would deepen with the flavour of jazzy richness such as in Undun.",
				"Known to many as Canada's greatest songwriter, Lightfoot is internationally known as a folk-rock legend and has been credited in helping define the folk-pop sound of the 60's and 70's. His Sinking of the Edmund Fitzgerald is based off the real event and is considered by himself to be his finest work.",
				"Kingston-born Gord Downie is the lead singer of The Tragically Hip, winners of numerous accolades and critical/commercial acclaim. On May 2016, he was diagnosed with terminal brain cancer, after which the band undertook a tour of Canada supporting their thirteenth album Man Machine Poem, with the band stating that future recording and performing will depend on Downie's health.",
				"Hailing from Nova Scotia, Leslie Feist is an indie pop singer-songwriter that creates songs that have the counterintuitive and freeform structure of folk music. Commercially and critically successful, she's gained a reputation in the industry for her innovative style.",
				"Initially gaining recognition as a teen actor, Toronto-born Drake's music has become internationally iconic. With very literal lyrics, he crafts a dialogue that can transform the most literal writing into something interesting. Hotline Bling is an example of the way Drake captures people's attention with lines the last forever, becoming iconic.",
				"Cohen's celebrated music career explored religion, politics, isolation, and the intimate nature of humanity. Covered by countless artists since it's inception, Leonard Cohen's original Hallelujah is considered by many to be an iconic masterpiece not just in Canada, but internationally.",
				"Cockburn's career spans over 40 years with twenty records receiving Canadian gold or platinum certification. As an artist, his song styles range from fold to jazz influenced rock and his lyrics reflect his passion for human rights, environmental issues, politics, and spirituality.",
				"Ottawa-born Alanis Morisette is known for her powerful and emotive mezzo-soprano voice and has been dubbed the Queen of Alt-Rock Angst by Rolling Stone. Jagged Little Pill is her iconic and most critically celebrated album."
				],

	musicTrack : ["Track_1","Track_2","Track_3","Track_4","Track_5","Track_6","Track_7","Track_8","Track_9","Track_10"],
	imageCover : ["neil_young_1","joni_2","guesswho_3","gordon_lightfoot_4","gord_downie_5","feist_6","drake_7","cohen_8","bruce_cockburn_9","alanis_10"]
};

//Functions

//Play and Pause Buttons

function stAudio() {
	if(flag===0) {
		canadianAudio.play();
		playImage.src="images/pauseButton.svg";
		flag=1;
	}else{
		canadianAudio.pause();
		playImage.src="images/playButton.svg";
		flag=0;
	}
}

function checkPlay() {
	console.log("Music PLaying");
}

//Seek Slider
function seektimeupdate() {
	var nt = canadianAudio.currentTime * (100 / canadianAudio.duration);
	var curmins = Math.floor(canadianAudio.currentTime / 60);
	var cursecs = Math.floor(canadianAudio.currentTime - curmins * 60);
	var durmins = Math.floor(canadianAudio.duration / 60);
	var dursecs = Math.floor(canadianAudio.duration - durmins * 60);
	if(cursecs < 10) {
		cursecs = "0" + cursecs;
	}
	if(dursecs < 10) {
		dursecs = "0" + dursecs;
	}
	if(curmins < 10) {
		curmins = "0" + curmins;
	}
	if(durmins < 10) {
		durmins = "0" + durmins;
	}
	curtimetext.innerHTML = curmins + ":" + cursecs;
	durtimetext.innerHTML = durmins + ":" +dursecs;
}

//This makes it so it plays through all songs in Array rather than stopping after one
function checkTime(){
	var percent = Math.floor((100/canadianAudio.duration) * canadianAudio.currentTime);
	console.log(percent);
	if(percent >= 100){
		checkTrack();
	}
}

//Forward Button
function checkTrack(){
	if(count == (bandInfo.musicTrack.length - 1)){
		count = 0;
		titleFlag = 0;
		songFlag = 0;
		albumFlag = 0;
		artistFlag = 0;
	}else {
	    count++;
	    titleFlag++;
	    songFlag++;
	    albumFlag++;
	    artistFlag++;
	}

	TweenMax.staggerFrom(cover, 1,{opacity: 0, delay: 0.001});
	TweenMax.staggerFrom(content, 1,{opacity: 0, delay: 0.001});
	canadianAudio.src = "audio/"+bandInfo.musicTrack[count]+".mp3";
    artistTitle.innerHTML = bandInfo.artistName[titleFlag];
    songTitle.innerHTML = bandInfo.trackName[titleFlag];
    albumInfo.innerHTML = bandInfo.albumName[albumFlag];
    artistInfo.innerHTML = bandInfo.artistDesc[artistFlag];
	songImage.src = "images/"+bandInfo.imageCover[count]+".jpg";
	playImage.src = "images/pauseButton.svg";
    canadianAudio.play();
}	

//Back Button
function backTrack() {
	if(count == (bandInfo.musicTrack.length - 10)) {
		count = 9;
		titleFlag = 9;
		songFlag = 9;
		albumFlag = 9;
		artistFlag = 9;
	}else{
		count--;
		titleFlag--;
		songFlag --;
		albumFlag--;
		artistFlag--;
	}
	
	TweenMax.staggerFrom(cover, 1,{opacity: 0, delay: 0.001});
	TweenMax.staggerFrom(content, 1,{opacity: 0, delay: 0.001});
	canadianAudio.src = "audio/"+bandInfo.musicTrack[count]+".mp3";
	artistTitle.innerHTML = bandInfo.artistName[titleFlag];
	songTitle.innerHTML = bandInfo.trackName[songFlag];
    albumInfo.innerHTML = bandInfo.albumName[albumFlag];
    artistInfo.innerHTML = bandInfo.artistDesc[artistFlag];
	songImage.src = "images/"+bandInfo.imageCover[count]+".jpg";
	playImage.src="images/pauseButton.svg";
	canadianAudio.play();
}

function showHideControls() {
	var allControlsBtn = document.getElementById('audioControls');
	if (allControlsBtn.style.display !== 'none') {
	showHide.innerHTML = "Show Controls";
	allControlsBtn.style.display = 'none';
	} else {
	allControlsBtn.style.display = 'block';
	showHide.innerHTML = "Hide Controls";
	}
};

function refreshPage(){
	window.location.reload(true);
}

setTimeout(delay, 3000);

function delay() {
   //do whatever you want here
   console.log('delayed');
}

swipeDetector.addEventListener('swiperight', function() {
	backTrack()
	console.log(backTrack);
});

swipeDetector.addEventListener('swipeleft', function() {
	checkTrack()
	console.log(checkTrack);
});

swipeDetector.addEventListener('swipeup', function() {
	refreshPage()
	console.log(refreshPage);
});

swipeDetector.addEventListener('swiperelease', function() {
	delay()
	console.log(delay);
});

pushDetector.addEventListener('push', function(pd) {
	console.log('PushDetector: Push');
	stAudio();
});
pushDetector.addEventListener('release', function(pd) {
	console.log('PushDetector: Release');
});

//swipeDetector.addEventListener('swipeup', function(pd) {
 //location.reload(forceGet)
 //console.log('waved');
//});

zig.singleUserSession.addEventListener('sessionstart', function(focusPosition) {
  detect.style.backgroundColor = "green";
  detected.innerHTML = 'Detected: Yes';
  detectedImage.src="images/check.svg";
  console.log('sessionstart');
});

zig.singleUserSession.addEventListener('sessionend', function(focusPosition) {
  detect.style.backgroundColor = "red";
  detected.innerHTML = 'Detected: No';
  detectedImage.src="images/cross.svg";
  console.log('sessionend');
});

// pass the swipeDetector instance
zig.singleUserSession.addListener(swipeDetector);
zig.singleUserSession.addListener(pushDetector);
zig.singleUserSession.addListener(waveDetector);

//Listeners
canadianAudio.addEventListener("playing", checkPlay, false);
canadianAudio.addEventListener("timeupdate", checkTime, false);
canadianAudio.addEventListener("timeupdate", seektimeupdate, false);
canadianAudio.addEventListener("onended", checkTrack, false);
showHide.addEventListener("click", showHideControls, false);

})();