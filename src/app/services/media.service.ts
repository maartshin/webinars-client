import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

@Injectable()
export class MediaService {

	constructor(private http: Http) { }

	public getRecordings(): Promise<any>{
		return this.http
			.get("/api/recordings")
			.toPromise()
			.then(res => {
				return res.json();
			});
	}

	public getStreams(roomId): Promise<any>{
		return this.http
			.get("/api/streams/"+roomId)
			.toPromise()
			.then(res => {
				return res.json();
			})
	}
}
