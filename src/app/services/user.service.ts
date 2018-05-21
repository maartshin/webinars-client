import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

@Injectable()
export class UserService {

	constructor(private http: Http) { }

	public login(email, password){
		console.log(email + " and " + password);
		let user = {
			email: email,
			password: password
		};

		return this.http.post("/api/user/login", user).toPromise();
	}

	public register(data): Promise<any>{
		return this.http.post("/api/user/register", data).toPromise();
	}

	public logOut(){
		console.log("Logging out");
		localStorage.removeItem("token");
	}

}
