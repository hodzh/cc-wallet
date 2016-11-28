
export class Formatter {
  public static formatDate(value) {
    let date = new Date(value);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }
}
