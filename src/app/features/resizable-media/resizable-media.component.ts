import { Component } from '@angular/core';
import {LoggedMediaItemInterface} from "../../core/interfaces/logged-media-item.interface";
import {ResizableMediaService} from "../../core/singletones/resizable-media.service";
import {Observable, tap} from "rxjs";

export const fakeDB: LoggedMediaItemInterface[] = [
  {
    name: 'https://sjc1.vultrobjects.com/moments/ads/avatar2-trailer-short.mp4',
    id: 0,
    url: 'https://sjc1.vultrobjects.com/moments/ads/avatar2-trailer-short.mp4',
    type: 'video',
    position: {
      top: 0,
      left: 0,
      height: 0,
      width: 0,
    }
  },
  {
    name: 'https://ewr1.vultrobjects.com/moments/ads/cocacola/coca-cola-banner-right.jpg',
    id: 1,
    url: 'https://ewr1.vultrobjects.com/moments/ads/cocacola/coca-cola-banner-right.jpg',
    type: 'image',
    position: {
      top: 0,
      left: 0,
      height: 0,
      width: 0,
    }
  }
]

@Component({
  selector: 'app-resizable-media',
  templateUrl: './resizable-media.component.html',
  styleUrls: ['./resizable-media.component.scss']
})
export class ResizableMediaComponent {
  public fakeDB = [...fakeDB];
  mediaList$: Observable<any>;
  keys: [] = [];

  constructor(private resizableMediaService: ResizableMediaService) {
    this.mediaList$ = resizableMediaService.media$.pipe(
      tap((list: any) => this.keys = Object.keys(list) as [])
    );
  }

  dragEnded(event:any, id: number): void {
    console.log(id, event)
  }

  removeMedia(id: number): void {
    this.resizableMediaService.removeMedia(id)
  }
}
