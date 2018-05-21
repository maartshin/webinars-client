import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthService{

	constructor() { }

	public isAuthenticated(): boolean{
		return localStorage.getItem("token") != null;
	} 

}
