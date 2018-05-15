import { Injectable } from '@angular/core';
import 'webrtc-adapter';
import { JanusService } from './janus.service';

@Injectable()
export class WebrtcService {

	streams = {};

	constructor(private janusService: JanusService) {
	}

	getCamInput(container){
		console.log("adding input");
		let constraints = { audio : true, video : true };
		navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
			container.srcObject = stream;
			this.streams["camera"] = {};
			this.streams["camera"]["stream"] = stream;
		});
	}
	
	getScreenInput(container, constraints){
		navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
			container.srcObject = stream;
			this.streams["screen"] = {};
			this.streams["screen"]["stream"] = stream;
		});
	}

	start(room, options){
		for(let stream in this.streams){
			if(this.streams[stream]){
				this.createStream(stream, room, options);
			}
		}
	}

	createStream(stream, room, options){
		console.log("creating stream: "+stream);

		let pc:any = new RTCPeerConnection({});
		pc.addStream(this.streams[stream]["stream"]);
		this.streams[stream]["pc"] = pc;

		pc.createOffer({ offerToReceiveAudio: false, offerToReceiveVideo: false}).then((desc)=>{
			console.log("created session description");
			console.log(desc);
			pc.setLocalDescription(desc);
			this.janusService.publishFeed(desc.sdp, room, options, stream);
		}, (error) => {
			console.log("error creating session description");
			console.log(error);
		});

		pc.onicecandidate = (event) => {
			console.log(event);
			if(!pc || !event || !event.candidate) return;
			console.log("trickle");
			var candidate = event.candidate;
			this.janusService.trickleIce(candidate, true, {});
		};
	}

	listen(data, videoBox){
		let pc:any = new RTCPeerConnection({});
		pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
		pc.createAnswer().then((sessionDescription) => {
			pc.setLocalDescription(sessionDescription);
			console.log("sending answer");
			this.janusService.sendAnswer(sessionDescription, data["feed"]);
		}, { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } });

		pc.onicecandidate = (event) => {
			console.log(event);
			if(!pc || !event || !event.candidate) return;
			console.log("trickle");
			var candidate = event.candidate;
			this.janusService.trickleIce(candidate, false, data);
		};

		pc.onaddstream = (event) => {
			console.log("onaddstream");
			console.log(event);
			console.log(videoBox);
			if(!event) return;
			videoBox.srcObject = event.stream;
		}
	}

}
