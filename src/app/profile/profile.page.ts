import { Component, OnInit } from '@angular/core';
import * as DataService from '../services/bucket';
import { AlertController, ModalController } from '@ionic/angular';
import { FollowersModalComponent } from '../followers-modal/followers-modal.component';
import { FollowingsModalComponent } from '../followings-modal/followings-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cycle: any;
  isLoading: boolean=false;
  user: DataService.User;
  comments: DataService.Comment[]=[];

  constructor(public alertController: AlertController,private modalController: ModalController) {
    DataService.initialize({ apikey: "2n1c1akvupiku4" });
  }

  async ngOnInit() {
    this.isLoading=true;
    await this.getUser();
    await this.getComments();
  }
  async getUser(){
    this.isLoading=true;
    this.user= await DataService.user.get("618ce953c76489002e9b624a",{queryParams: {relation:true}});
  }
  getComments(){
    DataService.comment.getAll({queryParams: {filter: {user:this.user._id},
    relation:true,sort:{ "date":-1 },limit: 5}}).then((res => {
      this.comments = res;
      this.isLoading=false;
    }));
  }
  async presentAlert(value) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure delete the comment',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            alert.dismiss(false);
          }
        }, {
          text: 'Okay',
          role: 'okay',
          handler: () => {
            alert.dismiss(true);
          }
        }
      ]
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();

    if(result){
      if(result.role=='okay'){
        await DataService.comment.remove(value);
        this.getComments();
      }
    }
  }
  segmentChanged(event) {

    this.cycle= event.detail.value;
    if(event.detail.value=='comments'){
      this.getCommentContent();
    }
    else if(event.detail.value=='liked'){
      this.getLikedComments();
    }
    else if(event.detail.value=='forums'){
      this.getComments();
    }
  }
  getLikedComments(){
    DataService.comment.getAll({queryParams: {filter: {likes:{$in:[this.user._id]}},relation:true}}).then((res=> {
      this.comments = res;
    }));
  }
  getCommentContent(){
    DataService.comment.getAll({queryParams: {filter: {"comments.user":{$in:[this.user._id]}},relation:true}}).then((res=> {
      this.comments = res;
    }));
  }
  async followersModal(){
    const followersModal = await this.modalController.create({
      component: FollowersModalComponent,
      swipeToClose: true,
    });
    return await followersModal.present();
  }
  async followingsModal(){
    const followingsModal = await this.modalController.create({
      component: FollowingsModalComponent,
      swipeToClose: true,
    });
    return await followingsModal.present();
  }
}
