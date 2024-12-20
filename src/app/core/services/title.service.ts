import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private titleSubject = new BehaviorSubject<string>('Default Title');
  public title$ = this.titleSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  init(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        const pageTitle = data['title'] || 'Default Title';
        this.titleSubject.next(pageTitle);
      });
  }
}
