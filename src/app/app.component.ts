import { Component, ElementRef, OnInit, QueryList, ViewChild, NgZone, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Muuri from 'muuri';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular';
  users = [];

  @ViewChild('mygrid') gridref:ElementRef;

  @ViewChildren('item') items:QueryList<ElementRef>;

  constructor(private http: HttpClient,private _zone: NgZone, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.http.get<any>('https://randomuser.me/api/?results=5').subscribe((data) => {
      this.users = data.results;
      this._zone.runOutsideAngular(() => setTimeout(() => {
        console.log("document.qu", document.querySelectorAll(".item"));
      var gridds = new Muuri.default('.grid', {
          items: ".item",
        dragEnabled: true,
        dragSortPredicate: {
          threshold: 20,
          action: 'move'
        }});
         console.log("Grids", gridds);
      }, 100));
     // this.cdr.markForCheck();
      // How do I initialise the grid after retrieving and binding the data
      // so that Muuri recognises the bound user items?
    
      // Note that only the two hard-coded items are included here
      console.log('how many items appear in the DOM? ' + this.gridref.nativeElement.getElementsByClassName('item').length);
    });
  }

  
}
