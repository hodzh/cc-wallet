export interface ValueConverter {
  fromValue(value: any, args?: any): any;
  toValue(value: any, args?: any): any;
}
