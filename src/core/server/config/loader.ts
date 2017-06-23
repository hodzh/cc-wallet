import * as fs from 'fs';
import * as path from 'path';
// import * as JSON5 from 'json5';

let log = require('log4js').getLogger('core');

declare function require(name: string);

const ext = '.js';

export class ConfigLoader {

  /**
   * application environment mode
   */
  private env: string;

  /**
   * config directory path
   */
  private config: string;

  /**
   * config mode directory
   */
  private mode: string;

  constructor() {
    this.env = process.env.NODE_ENV || 'development';
    this.parseCommandLine();
    if (!this.config) {
      log.error('Please, specify config path');
      throw new Error('config path is not specified');
    }
  }

  public load(config) {
    let dir = path.resolve(this.config);
    if (this.mode) {
      this.loadDir(path.join(dir, this.mode), config);
    } else {
      this.loadDir(dir, config);
    }
  }

  private parseCommandLine() {
    let commands = {
      '--config': ((config) => this.setConfig(config)),
      '--mode': ((config) => this.setMode(config))
    };
    let count = process.argv.length;
    for (let i = 2; i < count; ++i) {
      let arg = process.argv[i];
      let cmd = commands[arg];
      if (!cmd) {
        continue;
      }
      let val = process.argv[++i];
      cmd(val);
    }
  }

  private setConfig(config) {
    this.config = config;
  }

  private setMode(mode) {
    this.mode = mode;
  }

  private static getKeyByFile(file: string): string {
    // kebab to camel
    return file;
  }

  private loadFile(filePath, data, file) {
    if (file === 'index.js') {
      let indexData: any = {};
      this.loadFileData(filePath, indexData);
      ConfigLoader.merge(data, indexData.index);
      return;
    }
    this.loadFileData(filePath, data);
  }

  private getSubConfig(data, fileName) {
    const dirs = fileName.split('.');
    return dirs.reduce((subConfig, dir) => {
      if (subConfig) {
        subConfig = subConfig[ConfigLoader.getKeyByFile(dir)];
      }
      return subConfig;
    }, data);
  }

  private setSubConfig(data, fileName, value) {
    const dirs = fileName.split('.');
    const last = dirs.pop();
    const parent = dirs.reduce((subConfig, dir) => {
      const key = ConfigLoader.getKeyByFile(dir);
      return subConfig[key] || (subConfig[key] = {});
    }, data);
    parent[ConfigLoader.getKeyByFile(last)] = value;
    return value;
  }

  private loadFileData(filePath, data) {
    let fileData = ConfigLoader.requireFile(filePath);
    let fileName = path.basename(filePath, ext);
    let dataExists = this.getSubConfig(data, fileName);
    if (dataExists) {
      fileData = ConfigLoader.merge(dataExists, fileData);
    }
    this.setSubConfig(data, fileName, fileData);
  }

  private loadDir(dir, data) {
    let list = fs.readdirSync(dir);
    list.forEach((file) => {
      let filePath = path.join(dir, file);
      let stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        this.loadDir(filePath, this.setSubConfig(data, file, {}));
        return;
      }
      if (path.extname(file) !== ext) {
        return;
      }
      this.loadFile(filePath, data, file);
    });
  }

  private static loadFile(file, data) {
    // let fileName = path.basename(file, ext);
    // let text = fs.readFileSync(file, 'utf8');
    // let fileData = JSON5.parse(text);
    // data[fileName] = fileData;
  }

  private static requireFile(filePath) {
    //file = path.relative(process.cwd(), file);
    //let r = require('D:\\www\\cc-wallet\\config\\defaults\\app.js');
    //let req = global.require;
    //let fileData = req(file);
    let text = fs.readFileSync(filePath, 'utf8');
    let fileData = eval(text);
    return fileData;
  }

  private static merge(...args: any[]): any {
    let dest = args[0],
      len = args.length, i, from;

    for (i = 1; i < len; i++) {
      from = args[i];
      if (from != null) {
        Object.getOwnPropertyNames(from).forEach(name => {
          let descriptor;

          // nesting
          if ((typeof(dest[name]) === 'object' || typeof(dest[name]) === 'undefined')
            && typeof(from[name]) === 'object') {

            // ensure proper types (Array rsp Object)
            if (typeof(dest[name]) === 'undefined') {
              dest[name] = Array.isArray(from[name]) ? [] : {};
            }
            if (!Array.isArray(dest[name]) && Array.isArray(from[name])) {
              dest[name] = [];
            } else if (Array.isArray(dest[name]) && !Array.isArray(from[name])) {
              dest[name] = {};
            }
            ConfigLoader.merge(dest[name], from[name]);
          } else if ((name in dest) || !(name in dest)) {
            descriptor = Object.getOwnPropertyDescriptor(from, name);
            if (descriptor.configurable) {
              Object.defineProperty(dest, name, descriptor);
            }
          }
        });
      }
    }
    return dest;
  }
}

