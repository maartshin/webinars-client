import { Component, OnInit } from '@angular/core';
import { JanusService } from '../services/janus.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	rooms = [{id:1, name:"name"}]

	constructor(private janusService: JanusService) {
		this.initEvents();
	}

	ngOnInit() {
		this.getRooms();
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

	private invokeEvent(data){
		let ws = this.janusService.getSocket();
		console.log(data);
		switch(data["event"]){
			case "rooms": this.addRooms(data);
				break;
			default: console.log("unknown event");
				break;
		}
	}

	private addRooms(data){
		this.rooms = data.rooms.list.map(room =>{
			return {id:room.room, name:room.description}
		});
		console.log(data);
	}

	private getRooms(){
		setTimeout(() => { this.janusService.getRooms() }, 1000);
	}

}
