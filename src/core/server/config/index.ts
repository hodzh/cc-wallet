import * as fs from 'fs';
import * as path from 'path';
import JSON5 from 'json5';

export class Config {

  /**
   * application environment mode
   */
  private env: string;

  /**
   * config directory path
   */
  private rootDir: string;

  constructor() {
    this.env = process.env.NODE_ENV || 'development';
    this.rootDir = process.env.CONFIG_DIR || '../../';
    this.load();
  }

  private load() {
    this.loadDir(this.rootDir, this);
  }

  private loadDir(dir, data) {
    let list = fs.readdirSync(dir);
    list.forEach((file) => {
      let filePath = path.join(dir, file);
      let stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        this.loadDir(filePath, data[file] = {});
      } else {
        this.loadFile(filePath, data);
      }
    });
  }

  private loadFile(file, data) {
    let fileName = path.filename(file);
    let text = fs.readFileSync(file);
    let fileData = JSON5.parse(text);
    data[fileName] = fileData;
  }
}

export const CONFIG: Config = new Config();
