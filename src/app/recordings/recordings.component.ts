import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';

@Component({
	selector: 'app-recordings',
	templateUrl: './recordings.component.html',
	styleUrls: ['./recordings.component.css']
})
export class RecordingsComponent implements OnInit {

	public recordings = []; 

	constructor(private mediaService: MediaService) { }

	ngOnInit() {
		this.mediaService.getRecordings().then(recordings =>{
			this.recordings = recordings;
		});
	}

}
