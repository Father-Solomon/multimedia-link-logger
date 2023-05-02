import {DOCUMENT} from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input, OnDestroy,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {PositionInterface} from "../../../../core/interfaces/position.interface";
import {LoggedMediaItemInterface} from "../../../../core/interfaces/logged-media-item.interface";
import {fromEvent, Subscription} from "rxjs";
import {ResizableMediaService} from "../../../../core/singletones/resizable-media.service";

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss']
})
export class MediaCardComponent implements AfterViewInit, OnDestroy {
  @Input() media: LoggedMediaItemInterface = {} as LoggedMediaItemInterface;
  @Output() changeSizeOrPosition = new EventEmitter<PositionInterface>();
  @ViewChild('video') video: ElementRef | undefined;
  @ViewChild('mediaCard') mediaCard!: ElementRef;
  public videoElement!: HTMLVideoElement;
  width = 600
  height = 300
  top = 0;
  left = 0
  isPlaying = false;
  observer = new ResizeObserver(this.callback);
  private removeMouseMoveListener: () => void = () => {};
  private removeMouseUpListener: () => void = () => {};
  private subscriptions = new Subscription();

  constructor(@Inject(DOCUMENT) private document: Document, private elementRef: ElementRef, private renderer: Renderer2, private resizableMediaService: ResizableMediaService) {
  }

  ngAfterViewInit(): void {
    this.observer.observe(this.mediaCard.nativeElement);
    this.videoElement = this.video?.nativeElement;
    this.updateMedia();
    this.subscriptions.add(
      fromEvent(this.elementRef.nativeElement, 'mouseup')
        .subscribe((res: any) => {
          this.updateMedia();
        })
    )
  }
  ngOnDestroy() {
    this.observer.disconnect();
    this.removeMouseMoveListener();
    this.removeMouseUpListener();
    this.subscriptions.unsubscribe();
  }

  callback(entries: ResizeObserverEntry[], observer: ResizeObserver) {
    this.width = entries[0].target.getBoundingClientRect().width;
    this.height = entries[0].target.getBoundingClientRect().height;
    this.top = entries[0].target.getBoundingClientRect().top;
    this.left = entries[0].target.getBoundingClientRect().left;
  }

  onPlay() {
    this.videoElement.paused ? this.videoElement.play() : this.videoElement.pause();
    this.isPlaying = this.videoElement.paused;
  }

  onResize(): void {
    // TODO not optimized (but it fun)

    this.removeMouseMoveListener = this.renderer.listen("document", "mousemove", event => {
      this.width = event.pageX - this.left;
      this.height = event.pageY - this.top
      this.updateMedia();
      this.removeMouseUpListener = this.renderer.listen("document", "mouseup", event => {
        this.removeMouseMoveListener();
        this.removeMouseUpListener();
      });
    });
  }

  removeMedia(id: number) {
    this.resizableMediaService.removeMedia(id)
  }

  updateMedia(): void {
    this.top = this.mediaCard.nativeElement.getBoundingClientRect().top;
    this.left = this.mediaCard.nativeElement.getBoundingClientRect().left;
    this.width = this.mediaCard.nativeElement.getBoundingClientRect().width;
    this.height = this.mediaCard.nativeElement.getBoundingClientRect().height;

    this.resizableMediaService.updateMedia(this.media.id, {
      top: this.top,
      left: this.left,
      height: this.height,
      width: this.width,
    })
  }
}
