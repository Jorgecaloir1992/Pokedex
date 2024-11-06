import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './character/character.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CharacterComponent
  ],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    HttpClientModule
  ]
})
export class CharacterModule { }
