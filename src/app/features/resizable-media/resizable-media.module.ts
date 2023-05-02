import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResizableMediaRoutes} from "./resizable-media-routing.module";
import { MediaCardComponent } from './components/media-card/media-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ResizableMediaComponent } from './resizable-media.component';
import {LinkFormComponent} from "./components/link-form/link-form.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { HeaderComponent } from './components/header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    MediaCardComponent,
    ResizableMediaComponent,
    LinkFormComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ResizableMediaRoutes,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class ResizableMediaModule { }
