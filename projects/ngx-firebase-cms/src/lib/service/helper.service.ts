import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HelperService {

  constructor() { }

  roleFilter(ref, role, uid, type="post") {
    // ref = ref.where('type', '==', type)
    // if (role == "Author") {
    //   ref = ref.where('author', 'array-contains', uid)
    // } else if (role == "Contributor") {
    //   ref = ref.where('author', '==', uid)
    // } else if (role == "Subscriber") {
    //   ref = ref.where('status', '==', 'published')
    // }
    return ref.orderBy('updatedTime', 'desc')
  }
}

export function componentDestroyed(component: { ngOnDestroy(): void }): Observable<true> {
  const modifiedComponent = component as { ngOnDestroy(): void, __componentDestroyed$?: Observable<true> };
  if (modifiedComponent.__componentDestroyed$) {
    return modifiedComponent.__componentDestroyed$;
  }
  const oldNgOnDestroy = component.ngOnDestroy;
  const stop$ = new ReplaySubject<true>();
  modifiedComponent.ngOnDestroy = function () {
    oldNgOnDestroy && oldNgOnDestroy.apply(component);
    stop$.next(true);
    stop$.complete();
  };
  return modifiedComponent.__componentDestroyed$ = stop$.asObservable();
}

export function untilComponentDestroyed<T>(component: { ngOnDestroy(): void }): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>) => source.pipe(takeUntil(componentDestroyed(component)));
}

/* Default parsing ${example} and return the array of ['example'] */
export function getInterpolation(text:string) {
  return text.match(/\${(.*?)}/gi).map(res => res.substring(2, res.length - 1))
}
