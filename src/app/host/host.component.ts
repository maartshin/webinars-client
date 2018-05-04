import { Component, OnInit } from '@angular/core';
import { WebrtcService } from '../services/webrtc.service';
import { JanusService } from '../services/janus.service';
import "webrtc-adapter";

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css']
})
export class HostComponent implements OnInit {

	private room;
	private recording:boolean = false;
	public selectedSource:string;
	public sources = [{label: "screen", value: "screen"},  {label: "window", value: "window"}];
	public live:boolean;
	public recordRoom:boolean;
	public description:string;

	constructor(private webRtcService:WebrtcService, private janusService: JanusService) {
		this.initEvents();
	}

	ngOnInit() {
	}

	addWebCam(){
		let container = document.getElementById("camera");
		this.webRtcService.getCamInput(container);
	}

	shareScreen(){
		console.log(this.selectedSource);
		let container = document.getElementById("screen");
		this.webRtcService.getScreenInput(container, { video: { mediaSource: this.selectedSource }, audio:true }); 
	}

	start(){
		if(this.recording && this.recordRoom){
			this.janusService.stopRecording();
			return;
		}

		this.createRoom().then(() => {
			this.webRtcService.start(this.room, { record: this.recordRoom });
			this.recording = true;
		});
	}


	createRoom(){
		let options = {
			publish: this.live ? true : false,
			record: this.recordRoom ? true : false,
			description: this.description
		}
		console.log(options);
		return this.janusService.createRoom(options);
	}

	initEvents(){
		let ws = this.janusService.getSocket();
		ws.onmessage = (message) => {
			let data;
			try{
                data = JSON.parse(message.data);
            }catch(e){
				//ws.send(JSON.stringify({ error: "Not a json object." }));
				console.log("Not a json object");
                return;
			}
			this.invokeEvent(data);
		}
	}

	invokeEvent(data){
		let ws = this.janusService.getSocket();
		switch(data["event"]){
			case "created": this.roomCreated(data);
				break;
			case "onanswer": this.getAnswer(data);
				break;
		}
	}

	roomCreated(data){
		console.log(data);
		console.log("created a room:" + data.room);
		this.room = data.room;
	}

	getAnswer(data){
		console.log("answer received");
		console.log(data);
		let pc = this.webRtcService.streams[data["stream"]]["pc"];
		pc.setRemoteDescription(new RTCSessionDescription({sdp: data.sdp, type: "answer"}));
	}

}