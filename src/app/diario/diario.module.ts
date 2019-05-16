import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiarioPage } from './diario.page';
import {MatButtonModule, MatBadgeModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    MatButtonModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: DiarioPage }])
  ],
  declarations: [DiarioPage]
})
export class DiarioPageModule {}
