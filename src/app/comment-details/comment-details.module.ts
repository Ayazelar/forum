import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentDetailsPageRoutingModule } from './comment-details-routing.module';

import { CommentDetailsPage } from './comment-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentDetailsPageRoutingModule
  ],
  declarations: [CommentDetailsPage]
})
export class CommentDetailsPageModule {}
