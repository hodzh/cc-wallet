import { NgModule } from '@angular/core';
import { UserResource } from './user.resource';
import { Auth } from './auth';
import { AuthHttp } from './auth-http';
import { AuthGuard } from './auth-guard';
import { AuthResource } from './auth.resource';
import { AuthToken } from './auth-token';
import { NoAuthGuard } from './no-auth-guard';
import { AdminGuard } from './admin-guard';
import { UserGuard } from './user-guard';

@NgModule({
  providers: [
    UserResource,
    Auth,
    AuthHttp,
    AuthGuard,
    AuthResource,
    AuthToken,
    NoAuthGuard,
    AdminGuard,
    UserGuard
  ]
})
export class CoreAuthModule {
}
