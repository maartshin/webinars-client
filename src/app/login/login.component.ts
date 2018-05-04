import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public email:string;
	public password:string;

	constructor(private userService: UserService) { }

	ngOnInit() {
	}

	login(){
		this.userService.login(this.email, this.password);
	}

}
