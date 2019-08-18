import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg:any;
  constructor(public userSer:UsersService, public myRouter:Router) { }

  ngOnInit() {
  }

  login(form:NgForm){
    this.userSer.doUserLogin(form.value).subscribe((data:any[])=>{
        if(data.length>0)
        {
          localStorage.setItem("token", data[0]._id);
          this.myRouter.navigateByUrl('/');
        }
        else {
          this.msg = "Invalid Login";
        }
    }, (error:any)=>{
        console.log(error);
    });
   

  }


}
