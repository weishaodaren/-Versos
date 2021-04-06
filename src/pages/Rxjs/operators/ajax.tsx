import { defineComponent } from 'vue';
import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export default defineComponent({
  name: 'Ajax',
  setup() {
    const $observable = ajax
      .getJSON(`https://api.github.com/users?weishaodaren`)
      .pipe(
        map((res) => console.log(`users:`, res)),
        catchError((err) => {
          console.log(`err: `, err);
          return of(err);
        })
      );
    const _observable = ajax({
      url: `https://httpbin.org/delay/2`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'rxjs-custom-header': 'Rxjs',
      },
      body: {
        rxjs: 'Hello World',
      },
    }).pipe(
      map((res) => console.log(`res:::`, res)),
      catchError((err) => {
        console.log('err:::', err);
        return of(err);
      })
    );
    const obs$ = ajax(`https://api.github.com/404`).pipe(
      map((res) => console.log(res, `user`)),
      catchError((err) => {
        console.log(err);
        return of(err);
      })
    );
    obs$.subscribe();
    _observable.subscribe();
    $observable.subscribe();
  },
});
