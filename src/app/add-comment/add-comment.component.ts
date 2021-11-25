import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as DataService from '../services/bucket';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  comment: DataService.Comment;
  commentid: any;
  user: DataService.User;
  myVal: string = "";
  myVal1: string = "";
  constructor(private modal: ModalController) { 
    DataService.initialize({ apikey: "2n1c1akvupiku4" });
  }
  
  ngOnInit() {
    this.getUser();
    
  }
  async getUser(){
    this.user = await DataService.user.get("618ce953c76489002e9b624a");
  }

  refresh()
  {
  	this.myVal1 = this.myVal;
  }
}
