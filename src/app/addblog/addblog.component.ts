import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogsService } from 'src/app/Services/blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit {
  
  selectedImg : any;

  constructor(public blogsSer:BlogsService, public router : Router) { }

  ngOnInit() {
  }
  
  onSelectedImg(event:any)
  {
    this.selectedImg = event.target.files[0];
    console.log(this.selectedImg);
  }

  addblog(form:NgForm){
    console.log(form.value);
    var fd = new FormData();

    fd.append("blogHeading", form.value.blogHeading);
    fd.append("blogContent", form.value.blogContent);

    fd.append("blogImg", this.selectedImg, "blogImg");
      this.blogsSer.addBlogs(fd).subscribe((data:any)=>{
        console.log(data);
      }, (error:any)=>{
        console.log(error);
      })

      this.router.navigateByUrl("/");
  }



}
