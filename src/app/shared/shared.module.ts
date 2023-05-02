import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkFormComponent } from '../features/resizable-media/components/link-form/link-form.component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { ResizeDirective } from './directives/resize.directive';



@NgModule({
  declarations: [
    LinkFormComponent,
    DragDropDirective,
    ResizeDirective,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
