import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private userService: UserService,  private router: Router) { }

  ngOnInit(): void {
    
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['login']);
  }

  isUserAuthenticated() {
    return this.userService.isUserAuthenticated();
  }
}
