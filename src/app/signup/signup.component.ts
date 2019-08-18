
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public userSer:UsersService) { }

  ngOnInit() {
  }

  signup(form:NgForm){
    console.log(form.value);
    this.userSer.doSignup(form.value).subscribe((data:any)=>{

      console.log(data);


    }, (error:any)=>{

      console.log(error);

    });

    form.reset();
  }


}
