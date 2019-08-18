import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userSer:UsersService, public router : Router) { }

  ngOnInit() {
  }
  doLogout()
  {
    localStorage.removeItem("token");

    this.router.navigateByUrl("/");

  }
}
