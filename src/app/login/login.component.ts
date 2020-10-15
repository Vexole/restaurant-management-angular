import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/models/login.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token'))
      this.router.navigate(['home']);
  }

  authenticate() {
    this.userService.authenticate(this.login).toPromise().then(res => {
      sessionStorage.setItem('username', this.login.username);
      let tokenStr = 'Bearer ' + res['token'];
      sessionStorage.setItem('token', tokenStr);
      this.router.navigate(['home']);
    }).catch(err => {
      console.log(err)
    })
  }
}
