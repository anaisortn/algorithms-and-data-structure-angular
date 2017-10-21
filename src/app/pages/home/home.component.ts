import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  location: Location

  constructor(location: Location) {
    this.location = location
  }

  ngOnInit() {
  }

  isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path())
    titlee = titlee.slice(1)

    if (path == titlee) {
      return false
    }
    else {
      return true
    }
  }
}
