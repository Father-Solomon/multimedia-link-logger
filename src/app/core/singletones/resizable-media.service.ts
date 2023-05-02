import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LoggedMediaItemInterface} from "../interfaces/logged-media-item.interface";
import {MediaItem} from "../models/media-item.model";
import {PositionInterface} from "../interfaces/position.interface";

// TODO remove from singletons
@Injectable({
  providedIn: 'root'
})
export class ResizableMediaService {
  currentID = new BehaviorSubject<number>(0)
  // TODO it really bad solution course ad redundant renders, need to be changed with
  protected naiveDB$ = new BehaviorSubject<any>({})

  constructor() {
  }

  public get media$(): Observable<LoggedMediaItemInterface[]> {
    return this.naiveDB$.asObservable();
  }

  protected get list(): { [key: number]: LoggedMediaItemInterface } {
    return this.naiveDB$.getValue();
  }

  addMedia(url: string, type: 'video' | 'image') {
    const id = this.currentID.getValue() + 1;
    const newMedia = new MediaItem(id, url, type);

    this.naiveDB$.next({
      ...this.list,
      id: newMedia.item,
    });
  }

  updateMedia(id: number, position: Partial<PositionInterface>) {
    const updatedItem = {
      ...this.list[id], position:
        {
          top: 0, left: 0, height: 0, width: 0, ...position

        }
    };
    this.naiveDB$.next({
      ...this.list,
      id: updatedItem,
    });
  }

  removeMedia(id: number) {
    const newList = {...this.list};
    delete newList[0]
    this.naiveDB$.next({...newList});
  }

  getJSON(): string {
    return JSON.stringify(this.list);
  }
}
