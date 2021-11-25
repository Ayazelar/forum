/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as DataService from '../services/bucket';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  category: DataService.Category[] = [];
  comments: DataService.Comment[] = [];
  titles: DataService.Title[]=[];
  user: DataService.User;
  private followtext= "Follow";
  constructor() {
    // eslint-disable-next-line @typescript-eslint/quotes
    DataService.initialize({ apikey: "2n1c1akvupiku4" });
  }

  async ngOnInit() {
    await this.getCategory();
    await this.getComments();
    await this.getTitles();
    await this.getUser();
  }
  async getUser(){
    this.user = await DataService.user.get("618ce953c76489002e9b624a",{queryParams: {relation:true}});
  }
  getCategory() {
    DataService.category.getAll().then((res => {
      this.category = res;

    }));
  }
  getComments(){
    DataService.comment.getAll({queryParams : {limit: 10, relation: true}}).then((res => {
      this.comments = res;
    }));
  }
  getTitles(){
    DataService.title.getAll().then((res => {
      this.titles = res;
    }));
  }
  follow(value){
    this.user.followers.push(value);

    DataService.user.patch({_id:this.user._id, followers:this.user.followers})
  }
  like(value){

    let likedcomment = this.comments.find(el => {return el._id == value});
    likedcomment.likes.push(this.user._id)
    DataService.comment.patch({_id:likedcomment._id, likes:likedcomment.likes})
  }
  dislike(value){
    let dislikedcomment = this.comments.find(el => {return el._id == value});
    dislikedcomment.dislikes.push(this.user._id)
    DataService.comment.patch({_id:dislikedcomment._id, dislikes:dislikedcomment.dislikes})
  }
}
