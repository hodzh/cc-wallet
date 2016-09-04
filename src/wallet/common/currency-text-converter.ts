const ZEROES = '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

export class CurrencyTextConverter {

  fromValue(value, args?) {
    //return Number(value) * Math.pow(10, -args.decimal);
    if (!args) {
      return '';
    }
    if (typeof args.decimal === 'undefined') {
      return '';
    }
    let decimal = Number(args.decimal || 0);
    let text = String(value);
    if (decimal <= 0 || isNaN(decimal)) {
      return text;
    }
    let sign = '';
    if (text[0] === '-') {
      text = text.substr(1);
      sign = '-';
    }
    if (text.length <= decimal) {
      return [sign,
        '0.',
        ZEROES.substr(0, decimal - text.length),
        text].join('');
    }
    return [sign,
      text.substr(0, text.length-decimal),
      '.',
      text.substr(-decimal)].join('');
  }

  toValue(value, args?) {
    //return Math.floor(Number(value) * Math.pow(10, args.decimal));
    if (!args) {
      return NaN;
    }
    if (typeof args.decimal === 'undefined') {
      return NaN;
    }
    let decimal = Number(args.decimal || 0);
    if (decimal <= 0 || isNaN(decimal)) {
      return value;
    }
    let text = String(value);
    let parts = text.split('.');
    let dec = parts[1] || '';
    if (dec.length < args.decimal) {
      dec += ZEROES.substr(0, args.decimal - dec.length);
    }
    return (parts[0] + dec).replace(/^0+/, '');
  }
}

export const CURRENCY_TEXT_CONVERTER = new CurrencyTextConverter();
