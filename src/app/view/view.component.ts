import { Component, OnInit } from '@angular/core';
import { JanusService } from '../services/janus.service';
import { WebrtcService } from '../services/webrtc.service';
import { ActivatedRoute } from '@angular/router';
import "webrtc-adapter";

@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
	videoRoom;
	feeds = {camera: null, screen:null};

	constructor(private webRtcService: WebrtcService, private janusService: JanusService, private route: ActivatedRoute) {
		this.initEvents();
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			setTimeout(() => {this.getFeeds(params["id"])}, 2000);
		});
	}

	private initEvents(){
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

	private invokeEvent(data){
		let ws = this.janusService.getSocket();
		console.log(data);
		switch(data["event"]){
			case "onoffer": this.onOffer(data);
				break;
			case "error": this.onError(data);
				break;
			default: console.log("unknown event");
				break;
		}
	}

	private onOffer(data){
		console.log("onoffer event");
		console.log(data);
		let container = this.getContainer(data["feed"]);
		console.log(container);
		this.webRtcService.listen(data, container);
	}

	private onError(data){
		console.log("error");
		console.log(data);
	}

	getFeeds(room){
		console.log("getting feeds");
		this.janusService.getFeeds(room);
	}

	private getContainer(feed){
		if(!this.feeds["camera"]){
			this.feeds["camera"] = feed;
			return document.getElementById("video_box");
		}
		this.feeds["screen"] = feed;
		return document.getElementById("facecam");
	}

	public switchInput(){
		console.log("switching input");
		let smallContainer:any = document.getElementById("facecam");
		let bigContainer:any = document.getElementById("video_box");
		let smallSrcObject = smallContainer.srcObject;
		let bigSrcObject = bigContainer.srcObject;
		smallContainer.srcObject = bigSrcObject;
		bigContainer.srcObject = smallSrcObject;
	}

}
