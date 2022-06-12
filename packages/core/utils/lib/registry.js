"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Registry = void 0;

class Registry {
  constructor(options = {
    override: false
  }) {
    this.map = new Map();
    this.options = void 0;
    this.options = options;
  }

  register(key, value) {
    if (!this.options.override && this.map.has(key)) {
      throw new Error(`this registry does not allow to override existing keys: "${key}"`);
    }

    this.map.set(key, value);
  } // async import({ directory, extensions = ['.js', '.ts', '.json'] }) {
  //   const files = await fs.readdir(directory);
  //   return files.filter(file => extensions.includes(path.extname(file)))
  // }


  get(key) {
    return this.map.get(key);
  }

  getKeys() {
    return this.map.keys();
  }

  getValues() {
    return this.map.values();
  }

  getEntities() {
    return this.map.entries();
  }

}

exports.Registry = Registry;
var _default = Registry;
exports.default = _default;