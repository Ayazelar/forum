import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentDetailsPage } from './comment-details.page';

const routes: Routes = [
  {
    path: ':id',
    component: CommentDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentDetailsPageRoutingModule {}
