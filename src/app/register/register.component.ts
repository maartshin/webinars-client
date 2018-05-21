import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	username: string = "";
	password: string = "";
	confirmPassword: string = "";
	email: string = "";
	errorMessage: string = "";


	constructor(private userService: UserService, private route: Router) { }

	ngOnInit() {
	}

	validateInput():boolean{
		this.errorMessage = "";
		if(this.username.length < 6){
			return false;
		}
		if(this.password.length < 6){
			return false;
		}
		if(this.email.length < 6){
			return false;
		}
		if(this.password != this.confirmPassword){
			return false;
		}
		return true;
	}

	register(){
		if(!this.validateInput()){
			this.errorMessage = "Validation error";
			alert("Validation error");
			return;
		}
		let data = {
			username: this.username,
			password: this.password,
			email: this.email
		};
		this.userService.register(data).then(res => {
			let token = res.json()["token"];
			console.log(token);
			localStorage.setItem("token", token);
			this.route.navigate(["host"]);
		});
	}

}
