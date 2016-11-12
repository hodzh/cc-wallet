import { Pipe } from '@angular/core';

@Pipe({
  name: 'ActiveNavItems'
})
export class ActiveNavItems {

  transform(value, args?) {
    let currentRole = args || 'guest';
    //console.log(currentRole);
    return value.filter(item => {
      return !item.role || item.role === currentRole;
    });
  }

}
