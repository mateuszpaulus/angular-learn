import {Component} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";


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

  constructor(private dataStorageService: DataStorageService) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  };

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  };
}
