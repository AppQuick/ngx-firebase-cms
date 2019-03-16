import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  goTo(url) {
    if (url) window.open(url, '_blank')
  }
}
