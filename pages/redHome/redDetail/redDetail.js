Page({
  data: {
       status: "inited",
    time: "0",
    video: {
	src: "http://36.26.84.183:8094/video/blny.mp4",
	showAllControls: false,
	showPlayButton: false,
	showCenterButton: true,
	showFullScreenButton: true,
	isLooping: false,
	muteWhenPlaying: false,
	initTime: 0,
	objectFit: "contain",
	autoPlay: false,
	directionWhenFullScreen: 90,
	mobilenetHintType: 2,
 },},

    onPlay(e) {
	console.log('onPlay');
},

    onPause(e) {
	console.log('onPause');
},

    onEnded(e) {
	console.log('onEnded');
},

    onPlayError(e) {
	console.log('onPlayError, e=' + JSON.stringify(e));
},

    onTimeUpdate(e) {
	console.log('onTimeUpdate:', e.detail.currentTime);
}, 	
});
