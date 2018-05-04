import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

	private streams = [];

	constructor(private mediaService: MediaService, private route: ActivatedRoute) { 
	}

	ngOnInit(){
		this.route.params.subscribe(params => {
			let id = params["id"];
			this.mediaService.getStreams(id).then((streams)=> {
				this.streams = streams;
				if(streams.length>1){
					this.initVideoSyncronization();
				}
			});
		});
	}


	private initVideoSyncronization(){
		let first: any = document.getElementById("first");
		let second: any = document.getElementById("second");
		first.load();
		second.load();

		first.addEventListener("play", () => {
			second.play();
		});

		first.addEventListener("pause", () => {
			second.pause();
		});

		first.addEventListener("seeking", () => {
			second.currentTime = first.currentTime;
		});

		first.addEventListener("seeked", () => {
			second.currentTime = first.currentTime;
		})
	}

}
