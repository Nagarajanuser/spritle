import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/Services/blogs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogListArrayComp:any[]=[];
  subscribe : Subscription;
  constructor(public blogsSer:BlogsService) { }

  ngOnInit() {

    this.subscribe = this.blogsSer.showBlogList().subscribe((data:any[])=>{
      console.log(data);
      this.blogListArrayComp = data;
      }, (error:any)=>{
        console.log("my observar error", error);
      }, ()=>{
        console.log("completed");
      });

  }

}
