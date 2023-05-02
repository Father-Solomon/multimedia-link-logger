import {DOCUMENT} from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {PositionInterface} from "../../../../core/interfaces/position.interface";
import {LoggedMediaItemInterface} from "../../../../core/interfaces/logged-media-item.interface";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss']
})
export class MediaCardComponent implements AfterViewInit {
  @Input() media: LoggedMediaItemInterface = {} as LoggedMediaItemInterface;
  @Output() changeSizeOrPosition = new EventEmitter<PositionInterface>();
  @Output() removeMedia = new EventEmitter<number>();
  @ViewChild('video') video: ElementRef | undefined;
  @ViewChild('mediaCard') mediaCard!: ElementRef;
  width = 600
  height = 300
  top = 0;
  left = 0
  public videoElement!: HTMLVideoElement;
  //public removeEventListener: () => void;
  isPlaying = false;
  observer = new ResizeObserver(this.callback);
  private removeMouseMoveListener!: () => void;
  private removeMouseUpListener!: () => void;
  private subscriptions = new Subscription();

  constructor(@Inject(DOCUMENT) private document: Document, private elementRef: ElementRef, private renderer: Renderer2) {
    console.log('constructor(@Inject(DOCUMENT)')
  }

  //unlistener: () => void;
  ngOnInit() {


  }

  dragEnded(event: any, id: string): void {
    console.log(id, event)
  }

  ngAfterViewInit(): void {
    // const source = fromEvent(this.elementRef.nativeElement, 'cdkDragEnded');
    // //const source1 = fromEvent(this.elementRef.nativeElement, 'click');
    // const source2 = fromEvent(this.elementRef.nativeElement, '');

    this.observer.observe(this.mediaCard.nativeElement);
    this.videoElement = this.video?.nativeElement;
    //   this.subscriptions.add(
    //     source.subscribe(event => {
    //       console.log(' this.subscriptions.add(', event)
    //     })
    // )
    //   this.subscriptions.add(
    //     source1.subscribe(event => {
    //       console.log(' this.subscriptions.add(', event)
    //     })
    //   )
    //   this.subscriptions.add(
    //     source2.subscribe(event => {
    //       console.log(' this.subscriptions.add(', event)
    //     })
    //   )
    this.subscriptions.add(
      fromEvent(this.elementRef.nativeElement, 'mouseup')
        .subscribe((res: any) => {
          console.log('mouseup', res)
          this.top = this.mediaCard.nativeElement.getBoundingClientRect().top;
          this.left = this.mediaCard.nativeElement.getBoundingClientRect().left;
        })
    )
  }

  ngAfterViewChecked() {

  }

  callback(entries: ResizeObserverEntry[], observer: ResizeObserver) {
    this.width = entries[0].target.getBoundingClientRect().width;
    this.height = entries[0].target.getBoundingClientRect().height;
    this.top = entries[0].target.getBoundingClientRect().top;
    this.left = entries[0].target.getBoundingClientRect().left;
    console.log('callback', entries[0].target);
    console.log('callback', entries[0].target.getBoundingClientRect());
  }

  onPlay() {
    console.log('onPlay')
    this.videoElement.paused ? this.videoElement.play() : this.videoElement.pause();
    this.isPlaying = !!this.videoElement.paused;
  }

  onResize($event: MouseEvent): void {
    console.log($event)
    console.log(this.mediaCard.nativeElement.boundingClientRect)
    this.removeMouseMoveListener = this.renderer.listen("document", "mousemove", event => {
      console.log(`I am detecting mousemove at ${event.pageX}, ${event.pageY} on Document!`);
      this.width = event.pageX - this.left;
      this.height = event.pageY - this.top
      this.removeMouseUpListener = this.renderer.listen("document", "mouseup", event => {

        console.log(`I am detecting mouseUp at ${event.pageX}, ${event.pageY} on Document!`);
        this.removeMouseMoveListener();
        this.removeMouseUpListener();
      });
    });
  }

  ngOnDestroy() {
    this.observer.disconnect();
    this.removeMouseMoveListener();
    this.removeMouseUpListener();
    this.subscriptions.unsubscribe();
  }


  setStatus($event: MouseEvent, number: number) {
    console.log(event)
  }

  emitRemoveMedia(id: number) {
    this.removeMedia.emit(id);
  }
}
