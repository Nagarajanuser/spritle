import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BlogsService } from 'src/app/Services/blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  
  singleblogdetail :any[] = [];
  singlebloghead:any;
  singleblogcontent:any;
  singleblogImgPath:any;
  
  constructor(public activeRoute : ActivatedRoute, public blogsSer:BlogsService) { }

  ngOnInit() {
   
   this.activeRoute.params.subscribe((param:Params)=>{

    console.log(param);

    this.blogsSer.getSingleBlog(param.catId).subscribe((data:any[])=>{

      console.log(data);

      this.singleblogdetail = data[0];
      console.log(this.singlebloghead    = this.singleblogdetail.blogHeading);
      console.log(this.singleblogcontent = this.singleblogdetail.blogContent);
      console.log(this.singleblogImgPath = this.singleblogdetail.blogImgPath);
    }, (error:any)=>{

      console.log(error);

    });

   })
   
  }

}
