import '../../core/client/polyfills/polyfills.browser';
declare var require: any;

import 'rxjs/add/operator/last';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';

//require('file?name=../css/[name].[ext]?[hash]!bootstrap/dist/css/bootstrap.min.css');
//require('file?name=../css/[name].[ext]?[hash]!bootstrap/dist/css/bootstrap.min.css.map');
//require('file?name=../[name].[ext]?[hash]!../modules/core/client/index.html');
