
export class DecimalTextConverter {

  fromValue(value, args?) {
    return value.$numberDecimal;
  }

  toValue(value, args?) {
    return value;
  }
}

export const DECIMAL_TEXT_CONVERTER = new DecimalTextConverter();
