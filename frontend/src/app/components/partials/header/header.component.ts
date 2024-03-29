import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  user!:User;

  constructor(private userService:UserService) {
    userService.userObservble.subscribe((newUser) => {
      this.user = newUser;
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }

}
