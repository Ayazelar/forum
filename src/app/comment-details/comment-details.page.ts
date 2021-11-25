import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as DataService from '../services/bucket';
import { ModalController } from '@ionic/angular';
import { AddCommentComponent } from './../add-comment/add-comment.component';


@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.page.html',
  styleUrls: ['./comment-details.page.scss'],
})
export class CommentDetailsPage implements OnInit {

  comment: DataService.Comment;
  id: any;
  constructor(private route: ActivatedRoute,private modalController: ModalController) {
    DataService.initialize({ apikey: '2n1c1akvupiku4' });
   }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getComment();
  }
  async getComment(){
    // eslint-disable-next-line max-len
    this.comment = await DataService.comment.get(this.id,{queryParams: {relation:['comments.user', 'user', 'likes','dislikes','comments.likes','comments.dislikes']}});
  }
  async addCommentModal(){
    const commentModal = await this.modalController.create({
      component: AddCommentComponent,
      swipeToClose: true,
      cssClass: 'my-custom-modal-css'
    });
    return await commentModal.present();
  }
}
