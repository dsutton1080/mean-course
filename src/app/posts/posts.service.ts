import { Post } from "./post.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { ThisReceiver } from "@angular/compiler";

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((postData) =>{
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts])
    });
    // return [...this.posts]; //Using spread to return the value and not the reference
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: "", title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
