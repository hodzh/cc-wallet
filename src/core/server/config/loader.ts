import * as fs from 'fs';
import * as path from 'path';
// import * as JSON5 from 'json5';

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
  }

  public load(config) {
    let dir = path.resolve(this.config);
    this.loadDir(path.join(dir, 'defaults'), config);
    if (this.mode) {
      this.loadDir(path.join(dir, this.mode), config);
    }
  }

  private parseCommandLine() {
    let commands = {
      '--config': this.setConfig.bind(this),
      '--mode': this.setMode.bind(this)
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

  private loadDir(dir, data) {
    let list = fs.readdirSync(dir);
    list.forEach((file) => {
      let filePath = path.join(dir, file);
      let stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        this.loadDir(filePath, data[file] = {});
        return;
      }
      if (path.extname(file) !== ext) {
        return;
      }
      if (file === 'index.js') {
        let indexData: any = {};
        ConfigLoader.requireFile(filePath, indexData);
        ConfigLoader.merge(data, indexData.index);
        return;
      }
      ConfigLoader.requireFile(filePath, data);
    });
  }

  private loadFile(file, data) {
    // let fileName = path.basename(file, ext);
    // let text = fs.readFileSync(file, 'utf8');
    // let fileData = JSON5.parse(text);
    // data[fileName] = fileData;
  }

  private static requireFile(file, data) {
    let fileName = path.basename(file, ext);
    //file = path.relative(process.cwd(), file);
    //let r = require('D:\\www\\cc-wallet\\config\\defaults\\app.js');
    //let req = global.require;
    //let fileData = req(file);
    let text = fs.readFileSync(file, 'utf8');
    let dataFile = eval(text);
    let dataExists = data[fileName];
    if (dataExists) {
      data[fileName] = ConfigLoader.merge(dataExists, dataFile);
    } else {
      data[fileName] = dataFile;
    }
  }

  private static merge(o1, o2): any {
    var dest = arguments[0],
      len = arguments.length,
      props, merge, i, from;

    for (i = 1; i < len; i++) {
      from = arguments[i];
      if (from != null) {
        Object.getOwnPropertyNames(from).forEach(function (name) {
          var descriptor;

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

