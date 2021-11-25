import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as DataService from '../services/bucket';

@Component({
  selector: 'app-followers-modal',
  templateUrl: './followers-modal.component.html',
  styleUrls: ['./followers-modal.component.scss'],
})
export class FollowersModalComponent implements OnInit {
  user: DataService.User;
  constructor(private modal: ModalController) { 
    DataService.initialize({ apikey: "2n1c1akvupiku4" });
  }
  async ngOnInit() {
    await this.getUser();
  }
  async getUser(){
    this.user = await DataService.user.get("618ce953c76489002e9b624a",{queryParams: {relation:true}});
  }
  remove(value){
    this.user.followers = this.user.followers.filter(el => {
      return el['_id'] != value
    });

    DataService.user.patch({_id:this.user._id, followers:this.user.followers})
  }
  
}
