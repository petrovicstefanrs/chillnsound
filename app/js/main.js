//DOM Elements with sound
var all_sounds = document.querySelectorAll('audio');

for (var i = 0; i < all_sounds.length; i++) {
	all_sounds[i].addEventListener("canplaythrough", loadedSounds, false);
	all_sounds[i].load();	// Force reload in case some audio files already loaded to avoid stuck loading screen
}

var loaded=0;
var percent=0;
function loadedSounds(e) {
	loaded++; // Increment loaded counter to check if all sounds can be played
	percent = Math.floor(100 * loaded / all_sounds.length); // Calculate percentage
	document.querySelector('.load_status').innerText = percent+"%"; // Set textual percentage to load status
	document.querySelector('.load_fill').style.width= percent+"%";

	//console.log(percent);
	if (loaded == all_sounds.length) {
		//alert('Loaded!');
		for (var i = 0; i < all_sounds.length; i++) {
			all_sounds[i].removeEventListener("canplaythrough", loadedSounds);
		}
		setTimeout(fadeOutLoader, 1000);
	}
}

function fadeOutLoader() {
	var fadeTarget = document.getElementById("load_screen");
	fadeTarget.style.opacity = 0;
	setTimeout(function(){	// Remove node
		document.querySelector('body').removeChild(fadeTarget);
	},2000);
}

// DOM Elements for clock control
var hours = document.querySelector('.hours');
var minutes = document.querySelector('.minutes');
var seconds = document.querySelector('.seconds');
var separator = document.querySelector('.separator');

// DOM Elements that control play/stop sounds
var play_btn = document.querySelectorAll('.play');							

// Adding listeners to every play/stop button
for (var i = 0; i < play_btn.length; i++) {									
	play_btn[i].addEventListener("click", playSound, false);
}

// DOM elements that controll sound volume
var volume_control=document.querySelectorAll('.volume_bar');		

// Adding listeners to every volume control slider		
for (var i = 0; i < volume_control.length; i++) {
	volume_control[i].addEventListener("input", volumeSound, false);		
	volume_control[i].style.opacity=0;
}

// DOM element that mutes and unmutes the page
var mute_btn = document.querySelector(".mute_btn a");
var is_muted = false;
mute_btn.addEventListener('click', muteDocument, false);

// DOM element that resets the sounds
var reset_btn = document.querySelector(".reset_btn a");
reset_btn.addEventListener('click', resetSounds, false);


// Controlling stoping and playing the sound
function playSound(e){
	if (is_muted) {
		muteDocument();
	}
	var targetElement = e.target || e.srcElement;
	var selectedSound = targetElement.parentElement.parentElement.querySelector('audio');
	var volumeControler = targetElement.parentElement.parentElement.querySelector('.volume_bar');
	var soundImage = targetElement.parentElement.parentElement.querySelector('img');

	if(selectedSound.paused){
		volumeControler.style.opacity=1;
		selectedSound.loop=true;
		if (volumeControler.value==0) {
			volumeControler.value=0.1;
		}
		selectedSound.volume = volumeControler.value;
		selectedSound.play();
		soundImage.classList.add("playing");	
	}
	else{
		volumeControler.style.opacity=0;
		selectedSound.pause();
		selectedSound.currentTime = 0;
		volumeControler.value=0;
		soundImage.classList.remove("playing");
	}
	console.log(event.target.type);
	console.log(selectedSound);
}

// Controlling volume of the sounds 
function volumeSound(e){
	if (is_muted) {
		muteDocument();
	}
	var targetElement = e.target || e.srcElement;
	var vol = targetElement.value;
	var selectedSound = targetElement.parentElement.querySelector('audio');
	selectedSound.volume = vol;
}

function clock() {
	var days = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
	var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
	const now = new Date();
	// if (now.getSeconds()==0 || now.getMinutes==0) {
	// 	separator.classList.add("blink");
	// }
	hours.innerText = now.getHours()<10?"0"+now.getHours():now.getHours();
	minutes.innerText = now.getMinutes()<10?"0"+now.getMinutes():now.getMinutes();
	// seconds.innerText = now.getSeconds()<10?"0"+now.getSeconds():now.getSeconds();
}
clock();
var interval = setInterval(clock,1000);

var playing_sounds = [];
function muteDocument() {
	if (!is_muted) {
		playing_sounds.length=0;
		is_muted = true;
		document.querySelector('.unmuted').style.display="none";
		document.querySelector('.muted').style.display="inline";
		var all_audio = document.querySelectorAll('audio');
		for (var i = 0; i < all_audio.length; i++) {
			if(!all_audio[i].paused){
				playing_sounds.push([all_audio[i],all_audio[i].volume]);
			}	
		}
		playing_sounds.forEach(function (sound) {
			sound[0].volume=0;
		});
	}
	else{
		is_muted = false;
		document.querySelector('.unmuted').style.display="inline";
		document.querySelector('.muted').style.display="none";
		playing_sounds.forEach(function (sound) {
			sound[0].volume=sound[1];
		});
	}
}

function resetSounds() {
	var all_audio = document.querySelectorAll('audio');
	for (var i = 0; i < all_audio.length; i++) {
		all_audio[i].pause();
		all_audio[i].currentTime = 0;
		all_audio[i].value=0;	
	}
	var all_play_btns = document.querySelectorAll('.start_btn img');
	for (var i = 0; i < all_play_btns.length; i++) {
		all_play_btns[i].classList.remove("playing");
	}
	var all_volume_control = document.querySelectorAll('.volume_bar');	
	for (var i = 0; i < all_volume_control.length; i++) {
		all_volume_control[i].value=0;
		all_volume_control[i].style.opacity=0;
	}
}
