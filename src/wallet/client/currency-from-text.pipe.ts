import { Pipe } from '@angular/core';
import { CURRENCY_TEXT_CONVERTER } from '../common/currency-text-converter';

@Pipe({
  name: 'CurrencyFromText'
})
export class CurrencyFromTextPipe {

  transform(value, args?) {
    return CURRENCY_TEXT_CONVERTER.toValue(value, args);
  }

}
