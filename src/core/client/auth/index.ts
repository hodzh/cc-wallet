import { AccountResource } from './account.resource';
import { AdminGuard } from './admin-guard';
import { Auth } from './auth';
import { AuthHttp } from './auth-http';
import { AuthGuard } from './auth-guard';
import { AuthResource } from './auth.resource';
import { AuthToken } from './auth-token';
import { NoAuthGuard } from './no-auth-guard';
import { UserGuard } from './user-guard';

export const AUTH_PROVIDERS = [
  AccountResource,
  Auth,
  AuthHttp,
  AuthGuard,
  AuthResource,
  AuthToken,
  NoAuthGuard,
  AdminGuard,
  UserGuard
];

export * from './auth';
export * from './auth-http';
export * from './auth-guard.ts';
export * from './no-auth-guard';
export * from './admin-guard';
export * from './user-guard';
