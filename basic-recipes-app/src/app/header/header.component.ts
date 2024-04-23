import {Component} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  collapsed = true;
  // @Output() featuredSelected = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   this.featuredSelected.emit(feature);
  // };

}
