import { Currency } from './model/currency';

export class Currencies {
  all: any[];

  constructor() {
  }

  async init() {
    this.all = await Currency.find({});
    this.all.forEach((currency) => {
      this[currency.code] = currency;
    });
  }
}

export const currencies = new Currencies();
