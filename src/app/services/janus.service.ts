import { Injectable } from '@angular/core';

@Injectable()
export class JanusService {

	private socket:string = this.createSocketAddress(); 
	private ws: WebSocket;

	private createSocketAddress(){
		let host = location.hostname;
		let port = "8080";
		let url = "wss://" + host + ":" + port + "/socket";
		console.log(url);
		return url;
	}

	public getSocket():WebSocket{
		return this.ws;
	}

	constructor() {
		this.initSocket();	
	}

	private initSocket(){
		this.ws = new WebSocket(this.socket, this.getToken());
	}

	private getToken(){
		return localStorage.getItem("token");
	}
  
	public connectToJanus(){
		let req = { event: "connect" };
		this.ws.send(JSON.stringify(req));
	}

	public createRoom(options){
		let req = { event: "new", options:options };
		
		return new Promise((resolve, reject) => {
			this.ws.send(JSON.stringify(req));
			setTimeout(resolve, 500);
		});
	}

	public publishFeed(sdp, room, options, stream){
		let req = { event: "publish", room: room, sdp: sdp, options:options, stream:stream};
		this.ws.send(JSON.stringify(req));
	}

	public getFeeds(room){
		let req = { event: "feeds", room: parseInt(room)};
		this.ws.send(JSON.stringify(req));
	}

	public trickleIce(candidate, publisher, data){
		let req = { event: "ice", candidate: candidate, publisher: publisher, feed: data["feed"]};
		this.ws.send(JSON.stringify(req));
	}

	public sendAnswer(sessionDescription, feed){
		var req = {event: "onanswer", sdp: sessionDescription.sdp, feed: feed};
		console.log("sending answer");
		this.ws.send(JSON.stringify(req));
	}

	public getRooms(){
		console.log("getting rooms");
		var req = { event: "rooms" };
		this.ws.send(JSON.stringify(req));
	}

	public record(){
		let req = { event:"record" };
		this.ws.send(JSON.stringify(req));
	}

	public stopRecording(){
		let req = { event: "stopstreaming"};
		this.ws.send(JSON.stringify(req));
	}
}
