import {MediaItemInterface} from "./media-item.interface";
import {PositionInterface} from "./position.interface";

export interface LoggedMediaItemInterface extends MediaItemInterface {
  position?: PositionInterface;
}
