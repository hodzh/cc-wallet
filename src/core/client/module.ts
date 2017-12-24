import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ROUTER } from './router';
import { CoreComponentsModule } from './components/module';
import { LayoutModule } from './layout/module';
import { CoreAdminModule } from './admin/module';
import { CoreUserModule } from './user/module';
import { CoreAuthModule } from './auth/module';
import { HttpClientModule } from '@angular/common/http';

require('!file-loader?name=../css/[name].[ext]!bootstrap/dist/css/bootstrap.min.css');
require('!file-loader?name=../css/[name].[ext]!bootstrap/dist/css/bootstrap.min.css.map');
require('!file-loader?name=../fonts/[name].[ext]!bootstrap/fonts/glyphicons-halflings-regular.eot');
require('!file-loader?name=../fonts/[name].[ext]!bootstrap/fonts/glyphicons-halflings-regular.svg');
require('!file-loader?name=../fonts/[name].[ext]!bootstrap/fonts/glyphicons-halflings-regular.ttf');
require('!file-loader?name=../fonts/[name].[ext]!bootstrap/fonts/glyphicons-halflings-regular.woff');
require('!file-loader?name=../fonts/[name].[ext]!bootstrap/fonts/glyphicons-halflings-regular.woff2');
require('!file-loader?name=../[name].html!./index.html');

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreAuthModule,
    ROUTER,
    CoreComponentsModule,
    LayoutModule,
    CoreAdminModule,
    CoreUserModule
  ]
})
export class CoreModule {
}
