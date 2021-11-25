import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as DataService from '../services/bucket';

@Component({
  selector: 'app-followings-modal',
  templateUrl: './followings-modal.component.html',
  styleUrls: ['./followings-modal.component.scss'],
})
export class FollowingsModalComponent implements OnInit {
  user: DataService.User;
  isLoading: boolean = false;
  constructor(private modal: ModalController) {
    DataService.initialize({ apikey: "2n1c1akvupiku4" });
   }

   async ngOnInit() {
    await this.getUser();
    this.isLoading = false;
  }
  async getUser(){
    this.user = await DataService.user.get("618ce953c76489002e9b624a",{queryParams: {relation:true}});
    this.isLoading = true;
  }
  unfollow(value){
      this.user.followings = this.user.followings.filter(el => {
        return el['_id'] != value
      });

      DataService.user.patch({_id:this.user._id, followings:this.user.followings})
    }
}
