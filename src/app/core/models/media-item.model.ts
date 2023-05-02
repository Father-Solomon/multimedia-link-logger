import {LoggedMediaItemInterface} from "../interfaces/logged-media-item.interface";

export class MediaItem {
  private _item: LoggedMediaItemInterface = {
    name: '',
    id: 0,
    url: '',
    type: 'image',
    position: {
      top: 0,
      left: 0,
      height: 0,
      width: 0,
    }
  }

  constructor(id: number, url: string, type: 'video' | 'image') {
    this._item.id = id;
    this._item.name = url;
    this._item.url = url;
    this._item.type = type;
  }

  public get item() {
    return this._item
  }
}
