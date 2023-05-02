import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {notMedia} from "../../../../shared/helpers/media-url-form-validator.helper";
import {ResizableMediaService} from "../../../../core/singletones/resizable-media.service";
import {mediaExtensionResolver} from "../../../../shared/helpers/media-extension-resolver.helper";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 url: string = '';
 notMediaLink = false
  constructor(private resizableMediaService: ResizableMediaService) {
  }

  getJSON() {
   const stringifyList = this.resizableMediaService.getJSON();
    console.log(stringifyList)
  }

  addNewMedia(url: string) {
    const type = mediaExtensionResolver(url);
    if (type === 'video' || type === 'image') {
      this.notMediaLink = false;
      this.resizableMediaService.addMedia(url, type);
      this.url = '';
    } else {
      this.notMediaLink = true;
    }
  }
}
