import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(public http : HttpClient) { }

  showBlogList(){
    return this.http.get("http://localhost:3000/blogs");
  }

  addBlogs(data:any)
  {
    return this.http.post("http://localhost:3000/addblog", data);
  }
  
  getSingleBlog(catId:any)
  {
    return this.http.get("http://localhost:3000/singleblog/"+catId);
  }
}
