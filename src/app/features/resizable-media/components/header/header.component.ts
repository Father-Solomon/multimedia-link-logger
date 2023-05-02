import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {notMedia} from "../../../../shared/helpers/media-url-form-validator.helper";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
 url: string = '';


}
