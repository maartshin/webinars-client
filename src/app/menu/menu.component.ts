import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	constructor(private userService : UserService, private route: Router) { }

	ngOnInit() {
	}

	logout(){
		this.userService.logOut();
		this.route.navigate(["login"]);
	}

}
