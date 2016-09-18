import { Pipe } from "@angular/core";
import { CURRENCY_TEXT_CONVERTER } from "../../common/currency-text-converter";

@Pipe({
  name: 'CurrencyToText'
})
export class CurrencyToTextPipe {

  transform(value, args?) {
    return CURRENCY_TEXT_CONVERTER.fromValue(value, args);
  }

}
