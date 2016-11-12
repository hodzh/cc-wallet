import { DevDbComponent } from './db/db.component';
import { RouterModule } from '@angular/router';

export const Router = RouterModule.forChild([
  {
    path: 'dev/db',
    component: DevDbComponent
  }
]);
