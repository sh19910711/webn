
var Module;
if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    }
    var PACKAGE_NAME = 'dist/bn.data';
    var REMOTE_PACKAGE_NAME = (Module['filePackagePrefixURL'] || '') + 'bn.data';
    var PACKAGE_UUID = '8ddb4609-8423-42cb-9562-f62555ec5db5';
  
    function fetchRemotePackage(packageName, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        if (event.loaded && event.total) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: event.total
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

function assert(check, msg) {
  if (!check) throw msg + new Error().stack;
}

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;
        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            Module.printErr('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        this.requests[this.name] = null;
      },
    };
      new DataRequest(0, 4158, 0, 0).open('GET', '/pdcfont.bmp');

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
      // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though.
      var ptr = Module['_malloc'](byteArray.length);
      Module['HEAPU8'].set(byteArray, ptr);
      DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
          DataRequest.prototype.requests["/pdcfont.bmp"].onload();
          Module['removeRunDependency']('datafile_dist/bn.data');

    };
    Module['addRunDependency']('datafile_dist/bn.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

})();

// Note: Some Emscripten settings will significantly limit the speed of the generated code.
// Note: Some Emscripten settings may limit the speed of the generated code.
// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  if (!Module['print']) Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  if (!Module['printErr']) Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };

  var nodeFS = require('fs');
  var nodePath = require('path');

  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };

  Module['readBinary'] = function readBinary(filename) { return Module['read'](filename, true) };

  Module['load'] = function load(f) {
    globalEval(read(f));
  };

  Module['arguments'] = process['argv'].slice(2);

  module['exports'] = Module;
}
else if (ENVIRONMENT_IS_SHELL) {
  if (!Module['print']) Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }

  Module['readBinary'] = function readBinary(f) {
    return read(f, 'binary');
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  this['Module'] = Module;

  eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined"); // wipe out the SpiderMonkey shell 'gc' function, which can confuse closure (uses it as a minified name, and it is then initted to a non-falsey value unexpectedly)
}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (ENVIRONMENT_IS_WEB) {
    this['Module'] = Module;
  } else {
    Module['load'] = importScripts;
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}

function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}



// === Auto-generated preamble library stuff ===

//========================================
// Runtime code shared with compiler
//========================================

var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      return '(((' +target + ')+' + (quantum-1) + ')&' + -quantum + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (isArrayType(type)) return true;
  if (/<?{ ?[^}]* ?}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (vararg) return 8;
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    var index = 0;
    type.flatIndexes = type.fields.map(function(field) {
      index++;
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        if (field[1] === '0') {
          // this is [0 x something]. When inside another structure like here, it must be at the end,
          // and it adds no size
          // XXX this happens in java-nbody for example... assert(index === type.fields.length, 'zero-length in the middle!');
          size = 0;
          if (Types.types[field]) {
            alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
          } else {
            alignSize = type.alignSize || QUANTUM_SIZE;
          }
        } else {
          size = Types.types[field].flatSize;
          alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
        }
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else if (field[0] === '<') {
        // vector type
        size = alignSize = Types.types[field].flatSize; // fully aligned
      } else if (field[0] === 'i') {
        // illegal integer field, that could not be legalized because it is an internal structure field
        // it is ok to have such fields, if we just use them as markers of field size and nothing more complex
        size = alignSize = parseInt(field.substr(1))/8;
        assert(size % 1 === 0, 'cannot handle non-byte-size field ' + field);
      } else {
        assert(false, 'invalid type for calculateStructAlignment');
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    if (type.name_ && type.name_[0] === '[') {
      // arrays have 2 elements, so we get the proper difference. then we scale here. that way we avoid
      // allocating a potentially huge array for [999999 x i8] etc.
      type.flatSize = parseInt(type.name_.substr(1))*type.flatSize/2;
    }
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      assert(args.length == sig.length-1);
      return FUNCTION_TABLE[ptr].apply(null, args);
    } else {
      assert(sig.length == 1);
      return FUNCTION_TABLE[ptr]();
    }
  },
  addFunction: function (func) {
    var table = FUNCTION_TABLE;
    var ret = table.length;
    assert(ret % 2 === 0);
    table.push(func);
    for (var i = 0; i < 2-1; i++) table.push(0);
    return ret;
  },
  removeFunction: function (index) {
    var table = FUNCTION_TABLE;
    table[index] = null;
  },
  getAsmConst: function (code, numArgs) {
    // code is a constant string on the heap, so we can cache these
    if (!Runtime.asmConstCache) Runtime.asmConstCache = {};
    var func = Runtime.asmConstCache[code];
    if (func) return func;
    var args = [];
    for (var i = 0; i < numArgs; i++) {
      args.push(String.fromCharCode(36) + i); // $0, $1 etc
    }
    code = Pointer_stringify(code);
    if (code[0] === '"') {
      // tolerate EM_ASM("..code..") even though EM_ASM(..code..) is correct
      if (code.indexOf('"', 1) === code.length-1) {
        code = code.substr(1, code.length-2);
      } else {
        // something invalid happened, e.g. EM_ASM("..code($0)..", input)
        abort('invalid EM_ASM input |' + code + '|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)');
      }
    }
    return Runtime.asmConstCache[code] = eval('(function(' + args.join(',') + '){ ' + code + ' })'); // new Function does not allow upvars in node
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xFF;

      if (buffer.length == 0) {
        if ((code & 0x80) == 0x00) {        // 0xxxxxxx
          return String.fromCharCode(code);
        }
        buffer.push(code);
        if ((code & 0xE0) == 0xC0) {        // 110xxxxx
          needed = 1;
        } else if ((code & 0xF0) == 0xE0) { // 1110xxxx
          needed = 2;
        } else {                            // 11110xxx
          needed = 3;
        }
        return '';
      }

      if (needed) {
        buffer.push(code);
        needed--;
        if (needed > 0) return '';
      }

      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var c4 = buffer[3];
      var ret;
      if (buffer.length == 2) {
        ret = String.fromCharCode(((c1 & 0x1F) << 6)  | (c2 & 0x3F));
      } else if (buffer.length == 3) {
        ret = String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6)  | (c3 & 0x3F));
      } else {
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var codePoint = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) |
                        ((c3 & 0x3F) << 6)  | (c4 & 0x3F);
        ret = String.fromCharCode(
          Math.floor((codePoint - 0x10000) / 0x400) + 0xD800,
          (codePoint - 0x10000) % 0x400 + 0xDC00);
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function processJSString(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+7)&-8);(assert((STACKTOP|0) < (STACK_MAX|0))|0); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + (assert(!staticSealed),size))|0;STATICTOP = (((STATICTOP)+7)&-8); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + (assert(DYNAMICTOP > 0),size))|0;DYNAMICTOP = (((DYNAMICTOP)+7)&-8); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((low>>>0)+((high>>>0)*4294967296)) : ((low>>>0)+((high|0)*4294967296))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}


Module['Runtime'] = Runtime;









//========================================
// Runtime essentials
//========================================

var __THREW__ = 0; // Used in checking for thrown exceptions.
var setjmpId = 1; // Used in setjmp/longjmp
var setjmpLabels = {};

var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;

function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays; note that arrays are 8-bit).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = Module['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}

// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      value = intArrayFromString(value);
      type = 'array';
    }
    if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}

// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;

// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,Math_abs(tempDouble) >= 1 ? (tempDouble > 0 ? Math_min(Math_floor((tempDouble)/4294967296), 4294967295)>>>0 : (~~(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296)))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;

// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}
Module['allocate'] = allocate;

function Pointer_stringify(ptr, /* optional */ length) {
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    assert(ptr + i < TOTAL_MEMORY);
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }

  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    assert(ptr + i < TOTAL_MEMORY);
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF16ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16LE form. The copy will require at most (str.length*2+1)*2 bytes of space in the HEAP.
function stringToUTF16(str, outPtr) {
  for(var i = 0; i < str.length; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[(((outPtr)+(str.length*2))>>1)]=0;
}
Module['stringToUTF16'] = stringToUTF16;

// Given a pointer 'ptr' to a null-terminated UTF32LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF32ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32LE form. The copy will require at most (str.length+1)*4 bytes of space in the HEAP,
// but can use less, since str.length does not return the number of characters in the string, but the number of UTF-16 code units in the string.
function stringToUTF32(str, outPtr) {
  var iChar = 0;
  for(var iCodeUnit = 0; iCodeUnit < str.length; ++iCodeUnit) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    var codeUnit = str.charCodeAt(iCodeUnit); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++iCodeUnit);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit;
    ++iChar;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[(((outPtr)+(iChar*4))>>2)]=0;
}
Module['stringToUTF32'] = stringToUTF32;

function demangle(func) {
  try {
    // Special-case the entry point, since its name differs from other name mangling.
    if (func == 'Object._main' || func == '_main') {
      return 'main()';
    }
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    var i = 3;
    // params, etc.
    var basicTypes = {
      'v': 'void',
      'b': 'bool',
      'c': 'char',
      's': 'short',
      'i': 'int',
      'l': 'long',
      'f': 'float',
      'd': 'double',
      'w': 'wchar_t',
      'a': 'signed char',
      'h': 'unsigned char',
      't': 'unsigned short',
      'j': 'unsigned int',
      'm': 'unsigned long',
      'x': 'long long',
      'y': 'unsigned long long',
      'z': '...'
    };
    function dump(x) {
      //return;
      if (x) Module.print(x);
      Module.print(func);
      var pre = '';
      for (var a = 0; a < i; a++) pre += ' ';
      Module.print (pre + '^');
    }
    var subs = [];
    function parseNested() {
      i++;
      if (func[i] === 'K') i++; // ignore const
      var parts = [];
      while (func[i] !== 'E') {
        if (func[i] === 'S') { // substitution
          i++;
          var next = func.indexOf('_', i);
          var num = func.substring(i, next) || 0;
          parts.push(subs[num] || '?');
          i = next+1;
          continue;
        }
        if (func[i] === 'C') { // constructor
          parts.push(parts[parts.length-1]);
          i += 2;
          continue;
        }
        var size = parseInt(func.substr(i));
        var pre = size.toString().length;
        if (!size || !pre) { i--; break; } // counter i++ below us
        var curr = func.substr(i + pre, size);
        parts.push(curr);
        subs.push(curr);
        i += pre + size;
      }
      i++; // skip E
      return parts;
    }
    var first = true;
    function parse(rawList, limit, allowVoid) { // main parser
      limit = limit || Infinity;
      var ret = '', list = [];
      function flushList() {
        return '(' + list.join(', ') + ')';
      }
      var name;
      if (func[i] === 'N') {
        // namespaced N-E
        name = parseNested().join('::');
        limit--;
        if (limit === 0) return rawList ? [name] : name;
      } else {
        // not namespaced
        if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
        var size = parseInt(func.substr(i));
        if (size) {
          var pre = size.toString().length;
          name = func.substr(i + pre, size);
          i += pre + size;
        }
      }
      first = false;
      if (func[i] === 'I') {
        i++;
        var iList = parse(true);
        var iRet = parse(true, 1, true);
        ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
      } else {
        ret = name;
      }
      paramLoop: while (i < func.length && limit-- > 0) {
        //dump('paramLoop');
        var c = func[i++];
        if (c in basicTypes) {
          list.push(basicTypes[c]);
        } else {
          switch (c) {
            case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
            case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
            case 'L': { // literal
              i++; // skip basic type
              var end = func.indexOf('E', i);
              var size = end - i;
              list.push(func.substr(i, size));
              i += size + 2; // size + 'EE'
              break;
            }
            case 'A': { // array
              var size = parseInt(func.substr(i));
              i += size.toString().length;
              if (func[i] !== '_') throw '?';
              i++; // skip _
              list.push(parse(true, 1, true)[0] + ' [' + size + ']');
              break;
            }
            case 'E': break paramLoop;
            default: ret += '?' + c; break paramLoop;
          }
        }
      }
      if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
      return rawList ? list : ret + flushList();
    }
    return parse();
  } catch(e) {
    return func;
  }
}

function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}

function stackTrace() {
  var stack = new Error().stack;
  return stack ? demangleAll(stack) : '(no stack trace available)'; // Stack trace is not available at least on IE10 and Safari 6.
}

// Memory management

var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return (x+4095)&-4096;
}

var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk

function enlargeMemory() {
  abort('Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.');
}

var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;


// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'Cannot fallback to non-typed array case: Code is too specialized');

var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);

// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');

Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;

function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}

function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;

// Tools

// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;

// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr;
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; i++) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    HEAP8[(((buffer)+(i))|0)]=str.charCodeAt(i);
  }
  if (!dontAddNull) HEAP8[(((buffer)+(str.length))|0)]=0;
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;

function unSign(value, bits, ignore, sig) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore, sig) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}

// check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];


var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            Module.printErr('still waiting on run dependencies:');
          }
          Module.printErr('dependency: ' + dep);
        }
        if (shown) {
          Module.printErr('(end of list)');
        }
      }, 10000);
    }
  } else {
    Module.printErr('warning: run dependency added without ID');
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    Module.printErr('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


var memoryInitializer = null;

// === Body ===



STATIC_BASE = 8;

STATICTOP = STATIC_BASE + 15792;


/* global initializers */ __ATINIT__.push({ func: function() { runPostSets() } });

var _stderr;
var _stderr=_stderr=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);;





























































































































































/* memory initializer */ allocate([255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,80,4,0,0,0,0,4,1,135,1,187,1,237,1,0,0,79,4,0,0,0,0,5,1,144,1,188,1,236,1,0,0,82,4,0,0,0,0,3,1,35,2,224,1,234,1,0,0,81,4,0,0,0,0,2,1,36,2,225,1,235,1,0,0,74,4,0,0,0,0,6,1,132,1,191,1,230,1,0,0,77,4,0,0,0,0,102,1,128,1,192,1,233,1,0,0,75,4,0,0,0,0,83,1,140,1,189,1,231,1,0,0,78,4,0,0,0,0,82,1,138,1,190,1,232,1,0,0,73,4,0,0,0,0,75,1,133,1,221,1,223,1,0,0,127,0,0,0,0,0,74,1,125,1,15,2,222,1,0,0,58,4,0,0,0,0,9,1,21,1,33,1,45,1,0,0,59,4,0,0,0,0,10,1,22,1,34,1,46,1,0,0,60,4,0,0,0,0,11,1,23,1,35,1,47,1,0,0,61,4,0,0,0,0,12,1,24,1,36,1,48,1,0,0,62,4,0,0,0,0,13,1,25,1,37,1,49,1,0,0,63,4,0,0,0,0,14,1,26,1,38,1,50,1,0,0,64,4,0,0,0,0,15,1,27,1,39,1,51,1,0,0,65,4,0,0,0,0,16,1,28,1,40,1,52,1,0,0,66,4,0,0,0,0,17,1,29,1,41,1,53,1,0,0,67,4,0,0,0,0,18,1,30,1,42,1,54,1,0,0,68,4,0,0,0,0,19,1,31,1,43,1,55,1,0,0,69,4,0,0,0,0,20,1,32,1,44,1,56,1,0,0,104,4,0,0,0,0,21,1,33,1,45,1,57,1,0,0,105,4,0,0,0,0,22,1,34,1,46,1,58,1,0,0,106,4,0,0,0,0,23,1,35,1,47,1,59,1,0,0,8,0,0,0,0,0,8,0,8,0,249,1,248,1,0,0,9,0,0,0,0,0,9,0,95,1,226,1,227,1,0,0,70,4,0,0,0,0,90,1,141,1,90,1,90,1,0,0,72,4,0,0,0,0,149,1,147,1,149,1,149,1,0,0,156,4,0,0,0,0,77,1,77,1,77,1,77,1,0,0,120,4,0,0,0,0,1,1,1,1,1,1,1,1,0,0,117,4,0,0,0,0,105,1,93,1,94,1,105,1,0,0,118,4,0,0,0,0,111,1,139,1,111,1,111,1,0,0,27,0,0,0,0,0,27,0,27,0,27,0,239,1,0,0,88,4,0,0,1,0,203,1,203,1,204,1,205,1,0,0,87,4,0,0,1,0,209,1,43,0,212,1,216,1,0,0,86,4,0,0,1,0,208,1,45,0,213,1,217,1,0,0,85,4,0,0,1,0,207,1,42,0,215,1,219,1,0,0,84,4,0,0,1,0,202,1,47,0,214,1,218,1,0,0,99,4,0,0,1,0,206,1,46,0,210,1,220,1,0,0,98,4,0,0,1,0,250,1,48,0,251,1,5,2,0,0,89,4,0,0,1,0,199,1,49,0,252,1,6,2,0,0,90,4,0,0,1,0,200,1,50,0,253,1,7,2,0,0,91,4,0,0,1,0,201,1,51,0,254,1,8,2,0,0,92,4,0,0,1,0,196,1,52,0,255,1,9,2,0,0,93,4,0,0,1,0,197,1,53,0,0,2,10,2,0,0,94,4,0,0,1,0,198,1,54,0,1,2,11,2,0,0,95,4,0,0,1,0,193,1,55,0,2,2,12,2,0,0,96,4,0,0,1,0,194,1,56,0,3,2,13,2,0,0,97,4,0,0,1,0,195,1,57,0,4,2,14,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,254,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,66,77,190,0,0,0,0,0,0,0,62,0,0,0,40,0,0,0,32,0,0,0,32,0,0,0,1,0,1,0,0,0,0,0,128,0,0,0,19,11,0,0,19,11,0,0,2,0,0,0,2,0,0,0,0,0,0,0,255,255,255,0,255,255,255,255,255,255,255,255,255,255,255,255,206,111,156,231,181,175,107,91,189,175,235,251,189,175,152,231,189,175,123,95,181,165,107,91,205,171,156,231,255,255,255,255,255,255,255,255,255,207,3,255,255,206,3,255,255,204,115,255,255,204,243,255,255,204,243,255,255,204,115,255,255,198,51,255,255,195,19,255,255,193,131,255,255,200,195,255,255,204,99,255,255,206,51,255,255,207,51,255,255,207,51,255,255,206,51,255,255,192,115,255,255,192,243,255,255,255,255,255,255,255,255,255,255,255,255,255,0,0,66,77,62,16,0,0,0,0,0,0,62,0,0,0,40,0,0,0,0,1,0,0,128,0,0,0,1,0,1,0,0,0,0,0,0,16,0,0,18,11,0,0,18,11,0,0,2,0,0,0,2,0,0,0,0,0,0,0,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,192,0,0,0,0,96,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,192,0,0,0,0,96,0,0,0,0,0,0,0,0,0,0,0,0,0,24,112,0,0,0,0,0,0,0,0,0,0,118,248,192,108,254,112,124,24,126,56,238,60,0,192,28,198,0,126,126,126,24,216,0,0,0,0,0,28,0,0,0,0,220,204,192,108,198,216,102,24,24,108,108,102,0,96,48,198,254,0,0,0,24,216,0,0,0,0,0,60,0,0,126,0,216,204,192,108,96,216,102,24,60,198,108,102,126,126,96,198,0,0,48,12,24,216,24,220,0,0,0,108,0,0,126,0,216,204,192,108,48,216,102,24,102,198,108,102,219,243,96,198,0,24,24,24,24,24,0,118,0,24,0,108,0,0,126,0,216,200,192,108,24,216,102,24,102,198,108,102,219,219,96,198,254,24,12,48,24,24,126,0,0,24,24,236,0,0,126,0,220,220,192,108,24,216,102,24,102,254,198,62,219,219,124,198,0,126,6,96,24,24,0,220,0,0,0,12,54,126,126,0,118,206,192,254,48,126,102,220,102,198,198,12,126,126,96,198,0,24,12,48,24,24,24,118,0,0,0,12,54,50,126,0,0,198,198,0,96,0,0,118,60,198,198,24,0,6,96,198,254,24,24,24,27,24,0,0,56,0,0,12,54,24,126,0,0,206,198,0,198,0,0,0,24,108,108,48,0,3,48,124,0,0,48,12,27,24,0,0,108,0,0,12,54,12,0,0,0,124,254,0,254,0,0,0,126,56,56,30,0,0,28,0,0,0,0,0,14,24,0,0,108,0,0,12,54,102,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,56,0,0,15,108,60,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,24,24,0,24,24,54,0,54,0,54,54,0,54,0,0,24,54,0,0,24,54,54,24,0,24,255,255,240,15,0,0,0,24,24,0,24,24,54,0,54,0,54,54,0,54,0,0,24,54,0,0,24,54,54,24,0,24,255,255,240,15,0,0,0,24,24,0,24,24,54,0,54,0,54,54,0,54,0,0,24,54,0,0,24,54,54,24,0,24,255,255,240,15,0,0,0,24,24,0,24,24,54,0,54,0,54,54,0,54,0,0,24,54,0,0,24,54,54,24,0,24,255,255,240,15,0,0,0,24,24,0,24,24,54,0,54,0,54,54,0,54,0,0,24,54,0,0,24,54,54,24,0,24,255,255,240,15,0,0,0,24,24,0,24,24,54,0,54,0,54,54,0,54,0,0,24,54,0,0,24,54,54,24,0,24,255,255,240,15,0,0,0,24,24,0,24,24,54,0,54,0,54,54,0,54,0,0,24,54,0,0,24,54,54,24,0,24,255,255,240,15,0,0,0,24,24,0,24,24,54,0,54,0,54,54,0,54,0,0,24,54,0,0,24,54,54,24,0,24,255,255,240,15,0,31,255,255,31,255,255,31,55,63,55,255,247,55,255,247,255,255,255,255,63,31,31,63,255,255,248,31,255,255,240,15,0,24,24,0,24,0,24,24,54,48,48,0,0,48,0,0,0,54,0,0,54,24,24,0,54,24,24,0,255,0,240,15,255,24,24,0,24,0,24,31,54,55,63,247,255,55,255,247,255,54,255,0,54,31,31,0,54,255,24,0,255,0,240,15,255,24,24,0,24,0,24,24,54,54,0,54,0,54,0,54,24,54,0,0,54,24,0,0,54,24,24,0,255,0,240,15,255,24,24,0,24,0,24,24,54,54,0,54,0,54,0,54,24,54,0,0,54,24,0,0,54,24,24,0,255,0,240,15,255,24,24,0,24,0,24,24,54,54,0,54,0,54,0,54,24,54,0,0,54,24,0,0,54,24,24,0,255,0,240,15,255,24,24,0,24,0,24,24,54,54,0,54,0,54,0,54,24,54,0,0,54,24,0,0,54,24,24,0,255,0,240,15,255,24,24,0,24,0,24,24,54,54,0,54,0,54,0,54,24,54,0,0,54,24,0,0,54,24,24,0,255,0,240,15,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,68,170,119,24,24,24,54,54,24,54,54,54,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,85,221,24,24,24,54,54,24,54,54,54,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,62,6,0,0,0,68,170,119,24,24,24,54,54,24,54,54,54,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,24,6,0,0,0,17,85,221,24,24,24,54,54,24,54,54,54,0,0,0,24,118,24,124,120,102,198,0,0,124,0,0,12,63,24,0,0,68,170,119,24,24,24,54,54,24,54,54,54,0,0,0,24,204,24,198,204,102,198,0,0,198,192,6,134,154,60,0,0,17,85,221,24,24,24,54,54,24,54,54,54,0,0,0,24,204,24,198,204,102,198,0,0,198,192,6,220,206,60,54,216,68,170,119,24,24,24,54,54,24,54,54,54,0,0,0,24,204,24,198,204,102,206,0,0,192,192,6,96,102,60,108,108,17,85,221,24,24,24,54,54,24,54,54,54,0,0,0,24,124,24,198,204,102,222,126,124,96,192,6,48,48,24,216,54,68,170,119,24,248,248,246,254,248,246,54,246,254,254,248,248,12,24,198,204,102,254,0,0,48,254,254,24,24,24,108,108,17,85,221,24,24,24,54,0,24,6,54,6,6,54,24,0,120,56,124,204,92,246,62,56,48,0,0,108,108,24,54,216,68,170,119,24,24,248,54,0,248,246,54,254,246,54,248,0,0,0,0,0,0,230,108,108,0,0,0,102,102,0,0,0,17,85,221,24,24,24,54,0,0,54,54,0,54,54,24,0,96,48,96,96,220,198,108,108,48,0,0,98,98,24,0,0,68,170,119,24,24,24,54,0,0,54,54,0,54,54,24,0,48,24,48,48,118,0,60,56,48,0,0,224,224,24,0,0,17,85,221,24,24,24,54,0,0,54,54,0,54,54,24,0,24,12,24,24,0,220,0,0,0,0,0,96,96,0,0,0,68,170,119,24,24,24,54,0,0,54,54,0,54,54,24,0,0,0,0,0,0,118,0,0,0,0,0,0,0,0,0,0,17,85,221,24,24,24,54,0,0,54,54,0,54,54,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,0,0,0,0,0,0,0,56,0,0,0,0,0,0,112,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,140,0,0,0,0,0,0,0,204,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,24,120,124,118,118,118,118,124,124,124,124,24,24,24,198,198,252,110,206,124,124,124,120,120,118,124,124,24,254,24,198,112,60,204,194,204,204,204,204,198,194,194,194,24,24,24,198,198,192,216,204,198,198,198,204,204,206,198,198,24,96,126,204,216,102,204,192,204,204,204,204,192,192,192,192,24,24,24,198,198,192,216,204,198,198,198,204,204,198,198,198,124,96,24,204,24,198,204,192,204,204,204,204,192,192,192,192,24,24,24,254,198,192,126,204,198,198,198,204,204,198,198,198,198,96,126,204,24,192,204,254,124,124,124,124,192,254,254,254,24,24,24,198,254,240,54,204,198,198,198,204,204,198,198,198,192,96,24,222,24,192,204,198,12,12,12,12,198,198,198,198,24,24,24,198,198,192,54,254,198,198,198,204,204,198,198,198,192,248,60,204,126,192,204,124,120,120,120,120,124,124,124,124,56,56,56,108,108,192,236,204,124,124,124,204,204,198,198,198,192,96,102,196,24,102,0,0,0,0,0,0,0,0,0,0,0,0,0,56,56,192,0,204,0,0,0,0,0,0,198,198,198,96,102,248,24,60,204,48,108,0,24,56,0,108,0,24,0,102,24,16,16,252,0,108,108,0,24,204,24,0,124,198,124,98,102,204,24,0,204,24,56,204,48,108,0,56,198,48,102,60,48,0,56,0,0,62,56,198,48,120,48,198,0,0,24,60,102,204,27,0,0,12,16,0,96,56,0,16,0,96,0,24,96,198,108,48,0,0,16,0,96,48,96,0,198,198,24,0,0,248,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,0,0,120,0,0,0,0,0,192,12,0,0,0,0,0,0,0,120,0,0,0,0,0,0,0,0,0,0,0,0,0,140,0,0,204,0,0,0,0,0,192,12,0,0,0,0,0,0,0,140,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,204,0,0,0,0,0,192,12,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,118,248,120,124,124,48,124,204,24,12,204,24,198,204,120,248,124,192,124,48,120,16,108,198,118,254,14,24,112,0,0,0,204,204,196,204,194,48,204,204,24,12,204,24,214,204,204,204,204,192,134,48,204,108,254,108,206,192,24,24,24,0,254,0,204,204,192,204,192,48,204,204,24,12,216,24,214,204,204,204,204,192,6,48,204,198,214,56,198,96,24,24,24,0,198,0,204,204,192,204,192,48,204,204,24,12,240,24,214,204,204,204,204,192,28,48,204,198,214,56,198,48,24,24,24,0,198,0,124,204,192,204,254,48,204,204,24,12,240,24,214,204,204,204,204,204,112,48,204,198,214,56,198,24,24,24,24,0,198,0,12,204,196,204,198,120,204,236,24,12,216,24,254,204,204,204,204,236,194,48,204,198,198,108,198,12,112,24,14,0,108,0,120,248,120,124,124,48,124,216,56,12,204,24,236,184,120,248,124,184,124,252,204,198,198,198,198,254,24,24,24,0,56,0,0,192,0,12,0,50,0,192,0,0,192,24,0,0,0,0,0,0,0,48,0,0,0,0,0,0,24,24,24,0,16,12,0,192,0,12,0,54,0,192,24,12,192,24,0,0,0,0,0,0,0,48,0,0,0,0,0,0,24,24,24,0,0,24,0,192,0,12,0,28,0,192,24,12,192,56,0,0,0,0,0,0,0,48,0,0,0,0,0,0,14,24,112,220,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,118,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,124,198,252,60,248,252,192,62,198,24,120,194,252,198,198,124,192,124,198,124,24,124,16,108,198,24,254,60,2,60,0,0,192,198,198,102,220,192,192,102,198,24,204,198,192,198,198,198,192,222,198,134,24,198,56,238,198,24,192,48,6,12,0,0,220,198,198,194,206,192,192,198,198,24,204,204,192,198,198,198,192,214,204,6,24,198,108,254,108,24,192,48,14,12,0,0,222,198,198,192,198,192,192,198,198,24,204,216,192,198,198,198,192,198,204,6,24,198,198,214,124,24,96,48,28,12,0,0,222,254,198,192,198,192,192,222,198,24,12,240,192,198,206,198,192,198,216,12,24,198,198,214,56,24,48,48,56,12,0,0,222,198,252,192,198,248,248,192,254,24,12,240,192,214,222,198,252,198,252,56,24,198,198,214,56,60,24,48,112,12,0,0,198,198,198,192,198,192,192,192,198,24,12,216,192,254,254,198,198,198,198,96,24,198,198,198,124,102,12,48,224,12,0,0,198,108,198,194,206,192,192,192,198,24,12,204,192,254,246,198,198,198,198,192,24,198,198,198,108,102,6,48,192,12,0,0,124,56,198,102,220,192,192,98,198,24,12,198,192,238,230,198,198,198,198,194,126,198,198,198,198,102,6,48,128,12,198,0,0,16,252,60,248,252,252,60,198,24,30,194,192,198,198,124,252,124,252,124,126,198,198,198,198,102,254,60,0,60,108,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,108,124,134,118,0,12,48,0,0,24,0,24,128,56,24,254,124,12,124,124,48,124,120,0,48,6,0,96,24,0,24,0,108,198,198,204,0,24,24,0,0,24,0,24,192,108,24,192,134,12,134,198,48,198,140,24,24,12,0,48,24,0,0,0,254,134,96,204,0,48,12,102,24,24,0,0,96,198,24,192,6,12,6,198,48,198,6,24,24,24,0,24,0,0,24,0,108,6,48,204,0,48,12,60,24,0,0,0,48,230,24,96,6,12,6,198,48,198,6,0,0,48,126,12,24,0,24,0,108,6,24,220,0,48,12,255,126,0,254,0,24,246,24,48,6,254,6,230,24,198,6,0,0,96,0,6,24,0,24,0,108,124,12,118,0,48,12,60,24,0,0,0,12,222,24,24,60,204,252,220,12,124,126,0,0,48,0,12,24,0,60,0,254,192,198,56,0,48,12,102,24,0,0,0,6,206,24,12,6,108,192,192,6,198,198,24,24,24,126,24,12,0,60,36,108,194,194,108,96,48,12,0,0,0,0,0,2,198,120,6,6,60,192,192,6,198,198,24,24,12,0,48,198,0,60,102,108,198,0,108,48,24,24,0,0,0,0,0,0,108,56,198,134,28,192,96,6,198,198,0,0,6,0,96,198,0,24,102,0,124,0,56,48,12,48,0,0,0,0,0,0,56,24,124,124,12,254,60,254,124,124,0,0,0,0,0,124,0,0,102,0,24,0,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,255,0,0,0,192,0,0,0,0,0,0,124,0,0,0,0,0,0,0,0,0,0,0,126,126,16,0,60,60,0,255,0,255,120,24,224,230,24,128,2,0,102,27,198,254,126,24,24,0,0,0,0,0,0,0,129,255,56,16,24,24,0,255,60,195,204,24,240,231,24,192,6,24,102,27,12,254,24,24,60,0,0,0,0,254,16,0,129,255,124,56,24,24,24,231,102,153,204,126,112,103,219,224,14,60,0,27,56,254,60,24,126,24,48,254,40,254,56,0,153,231,254,124,231,126,60,195,66,189,204,24,48,99,60,240,30,126,102,27,108,254,126,24,24,12,96,192,108,124,56,0,189,195,254,254,231,255,60,195,66,189,204,60,48,99,231,248,62,24,102,27,198,0,24,24,24,254,254,192,254,124,124,0,129,255,254,124,231,255,24,231,102,153,120,102,48,99,60,254,254,24,102,123,198,0,24,24,24,12,96,192,108,56,124,0,129,255,254,56,60,126,0,255,60,195,50,102,48,99,219,248,62,24,102,219,108,0,24,24,24,24,48,0,40,56,254,0,165,219,108,16,60,60,0,255,0,255,26,102,63,127,24,240,30,126,102,219,56,0,126,126,24,0,0,0,0,16,254,0,129,255,0,0,24,24,0,255,0,255,14,102,51,99,24,224,14,60,102,219,96,0,60,60,24,0,0,0,0,0,0,0,126,126,0,0,0,0,0,255,0,255,30,60,63,127,0,192,6,24,102,127,198,0,24,24,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,255,0,0,0,0,0,128,2,0,0,0,124,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,0,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,136,24,0,0,56,24,0,0,208,23,0,0,120,23,0,0,40,23,0,0,248,22,0,0,192,22,0,0,136,24,0,0,56,24,0,0,208,23,0,0,120,23,0,0,248,25,0,0,200,25,0,0,120,25,0,0,254,255,0,0,0,0,0,0,0,0,1,0,1,0,1,0,2,0,1,0,3,0,1,0,4,0,1,0,5,0,1,0,6,0,1,0,7,0,1,0,8,0,1,0,9,0,1,0,10,0,1,0,11,0,1,0,12,0,1,0,13,0,1,0,14,0,1,0,15,0,1,0,16,0,1,0,17,0,1,0,18,0,1,0,19,0,1,0,20,0,1,0,21,0,1,0,22,0,1,0,23,0,1,0,24,0,1,0,25,0,1,0,26,0,1,0,27,0,1,0,28,0,1,0,29,0,1,0,30,0,1,0,31,0,1,0,32,0,0,0,33,0,0,0,34,0,0,0,35,0,0,0,36,0,0,0,37,0,0,0,38,0,0,0,39,0,0,0,40,0,0,0,41,0,0,0,42,0,0,0,26,0,1,0,27,0,1,0,24,0,1,0,25,0,1,0,47,0,0,0,219,0,0,0,49,0,0,0,50,0,0,0,51,0,0,0,52,0,0,0,53,0,0,0,54,0,0,0,55,0,0,0,56,0,0,0,57,0,0,0,58,0,0,0,59,0,0,0,60,0,0,0,61,0,0,0,62,0,0,0,63,0,0,0,64,0,0,0,65,0,0,0,66,0,0,0,67,0,0,0,68,0,0,0,69,0,0,0,70,0,0,0,71,0,0,0,72,0,0,0,73,0,0,0,74,0,0,0,75,0,0,0,76,0,0,0,77,0,0,0,78,0,0,0,79,0,0,0,80,0,0,0,81,0,0,0,82,0,0,0,83,0,0,0,84,0,0,0,85,0,0,0,86,0,0,0,87,0,0,0,88,0,0,0,89,0,0,0,90,0,0,0,91,0,0,0,92,0,0,0,93,0,0,0,94,0,0,0,95,0,0,0,4,0,1,0,177,0,0,0,98,0,0,0,99,0,0,0,100,0,0,0,101,0,0,0,248,0,0,0,241,0,0,0,176,0,0,0,15,0,1,0,217,0,0,0,191,0,0,0,218,0,0,0,192,0,0,0,197,0,0,0,45,0,0,0,45,0,0,0,196,0,0,0,45,0,0,0,95,0,0,0,195,0,0,0,180,0,0,0,193,0,0,0,194,0,0,0,179,0,0,0,243,0,0,0,242,0,0,0,227,0,0,0,216,0,0,0,156,0,0,0,249,0,0,0,127,0,1,0,80,68,67,95,76,73,78,69,83,0,0,0,0,0,0,0,32,32,32,32,32,32,32,95,124,95,124,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,0,0,0,112,100,99,105,99,111,110,46,98,109,112,0,0,0,0,0,70,37,100,0,0,0,0,0,32,32,32,32,39,58,59,59,59,59,44,44,46,46,45,96,96,34,45,45,45,45,45,39,34,96,32,0,0,0,0,0,80,68,67,95,73,67,79,78,0,0,0,0,0,0,0,0,32,32,39,59,59,59,44,44,32,32,32,32,34,44,95,32,34,61,45,45,45,45,45,45,46,32,32,0,0,0,0,0,112,100,99,117,114,115,101,115,124,80,68,67,117,114,115,101,115,32,102,111,114,32,37,115,0,0,0,0,0,0,0,0,112,100,99,98,97,99,107,46,98,109,112,0,0,0,0,0,32,32,124,59,59,44,32,32,32,32,32,32,34,45,46,95,32,32,32,32,32,32,32,32,32,32,32,32,0,0,0,0,105,110,105,116,115,99,114,40,41,58,32,85,110,97,98,108,101,32,116,111,32,99,114,101,97,116,101,32,115,116,100,115,99,114,46,10,0,0,0,0,80,68,67,95,66,65,67,75,71,82,79,85,78,68,0,0,32,32,124,44,32,32,32,32,34,45,46,95,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,0,0,0,0,105,110,105,116,115,99,114,40,41,58,32,85,110,97,98,108,101,32,116,111,32,99,114,101,97,116,101,32,112,100,99,95,108,97,115,116,115,99,114,46,10,0,0,0,0,0,0,0,67,111,117,108,100,32,110,111,116,32,108,111,97,100,32,102,111,110,116,10,0,0,0,0,95,95,47,32,111,32,32,34,46,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,0,0,0,0,105,110,105,116,115,99,114,40,41,58,32,85,110,97,98,108,101,32,116,111,32,99,114,101,97,116,101,32,99,117,114,115,99,114,46,10,0,0,0,0,114,98,0,0,0,0,0,0,32,32,32,46,45,45,46,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,0,0,0,105,110,105,116,115,99,114,40,41,58,32,76,73,78,69,83,61,37,100,32,67,79,76,83,61,37,100,58,32,116,111,111,32,115,109,97,108,108,46,10,0,0,0,0,0,0,0,0,112,100,99,102,111,110,116,46,98,109,112,0,0,0,0,0,115,101,116,116,105,110,103,32,115,105,103,110,97,108,32,104,97,110,100,108,101,114,32,102,97,105,108,117,114,101,10,0,83,68,76,0,0,0,0,0,67,111,117,108,100,32,110,111,116,32,115,116,97,114,116,32,83,68,76,58,32,37,115,10,0,0,0,0,0,0,0,0,105,110,105,116,115,99,114,40,41,58,32,85,110,97,98,108,101,32,116,111,32,99,114,101,97,116,101,32,83,80,10,0,80,68,67,95,79,82,73,71,73,78,65,76,95,67,79,76,79,82,83,0,0,0,0,0,80,68,67,117,114,115,101,115,0,0,0,0,0,0,0,0,32,32,32,32,32,95,47,32,32,32,95,92,32,32,32,32,32,32,32,32,32,32,96,39,34,96,32,0,0,0,0,0,80,68,67,95,70,79,78,84,0,0,0,0,0,0,0,0,67,111,117,108,100,110,39,116,32,99,114,101,97,116,101,32,97,32,115,117,114,102,97,99,101,58,32,37,115,10,0,0,32,32,32,32,39,58,59,59,59,59,44,44,46,46,45,96,96,34,45,46,95,96,34,45,46,32,32,0,0,0,0,0,80,68,67,95,67,79,76,83,0,0,0,0,0,0,0,0,32,32,39,59,59,59,44,44,32,32,32,32,34,44,95,32,34,61,45,46,95,32,32,32,32,32,32,0,0,0,0,0,105,110,105,116,115,99,114,32,102,97,105,108,117,114,101,10,0,0,0,0,0,0,0,0,37,115,10,0,0,0,0,0,8,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);
function runPostSets() {


}

var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}


  
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }

  function _signal(sig, func) {
      // TODO
      return 0;
    }

  
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value;
      return value;
    }
  
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            continue;
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          if (stream.tty.output.length) {
            stream.tty.ops.put_char(stream.tty, 10);
          }
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              result = process['stdin']['read']();
              if (!result) {
                if (process['stdin']['_readableState'] && process['stdin']['_readableState']['ended']) {
                  return null;  // EOF
                }
                return undefined;  // no data available
              }
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }}};
  
  var MEMFS={ops_table:null,CONTENT_OWNING:1,CONTENT_FLEXIBLE:2,CONTENT_FIXED:3,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 0777, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.contents = [];
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },ensureFlexible:function (node) {
        if (node.contentMode !== MEMFS.CONTENT_FLEXIBLE) {
          var contents = node.contents;
          node.contents = Array.prototype.slice.call(contents);
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        }
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.contents.length;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.ensureFlexible(node);
            var contents = node.contents;
            if (attr.size < contents.length) contents.length = attr.size;
            else while (attr.size > contents.length) contents.push(0);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 0777 | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else
          {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          var node = stream.node;
          node.timestamp = Date.now();
          var contents = node.contents;
          if (length && contents.length === 0 && position === 0 && buffer.subarray) {
            // just replace it with the new data
            assert(buffer.length);
            if (canOwn && offset === 0) {
              node.contents = buffer; // this could be a subarray of Emscripten HEAP, or allocated from some other source.
              node.contentMode = (buffer.buffer === HEAP8.buffer) ? MEMFS.CONTENT_OWNING : MEMFS.CONTENT_FIXED;
            } else {
              node.contents = new Uint8Array(buffer.subarray(offset, offset+length));
              node.contentMode = MEMFS.CONTENT_FIXED;
            }
            return length;
          }
          MEMFS.ensureFlexible(node);
          var contents = node.contents;
          while (contents.length < position) contents.push(0);
          for (var i = 0; i < length; i++) {
            contents[position + i] = buffer[offset + i];
          }
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.contents.length;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.ungotten = [];
          stream.position = position;
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.ensureFlexible(stream.node);
          var contents = stream.node.contents;
          var limit = offset + length;
          while (limit > contents.length) contents.push(0);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = {};
        for (var key in src.files) {
          if (!src.files.hasOwnProperty(key)) continue;
          var e = src.files[key];
          var e2 = dst.files[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create[key] = e;
            total++;
          }
        }
  
        var remove = {};
        for (var key in dst.files) {
          if (!dst.files.hasOwnProperty(key)) continue;
          var e = dst.files[key];
          var e2 = src.files[key];
          if (!e2) {
            remove[key] = e;
            total++;
          }
        }
  
        if (!total) {
          // early out
          return callback(null);
        }
  
        var completed = 0;
        function done(err) {
          if (err) return callback(err);
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        // create a single transaction to handle and IDB reads / writes we'll need to do
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        transaction.onerror = function transaction_onerror() { callback(this.error); };
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        for (var path in create) {
          if (!create.hasOwnProperty(path)) continue;
          var entry = create[path];
  
          if (dst.type === 'local') {
            // save file to local
            try {
              if (FS.isDir(entry.mode)) {
                FS.mkdir(path, entry.mode);
              } else if (FS.isFile(entry.mode)) {
                var stream = FS.open(path, 'w+', 0666);
                FS.write(stream, entry.contents, 0, entry.contents.length, 0, true /* canOwn */);
                FS.close(stream);
              }
              done(null);
            } catch (e) {
              return done(e);
            }
          } else {
            // save file to IDB
            var req = store.put(entry, path);
            req.onsuccess = function req_onsuccess() { done(null); };
            req.onerror = function req_onerror() { done(this.error); };
          }
        }
  
        for (var path in remove) {
          if (!remove.hasOwnProperty(path)) continue;
          var entry = remove[path];
  
          if (dst.type === 'local') {
            // delete file from local
            try {
              if (FS.isDir(entry.mode)) {
                // TODO recursive delete?
                FS.rmdir(path);
              } else if (FS.isFile(entry.mode)) {
                FS.unlink(path);
              }
              done(null);
            } catch (e) {
              return done(e);
            }
          } else {
            // delete file from IDB
            var req = store.delete(path);
            req.onsuccess = function req_onsuccess() { done(null); };
            req.onerror = function req_onerror() { done(this.error); };
          }
        }
      },getLocalSet:function (mount, callback) {
        var files = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint)
          .filter(isRealDir)
          .map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat, node;
  
          try {
            var lookup = FS.lookupPath(path);
            node = lookup.node;
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path)
              .filter(isRealDir)
              .map(toAbsolute(path)));
  
            files[path] = { mode: stat.mode, timestamp: stat.mtime };
          } else if (FS.isFile(stat.mode)) {
            files[path] = { contents: node.contents, mode: stat.mode, timestamp: stat.mtime };
          } else {
            return callback(new Error('node type not supported'));
          }
        }
  
        return callback(null, { type: 'local', files: files });
      },getDB:function (name, callback) {
        // look it up in the cache
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        req.onupgradeneeded = function req_onupgradeneeded() {
          db = req.result;
          db.createObjectStore(IDBFS.DB_STORE_NAME);
        };
        req.onsuccess = function req_onsuccess() {
          db = req.result;
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function req_onerror() {
          callback(this.error);
        };
      },getRemoteSet:function (mount, callback) {
        var files = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function transaction_onerror() { callback(this.error); };
  
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          store.openCursor().onsuccess = function store_openCursor_onsuccess(event) {
            var cursor = event.target.result;
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, files: files });
            }
  
            files[cursor.key] = cursor.value;
            cursor.continue();
          };
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so 
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(length);
          var res;
          try {
            res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          if (res > 0) {
            for (var i = 0; i < res; i++) {
              buffer[offset + i] = nbuffer[i];
            }
          }
          return res;
        },write:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
          var res;
          try {
            res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return res;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
  
          stream.position = position;
          return position;
        }}};
  
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      // we don't currently perform any user-space buffering of data
    }var FS={root:null,mounts:[],devices:[null],streams:[null],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || { recurse_count: 0 };
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            current = current.mount.root;
          }
  
          // follow symlinks
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
              
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
            this.parent = null;
            this.mount = null;
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            FS.hashAddNode(this);
          };
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          FS.FSNode.prototype = {};
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); },
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); },
            },
          });
        }
        return new FS.FSNode(parent, name, mode, rdev);
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        return FS.nodePermissions(dir, 'x');
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 1;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        if (stream.__proto__) {
          // reuse the object
          stream.__proto__ = FS.FSStream.prototype;
        } else {
          var newStream = new FS.FSStream();
          for (var p in stream) {
            newStream[p] = stream[p];
          }
          stream = newStream;
        }
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        var completed = 0;
        var total = FS.mounts.length;
        function done(err) {
          if (err) {
            return callback(err);
          }
          if (++completed >= total) {
            callback(null);
          }
        };
  
        // sync all mounts
        for (var i = 0; i < FS.mounts.length; i++) {
          var mount = FS.mounts[i];
          if (!mount.type.syncfs) {
            done(null);
            continue;
          }
          mount.type.syncfs(mount, populate, done);
        }
      },mount:function (type, opts, mountpoint) {
        var lookup;
        if (mountpoint) {
          lookup = FS.lookupPath(mountpoint, { follow: false });
          mountpoint = lookup.path;  // use the absolute path
        }
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          root: null
        };
        // create a root node for the fs
        var root = type.mount(mount);
        root.mount = mount;
        mount.root = root;
        // assign the mount info to the mountpoint's node
        if (lookup) {
          lookup.node.mount = mount;
          lookup.node.mounted = true;
          // compatibility update FS.root if we mount to /
          if (mountpoint === '/') {
            FS.root = mount.root;
          }
        }
        // add to our cached list of mounts
        FS.mounts.push(mount);
        return root;
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 0666;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 0777;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 0666;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:function (path) {
        var lookup = FS.lookupPath(path, { follow: false });
        var link = lookup.node;
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return link.node_ops.readlink(link);
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 0666 : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions
        var err = FS.mayOpen(node, flags);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        return stream.stream_ops.llseek(stream, offset, whence);
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = '';
          var utf8 = new Runtime.UTF8Processor();
          for (var i = 0; i < length; i++) {
            ret += utf8.processCChar(buf[i]);
          }
        } else if (opts.encoding === 'binary') {
          ret = buf;
        } else {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0);
        } else {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function() { return 0; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=stdin.fd;
        assert(stdin.fd === 1, 'invalid handle for stdin (' + stdin.fd + ')');
  
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=stdout.fd;
        assert(stdout.fd === 2, 'invalid handle for stdout (' + stdout.fd + ')');
  
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=stderr.fd;
        assert(stderr.fd === 3, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno) {
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
          this.message = ERRNO_MESSAGES[errno];
          if (this.stack) this.stack = demangleAll(this.stack);
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.root = FS.createNode(null, '/', 16384 | 0777, 0);
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = Math.floor(idx / this.chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          }
          LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
              // Find length
              var xhr = new XMLHttpRequest();
              xhr.open('HEAD', url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var chunkSize = 1024*1024; // Chunk size in bytes
  
              if (!hasByteServing) chunkSize = datalength;
  
              // Function to get a range from the remote URL.
              var doXHR = (function(from, to) {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
                // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
                // Some hints to the browser that we want binary data.
                if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
                if (xhr.overrideMimeType) {
                  xhr.overrideMimeType('text/plain; charset=x-user-defined');
                }
  
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                if (xhr.response !== undefined) {
                  return new Uint8Array(xhr.response || []);
                } else {
                  return intArrayFromString(xhr.responseText || '', true);
                }
              });
              var lazyArray = this;
              lazyArray.setDataGetter(function(chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum+1) * chunkSize - 1; // including this byte
                end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
                  lazyArray.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
                return lazyArray.chunks[chunkNum];
              });
  
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
          }
  
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};
  
  
  
  
  var _mkport=undefined;var SOCKFS={mount:function (mount) {
        return FS.createNode(null, '/', 16384 | 0777, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
  
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
  
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
  
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
  
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
  
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
  
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
  
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              var url = 'ws://' + addr + ':' + port;
              // the node ws library API is slightly different than the browser's
              var opts = ENVIRONMENT_IS_NODE ? {headers: {'websocket-protocol': ['binary']}} : ['binary'];
              // If node we use the ws library.
              var WebSocket = ENVIRONMENT_IS_NODE ? require('ws') : window['WebSocket'];
              ws = new WebSocket(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
  
  
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
  
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
  
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
  
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
  
          var handleOpen = function () {
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
  
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
            data = new Uint8Array(data);  // make a typed array view on the array buffer
  
  
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
  
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
          };
  
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, flags) {
              if (!flags.binary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer);  // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('error', function() {
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
  
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
  
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
  
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
  
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
  
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port || _mkport();
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODS.EOPNOTSUPP);
          }
  
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
  
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
  
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
  
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
          if (sock.server) {
             throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host: host,
            port: sock.sport
            // TODO support backlog
          });
  
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
  
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
  
              // push to queue for accept to pick up
              sock.pending.push(newsock);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
            }
          });
          sock.server.on('closed', function() {
            sock.server = null;
          });
          sock.server.on('error', function() {
            // don't throw
          });
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
  
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
  
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          var data;
          if (buffer instanceof Array || buffer instanceof ArrayBuffer) {
            data = buffer.slice(offset, offset + length);
          } else {  // ArrayBufferView
            data = buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + length);
          }
  
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
  
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
  
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
  
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
  
  
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
  
          return res;
        }}};function _send(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _write(fd, buf, len);
    }
  
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var bytesWritten = _write(stream, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStream(stream);
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }

  
  
  
  
  var _environ=allocate(1, "i32*", ALLOC_STATIC);var ___environ=_environ;function ___buildEnvironment(env) {
      // WARNING: Arbitrary limit!
      var MAX_ENV_VALUES = 64;
      var TOTAL_ENV_SIZE = 1024;
  
      // Statically allocate memory for the environment.
      var poolPtr;
      var envPtr;
      if (!___buildEnvironment.called) {
        ___buildEnvironment.called = true;
        // Set default values. Use string keys for Closure Compiler compatibility.
        ENV['USER'] = 'root';
        ENV['PATH'] = '/';
        ENV['PWD'] = '/';
        ENV['HOME'] = '/home/emscripten';
        ENV['LANG'] = 'en_US.UTF-8';
        ENV['_'] = './this.program';
        // Allocate memory.
        poolPtr = allocate(TOTAL_ENV_SIZE, 'i8', ALLOC_STATIC);
        envPtr = allocate(MAX_ENV_VALUES * 4,
                          'i8*', ALLOC_STATIC);
        HEAP32[((envPtr)>>2)]=poolPtr;
        HEAP32[((_environ)>>2)]=envPtr;
      } else {
        envPtr = HEAP32[((_environ)>>2)];
        poolPtr = HEAP32[((envPtr)>>2)];
      }
  
      // Collect key=value lines.
      var strings = [];
      var totalSize = 0;
      for (var key in env) {
        if (typeof env[key] === 'string') {
          var line = key + '=' + env[key];
          strings.push(line);
          totalSize += line.length;
        }
      }
      if (totalSize > TOTAL_ENV_SIZE) {
        throw new Error('Environment size exceeded TOTAL_ENV_SIZE!');
      }
  
      // Make new.
      var ptrSize = 4;
      for (var i = 0; i < strings.length; i++) {
        var line = strings[i];
        writeAsciiToMemory(line, poolPtr);
        HEAP32[(((envPtr)+(i * ptrSize))>>2)]=poolPtr;
        poolPtr += line.length + 1;
      }
      HEAP32[(((envPtr)+(strings.length * ptrSize))>>2)]=0;
    }var ENV={};function _getenv(name) {
      // char *getenv(const char *name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/getenv.html
      if (name === 0) return 0;
      name = Pointer_stringify(name);
      if (!ENV.hasOwnProperty(name)) return 0;
  
      if (_getenv.ret) _free(_getenv.ret);
      _getenv.ret = allocate(intArrayFromString(ENV[name]), 'i8', ALLOC_NORMAL);
      return _getenv.ret;
    }

  
  function _memset(ptr, value, num) {
      ptr = ptr|0; value = value|0; num = num|0;
      var stop = 0, value4 = 0, stop4 = 0, unaligned = 0;
      stop = (ptr + num)|0;
      if ((num|0) >= 20) {
        // This is unaligned, but quite large, so work hard to get to aligned settings
        value = value & 0xff;
        unaligned = ptr & 3;
        value4 = value | (value << 8) | (value << 16) | (value << 24);
        stop4 = stop & ~3;
        if (unaligned) {
          unaligned = (ptr + 4 - unaligned)|0;
          while ((ptr|0) < (unaligned|0)) { // no need to check for stop, since we have large num
            HEAP8[(ptr)]=value;
            ptr = (ptr+1)|0;
          }
        }
        while ((ptr|0) < (stop4|0)) {
          HEAP32[((ptr)>>2)]=value4;
          ptr = (ptr+4)|0;
        }
      }
      while ((ptr|0) < (stop|0)) {
        HEAP8[(ptr)]=value;
        ptr = (ptr+1)|0;
      }
      return (ptr-num)|0;
    }var _llvm_memset_p0i8_i32=_memset;

  function _llvm_lifetime_start() {}

  function _llvm_lifetime_end() {}

  
  
  function _strlen(ptr) {
      ptr = ptr|0;
      var curr = 0;
      curr = ptr;
      while (HEAP8[(curr)]) {
        curr = (curr + 1)|0;
      }
      return (curr - ptr)|0;
    }
  
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = HEAPF64[(((varargs)+(argIndex))>>3)];
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+8))>>2)]];
          argIndex += 8; // each 32-bit chunk is in a 64-bit block
  
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Math.max(Runtime.getNativeFieldSize(type), Runtime.getAlignSize(type, null, true));
        return ret;
      }
  
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          var flagPadSign = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              case 32:
                flagPadSign = true;
                break;
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
  
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
  
          // Handle precision.
          var precisionSet = false, precision = -1;
          if (next == 46) {
            precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          }
          if (precision === -1) {
            precision = 6; // Standard default.
            precisionSet = false;
          }
  
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
  
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
  
              // Add sign if needed
              if (currArg >= 0) {
                if (flagAlwaysSigned) {
                  prefix = '+' + prefix;
                } else if (flagPadSign) {
                  prefix = ' ' + prefix;
                }
              }
  
              // Move sign to prefix so we zero-pad after the sign
              if (argText.charAt(0) == '-') {
                prefix = '-' + prefix;
                argText = argText.substr(1);
              }
  
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
  
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
  
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
  
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
  
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
  
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
  
                // Add sign.
                if (currArg >= 0) {
                  if (flagAlwaysSigned) {
                    argText = '+' + argText;
                  } else if (flagPadSign) {
                    argText = ' ' + argText;
                  }
                }
              }
  
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
  
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
  
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)|0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length;
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _fprintf(stream, format, varargs) {
      // int fprintf(FILE *restrict stream, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var stack = Runtime.stackSave();
      var ret = _fwrite(allocate(result, 'i8', ALLOC_STACK), 1, result.length, stream);
      Runtime.stackRestore(stack);
      return ret;
    }

  
  function _snprintf(s, n, format, varargs) {
      // int snprintf(char *restrict s, size_t n, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var limit = (n === undefined) ? result.length
                                    : Math.min(result.length, Math.max(n - 1, 0));
      if (s < 0) {
        s = -s;
        var buf = _malloc(limit+1);
        HEAP32[((s)>>2)]=buf;
        s = buf;
      }
      for (var i = 0; i < limit; i++) {
        HEAP8[(((s)+(i))|0)]=result[i];
      }
      if (limit < n || (n === undefined)) HEAP8[(((s)+(i))|0)]=0;
      return result.length;
    }function _sprintf(s, format, varargs) {
      // int sprintf(char *restrict s, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      return _snprintf(s, undefined, format, varargs);
    }

  
  function _memcpy(dest, src, num) {
      dest = dest|0; src = src|0; num = num|0;
      var ret = 0;
      ret = dest|0;
      if ((dest&3) == (src&3)) {
        while (dest & 3) {
          if ((num|0) == 0) return ret|0;
          HEAP8[(dest)]=HEAP8[(src)];
          dest = (dest+1)|0;
          src = (src+1)|0;
          num = (num-1)|0;
        }
        while ((num|0) >= 4) {
          HEAP32[((dest)>>2)]=HEAP32[((src)>>2)];
          dest = (dest+4)|0;
          src = (src+4)|0;
          num = (num-4)|0;
        }
      }
      while ((num|0) > 0) {
        HEAP8[(dest)]=HEAP8[(src)];
        dest = (dest+1)|0;
        src = (src+1)|0;
        num = (num-1)|0;
      }
      return ret|0;
    }var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;

  function _vsnprintf(s, n, format, va_arg) {
      return _snprintf(s, n, format, HEAP32[((va_arg)>>2)]);
    }

  var _llvm_va_start=undefined;

  function _llvm_va_end() {}

  
  
  var Browser={mainLoop:{scheduler:null,shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
  
        if (Browser.initted || ENVIRONMENT_IS_WORKER) return;
        Browser.initted = true;
  
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            assert(typeof url == 'string', 'createObjectURL must return a url as a string');
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
  
        // Canvas event setup
  
        var canvas = Module['canvas'];
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'];
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'] ||
                                 function(){}; // no-op if function does not exist
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas;
        }
  
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
  
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        var ctx;
        try {
          if (useWebGL) {
            var contextAttributes = {
              antialias: false,
              alpha: false
            };
  
            if (webGLContextAttributes) {
              for (var attribute in webGLContextAttributes) {
                contextAttributes[attribute] = webGLContextAttributes[attribute];
              }
            }
  
  
            var errorInfo = '?';
            function onContextCreationError(event) {
              errorInfo = event.statusMessage || errorInfo;
            }
            canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
            try {
              ['experimental-webgl', 'webgl'].some(function(webglId) {
                return ctx = canvas.getContext(webglId, contextAttributes);
              });
            } finally {
              canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);
            }
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas: ' + [errorInfo, e]);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
  
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          GLctx = Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement']) === canvas) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'];
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else if (Browser.resizeCanvas){
            Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
        }
  
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
        }
  
        canvas.requestFullScreen = canvas['requestFullScreen'] ||
                                   canvas['mozRequestFullScreen'] ||
                                   (canvas['webkitRequestFullScreen'] ? function() { canvas['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvas.requestFullScreen();
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          setTimeout(func, 1000/60);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           window['setTimeout'];
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var x, y;
          
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
          // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
          // and we have no viable fallback.
          assert((typeof scrollX !== 'undefined') && (typeof scrollY !== 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
          if (event.type == 'touchstart' ||
              event.type == 'touchend' ||
              event.type == 'touchmove') {
            var t = event.touches.item(0);
            if (t) {
              x = t.pageX - (scrollX + rect.left);
              y = t.pageY - (scrollY + rect.top);
            } else {
              return;
            }
          } else {
            x = event.pageX - (scrollX + rect.left);
            y = event.pageY - (scrollY + rect.top);
          }
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        canvas.width = width;
        canvas.height = height;
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        var canvas = Module['canvas'];
        this.windowedWidth = canvas.width;
        this.windowedHeight = canvas.height;
        canvas.width = screen.width;
        canvas.height = screen.height;
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        var canvas = Module['canvas'];
        canvas.width = this.windowedWidth;
        canvas.height = this.windowedHeight;
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      }};var SDL={defaults:{width:320,height:200,copyOnLock:true},version:null,surfaces:{},canvasPool:[],events:[],fonts:[null],audios:[null],rwops:[null],music:{audio:null,volume:1},mixerFrequency:22050,mixerFormat:32784,mixerNumChannels:2,mixerChunkSize:1024,channelMinimumNumber:0,GL:false,glAttributes:{0:3,1:3,2:2,3:0,4:0,5:1,6:16,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:1,16:0,17:0,18:0},keyboardState:null,keyboardMap:{},canRequestFullscreen:false,isRequestingFullscreen:false,textInput:false,startTime:null,initFlags:0,buttonState:0,modState:0,DOMButtons:[0,0,0],DOMEventToSDLEvent:{},keyCodes:{16:1249,17:1248,18:1250,33:1099,34:1102,37:1104,38:1106,39:1103,40:1105,46:127,96:1112,97:1113,98:1114,99:1115,100:1116,101:1117,102:1118,103:1119,104:1120,105:1121,112:1082,113:1083,114:1084,115:1085,116:1086,117:1087,118:1088,119:1089,120:1090,121:1091,122:1092,123:1093,173:45,188:44,190:46,191:47,192:96},scanCodes:{8:42,9:43,13:40,27:41,32:44,44:54,46:55,47:56,48:39,49:30,50:31,51:32,52:33,53:34,54:35,55:36,56:37,57:38,59:51,61:46,91:47,92:49,93:48,96:52,97:4,98:5,99:6,100:7,101:8,102:9,103:10,104:11,105:12,106:13,107:14,108:15,109:16,110:17,111:18,112:19,113:20,114:21,115:22,116:23,117:24,118:25,119:26,120:27,121:28,122:29,305:224,308:226},loadRect:function (rect) {
        return {
          x: HEAP32[((rect + 0)>>2)],
          y: HEAP32[((rect + 4)>>2)],
          w: HEAP32[((rect + 8)>>2)],
          h: HEAP32[((rect + 12)>>2)]
        };
      },loadColorToCSSRGB:function (color) {
        var rgba = HEAP32[((color)>>2)];
        return 'rgb(' + (rgba&255) + ',' + ((rgba >> 8)&255) + ',' + ((rgba >> 16)&255) + ')';
      },loadColorToCSSRGBA:function (color) {
        var rgba = HEAP32[((color)>>2)];
        return 'rgba(' + (rgba&255) + ',' + ((rgba >> 8)&255) + ',' + ((rgba >> 16)&255) + ',' + (((rgba >> 24)&255)/255) + ')';
      },translateColorToCSSRGBA:function (rgba) {
        return 'rgba(' + (rgba&0xff) + ',' + (rgba>>8 & 0xff) + ',' + (rgba>>16 & 0xff) + ',' + (rgba>>>24)/0xff + ')';
      },translateRGBAToCSSRGBA:function (r, g, b, a) {
        return 'rgba(' + (r&0xff) + ',' + (g&0xff) + ',' + (b&0xff) + ',' + (a&0xff)/255 + ')';
      },translateRGBAToColor:function (r, g, b, a) {
        return r | g << 8 | b << 16 | a << 24;
      },makeSurface:function (width, height, flags, usePageCanvas, source, rmask, gmask, bmask, amask) {
        flags = flags || 0;
        var surf = _malloc(60);  // SDL_Surface has 15 fields of quantum size
        var buffer = _malloc(width*height*4); // TODO: only allocate when locked the first time
        var pixelFormat = _malloc(44);
        flags |= 1; // SDL_HWSURFACE - this tells SDL_MUSTLOCK that this needs to be locked
  
        //surface with SDL_HWPALETTE flag is 8bpp surface (1 byte)
        var is_SDL_HWPALETTE = flags & 0x00200000;  
        var bpp = is_SDL_HWPALETTE ? 1 : 4;
   
        HEAP32[((surf)>>2)]=flags;        // SDL_Surface.flags
        HEAP32[(((surf)+(4))>>2)]=pixelFormat;// SDL_Surface.format TODO
        HEAP32[(((surf)+(8))>>2)]=width;        // SDL_Surface.w
        HEAP32[(((surf)+(12))>>2)]=height;       // SDL_Surface.h
        HEAP32[(((surf)+(16))>>2)]=width * bpp;      // SDL_Surface.pitch, assuming RGBA or indexed for now,
                                                                                 // since that is what ImageData gives us in browsers
        HEAP32[(((surf)+(20))>>2)]=buffer;     // SDL_Surface.pixels
        HEAP32[(((surf)+(36))>>2)]=0;     // SDL_Surface.offset
  
        HEAP32[(((surf)+(56))>>2)]=1;
  
        HEAP32[((pixelFormat)>>2)]=0 /* XXX missing C define SDL_PIXELFORMAT_RGBA8888 */;// SDL_PIXELFORMAT_RGBA8888
        HEAP32[(((pixelFormat)+(4))>>2)]=0;// TODO
        HEAP8[(((pixelFormat)+(8))|0)]=bpp * 8;
        HEAP8[(((pixelFormat)+(9))|0)]=bpp;
  
        HEAP32[(((pixelFormat)+(12))>>2)]=rmask || 0x000000ff;
        HEAP32[(((pixelFormat)+(16))>>2)]=gmask || 0x0000ff00;
        HEAP32[(((pixelFormat)+(20))>>2)]=bmask || 0x00ff0000;
        HEAP32[(((pixelFormat)+(24))>>2)]=amask || 0xff000000;
  
        // Decide if we want to use WebGL or not
        var useWebGL = (flags & 0x04000000) != 0; // SDL_OPENGL
        SDL.GL = SDL.GL || useWebGL;
        var canvas;
        if (!usePageCanvas) {
          if (SDL.canvasPool.length > 0) {
            canvas = SDL.canvasPool.pop();
          } else {
            canvas = document.createElement('canvas');
          }
          canvas.width = width;
          canvas.height = height;
        } else {
          canvas = Module['canvas'];
        }
  
        var webGLContextAttributes = {
          antialias: ((SDL.glAttributes[13 /*SDL_GL_MULTISAMPLEBUFFERS*/] != 0) && (SDL.glAttributes[14 /*SDL_GL_MULTISAMPLESAMPLES*/] > 1)),
          depth: (SDL.glAttributes[6 /*SDL_GL_DEPTH_SIZE*/] > 0),
          stencil: (SDL.glAttributes[7 /*SDL_GL_STENCIL_SIZE*/] > 0)
        };
        
        var ctx = Browser.createContext(canvas, useWebGL, usePageCanvas, webGLContextAttributes);
              
        SDL.surfaces[surf] = {
          width: width,
          height: height,
          canvas: canvas,
          ctx: ctx,
          surf: surf,
          buffer: buffer,
          pixelFormat: pixelFormat,
          alpha: 255,
          flags: flags,
          locked: 0,
          usePageCanvas: usePageCanvas,
          source: source,
  
          isFlagSet: function(flag) {
            return flags & flag;
          }
        };
  
        return surf;
      },copyIndexedColorData:function (surfData, rX, rY, rW, rH) {
        // HWPALETTE works with palette
        // setted by SDL_SetColors
        if (!surfData.colors) {
          return;
        }
        
        var fullWidth  = Module['canvas'].width;
        var fullHeight = Module['canvas'].height;
  
        var startX  = rX || 0;
        var startY  = rY || 0;
        var endX    = (rW || (fullWidth - startX)) + startX;
        var endY    = (rH || (fullHeight - startY)) + startY;
        
        var buffer  = surfData.buffer;
        var data    = surfData.image.data;
        var colors  = surfData.colors;
  
        for (var y = startY; y < endY; ++y) {
          var indexBase = y * fullWidth;
          var colorBase = indexBase * 4;
          for (var x = startX; x < endX; ++x) {
            // HWPALETTE have only 256 colors (not rgba)
            var index = HEAPU8[((buffer + indexBase + x)|0)] * 3;
            var colorOffset = colorBase + x * 4;
  
            data[colorOffset   ] = colors[index   ];
            data[colorOffset +1] = colors[index +1];
            data[colorOffset +2] = colors[index +2];
            //unused: data[colorOffset +3] = color[index +3];
          }
        }
      },freeSurface:function (surf) {
        var refcountPointer = surf + 56;
        var refcount = HEAP32[((refcountPointer)>>2)];
        if (refcount > 1) {
          HEAP32[((refcountPointer)>>2)]=refcount - 1;
          return;
        }
  
        var info = SDL.surfaces[surf];
        if (!info.usePageCanvas && info.canvas) SDL.canvasPool.push(info.canvas);
        _free(info.buffer);
        _free(info.pixelFormat);
        _free(surf);
        SDL.surfaces[surf] = null;
      },touchX:0,touchY:0,savedKeydown:null,receiveEvent:function (event) {
        switch(event.type) {
          case 'touchstart':
            event.preventDefault();
            var touch = event.touches[0];
            touchX = touch.pageX;
            touchY = touch.pageY;
            var event = {
              type: 'mousedown',
              button: 0,
              pageX: touchX,
              pageY: touchY
            };
            SDL.DOMButtons[0] = 1;
            SDL.events.push(event);
            break;
          case 'touchmove':
            event.preventDefault();
            var touch = event.touches[0];
            touchX = touch.pageX;
            touchY = touch.pageY;
            event = {
              type: 'mousemove',
              button: 0,
              pageX: touchX,
              pageY: touchY
            };
            SDL.events.push(event);
            break;
          case 'touchend':
            event.preventDefault();
            event = {
              type: 'mouseup',
              button: 0,
              pageX: touchX,
              pageY: touchY
            };
            SDL.DOMButtons[0] = 0;
            SDL.events.push(event);
            break;
          case 'mousemove':
            if (Browser.pointerLock) {
              // workaround for firefox bug 750111
              if ('mozMovementX' in event) {
                event['movementX'] = event['mozMovementX'];
                event['movementY'] = event['mozMovementY'];
              }
              // workaround for Firefox bug 782777
              if (event['movementX'] == 0 && event['movementY'] == 0) {
                // ignore a mousemove event if it doesn't contain any movement info
                // (without pointer lock, we infer movement from pageX/pageY, so this check is unnecessary)
                event.preventDefault();
                return;
              }
            }
            // fall through
          case 'keydown': case 'keyup': case 'keypress': case 'mousedown': case 'mouseup': case 'DOMMouseScroll': case 'mousewheel':
            // If we preventDefault on keydown events, the subsequent keypress events
            // won't fire. However, it's fine (and in some cases necessary) to
            // preventDefault for keys that don't generate a character. Otherwise,
            // preventDefault is the right thing to do in general.
            if (event.type !== 'keydown' || (event.keyCode === 8 /* backspace */ || event.keyCode === 9 /* tab */)) {
              event.preventDefault();
            }
  
            if (event.type == 'DOMMouseScroll' || event.type == 'mousewheel') {
              var button = (event.type == 'DOMMouseScroll' ? event.detail : -event.wheelDelta) > 0 ? 4 : 3;
              var event2 = {
                type: 'mousedown',
                button: button,
                pageX: event.pageX,
                pageY: event.pageY
              };
              SDL.events.push(event2);
              event = {
                type: 'mouseup',
                button: button,
                pageX: event.pageX,
                pageY: event.pageY
              };
            } else if (event.type == 'mousedown') {
              SDL.DOMButtons[event.button] = 1;
            } else if (event.type == 'mouseup') {
              // ignore extra ups, can happen if we leave the canvas while pressing down, then return,
              // since we add a mouseup in that case
              if (!SDL.DOMButtons[event.button]) {
                return;
              }
  
              SDL.DOMButtons[event.button] = 0;
            }
  
            // We can only request fullscreen as the result of user input.
            // Due to this limitation, we toggle a boolean on keydown which
            // SDL_WM_ToggleFullScreen will check and subsequently set another
            // flag indicating for us to request fullscreen on the following
            // keyup. This isn't perfect, but it enables SDL_WM_ToggleFullScreen
            // to work as the result of a keypress (which is an extremely
            // common use case).
            if (event.type === 'keydown') {
              SDL.canRequestFullscreen = true;
            } else if (event.type === 'keyup') {
              if (SDL.isRequestingFullscreen) {
                Module['requestFullScreen'](true, true);
                SDL.isRequestingFullscreen = false;
              }
              SDL.canRequestFullscreen = false;
            }
  
            // SDL expects a unicode character to be passed to its keydown events.
            // Unfortunately, the browser APIs only provide a charCode property on
            // keypress events, so we must backfill in keydown events with their
            // subsequent keypress event's charCode.
            if (event.type === 'keypress' && SDL.savedKeydown) {
              // charCode is read-only
              SDL.savedKeydown.keypressCharCode = event.charCode;
              SDL.savedKeydown = null;
            } else if (event.type === 'keydown') {
              SDL.savedKeydown = event;
            }
  
            // Don't push keypress events unless SDL_StartTextInput has been called.
            if (event.type !== 'keypress' || SDL.textInput) {
              SDL.events.push(event);
            }
            break;
          case 'mouseout':
            // Un-press all pressed mouse buttons, because we might miss the release outside of the canvas
            for (var i = 0; i < 3; i++) {
              if (SDL.DOMButtons[i]) {
                SDL.events.push({
                  type: 'mouseup',
                  button: i,
                  pageX: event.pageX,
                  pageY: event.pageY
                });
                SDL.DOMButtons[i] = 0;
              }
            }
            event.preventDefault();
            break;
          case 'blur':
          case 'visibilitychange': {
            // Un-press all pressed keys: TODO
            for (var code in SDL.keyboardMap) {
              SDL.events.push({
                type: 'keyup',
                keyCode: SDL.keyboardMap[code]
              });
            }
            event.preventDefault();
            break;
          }
          case 'unload':
            if (Browser.mainLoop.runner) {
              SDL.events.push(event);
              // Force-run a main event loop, since otherwise this event will never be caught!
              Browser.mainLoop.runner();
            }
            return;
          case 'resize':
            SDL.events.push(event);
            // manually triggered resize event doesn't have a preventDefault member
            if (event.preventDefault) {
              event.preventDefault();
            }
            break;
        }
        if (SDL.events.length >= 10000) {
          Module.printErr('SDL event queue full, dropping events');
          SDL.events = SDL.events.slice(0, 10000);
        }
        return;
      },handleEvent:function (event) {
        if (event.handled) return;
        event.handled = true;
  
        switch (event.type) {
          case 'keydown': case 'keyup': {
            var down = event.type === 'keydown';
            var code = event.keyCode;
            if (code >= 65 && code <= 90) {
              code += 32; // make lowercase for SDL
            } else {
              code = SDL.keyCodes[event.keyCode] || event.keyCode;
            }
  
            HEAP8[(((SDL.keyboardState)+(code))|0)]=down;
            // TODO: lmeta, rmeta, numlock, capslock, KMOD_MODE, KMOD_RESERVED
            SDL.modState = (HEAP8[(((SDL.keyboardState)+(1248))|0)] ? 0x0040 | 0x0080 : 0) | // KMOD_LCTRL & KMOD_RCTRL
              (HEAP8[(((SDL.keyboardState)+(1249))|0)] ? 0x0001 | 0x0002 : 0) | // KMOD_LSHIFT & KMOD_RSHIFT
              (HEAP8[(((SDL.keyboardState)+(1250))|0)] ? 0x0100 | 0x0200 : 0); // KMOD_LALT & KMOD_RALT
  
            if (down) {
              SDL.keyboardMap[code] = event.keyCode; // save the DOM input, which we can use to unpress it during blur
            } else {
              delete SDL.keyboardMap[code];
            }
  
            break;
          }
          case 'mousedown': case 'mouseup':
            if (event.type == 'mousedown') {
              // SDL_BUTTON(x) is defined as (1 << ((x)-1)).  SDL buttons are 1-3,
              // and DOM buttons are 0-2, so this means that the below formula is
              // correct.
              SDL.buttonState |= 1 << event.button;
            } else if (event.type == 'mouseup') {
              SDL.buttonState &= ~(1 << event.button);
            }
            // fall through
          case 'mousemove': {
            Browser.calculateMouseEvent(event);
            break;
          }
        }
      },makeCEvent:function (event, ptr) {
        if (typeof event === 'number') {
          // This is a pointer to a native C event that was SDL_PushEvent'ed
          _memcpy(ptr, event, 28); // XXX
          return;
        }
  
        SDL.handleEvent(event);
  
        switch (event.type) {
          case 'keydown': case 'keyup': {
            var down = event.type === 'keydown';
            //Module.print('Received key event: ' + event.keyCode);
            var key = event.keyCode;
            if (key >= 65 && key <= 90) {
              key += 32; // make lowercase for SDL
            } else {
              key = SDL.keyCodes[event.keyCode] || event.keyCode;
            }
            var scan;
            if (key >= 1024) {
              scan = key - 1024;
            } else {
              scan = SDL.scanCodes[key] || key;
            }
  
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP8[(((ptr)+(8))|0)]=down ? 1 : 0;
            HEAP8[(((ptr)+(9))|0)]=0; // TODO
            HEAP32[(((ptr)+(12))>>2)]=scan;
            HEAP32[(((ptr)+(16))>>2)]=key;
            HEAP16[(((ptr)+(20))>>1)]=SDL.modState;
            // some non-character keys (e.g. backspace and tab) won't have keypressCharCode set, fill in with the keyCode.
            HEAP32[(((ptr)+(24))>>2)]=event.keypressCharCode || key;
  
            break;
          }
          case 'keypress': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            // Not filling in windowID for now
            var cStr = intArrayFromString(String.fromCharCode(event.charCode));
            for (var i = 0; i < cStr.length; ++i) {
              HEAP8[(((ptr)+(8 + i))|0)]=cStr[i];
            }
            break;
          }
          case 'mousedown': case 'mouseup': case 'mousemove': {
            if (event.type != 'mousemove') {
              var down = event.type === 'mousedown';
              HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
              HEAP8[(((ptr)+(8))|0)]=event.button+1; // DOM buttons are 0-2, SDL 1-3
              HEAP8[(((ptr)+(9))|0)]=down ? 1 : 0;
              HEAP32[(((ptr)+(12))>>2)]=Browser.mouseX;
              HEAP32[(((ptr)+(16))>>2)]=Browser.mouseY;
            } else {
              HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
              HEAP8[(((ptr)+(8))|0)]=SDL.buttonState;
              HEAP32[(((ptr)+(12))>>2)]=Browser.mouseX;
              HEAP32[(((ptr)+(16))>>2)]=Browser.mouseY;
              HEAP32[(((ptr)+(20))>>2)]=Browser.mouseMovementX;
              HEAP32[(((ptr)+(24))>>2)]=Browser.mouseMovementY;
            }
            break;
          }
          case 'unload': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            break;
          }
          case 'resize': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP32[(((ptr)+(4))>>2)]=event.w;
            HEAP32[(((ptr)+(8))>>2)]=event.h;
            break;
          }
          case 'joystick_button_up': case 'joystick_button_down': {
            var state = event.type === 'joystick_button_up' ? 0 : 1;
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP8[(((ptr)+(4))|0)]=event.index;
            HEAP8[(((ptr)+(5))|0)]=event.button;
            HEAP8[(((ptr)+(6))|0)]=state;
            break;
          }
          case 'joystick_axis_motion': {
            HEAP32[((ptr)>>2)]=SDL.DOMEventToSDLEvent[event.type];
            HEAP8[(((ptr)+(4))|0)]=event.index;
            HEAP8[(((ptr)+(5))|0)]=event.axis;
            HEAP32[(((ptr)+(8))>>2)]=SDL.joystickAxisValueConversion(event.value);
            break;
          }
          default: throw 'Unhandled SDL event: ' + event.type;
        }
      },estimateTextWidth:function (fontData, text) {
        var h = fontData.size;
        var fontString = h + 'px ' + fontData.name;
        var tempCtx = SDL.ttfContext;
        assert(tempCtx, 'TTF_Init must have been called');
        tempCtx.save();
        tempCtx.font = fontString;
        var ret = tempCtx.measureText(text).width | 0;
        tempCtx.restore();
        return ret;
      },allocateChannels:function (num) { // called from Mix_AllocateChannels and init
        if (SDL.numChannels && SDL.numChannels >= num && num != 0) return;
        SDL.numChannels = num;
        SDL.channels = [];
        for (var i = 0; i < num; i++) {
          SDL.channels[i] = {
            audio: null,
            volume: 1.0
          };
        }
      },setGetVolume:function (info, volume) {
        if (!info) return 0;
        var ret = info.volume * 128; // MIX_MAX_VOLUME
        if (volume != -1) {
          info.volume = volume / 128;
          if (info.audio) info.audio.volume = info.volume;
        }
        return ret;
      },debugSurface:function (surfData) {
        console.log('dumping surface ' + [surfData.surf, surfData.source, surfData.width, surfData.height]);
        var image = surfData.ctx.getImageData(0, 0, surfData.width, surfData.height);
        var data = image.data;
        var num = Math.min(surfData.width, surfData.height);
        for (var i = 0; i < num; i++) {
          console.log('   diagonal ' + i + ':' + [data[i*surfData.width*4 + i*4 + 0], data[i*surfData.width*4 + i*4 + 1], data[i*surfData.width*4 + i*4 + 2], data[i*surfData.width*4 + i*4 + 3]]);
        }
      },joystickEventState:1,lastJoystickState:{},joystickNamePool:{},recordJoystickState:function (joystick, state) {
        // Standardize button state.
        var buttons = new Array(state.buttons.length);
        for (var i = 0; i < state.buttons.length; i++) {
          buttons[i] = SDL.getJoystickButtonState(state.buttons[i]);
        }
  
        SDL.lastJoystickState[joystick] = {
          buttons: buttons,
          axes: state.axes.slice(0),
          timestamp: state.timestamp,
          index: state.index,
          id: state.id
        };
      },getJoystickButtonState:function (button) {
        if (typeof button === 'object') {
          // Current gamepad API editor's draft (Firefox Nightly)
          // https://dvcs.w3.org/hg/gamepad/raw-file/default/gamepad.html#idl-def-GamepadButton
          return button.pressed;
        } else {
          // Current gamepad API working draft (Firefox / Chrome Stable)
          // http://www.w3.org/TR/2012/WD-gamepad-20120529/#gamepad-interface
          return button > 0;
        }
      },queryJoysticks:function () {
        for (var joystick in SDL.lastJoystickState) {
          var state = SDL.getGamepad(joystick - 1);
          var prevState = SDL.lastJoystickState[joystick];
          // Check only if the timestamp has differed.
          // NOTE: Timestamp is not available in Firefox.
          if (typeof state.timestamp !== 'number' || state.timestamp !== prevState.timestamp) {
            var i;
            for (i = 0; i < state.buttons.length; i++) {
              var buttonState = SDL.getJoystickButtonState(state.buttons[i]);
              // NOTE: The previous state already has a boolean representation of
              //       its button, so no need to standardize its button state here.
              if (buttonState !== prevState.buttons[i]) {
                // Insert button-press event.
                SDL.events.push({
                  type: buttonState ? 'joystick_button_down' : 'joystick_button_up',
                  joystick: joystick,
                  index: joystick - 1,
                  button: i
                });
              }
            }
            for (i = 0; i < state.axes.length; i++) {
              if (state.axes[i] !== prevState.axes[i]) {
                // Insert axes-change event.
                SDL.events.push({
                  type: 'joystick_axis_motion',
                  joystick: joystick,
                  index: joystick - 1,
                  axis: i,
                  value: state.axes[i]
                });
              }
            }
  
            SDL.recordJoystickState(joystick, state);
          }
        }
      },joystickAxisValueConversion:function (value) {
        // Ensures that 0 is 0, 1 is 32767, and -1 is 32768.
        return Math.ceil(((value+1) * 32767.5) - 32768);
      },getGamepads:function () {
        var fcn = navigator.getGamepads || navigator.webkitGamepads || navigator.mozGamepads || navigator.gamepads || navigator.webkitGetGamepads;
        if (fcn !== undefined) {
          // The function must be applied on the navigator object.
          return fcn.apply(navigator);
        } else {
          return [];
        }
      },getGamepad:function (deviceIndex) {
        var gamepads = SDL.getGamepads();
        if (gamepads.length > deviceIndex && deviceIndex >= 0) {
          return gamepads[deviceIndex];
        }
        return null;
      }};function _SDL_Flip(surf) {
      // We actually do this in Unlock, since the screen surface has as its canvas
      // backing the page canvas element
    }

  function _SDL_UpdateRects(surf, numrects, rects) {
      // We actually do the whole screen in Unlock...
    }

  function _SDL_GetTicks() {
      return Math.floor(Date.now() - SDL.startTime);
    }

  
  function _SDL_LockSurface(surf) {
      var surfData = SDL.surfaces[surf];
  
      surfData.locked++;
      if (surfData.locked > 1) return 0;
  
      // Mark in C/C++-accessible SDL structure
      // SDL_Surface has the following fields: Uint32 flags, SDL_PixelFormat *format; int w, h; Uint16 pitch; void *pixels; ...
      // So we have fields all of the same size, and 5 of them before us.
      // TODO: Use macros like in library.js
      HEAP32[(((surf)+(20))>>2)]=surfData.buffer;
  
      if (surf == SDL.screen && Module.screenIsReadOnly && surfData.image) return 0;
  
      surfData.image = surfData.ctx.getImageData(0, 0, surfData.width, surfData.height);
      if (surf == SDL.screen) {
        var data = surfData.image.data;
        var num = data.length;
        for (var i = 0; i < num/4; i++) {
          data[i*4+3] = 255; // opacity, as canvases blend alpha
        }
      }
  
      if (SDL.defaults.copyOnLock) {
        // Copy pixel data to somewhere accessible to 'C/C++'
        if (surfData.isFlagSet(0x00200000 /* SDL_HWPALETTE */)) {
          // If this is neaded then
          // we should compact the data from 32bpp to 8bpp index.
          // I think best way to implement this is use
          // additional colorMap hash (color->index).
          // Something like this:
          //
          // var size = surfData.width * surfData.height;
          // var data = '';
          // for (var i = 0; i<size; i++) {
          //   var color = SDL.translateRGBAToColor(
          //     surfData.image.data[i*4   ], 
          //     surfData.image.data[i*4 +1], 
          //     surfData.image.data[i*4 +2], 
          //     255);
          //   var index = surfData.colorMap[color];
          //   HEAP8[(((surfData.buffer)+(i))|0)]=index;
          // }
          throw 'CopyOnLock is not supported for SDL_LockSurface with SDL_HWPALETTE flag set' + new Error().stack;
        } else {
        HEAPU8.set(surfData.image.data, surfData.buffer);
        }
      }
  
      return 0;
    }function _SDL_UpperBlit(src, srcrect, dst, dstrect) {
      var srcData = SDL.surfaces[src];
      var dstData = SDL.surfaces[dst];
      var sr, dr;
      if (srcrect) {
        sr = SDL.loadRect(srcrect);
      } else {
        sr = { x: 0, y: 0, w: srcData.width, h: srcData.height };
      }
      if (dstrect) {
        dr = SDL.loadRect(dstrect);
      } else {
        dr = { x: 0, y: 0, w: -1, h: -1 };
      }
      var oldAlpha = dstData.ctx.globalAlpha;
      dstData.ctx.globalAlpha = srcData.alpha/255;
      dstData.ctx.drawImage(srcData.canvas, sr.x, sr.y, sr.w, sr.h, dr.x, dr.y, sr.w, sr.h);
      dstData.ctx.globalAlpha = oldAlpha;
      if (dst != SDL.screen) {
        // XXX As in IMG_Load, for compatibility we write out |pixels|
        console.log('WARNING: copying canvas data to memory for compatibility');
        _SDL_LockSurface(dst);
        dstData.locked--; // The surface is not actually locked in this hack
      }
      return 0;
    }

  var _SDL_LowerBlit=_SDL_UpperBlit;

  
  function _SDL_SetColors(surf, colors, firstColor, nColors) {
      var surfData = SDL.surfaces[surf];
  
      // we should create colors array
      // only once cause client code
      // often wants to change portion 
      // of palette not all palette.
      if (!surfData.colors) {
        surfData.colors = new Uint8Array(256 * 3); //256 RGB colors
      } 
  
      for (var i = 0; i < nColors; ++i) {
        var index = (firstColor + i) * 3;
        surfData.colors[index] = HEAPU8[(((colors)+(i*4))|0)];
        surfData.colors[index + 1] = HEAPU8[(((colors)+(i*4 + 1))|0)];
        surfData.colors[index + 2] = HEAPU8[(((colors)+(i*4 + 2))|0)];
      }
  
      return 1;
    }function _SDL_SetPalette(surf, flags, colors, firstColor, nColors) {
      return _SDL_SetColors(surf, colors, firstColor, nColors);
    }

  function _SDL_SetColorKey(surf, flag, key) {
      // SetColorKey assigns one color to be rendered as transparent. I don't
      // think the canvas API allows for anything like this, and iterating through
      // each pixel to replace that color seems prohibitively expensive.
      Runtime.warnOnce('SDL_SetColorKey is a no-op for performance reasons');
      return 0;
    }

  function _SDL_FillRect(surf, rect, color) {
      var surfData = SDL.surfaces[surf];
      assert(!surfData.locked); // but we could unlock and re-lock if we must..
      
      if (surfData.isFlagSet(0x00200000 /* SDL_HWPALETTE */)) {
        //in SDL_HWPALETTE color is index (0..255)
        //so we should translate 1 byte value to
        //32 bit canvas
        var index = color * 3;
        color = SDL.translateRGBAToColor(surfData.colors[index], surfData.colors[index +1], surfData.colors[index +2], 255);
      }
  
      var r = rect ? SDL.loadRect(rect) : { x: 0, y: 0, w: surfData.width, h: surfData.height };
      surfData.ctx.save();
      surfData.ctx.fillStyle = SDL.translateColorToCSSRGBA(color);
      surfData.ctx.fillRect(r.x, r.y, r.w, r.h);
      surfData.ctx.restore();
      return 0;
    }

  function _SDL_PollEvent(ptr) {
      if (SDL.initFlags & 0x200 && SDL.joystickEventState) {
        // If SDL_INIT_JOYSTICK was supplied AND the joystick system is configured
        // to automatically query for events, query for joystick events.
        SDL.queryJoysticks();
      }
      if (SDL.events.length === 0) return 0;
      if (ptr) {
        SDL.makeCEvent(SDL.events.shift(), ptr);
      }
      return 1;
    }

  function _SDL_ShowCursor(toggle) {
      switch (toggle) {
        case 0: // SDL_DISABLE
          if (Browser.isFullScreen) { // only try to lock the pointer when in full screen mode
            Module['canvas'].requestPointerLock();
            return 0;
          } else { // else return SDL_ENABLE to indicate the failure
            return 1;
          }
          break;
        case 1: // SDL_ENABLE
          Module['canvas'].exitPointerLock();
          return 1;
          break;
        case -1: // SDL_QUERY
          return !Browser.pointerLock;
          break;
        default:
          console.log( "SDL_ShowCursor called with unknown toggle parameter value: " + toggle + "." );
          break;
      }
    }

  function _SDL_GetModState() {
      return SDL.modState;
    }

  function _SDL_PushEvent(ptr) {
      SDL.events.push(ptr); // XXX Should we copy it? Not clear from API
      return 0;
    }

  function _SDL_FreeSurface(surf) {
      if (surf) SDL.freeSurface(surf);
    }
;

  function _SDL_Init(initFlags) {
      SDL.startTime = Date.now();
      SDL.initFlags = initFlags;
  
      // capture all key events. we just keep down and up, but also capture press to prevent default actions
      if (!Module['doNotCaptureKeyboard']) {
        document.addEventListener("keydown", SDL.receiveEvent);
        document.addEventListener("keyup", SDL.receiveEvent);
        document.addEventListener("keypress", SDL.receiveEvent);
        window.addEventListener("blur", SDL.receiveEvent);
        document.addEventListener("visibilitychange", SDL.receiveEvent);
      }
  
      if (initFlags & 0x200) {
        // SDL_INIT_JOYSTICK
        // Firefox will not give us Joystick data unless we register this NOP
        // callback.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=936104
        addEventListener("gamepadconnected", function() {});
      }
  
      window.addEventListener("unload", SDL.receiveEvent);
      SDL.keyboardState = _malloc(0x10000); // Our SDL needs 512, but 64K is safe for older SDLs
      _memset(SDL.keyboardState, 0, 0x10000);
      // Initialize this structure carefully for closure
      SDL.DOMEventToSDLEvent['keydown'] = 0x300 /* SDL_KEYDOWN */;
      SDL.DOMEventToSDLEvent['keyup'] = 0x301 /* SDL_KEYUP */;
      SDL.DOMEventToSDLEvent['keypress'] = 0x303 /* SDL_TEXTINPUT */;
      SDL.DOMEventToSDLEvent['mousedown'] = 0x401 /* SDL_MOUSEBUTTONDOWN */;
      SDL.DOMEventToSDLEvent['mouseup'] = 0x402 /* SDL_MOUSEBUTTONUP */;
      SDL.DOMEventToSDLEvent['mousemove'] = 0x400 /* SDL_MOUSEMOTION */;
      SDL.DOMEventToSDLEvent['unload'] = 0x100 /* SDL_QUIT */;
      SDL.DOMEventToSDLEvent['resize'] = 0x7001 /* SDL_VIDEORESIZE/SDL_EVENT_COMPAT2 */;
      // These are not technically DOM events; the HTML gamepad API is poll-based.
      // However, we define them here, as the rest of the SDL code assumes that
      // all SDL events originate as DOM events.
      SDL.DOMEventToSDLEvent['joystick_axis_motion'] = 0x600 /* SDL_JOYAXISMOTION */;
      SDL.DOMEventToSDLEvent['joystick_button_down'] = 0x603 /* SDL_JOYBUTTONDOWN */;
      SDL.DOMEventToSDLEvent['joystick_button_up'] = 0x604 /* SDL_JOYBUTTONUP */;
      return 0; // success
    }

  function _SDL_GetError() {
      if (!SDL.errorMessage) {
        SDL.errorMessage = allocate(intArrayFromString("unknown SDL-emscripten error"), 'i8', ALLOC_NORMAL);
      }
      return SDL.errorMessage;
    }

  function _atexit(func, arg) {
      __ATEXIT__.unshift({ func: func, arg: arg });
    }

  function _SDL_Quit() {
      for (var i = 0; i < SDL.numChannels; ++i) {
        if (SDL.channels[i].audio) {
          SDL.channels[i].audio.pause();
        }
      }
      if (SDL.music.audio) {
        SDL.music.audio.pause();
      }
      Module.print('SDL_Quit called (and ignored)');
    }

  
  
  function _SDL_FreeRW(rwopsID) {
      SDL.rwops[rwopsID] = null;
      while (SDL.rwops.length > 0 && SDL.rwops[SDL.rwops.length-1] === null) {
        SDL.rwops.pop();
      }
    }function _IMG_Load_RW(rwopsID, freeSrc) {
      try {
        // stb_image integration support
        function cleanup() {
          if (rwops && freeSrc) _SDL_FreeRW(rwopsID);
        };
        function addCleanup(func) {
          var old = cleanup;
          cleanup = function added_cleanup() {
            old();
            func();
          }
        }
        function callStbImage(func, params) {
          var x = Module['_malloc'](4);
          var y = Module['_malloc'](4);
          var comp = Module['_malloc'](4);
          addCleanup(function() {
            Module['_free'](x);
            Module['_free'](y);
            Module['_free'](comp);
            if (data) Module['_stbi_image_free'](data);
          });
          var data = Module['_' + func].apply(null, params.concat([x, y, comp, 0]));
          if (!data) return null;
          return {
            rawData: true,
            data: data,
            width: HEAP32[((x)>>2)],
            height: HEAP32[((y)>>2)],
            size: HEAP32[((x)>>2)] * HEAP32[((y)>>2)] * HEAP32[((comp)>>2)],
            bpp: HEAP32[((comp)>>2)]
          };
        }
  
        var rwops = SDL.rwops[rwopsID];
        if (rwops === undefined) {
          return 0;
        }
  
        var filename = rwops.filename;
        if (filename === undefined) {
          Runtime.warnOnce('Only file names that have been preloaded are supported for IMG_Load_RW. Consider using STB_IMAGE=1 if you want synchronous image decoding (see settings.js)');
          return 0;
        }
  
        if (!raw) {
          filename = PATH.resolve(filename);
          var raw = Module["preloadedImages"][filename];
          if (!raw) {
            if (raw === null) Module.printErr('Trying to reuse preloaded image, but freePreloadedMediaOnUse is set!');
            Runtime.warnOnce('Cannot find preloaded image ' + filename);
            Runtime.warnOnce('Cannot find preloaded image ' + filename + '. Consider using STB_IMAGE=1 if you want synchronous image decoding (see settings.js)');
            return 0;
          } else if (Module['freePreloadedMediaOnUse']) {
            Module["preloadedImages"][filename] = null;
          }
        }
  
        var surf = SDL.makeSurface(raw.width, raw.height, 0, false, 'load:' + filename);
        var surfData = SDL.surfaces[surf];
        surfData.ctx.globalCompositeOperation = "copy";
        if (!raw.rawData) {
          surfData.ctx.drawImage(raw, 0, 0, raw.width, raw.height, 0, 0, raw.width, raw.height);
        } else {
          var imageData = surfData.ctx.getImageData(0, 0, surfData.width, surfData.height);
          if (raw.bpp == 4) {
            imageData.data.set(HEAPU8.subarray((raw.data),(raw.data+raw.size)));
          } else if (raw.bpp == 3) {
            var pixels = raw.size/3;
            var data = imageData.data;
            var sourcePtr = raw.data;
            var destPtr = 0;
            for (var i = 0; i < pixels; i++) {
              data[destPtr++] = HEAPU8[((sourcePtr++)|0)];
              data[destPtr++] = HEAPU8[((sourcePtr++)|0)];
              data[destPtr++] = HEAPU8[((sourcePtr++)|0)];
              data[destPtr++] = 255;
            }
          } else {
            Module.printErr('cannot handle bpp ' + raw.bpp);
            return 0;
          }
          surfData.ctx.putImageData(imageData, 0, 0);
        }
        surfData.ctx.globalCompositeOperation = "source-over";
        // XXX SDL does not specify that loaded images must have available pixel data, in fact
        //     there are cases where you just want to blit them, so you just need the hardware
        //     accelerated version. However, code everywhere seems to assume that the pixels
        //     are in fact available, so we retrieve it here. This does add overhead though.
        _SDL_LockSurface(surf);
        surfData.locked--; // The surface is not actually locked in this hack
        if (SDL.GL) {
          // After getting the pixel data, we can free the canvas and context if we do not need to do 2D canvas blitting
          surfData.canvas = surfData.ctx = null;
        }
        return surf;
      } finally {
        cleanup();
      }
    }var _SDL_LoadBMP_RW=_IMG_Load_RW;

  function _SDL_RWFromFile(_name, mode) {
      var id = SDL.rwops.length; // TODO: recycle ids when they are null
      var name = Pointer_stringify(_name)
      SDL.rwops.push({ filename: name, mimetype: Browser.getMimetype(name) });
      return id;
    }

  
  function _SDL_RWFromConstMem(mem, size) {
      var id = SDL.rwops.length; // TODO: recycle ids when they are null
      SDL.rwops.push({ bytes: mem, count: size });
      return id;
    }var _SDL_RWFromMem=_SDL_RWFromConstMem;

  function _SDL_WM_SetIcon() { /* This function would set the application window icon surface, which doesn't apply for web canvases, so a no-op. */ }

  
  
  
  function _isspace(chr) {
      return (chr == 32) || (chr >= 9 && chr <= 13);
    }function __parseInt(str, endptr, base, min, max, bits, unsign) {
      // Skip space.
      while (_isspace(HEAP8[(str)])) str++;
  
      // Check for a plus/minus sign.
      var multiplier = 1;
      if (HEAP8[(str)] == 45) {
        multiplier = -1;
        str++;
      } else if (HEAP8[(str)] == 43) {
        str++;
      }
  
      // Find base.
      var finalBase = base;
      if (!finalBase) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            finalBase = 16;
            str += 2;
          } else {
            finalBase = 8;
            str++;
          }
        }
      } else if (finalBase==16) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            str += 2;
          }
        }
      }
      if (!finalBase) finalBase = 10;
  
      // Get digits.
      var chr;
      var ret = 0;
      while ((chr = HEAP8[(str)]) != 0) {
        var digit = parseInt(String.fromCharCode(chr), finalBase);
        if (isNaN(digit)) {
          break;
        } else {
          ret = ret * finalBase + digit;
          str++;
        }
      }
  
      // Apply sign.
      ret *= multiplier;
  
      // Set end pointer.
      if (endptr) {
        HEAP32[((endptr)>>2)]=str;
      }
  
      // Unsign if needed.
      if (unsign) {
        if (Math.abs(ret) > max) {
          ret = max;
          ___setErrNo(ERRNO_CODES.ERANGE);
        } else {
          ret = unSign(ret, bits);
        }
      }
  
      // Validate range.
      if (ret > max || ret < min) {
        ret = ret > max ? max : min;
        ___setErrNo(ERRNO_CODES.ERANGE);
      }
  
      if (bits == 64) {
        return tempRet0 = (tempDouble=ret,Math_abs(tempDouble) >= 1 ? (tempDouble > 0 ? Math_min(Math_floor((tempDouble)/4294967296), 4294967295)>>>0 : (~~(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296)))>>>0) : 0),ret>>>0;
      }
  
      return ret;
    }function _strtol(str, endptr, base) {
      return __parseInt(str, endptr, base, -2147483648, 2147483647, 32);  // LONG_MIN, LONG_MAX.
    }function _atoi(ptr) {
      return _strtol(ptr, null, 10);
    }

  function _SDL_SetVideoMode(width, height, depth, flags) {
      ['mousedown', 'mouseup', 'mousemove', 'DOMMouseScroll', 'mousewheel', 'mouseout'].forEach(function(event) {
        Module['canvas'].addEventListener(event, SDL.receiveEvent, true);
      });
  
      // (0,0) means 'use fullscreen' in native; in Emscripten, use the current canvas size.
      if (width == 0 && height == 0) {
        var canvas = Module['canvas'];
        width = canvas.width;
        height = canvas.height;
      }
  
      Browser.setCanvasSize(width, height, true);
      // Free the old surface first.
      if (SDL.screen) {
        SDL.freeSurface(SDL.screen);
        SDL.screen = null;
      }
      SDL.screen = SDL.makeSurface(width, height, flags, true, 'screen');
      if (!SDL.addedResizeListener) {
        SDL.addedResizeListener = true;
        Browser.resizeListeners.push(function(w, h) {
          SDL.receiveEvent({
            type: 'resize',
            w: w,
            h: h
          });
        });
      }
      return SDL.screen;
    }

  function _SDL_MapRGB(fmt, r, g, b) {
      // Canvas screens are always RGBA. We assume the machine is little-endian.
      return r&0xff|(g&0xff)<<8|(b&0xff)<<16|0xff000000;
    }

  function _SDL_EnableUNICODE(on) {
      var ret = SDL.unicode || 0;
      SDL.unicode = on;
      return ret;
    }

  function _SDL_EnableKeyRepeat(delay, interval) {
      // TODO
    }

  function _SDL_WM_SetCaption(title, icon) {
      title = title && Pointer_stringify(title);
      icon = icon && Pointer_stringify(icon);
    }

  function _SDL_Delay(delay) {
      if (!ENVIRONMENT_IS_WORKER) abort('SDL_Delay called on the main thread! Potential infinite loop, quitting.');
      // horrible busy-wait, but in a worker it at least does not block rendering
      var now = Date.now();
      while (Date.now() - now < delay) {}
    }

  function _emscripten_async_call(func, arg, millis) {
      Module['noExitRuntime'] = true;
  
      function wrapper() {
        Runtime.getFuncWrapper(func, 'vi')(arg);
      }
  
      if (millis >= 0) {
        Browser.safeSetTimeout(wrapper, millis);
      } else {
        Browser.safeRequestAnimationFrame(wrapper);
      }
    }

  function _abort() {
      Module['abort']();
    }

  function ___errno_location() {
      return ___errno_state;
    }

  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }

  function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 79:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }

  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }






FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); NODEFS.staticInit(); }
__ATINIT__.push({ func: function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); } });
___buildEnvironment(ENV);
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

staticSealed = true; // seal the static portion of memory

STACK_MAX = STACK_BASE + 5242880;

DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");



var FUNCTION_TABLE = [0,0,_worker_input,0,_signal_handler,0,_SDL_Quit,0,_worker_loop,0,_wgetch_async_,0];

// EMSCRIPTEN_START_FUNCS

function _worker_loop($arg){
 var label=0;
 var tempVarArgs=0;
 var sp=STACKTOP; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((12128)>>2)];
 var $2=($1|0)<0;
 if($2){label=2;break;}else{label=3;break;}
 case 2: 
 var $4=_curs_set(1);
 var $5=_endwin();
 label=3;break;
 case 3: 
 var $7=HEAP32[((13192)>>2)];
 var $8=((($7)+(1))|0);
 HEAP32[((13192)>>2)]=$8;
 var $9=($8|0)==2;
 if($9){label=5;break;}else{label=4;break;}
 case 4: 
 var $_pre=HEAP32[((12896)>>2)];
 var $14=$_pre;label=6;break;
 case 5: 
 HEAP32[((13192)>>2)]=0;
 var $11=HEAP32[((12896)>>2)];
 var $12=($11|0)==5232;
 var $13=($12?5260:5232);
 HEAP32[((12896)>>2)]=$13;
 var $14=$13;label=6;break;
 case 6: 
 var $14;
 var $15=HEAP32[((14240)>>2)];
 var $16=((($15)-(7))|0);
 var $17=HEAP32[((12128)>>2)];
 var $18=HEAP32[(($14)>>2)];
 var $19=_mvprintw($16,$17,6704,(tempVarArgs=STACKTOP,STACKTOP = (STACKTOP + 8)|0,(assert((STACKTOP|0) < (STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$18,tempVarArgs)); STACKTOP=tempVarArgs;
 var $20=HEAP32[((14240)>>2)];
 var $21=((($20)-(6))|0);
 var $22=HEAP32[((12128)>>2)];
 var $23=HEAP32[((12896)>>2)];
 var $24=(($23+4)|0);
 var $25=HEAP32[(($24)>>2)];
 var $26=_mvprintw($21,$22,6704,(tempVarArgs=STACKTOP,STACKTOP = (STACKTOP + 8)|0,(assert((STACKTOP|0) < (STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$25,tempVarArgs)); STACKTOP=tempVarArgs;
 var $27=HEAP32[((14240)>>2)];
 var $28=((($27)-(5))|0);
 var $29=HEAP32[((12128)>>2)];
 var $30=HEAP32[((12896)>>2)];
 var $31=(($30+8)|0);
 var $32=HEAP32[(($31)>>2)];
 var $33=_mvprintw($28,$29,6704,(tempVarArgs=STACKTOP,STACKTOP = (STACKTOP + 8)|0,(assert((STACKTOP|0) < (STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$32,tempVarArgs)); STACKTOP=tempVarArgs;
 var $34=HEAP32[((14240)>>2)];
 var $35=((($34)-(4))|0);
 var $36=HEAP32[((12128)>>2)];
 var $37=HEAP32[((12896)>>2)];
 var $38=(($37+12)|0);
 var $39=HEAP32[(($38)>>2)];
 var $40=_mvprintw($35,$36,6704,(tempVarArgs=STACKTOP,STACKTOP = (STACKTOP + 8)|0,(assert((STACKTOP|0) < (STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$39,tempVarArgs)); STACKTOP=tempVarArgs;
 var $41=HEAP32[((14240)>>2)];
 var $42=((($41)-(3))|0);
 var $43=HEAP32[((12128)>>2)];
 var $44=HEAP32[((12896)>>2)];
 var $45=(($44+16)|0);
 var $46=HEAP32[(($45)>>2)];
 var $47=_mvprintw($42,$43,6704,(tempVarArgs=STACKTOP,STACKTOP = (STACKTOP + 8)|0,(assert((STACKTOP|0) < (STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$46,tempVarArgs)); STACKTOP=tempVarArgs;
 var $48=HEAP32[((14240)>>2)];
 var $49=((($48)-(2))|0);
 var $50=HEAP32[((12128)>>2)];
 var $51=HEAP32[((12896)>>2)];
 var $52=(($51+20)|0);
 var $53=HEAP32[(($52)>>2)];
 var $54=_mvprintw($49,$50,6704,(tempVarArgs=STACKTOP,STACKTOP = (STACKTOP + 8)|0,(assert((STACKTOP|0) < (STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$53,tempVarArgs)); STACKTOP=tempVarArgs;
 var $55=HEAP32[((14240)>>2)];
 var $56=((($55)-(1))|0);
 var $57=HEAP32[((12128)>>2)];
 var $58=HEAP32[((12896)>>2)];
 var $59=(($58+24)|0);
 var $60=HEAP32[(($59)>>2)];
 var $61=_mvprintw($56,$57,6704,(tempVarArgs=STACKTOP,STACKTOP = (STACKTOP + 8)|0,(assert((STACKTOP|0) < (STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$60,tempVarArgs)); STACKTOP=tempVarArgs;
 var $62=HEAP32[((12128)>>2)];
 var $63=((($62)-(1))|0);
 HEAP32[((12128)>>2)]=$63;
 var $64=HEAP32[((12136)>>2)];
 var $65=_wgetch_async($64,2);
 STACKTOP=sp;return;
  default: assert(0, "bad label: " + label);
 }

}


function _worker_input($arg){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=$arg;
 if(($1|0)==113|($1|0)==81){ label=2;break;}else{label=3;break;}
 case 2: 
 var $3=_curs_set(1);
 var $4=_endwin();
 label=4;break;
 case 3: 
 var $6=_refresh();
 var $7=_napms_async(100,8);
 label=4;break;
 case 4: 
 return;
  default: assert(0, "bad label: " + label);
 }

}


function _main($argc,$argv){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=_initscr();
 var $2=($1|0)==0;
 if($2){label=2;break;}else{label=3;break;}
 case 2: 
 var $4=HEAP32[((_stderr)>>2)];
 var $5=_fwrite(6680,16,1,$4);
 _exit(1);
 throw "Reached an unreachable!";
 case 3: 
 var $7=_start_color();
 var $8=_init_color(1,843,0,227);
 var $9=_init_color(3,219,705,545);
 var $10=_init_color(2,172,662,882);
 var $11=_init_color(0,168,168,168);
 var $12=_init_pair(1,7,0);
 var $13=_init_pair(2,2,0);
 var $14=_init_pair(3,3,0);
 var $15=_signal(3,4);
 var $16=($15|0)==-1;
 if($16){label=4;break;}else{label=5;break;}
 case 4: 
 var $18=HEAP32[((_stderr)>>2)];
 var $19=_fwrite(6376,31,1,$18);
 var $20=_endwin();
 _exit(1);
 throw "Reached an unreachable!";
 case 5: 
 var $21=_signal(2,1);
 var $22=_noecho();
 var $23=HEAP32[((12136)>>2)];
 var $24=_leaveok($23,1);
 var $25=HEAP32[((12136)>>2)];
 var $26=_scrollok($25,0);
 var $27=_curs_set(0);
 _timeout(0);
 var $28=HEAP32[((12136)>>2)];
 var $29=_keypad($28,1);
 var $30=HEAP32[((15784)>>2)];
 var $31=((($30)-(30))|0);
 HEAP32[((12128)>>2)]=$31;
 var $32=HEAP32[((15776)>>2)];
 var $33=(((($32|0))/(2))&-1);
 HEAP32[((14240)>>2)]=$33;
 var $34=_attrset(50331648);
 var $35=HEAP32[((14240)>>2)];
 var $36=HEAP32[((15784)>>2)];
 var $37=((($36)-(1))|0);
 var $38=_mvhline($35,0,94,$37);
 HEAP32[((12896)>>2)]=5232;
 var $39=_attrset(33554432);
 _worker_loop(0);
 return 0;
  default: assert(0, "bad label: " + label);
 }

}
Module["_main"] = _main;

function _signal_handler($sig){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($sig|0)==2;
 if($1){label=2;break;}else{label=4;break;}
 case 2: 
 var $3=_isendwin();
 var $4=(($3<<24)>>24)==0;
 if($4){label=3;break;}else{label=4;break;}
 case 3: 
 var $6=_curs_set(1);
 var $7=_endwin();
 label=4;break;
 case 4: 
 return;
  default: assert(0, "bad label: " + label);
 }

}


function _wattrset($win,$attrs){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=-1;label=3;break;}else{label=2;break;}
 case 2: 
 var $3=$attrs&-65536;
 var $4=(($win+28)|0);
 HEAP32[(($4)>>2)]=$3;
 var $_0=0;label=3;break;
 case 3: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _attrset($attrs){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((12136)>>2)];
 var $2=($1|0)==0;
 if($2){var $_0_i=-1;label=3;break;}else{label=2;break;}
 case 2: 
 var $4=$attrs&-65536;
 var $5=(($1+28)|0);
 HEAP32[(($5)>>2)]=$4;
 var $_0_i=0;label=3;break;
 case 3: 
 var $_0_i;
 return $_0_i;
  default: assert(0, "bad label: " + label);
 }

}


function _whline($win,$ch,$n){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 var $2=($n|0)<1;
 var $or_cond=$1|$2;
 if($or_cond){var $_0=-1;label=12;break;}else{label=2;break;}
 case 2: 
 var $4=(($win+4)|0);
 var $5=HEAP32[(($4)>>2)];
 var $6=((($5)+($n))|0);
 var $7=(($win+12)|0);
 var $8=HEAP32[(($7)>>2)];
 var $9=($6|0)<($8|0);
 var $_=($9?$6:$8);
 var $10=((($_)-(1))|0);
 var $11=(($win)|0);
 var $12=HEAP32[(($11)>>2)];
 var $13=(($win+44)|0);
 var $14=HEAP32[(($13)>>2)];
 var $15=(($14+($12<<2))|0);
 var $16=HEAP32[(($15)>>2)];
 var $17=($ch|0)!=0;
 var $18=($17?$ch:65649);
 var $19=$18&-65536;
 var $20=($18>>>0)>16777215;
 if($20){var $attr_0_i=$19;label=4;break;}else{label=3;break;}
 case 3: 
 var $22=(($win+28)|0);
 var $23=HEAP32[(($22)>>2)];
 var $24=$23|$19;
 var $attr_0_i=$24;label=4;break;
 case 4: 
 var $attr_0_i;
 var $25=($attr_0_i>>>0)>16777215;
 var $26=(($win+32)|0);
 var $27=HEAP32[(($26)>>2)];
 var $_pn_v_i=($25?16711680:-65536);
 var $_pn_i=$_pn_v_i&$27;
 var $28=$18&65535;
 var $attr_1_i=$attr_0_i|$28;
 var $29=$attr_1_i|$_pn_i;
 var $30=($5|0)>($10|0);
 if($30){var $35=$12;label=7;break;}else{var $_013=$5;label=5;break;}
 case 5: 
 var $_013;
 var $31=(($16+($_013<<2))|0);
 HEAP32[(($31)>>2)]=$29;
 var $32=((($_013)+(1))|0);
 var $33=($_013|0)<($10|0);
 if($33){var $_013=$32;label=5;break;}else{label=6;break;}
 case 6: 
 var $_pre=HEAP32[(($11)>>2)];
 var $35=$_pre;label=7;break;
 case 7: 
 var $35;
 var $36=(($win+48)|0);
 var $37=HEAP32[(($36)>>2)];
 var $38=(($37+($35<<2))|0);
 var $39=HEAP32[(($38)>>2)];
 var $40=($5|0)<($39|0);
 var $41=($39|0)==-1;
 var $or_cond2=$40|$41;
 if($or_cond2){label=8;break;}else{label=9;break;}
 case 8: 
 HEAP32[(($38)>>2)]=$5;
 label=9;break;
 case 9: 
 var $44=(($win+52)|0);
 var $45=HEAP32[(($44)>>2)];
 var $46=(($45+($35<<2))|0);
 var $47=HEAP32[(($46)>>2)];
 var $48=($10|0)>($47|0);
 if($48){label=10;break;}else{label=11;break;}
 case 10: 
 HEAP32[(($46)>>2)]=$10;
 label=11;break;
 case 11: 
 _PDC_sync($win);
 var $_0=0;label=12;break;
 case 12: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _mvhline($y,$x,$ch,$n){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=_move($y,$x);
 var $2=($1|0)==-1;
 if($2){var $_0=-1;label=3;break;}else{label=2;break;}
 case 2: 
 var $4=HEAP32[((12136)>>2)];
 var $5=_whline($4,$ch,$n);
 var $_0=$5;label=3;break;
 case 3: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _start_color(){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((15744)>>2)];
 var $2=(($1+7)|0);
 var $3=HEAP8[($2)];
 var $4=(($3<<24)>>24)==0;
 if($4){label=2;break;}else{var $_0=-1;label=12;break;}
 case 2: 
 HEAP8[(12384)]=1;
 var $6=_PDC_set_blink(0);
 var $_b=HEAP8[(5216)];
 if($_b){label=7;break;}else{label=3;break;}
 case 3: 
 var $8=HEAP32[((15744)>>2)];
 var $9=(($8+9)|0);
 var $10=HEAP8[($9)];
 var $11=(($10<<24)>>24)==0;
 if($11){label=6;break;}else{label=4;break;}
 case 4: 
 var $13=_getenv(6480);
 var $14=($13|0)==0;
 if($14){label=6;break;}else{label=5;break;}
 case 5: 
 HEAP8[(5216)]=1;
 label=7;break;
 case 6: 
 var $17=HEAP8[(12384)];
 var $18=(($17<<24)>>24)==0;
 if($18){label=7;break;}else{var $_off0_i3_i=0;var $_off01_i59_i=7;label=9;break;}
 case 7: 
 var $19=HEAP32[((15744)>>2)];
 var $20=(($19+9)|0);
 var $21=HEAP8[($20)];
 var $22=(($21<<24)>>24)==0;
 if($22){var $_off0_i3_i=0;var $_off01_i59_i=7;label=9;break;}else{label=8;break;}
 case 8: 
 var $24=(($19+10)|0);
 var $25=HEAP16[(($24)>>1)];
 var $26=(($19+12)|0);
 var $27=HEAP16[(($26)>>1)];
 var $_off0_i3_i=$27;var $_off01_i59_i=$25;label=9;break;
 case 9: 
 var $_off01_i59_i;
 var $_off0_i3_i;
 var $i_011_i=0;label=10;break;
 case 10: 
 var $i_011_i;
 var $29=(($i_011_i)&65535);
 _PDC_init_pair($29,$_off01_i59_i,$_off0_i3_i);
 var $30=((($i_011_i)+(1))|0);
 var $31=($30|0)<256;
 if($31){var $i_011_i=$30;label=10;break;}else{label=11;break;}
 case 11: 
 _memset(12464, 0, 256)|0;
 var $_0=0;label=12;break;
 case 12: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_init_atrtab(){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP8[(12384)];
 var $2=(($1<<24)>>24)==0;
 var $_b=HEAP8[(5216)];
 var $or_cond=$2|$_b;
 if($or_cond){label=2;break;}else{var $_off0_i3=0;var $_off01_i59=7;label=4;break;}
 case 2: 
 var $4=HEAP32[((15744)>>2)];
 var $5=(($4+9)|0);
 var $6=HEAP8[($5)];
 var $7=(($6<<24)>>24)==0;
 if($7){var $_off0_i3=0;var $_off01_i59=7;label=4;break;}else{label=3;break;}
 case 3: 
 var $9=(($4+10)|0);
 var $10=HEAP16[(($9)>>1)];
 var $11=(($4+12)|0);
 var $12=HEAP16[(($11)>>1)];
 var $_off0_i3=$12;var $_off01_i59=$10;label=4;break;
 case 4: 
 var $_off01_i59;
 var $_off0_i3;
 var $i_011=0;label=5;break;
 case 5: 
 var $i_011;
 var $14=(($i_011)&65535);
 _PDC_init_pair($14,$_off01_i59,$_off0_i3);
 var $15=((($i_011)+(1))|0);
 var $16=($15|0)<256;
 if($16){var $i_011=$15;label=5;break;}else{label=6;break;}
 case 6: 
 return;
  default: assert(0, "bad label: " + label);
 }

}


function _init_pair($pair,$fg,$bg){
 var label=0;
 var sp=STACKTOP;STACKTOP=(STACKTOP+16)|0; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $oldfg=sp;
 var $oldbg=(sp)+(8);
 var $1=HEAP8[(12384)];
 var $2=(($1<<24)>>24)==0;
 if($2){var $_0=-1;label=17;break;}else{label=2;break;}
 case 2: 
 var $4=(($pair<<16)>>16);
 var $5=(($pair<<16)>>16)>0;
 var $6=HEAP32[((6720)>>2)];
 var $7=($4|0)<($6|0);
 var $or_cond=$5&$7;
 if($or_cond){label=3;break;}else{var $_0=-1;label=17;break;}
 case 3: 
 var $9=(($fg<<16)>>16);
 var $_b=HEAP8[(856)];
 var $10=(($_b<<31)>>31);
 var $11=($9|0)<($10|0);
 if($11){var $_0=-1;label=17;break;}else{label=4;break;}
 case 4: 
 var $13=HEAP32[((15792)>>2)];
 var $14=($9|0)<($13|0);
 if($14){label=5;break;}else{var $_0=-1;label=17;break;}
 case 5: 
 var $16=(($bg<<16)>>16);
 var $17=($16|0)>=($10|0);
 var $18=($16|0)<($13|0);
 var $or_cond2=$17&$18;
 if($or_cond2){label=6;break;}else{var $_0=-1;label=17;break;}
 case 6: 
 var $20=(($fg<<16)>>16)==-1;
 if($20){label=7;break;}else{var $_off01_i4=$fg;label=9;break;}
 case 7: 
 var $22=HEAP32[((15744)>>2)];
 var $23=(($22+9)|0);
 var $24=HEAP8[($23)];
 var $25=(($24<<24)>>24)==0;
 if($25){var $_off01_i4=7;label=9;break;}else{label=8;break;}
 case 8: 
 var $27=(($22+10)|0);
 var $28=HEAP16[(($27)>>1)];
 var $_off01_i4=$28;label=9;break;
 case 9: 
 var $_off01_i4;
 var $30=(($bg<<16)>>16)==-1;
 if($30){label=10;break;}else{var $_off0_i3=$bg;label=12;break;}
 case 10: 
 var $32=HEAP32[((15744)>>2)];
 var $33=(($32+9)|0);
 var $34=HEAP8[($33)];
 var $35=(($34<<24)>>24)==0;
 if($35){var $_off0_i3=0;label=12;break;}else{label=11;break;}
 case 11: 
 var $37=(($32+12)|0);
 var $38=HEAP16[(($37)>>1)];
 var $_off0_i3=$38;label=12;break;
 case 12: 
 var $_off0_i3;
 var $39=((12464+$4)|0);
 var $40=HEAP8[($39)];
 var $41=(($40<<24)>>24)==0;
 if($41){label=16;break;}else{label=13;break;}
 case 13: 
 var $43=_PDC_pair_content($pair,$oldfg,$oldbg);
 var $44=HEAP16[(($oldfg)>>1)];
 var $45=(($44<<16)>>16)==(($_off01_i4<<16)>>16);
 if($45){label=14;break;}else{label=15;break;}
 case 14: 
 var $47=HEAP16[(($oldbg)>>1)];
 var $48=(($47<<16)>>16)==(($_off0_i3<<16)>>16);
 if($48){label=16;break;}else{label=15;break;}
 case 15: 
 var $50=HEAP32[((12904)>>2)];
 var $51=(($50+36)|0);
 HEAP8[($51)]=1;
 label=16;break;
 case 16: 
 _PDC_init_pair($pair,$_off01_i4,$_off0_i3);
 HEAP8[($39)]=1;
 var $_0=0;label=17;break;
 case 17: 
 var $_0;
 STACKTOP=sp;return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _init_color($color,$red,$green,$blue){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=(($color<<16)>>16)<0;
 if($1){var $_0=-1;label=5;break;}else{label=2;break;}
 case 2: 
 var $3=(($color<<16)>>16);
 var $4=HEAP32[((15792)>>2)];
 var $5=($3|0)<($4|0);
 if($5){label=3;break;}else{var $_0=-1;label=5;break;}
 case 3: 
 var $7=_PDC_can_change_color();
 var $8=(($7<<24)>>24)==0;
 var $9=(($red<<16)>>16)<0;
 var $or_cond=$8|$9;
 var $10=(($red<<16)>>16)>1000;
 var $or_cond1=$or_cond|$10;
 var $11=(($green<<16)>>16)<0;
 var $or_cond2=$or_cond1|$11;
 var $12=(($green<<16)>>16)>1000;
 var $or_cond3=$or_cond2|$12;
 var $13=(($blue<<16)>>16)<0;
 var $or_cond4=$or_cond3|$13;
 var $14=(($blue<<16)>>16)>1000;
 var $or_cond5=$or_cond4|$14;
 if($or_cond5){var $_0=-1;label=5;break;}else{label=4;break;}
 case 4: 
 var $16=_PDC_init_color($color,$red,$green,$blue);
 var $_0=$16;label=5;break;
 case 5: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _wgetch_async($win,$callback){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){label=2;break;}else{label=3;break;}
 case 2: 
 FUNCTION_TABLE[$callback](-1);
 var $_0=-1;label=20;break;
 case 3: 
 HEAP32[((6736)>>2)]=0;
 var $4=HEAP32[((15744)>>2)];
 var $5=(($4+68)|0);
 var $6=HEAP32[(($5)>>2)];
 var $7=($6|0)==0;
 if($7){label=5;break;}else{label=4;break;}
 case 4: 
 var $9=$6<<1;
 HEAP32[((6736)>>2)]=$9;
 label=7;break;
 case 5: 
 var $11=(($win+64)|0);
 var $12=HEAP32[(($11)>>2)];
 var $13=($12|0)==0;
 if($13){label=7;break;}else{label=6;break;}
 case 6: 
 var $15=(((($12|0))/(50))&-1);
 var $_off=((($12)+(49))|0);
 var $16=($_off>>>0)>98;
 var $_=($16?$15:1);
 HEAP32[((6736)>>2)]=$_;
 label=7;break;
 case 7: 
 var $18=(($win+24)|0);
 var $19=HEAP32[(($18)>>2)];
 var $20=$19&16;
 var $21=($20|0)==0;
 if($21){label=8;break;}else{label=13;break;}
 case 8: 
 var $23=(($win+37)|0);
 var $24=HEAP8[($23)];
 var $25=(($24<<24)>>24)==0;
 if($25){label=9;break;}else{label=11;break;}
 case 9: 
 var $27=(($win+20)|0);
 var $28=HEAP32[(($27)>>2)];
 var $29=(($win+4)|0);
 var $30=HEAP32[(($29)>>2)];
 var $31=((($30)+($28))|0);
 var $32=(($4+20)|0);
 var $33=HEAP32[(($32)>>2)];
 var $34=($31|0)==($33|0);
 if($34){label=10;break;}else{label=12;break;}
 case 10: 
 var $36=(($win+16)|0);
 var $37=HEAP32[(($36)>>2)];
 var $38=(($win)|0);
 var $39=HEAP32[(($38)>>2)];
 var $40=((($39)+($37))|0);
 var $41=(($4+16)|0);
 var $42=HEAP32[(($41)>>2)];
 var $43=($40|0)==($42|0);
 if($43){label=11;break;}else{label=12;break;}
 case 11: 
 var $45=_is_wintouched($win);
 var $46=(($45<<24)>>24)==0;
 if($46){label=13;break;}else{label=12;break;}
 case 12: 
 var $48=_wrefresh($win);
 label=13;break;
 case 13: 
 var $50=HEAP32[((13200)>>2)];
 var $51=($50|0)==0;
 if($51){label=15;break;}else{label=14;break;}
 case 14: 
 var $53=((($50)-(1))|0);
 HEAP32[((13200)>>2)]=$53;
 var $54=((13208+($53<<2))|0);
 var $55=HEAP32[(($54)>>2)];
 var $56=$55;
 FUNCTION_TABLE[$callback]($56);
 var $_0=$55;label=20;break;
 case 15: 
 var $58=HEAP32[((15744)>>2)];
 var $59=(($58+4)|0);
 var $60=HEAP8[($59)];
 var $61=(($60<<24)>>24)==0;
 if($61){label=16;break;}else{label=19;break;}
 case 16: 
 var $63=(($58+2)|0);
 var $64=HEAP8[($63)];
 var $65=(($64<<24)>>24)==0;
 if($65){label=17;break;}else{label=19;break;}
 case 17: 
 var $67=HEAP32[((5224)>>2)];
 var $68=HEAP32[((14232)>>2)];
 var $69=($67|0)<($68|0);
 if($69){label=18;break;}else{label=19;break;}
 case 18: 
 var $71=((($67)+(1))|0);
 HEAP32[((5224)>>2)]=$71;
 var $72=((6752+($67<<2))|0);
 var $73=HEAP32[(($72)>>2)];
 var $74=$73;
 FUNCTION_TABLE[$callback]($74);
 var $_0=$73;label=20;break;
 case 19: 
 HEAP32[((14232)>>2)]=0;
 HEAP32[((5224)>>2)]=0;
 HEAP32[((6728)>>2)]=$win;
 HEAP32[((6744)>>2)]=$callback;
 _wgetch_async_(0);
 var $_0=0;label=20;break;
 case 20: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _wgetch_async_($arg){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=_PDC_check_key();
 var $2=(($1<<24)>>24)==0;
 if($2){label=2;break;}else{label=10;break;}
 case 2: 
 var $3=HEAP32[((15744)>>2)];
 var $4=(($3+68)|0);
 var $5=HEAP32[(($4)>>2)];
 var $6=($5|0)==0;
 if($6){label=3;break;}else{label=4;break;}
 case 3: 
 var $8=HEAP32[((6728)>>2)];
 var $9=(($8+64)|0);
 var $10=HEAP32[(($9)>>2)];
 var $11=($10|0)==0;
 if($11){label=7;break;}else{label=4;break;}
 case 4: 
 var $13=HEAP32[((6736)>>2)];
 var $14=($13|0)==0;
 if($14){label=5;break;}else{label=6;break;}
 case 5: 
 var $16=HEAP32[((6744)>>2)];
 FUNCTION_TABLE[$16](-1);
 label=60;break;
 case 6: 
 var $18=((($13)-(1))|0);
 HEAP32[((6736)>>2)]=$18;
 label=9;break;
 case 7: 
 var $20=(($8+39)|0);
 var $21=HEAP8[($20)];
 var $22=(($21<<24)>>24)==0;
 if($22){label=9;break;}else{label=8;break;}
 case 8: 
 var $24=HEAP32[((6744)>>2)];
 FUNCTION_TABLE[$24](-1);
 label=60;break;
 case 9: 
 var $26=_napms_async(50,10);
 label=60;break;
 case 10: 
 var $27=_PDC_get_key();
 var $28=HEAP32[((15744)>>2)];
 var $29=(($28+82)|0);
 var $30=HEAP8[($29)];
 var $31=(($30<<24)>>24)==0;
 if($31){var $key_0=$27;label=43;break;}else{label=11;break;}
 case 11: 
 var $33=HEAP32[((6728)>>2)];
 var $34=(($33+42)|0);
 var $35=HEAP8[($34)];
 var $36=(($35<<24)>>24)==0;
 if($36){label=44;break;}else{label=12;break;}
 case 12: 
 var $38=($27|0)==539;
 if($38){label=13;break;}else{var $key_0=$27;label=43;break;}
 case 13: 
 var $40=(($28+40)|0);
 var $41=HEAP32[(($40)>>2)];
 var $42=HEAP32[((12248)>>2)];
 var $43=$42&1;
 var $44=($43|0)==0;
 if($44){var $70=$42;label=20;break;}else{label=14;break;}
 case 14: 
 var $46=HEAP16[((12240)>>1)];
 var $47=$46&7;
 var $48=$41&2;
 var $49=($48|0)==0;
 var $50=(($47<<16)>>16)==1;
 var $or_cond_i=$49&$50;
 if($or_cond_i){label=19;break;}else{label=15;break;}
 case 15: 
 var $52=$41&4;
 var $53=($52|0)==0;
 var $54=(($47<<16)>>16)==2;
 var $or_cond1_i=$53&$54;
 if($or_cond1_i){label=19;break;}else{label=16;break;}
 case 16: 
 var $56=$41&8;
 var $57=($56|0)==0;
 var $58=(($47<<16)>>16)==3;
 var $or_cond2_i=$57&$58;
 if($or_cond2_i){label=19;break;}else{label=17;break;}
 case 17: 
 var $60=$41&16;
 var $61=($60|0)==0;
 var $62=(($47<<16)>>16)==5;
 var $or_cond3_i=$61&$62;
 if($or_cond3_i){label=19;break;}else{label=18;break;}
 case 18: 
 var $64=$41&1;
 var $65=($64|0)==0;
 var $66=(($47<<16)>>16)==0;
 var $or_cond4_i=$65&$66;
 if($or_cond4_i){label=19;break;}else{var $70=$42;label=20;break;}
 case 19: 
 var $68=$42^1;
 HEAP32[((12248)>>2)]=$68;
 var $70=$68;label=20;break;
 case 20: 
 var $70;
 var $71=$70&2;
 var $72=($71|0)==0;
 if($72){var $123=$70;label=35;break;}else{label=29;break;}
 case 21: 
 var $74=$41&16912;
 var $75=($74|0)==0;
 if($75){label=22;break;}else{var $_pr_i=$151;label=23;break;}
 case 22: 
 var $77=$151^8;
 HEAP32[((12248)>>2)]=$77;
 var $_pr_i=$77;label=23;break;
 case 23: 
 var $_pr_i;
 var $79=$_pr_i&96;
 var $80=($79|0)==0;
 if($80){var $86=$_pr_i;label=26;break;}else{label=24;break;}
 case 24: 
 var $82=$41&33554432;
 var $83=($82|0)==0;
 if($83){label=25;break;}else{var $86=$_pr_i;label=26;break;}
 case 25: 
 var $85=$_pr_i&-97;
 HEAP32[((12248)>>2)]=$85;
 var $86=$85;label=26;break;
 case 26: 
 var $86;
 var $87=($86|0)==0;
 if($87){label=44;break;}else{label=27;break;}
 case 27: 
 var $89=HEAP32[((12236)>>2)];
 var $90=HEAP32[((12232)>>2)];
 var $91=_PDC_mouse_in_slk($89,$90);
 var $92=($91|0)==0;
 if($92){var $key_1=539;label=47;break;}else{label=28;break;}
 case 28: 
 var $94=HEAP16[((12240)>>1)];
 var $95=$94&3;
 var $96=(($95<<16)>>16)==0;
 var $97=((($91)+(264))|0);
 var $__i=($96?-1:$97);
 var $key_0=$__i;label=43;break;
 case 29: 
 var $99=HEAP16[((12242)>>1)];
 var $100=$99&7;
 var $101=$41&64;
 var $102=($101|0)==0;
 var $103=(($100<<16)>>16)==1;
 var $or_cond_1_i=$102&$103;
 if($or_cond_1_i){label=34;break;}else{label=30;break;}
 case 30: 
 var $105=$41&128;
 var $106=($105|0)==0;
 var $107=(($100<<16)>>16)==2;
 var $or_cond1_1_i=$106&$107;
 if($or_cond1_1_i){label=34;break;}else{label=31;break;}
 case 31: 
 var $109=$41&256;
 var $110=($109|0)==0;
 var $111=(($100<<16)>>16)==3;
 var $or_cond2_1_i=$110&$111;
 if($or_cond2_1_i){label=34;break;}else{label=32;break;}
 case 32: 
 var $113=$41&512;
 var $114=($113|0)==0;
 var $115=(($100<<16)>>16)==5;
 var $or_cond3_1_i=$114&$115;
 if($or_cond3_1_i){label=34;break;}else{label=33;break;}
 case 33: 
 var $117=$41&32;
 var $118=($117|0)==0;
 var $119=(($100<<16)>>16)==0;
 var $or_cond4_1_i=$118&$119;
 if($or_cond4_1_i){label=34;break;}else{var $123=$70;label=35;break;}
 case 34: 
 var $121=$70^2;
 HEAP32[((12248)>>2)]=$121;
 var $123=$121;label=35;break;
 case 35: 
 var $123;
 var $124=$123&4;
 var $125=($124|0)==0;
 if($125){var $151=$123;label=42;break;}else{label=36;break;}
 case 36: 
 var $127=HEAP16[((12244)>>1)];
 var $128=$127&7;
 var $129=$41&2048;
 var $130=($129|0)==0;
 var $131=(($128<<16)>>16)==1;
 var $or_cond_2_i=$130&$131;
 if($or_cond_2_i){label=41;break;}else{label=37;break;}
 case 37: 
 var $133=$41&4096;
 var $134=($133|0)==0;
 var $135=(($128<<16)>>16)==2;
 var $or_cond1_2_i=$134&$135;
 if($or_cond1_2_i){label=41;break;}else{label=38;break;}
 case 38: 
 var $137=$41&8192;
 var $138=($137|0)==0;
 var $139=(($128<<16)>>16)==3;
 var $or_cond2_2_i=$138&$139;
 if($or_cond2_2_i){label=41;break;}else{label=39;break;}
 case 39: 
 var $141=$41&16384;
 var $142=($141|0)==0;
 var $143=(($128<<16)>>16)==5;
 var $or_cond3_2_i=$142&$143;
 if($or_cond3_2_i){label=41;break;}else{label=40;break;}
 case 40: 
 var $145=$41&1024;
 var $146=($145|0)==0;
 var $147=(($128<<16)>>16)==0;
 var $or_cond4_2_i=$146&$147;
 if($or_cond4_2_i){label=41;break;}else{var $151=$123;label=42;break;}
 case 41: 
 var $149=$123^4;
 HEAP32[((12248)>>2)]=$149;
 var $151=$149;label=42;break;
 case 42: 
 var $151;
 var $152=$151&8;
 var $153=($152|0)==0;
 if($153){var $_pr_i=$151;label=23;break;}else{label=21;break;}
 case 43: 
 var $key_0;
 if(($key_0|0)==-1){ label=44;break;}else if(($key_0|0)==13){ label=45;break;}else{var $key_1=$key_0;label=47;break;}
 case 44: 
 var $154=_PDC_check_key();
 var $155=(($154<<24)>>24)==0;
 if($155){label=2;break;}else{label=10;break;}
 case 45: 
 var $157=HEAP32[((15744)>>2)];
 var $158=(($157+1)|0);
 var $159=HEAP8[($158)];
 var $160=(($159<<24)>>24)==0;
 if($160){var $key_1=13;label=47;break;}else{label=46;break;}
 case 46: 
 var $162=(($157+4)|0);
 var $163=HEAP8[($162)];
 var $164=(($163<<24)>>24)==0;
 var $_key_0=($164?10:13);
 var $key_1=$_key_0;label=47;break;
 case 47: 
 var $key_1;
 var $165=HEAP32[((15744)>>2)];
 var $166=(($165+3)|0);
 var $167=HEAP8[($166)];
 var $168=(($167<<24)>>24)==0;
 if($168){var $179=$165;label=50;break;}else{label=48;break;}
 case 48: 
 var $170=(($165+82)|0);
 var $171=HEAP8[($170)];
 var $172=(($171<<24)>>24)==0;
 if($172){label=49;break;}else{var $179=$165;label=50;break;}
 case 49: 
 var $174=HEAP32[((6728)>>2)];
 var $175=_waddch($174,$key_1);
 var $176=HEAP32[((6728)>>2)];
 var $177=_wrefresh($176);
 var $_pre=HEAP32[((15744)>>2)];
 var $179=$_pre;label=50;break;
 case 50: 
 var $179;
 var $180=(($179+4)|0);
 var $181=HEAP8[($180)];
 var $182=(($181<<24)>>24)==0;
 if($182){label=51;break;}else{label=52;break;}
 case 51: 
 var $184=(($179+2)|0);
 var $185=HEAP8[($184)];
 var $186=(($185<<24)>>24)==0;
 if($186){label=53;break;}else{label=52;break;}
 case 52: 
 var $188=HEAP32[((6744)>>2)];
 var $189=$key_1;
 FUNCTION_TABLE[$188]($189);
 label=60;break;
 case 53: 
 var $191=($key_1|0)==8;
 var $192=HEAP32[((14232)>>2)];
 if($191){label=54;break;}else{label=56;break;}
 case 54: 
 var $194=HEAP32[((5224)>>2)];
 var $195=($192|0)>($194|0);
 if($195){label=55;break;}else{label=44;break;}
 case 55: 
 var $197=((($192)-(1))|0);
 HEAP32[((14232)>>2)]=$197;
 label=44;break;
 case 56: 
 var $199=($192|0)<510;
 if($199){label=57;break;}else{label=58;break;}
 case 57: 
 var $201=((($192)+(1))|0);
 HEAP32[((14232)>>2)]=$201;
 var $202=((6752+($192<<2))|0);
 HEAP32[(($202)>>2)]=$key_1;
 label=58;break;
 case 58: 
 if(($key_1|0)==13|($key_1|0)==10){ label=59;break;}else{label=44;break;}
 case 59: 
 var $205=HEAP32[((5224)>>2)];
 var $206=((($205)+(1))|0);
 HEAP32[((5224)>>2)]=$206;
 var $207=((6752+($205<<2))|0);
 var $208=HEAP32[(($207)>>2)];
 var $209=HEAP32[((6744)>>2)];
 var $210=$208;
 FUNCTION_TABLE[$209]($210);
 label=60;break;
 case 60: 
 return;
  default: assert(0, "bad label: " + label);
 }

}


function _Xinitscr($argc,$argv){
 var label=0;
 var tempVarArgs=0;
 var sp=STACKTOP; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((15744)>>2)];
 var $2=($1|0)==0;
 if($2){label=3;break;}else{label=2;break;}
 case 2: 
 var $4=(($1)|0);
 var $5=HEAP8[($4)];
 var $6=(($5<<24)>>24)==0;
 if($6){label=3;break;}else{var $_0=0;label=23;break;}
 case 3: 
 var $8=_PDC_scr_open($argc,$argv);
 var $9=($8|0)==-1;
 if($9){label=4;break;}else{label=5;break;}
 case 4: 
 var $11=HEAP32[((_stderr)>>2)];
 var $12=_fwrite(6448,31,1,$11);
 _exit(8);
 throw "Reached an unreachable!";
 case 5: 
 var $14=HEAP32[((15744)>>2)];
 var $15=(($14+1)|0);
 HEAP8[($15)]=1;
 var $16=HEAP32[((15744)>>2)];
 var $17=(($16+5)|0);
 HEAP8[($17)]=0;
 var $18=HEAP32[((15744)>>2)];
 var $19=(($18+4)|0);
 HEAP8[($19)]=0;
 var $20=HEAP32[((15744)>>2)];
 var $21=(($20+2)|0);
 HEAP8[($21)]=1;
 var $22=HEAP32[((15744)>>2)];
 var $23=(($22+80)|0);
 HEAP8[($23)]=0;
 var $24=HEAP32[((15744)>>2)];
 var $25=(($24+81)|0);
 HEAP8[($25)]=0;
 var $26=HEAP32[((15744)>>2)];
 var $27=(($26+3)|0);
 HEAP8[($27)]=1;
 var $28=HEAP32[((15744)>>2)];
 var $29=(($28+24)|0);
 HEAP32[(($29)>>2)]=1;
 var $30=HEAP32[((15744)>>2)];
 var $31=(($30+8)|0);
 HEAP8[($31)]=0;
 var $32=HEAP32[((15744)>>2)];
 var $33=(($32+40)|0);
 HEAP32[(($33)>>2)]=0;
 var $34=HEAP32[((15744)>>2)];
 var $35=(($34+44)|0);
 HEAP32[(($35)>>2)]=0;
 var $36=HEAP32[((15744)>>2)];
 var $37=(($36+60)|0);
 HEAP32[(($37)>>2)]=0;
 var $38=HEAP32[((15744)>>2)];
 var $39=(($38+64)|0);
 HEAP32[(($39)>>2)]=0;
 var $40=HEAP32[((15744)>>2)];
 var $41=(($40+68)|0);
 HEAP32[(($41)>>2)]=0;
 var $42=HEAP32[((15744)>>2)];
 var $43=(($42+84)|0);
 HEAP16[(($43)>>1)]=-1;
 var $44=_PDC_get_cursor_mode();
 var $45=HEAP32[((15744)>>2)];
 var $46=(($45+28)|0);
 HEAP32[(($46)>>2)]=$44;
 var $47=HEAP32[((15744)>>2)];
 var $48=(($47+32)|0);
 var $49=HEAP32[(($48)>>2)];
 HEAP32[((15776)>>2)]=$49;
 var $50=(($47+36)|0);
 var $51=HEAP32[(($50)>>2)];
 HEAP32[((15784)>>2)]=$51;
 var $52=($49|0)<2;
 var $53=($51|0)<2;
 var $or_cond=$52|$53;
 if($or_cond){label=6;break;}else{label=7;break;}
 case 6: 
 var $55=HEAP32[((_stderr)>>2)];
 var $56=_fprintf($55,6312,(tempVarArgs=STACKTOP,STACKTOP = (STACKTOP + 16)|0,(assert((STACKTOP|0) < (STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$49,HEAP32[(((tempVarArgs)+(8))>>2)]=$51,tempVarArgs)); STACKTOP=tempVarArgs;
 _exit(4);
 throw "Reached an unreachable!";
 case 7: 
 var $58=_newwin($49,$51,0,0);
 HEAP32[((12904)>>2)]=$58;
 var $59=($58|0)==0;
 if($59){label=8;break;}else{label=9;break;}
 case 8: 
 var $61=HEAP32[((_stderr)>>2)];
 var $62=_fwrite(6232,36,1,$61);
 _exit(2);
 throw "Reached an unreachable!";
 case 9: 
 var $64=HEAP32[((15776)>>2)];
 var $65=HEAP32[((15784)>>2)];
 var $66=_newwin($64,$65,0,0);
 HEAP32[((12328)>>2)]=$66;
 var $67=($66|0)==0;
 if($67){label=10;break;}else{label=11;break;}
 case 10: 
 var $69=HEAP32[((_stderr)>>2)];
 var $70=_fwrite(6128,41,1,$69);
 _exit(2);
 throw "Reached an unreachable!";
 case 11: 
 var $72=_wattrset($66,-1);
 var $73=HEAP32[((12328)>>2)];
 var $74=_werase($73);
 _PDC_slk_initialize();
 var $75=HEAP32[((15744)>>2)];
 var $76=(($75+52)|0);
 var $77=HEAP32[(($76)>>2)];
 var $78=HEAP32[((15776)>>2)];
 var $79=((($78)-($77))|0);
 HEAP32[((15776)>>2)]=$79;
 var $80=HEAP8[(12776)];
 var $81=(($80<<24)>>24)>0;
 if($81){var $i_02=0;var $82=$79;label=12;break;}else{var $115=$79;var $114=$75;label=17;break;}
 case 12: 
 var $82;
 var $i_02;
 var $83=((12784+($i_02<<3))|0);
 var $84=HEAP32[(($83)>>2)];
 var $85=($84|0)<0;
 var $86=((12784+($i_02<<3)+4)|0);
 var $87=HEAP32[(($86)>>2)];
 var $88=HEAP32[((15784)>>2)];
 if($85){label=13;break;}else{label=14;break;}
 case 13: 
 var $90=((($82)-(1))|0);
 var $91=_newwin(1,$88,$90,0);
 var $92=HEAP32[((15784)>>2)];
 var $93=FUNCTION_TABLE[$87]($91,$92);
 label=15;break;
 case 14: 
 var $95=HEAP32[((15744)>>2)];
 var $96=(($95+64)|0);
 var $97=HEAP32[(($96)>>2)];
 var $98=((($97)+(1))|0);
 HEAP32[(($96)>>2)]=$98;
 var $99=_newwin(1,$88,$97,0);
 var $100=HEAP32[((15784)>>2)];
 var $101=FUNCTION_TABLE[$87]($99,$100);
 label=15;break;
 case 15: 
 var $103=HEAP32[((15744)>>2)];
 var $104=(($103+60)|0);
 var $105=HEAP32[(($104)>>2)];
 var $106=((($105)+(1))|0);
 HEAP32[(($104)>>2)]=$106;
 var $107=HEAP32[((15776)>>2)];
 var $108=((($107)-(1))|0);
 HEAP32[((15776)>>2)]=$108;
 var $109=((($i_02)+(1))|0);
 var $110=HEAP8[(12776)];
 var $111=(($110<<24)>>24);
 var $112=($109|0)<($111|0);
 if($112){var $i_02=$109;var $82=$108;label=12;break;}else{label=16;break;}
 case 16: 
 var $_pre=HEAP32[((15744)>>2)];
 var $115=$108;var $114=$_pre;label=17;break;
 case 17: 
 var $114;
 var $115;
 HEAP8[(12776)]=0;
 var $116=HEAP32[((15784)>>2)];
 var $117=(($114+64)|0);
 var $118=HEAP32[(($117)>>2)];
 var $119=_newwin($115,$116,$118,0);
 HEAP32[((12136)>>2)]=$119;
 var $120=($119|0)==0;
 if($120){label=18;break;}else{label=19;break;}
 case 18: 
 var $122=HEAP32[((_stderr)>>2)];
 var $123=_fwrite(6040,36,1,$122);
 _exit(1);
 throw "Reached an unreachable!";
 case 19: 
 var $125=_wclrtobot($119);
 var $126=HEAP32[((15744)>>2)];
 var $127=(($126+72)|0);
 var $128=HEAP8[($127)];
 var $129=(($128<<24)>>24)==0;
 var $130=HEAP32[((12904)>>2)];
 if($129){label=21;break;}else{label=20;break;}
 case 20: 
 var $132=_untouchwin($130);
 var $133=HEAP32[((12136)>>2)];
 var $134=_untouchwin($133);
 var $135=HEAP32[((12136)>>2)];
 var $136=(($135+36)|0);
 HEAP8[($136)]=0;
 var $137=HEAP32[((12904)>>2)];
 var $138=(($137+36)|0);
 HEAP8[($138)]=0;
 label=22;break;
 case 21: 
 var $140=(($130+36)|0);
 HEAP8[($140)]=1;
 label=22;break;
 case 22: 
 _PDC_init_atrtab();
 HEAP32[((15756)>>2)]=-1;
 HEAP32[((15752)>>2)]=-1;
 HEAP16[((15760)>>1)]=0;
 HEAP16[((15762)>>1)]=0;
 HEAP16[((15764)>>1)]=0;
 HEAP32[((15768)>>2)]=0;
 var $142=HEAP32[((15744)>>2)];
 var $143=(($142)|0);
 HEAP8[($143)]=1;
 var $144=_def_shell_mode();
 var $145=_PDC_sysname();
 var $146=_sprintf(12000,5960,(tempVarArgs=STACKTOP,STACKTOP = (STACKTOP + 8)|0,(assert((STACKTOP|0) < (STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$145,tempVarArgs)); STACKTOP=tempVarArgs;
 var $147=HEAP32[((12136)>>2)];
 var $_0=$147;label=23;break;
 case 23: 
 var $_0;
 STACKTOP=sp;return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _initscr(){
 var label=0;


 var $1=_Xinitscr(0,0);
 return $1;
}


function _endwin(){
 var label=0;


 var $1=_def_prog_mode();
 _PDC_scr_close();
 var $2=HEAP32[((15744)>>2)];
 var $3=(($2)|0);
 HEAP8[($3)]=0;
 return 0;
}


function _isendwin(){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((15744)>>2)];
 var $2=($1|0)==0;
 if($2){var $_off0=0;label=3;break;}else{label=2;break;}
 case 2: 
 var $4=(($1)|0);
 var $5=HEAP8[($4)];
 var $6=(($5<<24)>>24)==0;
 var $extract_t=($6&1);
 var $_off0=$extract_t;label=3;break;
 case 3: 
 var $_off0;
 return $_off0;
  default: assert(0, "bad label: " + label);
 }

}


function _resize_term($nlines,$ncols){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((12136)>>2)];
 var $2=($1|0)==0;
 if($2){var $_0=-1;label=10;break;}else{label=2;break;}
 case 2: 
 var $4=_PDC_resize_screen($nlines,$ncols);
 var $5=($4|0)==-1;
 if($5){var $_0=-1;label=10;break;}else{label=3;break;}
 case 3: 
 var $7=_PDC_get_rows();
 var $8=HEAP32[((15744)>>2)];
 var $9=(($8+32)|0);
 HEAP32[(($9)>>2)]=$7;
 var $10=HEAP32[((15744)>>2)];
 var $11=(($10+32)|0);
 var $12=HEAP32[(($11)>>2)];
 var $13=(($10+60)|0);
 var $14=HEAP32[(($13)>>2)];
 var $15=((($12)-($14))|0);
 var $16=(($10+52)|0);
 var $17=HEAP32[(($16)>>2)];
 var $18=((($15)-($17))|0);
 HEAP32[((15776)>>2)]=$18;
 var $19=_PDC_get_columns();
 HEAP32[((15784)>>2)]=$19;
 var $20=HEAP32[((15744)>>2)];
 var $21=(($20+36)|0);
 HEAP32[(($21)>>2)]=$19;
 var $22=HEAP32[((12904)>>2)];
 var $23=HEAP32[((15744)>>2)];
 var $24=(($23+32)|0);
 var $25=HEAP32[(($24)>>2)];
 var $26=(($23+36)|0);
 var $27=HEAP32[(($26)>>2)];
 var $28=_wresize($22,$25,$27);
 var $29=($28|0)==-1;
 if($29){var $_0=-1;label=10;break;}else{label=4;break;}
 case 4: 
 var $31=HEAP32[((12136)>>2)];
 var $32=HEAP32[((15776)>>2)];
 var $33=HEAP32[((15784)>>2)];
 var $34=_wresize($31,$32,$33);
 var $35=($34|0)==-1;
 if($35){var $_0=-1;label=10;break;}else{label=5;break;}
 case 5: 
 var $37=HEAP32[((12328)>>2)];
 var $38=HEAP32[((15744)>>2)];
 var $39=(($38+32)|0);
 var $40=HEAP32[(($39)>>2)];
 var $41=(($38+36)|0);
 var $42=HEAP32[(($41)>>2)];
 var $43=_wresize($37,$40,$42);
 var $44=($43|0)==-1;
 if($44){var $_0=-1;label=10;break;}else{label=6;break;}
 case 6: 
 var $46=HEAP32[((12328)>>2)];
 var $47=_werase($46);
 var $48=HEAP32[((12904)>>2)];
 var $49=(($48+36)|0);
 HEAP8[($49)]=1;
 var $50=HEAP32[((15744)>>2)];
 var $51=(($50+56)|0);
 var $52=HEAP32[(($51)>>2)];
 var $53=($52|0)==0;
 if($53){label=9;break;}else{label=7;break;}
 case 7: 
 var $55=(($50+52)|0);
 var $56=HEAP32[(($55)>>2)];
 var $57=HEAP32[((15784)>>2)];
 var $58=_wresize($52,$56,$57);
 var $59=($58|0)==-1;
 if($59){var $_0=-1;label=10;break;}else{label=8;break;}
 case 8: 
 var $61=HEAP32[((15744)>>2)];
 var $62=(($61+56)|0);
 var $63=HEAP32[(($62)>>2)];
 var $64=_wmove($63,0,0);
 var $65=HEAP32[((15744)>>2)];
 var $66=(($65+56)|0);
 var $67=HEAP32[(($66)>>2)];
 var $68=_wclrtobot($67);
 _PDC_slk_initialize();
 var $69=_slk_noutrefresh();
 label=9;break;
 case 9: 
 var $71=HEAP32[((12136)>>2)];
 var $72=_touchwin($71);
 var $73=HEAP32[((12136)>>2)];
 var $74=_wnoutrefresh($73);
 var $_0=0;label=10;break;
 case 10: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _noecho(){
 var label=0;


 var $1=HEAP32[((15744)>>2)];
 var $2=(($1+3)|0);
 HEAP8[($2)]=0;
 return 0;
}


function _keypad($win,$bf){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=-1;label=3;break;}else{label=2;break;}
 case 2: 
 var $3=(($win+42)|0);
 HEAP8[($3)]=$bf;
 var $_0=0;label=3;break;
 case 3: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _raw(){
 var label=0;


 _PDC_set_keyboard_binary(1);
 var $1=HEAP32[((15744)>>2)];
 var $2=(($1+4)|0);
 HEAP8[($2)]=1;
 return 0;
}


function _timeout($delay){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((12136)>>2)];
 var $2=($1|0)==0;
 if($2){label=7;break;}else{label=2;break;}
 case 2: 
 var $4=($delay|0)<0;
 if($4){label=3;break;}else{label=4;break;}
 case 3: 
 var $6=(($1+39)|0);
 HEAP8[($6)]=0;
 var $7=(($1+64)|0);
 HEAP32[(($7)>>2)]=0;
 label=7;break;
 case 4: 
 var $9=($delay|0)==0;
 if($9){label=5;break;}else{label=6;break;}
 case 5: 
 var $11=(($1+39)|0);
 HEAP8[($11)]=1;
 var $12=(($1+64)|0);
 HEAP32[(($12)>>2)]=0;
 label=7;break;
 case 6: 
 var $14=(($1+64)|0);
 HEAP32[(($14)>>2)]=$delay;
 label=7;break;
 case 7: 
 return;
  default: assert(0, "bad label: " + label);
 }

}


function _def_prog_mode(){
 var label=0;


 HEAP8[(13004)]=1;
 var $1=HEAP32[((15744)>>2)];
 var $2=(($1)|0);
 assert(88 % 1 === 0);(_memcpy(13008, $2, 88)|0);
 _PDC_save_screen_mode(1);
 return 0;
}


function _def_shell_mode(){
 var label=0;


 HEAP8[(12912)]=1;
 var $1=HEAP32[((15744)>>2)];
 var $2=(($1)|0);
 assert(88 % 1 === 0);(_memcpy(12916, $2, 88)|0);
 _PDC_save_screen_mode(0);
 return 0;
}


function _reset_prog_mode(){
 var label=0;


 var $1=__restore_mode(1);
 _PDC_reset_prog_mode();
 return 0;
}


function __restore_mode($i){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=((12912+((($i)*(92))&-1))|0);
 var $2=HEAP8[($1)];
 var $3=(($2<<24)>>24)==1;
 if($3){label=2;break;}else{var $35=$2;label=9;break;}
 case 2: 
 var $5=HEAP32[((15744)>>2)];
 var $6=(($5)|0);
 var $7=((12912+((($i)*(92))&-1)+4)|0);
 assert(88 % 1 === 0);(_memcpy($6, $7, 88)|0);
 var $8=((12912+((($i)*(92))&-1)+9)|0);
 var $9=HEAP8[($8)];
 var $10=(($9<<24)>>24)==0;
 if($10){label=4;break;}else{label=3;break;}
 case 3: 
 var $12=_raw();
 label=4;break;
 case 4: 
 _PDC_restore_screen_mode($i);
 var $14=HEAP32[((15776)>>2)];
 var $15=((12912+((($i)*(92))&-1)+36)|0);
 var $16=HEAP32[(($15)>>2)];
 var $17=($14|0)==($16|0);
 if($17){label=6;break;}else{label=5;break;}
 case 5: 
 var $_phi_trans_insert=((12912+((($i)*(92))&-1)+40)|0);
 var $_pre1=HEAP32[(($_phi_trans_insert)>>2)];
 var $24=$_pre1;label=7;break;
 case 6: 
 var $19=HEAP32[((15784)>>2)];
 var $20=((12912+((($i)*(92))&-1)+40)|0);
 var $21=HEAP32[(($20)>>2)];
 var $22=($19|0)==($21|0);
 if($22){label=8;break;}else{var $24=$21;label=7;break;}
 case 7: 
 var $24;
 var $25=_resize_term($16,$24);
 label=8;break;
 case 8: 
 var $27=((12912+((($i)*(92))&-1)+28)|0);
 var $28=HEAP32[(($27)>>2)];
 var $29=_PDC_curs_set($28);
 var $30=((12912+((($i)*(92))&-1)+20)|0);
 var $31=HEAP32[(($30)>>2)];
 var $32=((12912+((($i)*(92))&-1)+24)|0);
 var $33=HEAP32[(($32)>>2)];
 _PDC_gotoyx($31,$33);
 var $_pre=HEAP8[($1)];
 var $35=$_pre;label=9;break;
 case 9: 
 var $35;
 var $not_=(($35<<24)>>24)==0;
 var $36=(($not_<<31)>>31);
 return $36;
  default: assert(0, "bad label: " + label);
 }

}


function _curs_set($visibility){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($visibility>>>0)>2;
 if($1){var $_0=-1;label=4;break;}else{label=2;break;}
 case 2: 
 var $3=_PDC_curs_set($visibility);
 var $4=($visibility|0)!=0;
 var $5=($3|0)==0;
 var $or_cond=$4&$5;
 if($or_cond){label=3;break;}else{var $_0=$3;label=4;break;}
 case 3: 
 var $7=HEAP32[((15744)>>2)];
 var $8=(($7+16)|0);
 var $9=HEAP32[(($8)>>2)];
 var $10=(($7+20)|0);
 var $11=HEAP32[(($10)>>2)];
 _PDC_gotoyx($9,$11);
 var $_0=0;label=4;break;
 case 4: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _napms($ms){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($ms|0)==0;
 if($1){label=3;break;}else{label=2;break;}
 case 2: 
 _PDC_napms($ms);
 label=3;break;
 case 3: 
 return 0;
  default: assert(0, "bad label: " + label);
 }

}


function _napms_async($ms,$callback){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($ms|0)==0;
 if($1){label=3;break;}else{label=2;break;}
 case 2: 
 var $3=_PDC_napms_async($ms,$callback);
 label=3;break;
 case 3: 
 return 0;
  default: assert(0, "bad label: " + label);
 }

}


function _move($y,$x){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((12136)>>2)];
 var $2=($1|0)==0;
 var $3=($x|0)<0;
 var $or_cond=$2|$3;
 var $4=($y|0)<0;
 var $or_cond1=$or_cond|$4;
 if($or_cond1){var $_0=-1;label=5;break;}else{label=2;break;}
 case 2: 
 var $6=(($1+12)|0);
 var $7=HEAP32[(($6)>>2)];
 var $8=($7|0)>($x|0);
 if($8){label=3;break;}else{var $_0=-1;label=5;break;}
 case 3: 
 var $10=(($1+8)|0);
 var $11=HEAP32[(($10)>>2)];
 var $12=($11|0)>($y|0);
 if($12){label=4;break;}else{var $_0=-1;label=5;break;}
 case 4: 
 var $14=(($1+4)|0);
 HEAP32[(($14)>>2)]=$x;
 var $15=HEAP32[((12136)>>2)];
 var $16=(($15)|0);
 HEAP32[(($16)>>2)]=$y;
 var $_0=0;label=5;break;
 case 5: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _wmove($win,$y,$x){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 var $2=($x|0)<0;
 var $or_cond=$1|$2;
 var $3=($y|0)<0;
 var $or_cond1=$or_cond|$3;
 if($or_cond1){var $_0=-1;label=5;break;}else{label=2;break;}
 case 2: 
 var $5=(($win+12)|0);
 var $6=HEAP32[(($5)>>2)];
 var $7=($6|0)>($x|0);
 if($7){label=3;break;}else{var $_0=-1;label=5;break;}
 case 3: 
 var $9=(($win+8)|0);
 var $10=HEAP32[(($9)>>2)];
 var $11=($10|0)>($y|0);
 if($11){label=4;break;}else{var $_0=-1;label=5;break;}
 case 4: 
 var $13=(($win+4)|0);
 HEAP32[(($13)>>2)]=$x;
 var $14=(($win)|0);
 HEAP32[(($14)>>2)]=$y;
 var $_0=0;label=5;break;
 case 5: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _leaveok($win,$bf){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=-1;label=3;break;}else{label=2;break;}
 case 2: 
 var $3=(($win+37)|0);
 HEAP8[($3)]=$bf;
 var $4=(($bf<<24)>>24)==0;
 var $5=($4&1);
 var $6=_curs_set($5);
 var $_0=0;label=3;break;
 case 3: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _scrollok($win,$bf){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=-1;label=3;break;}else{label=2;break;}
 case 2: 
 var $3=(($win+38)|0);
 HEAP8[($3)]=$bf;
 var $_0=0;label=3;break;
 case 3: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _mvprintw($y,$x,$fmt,varrp){
 var label=0;
 var sp=STACKTOP;STACKTOP=(STACKTOP+536)|0; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $printbuf_i=sp;
 var $args=(sp)+(520);
 var $1=_move($y,$x);
 var $2=($1|0)==-1;
 if($2){var $_0=-1;label=3;break;}else{label=2;break;}
 case 2: 
 var $4=(($args)|0);
 var $5=$args;
 HEAP32[(($5)>>2)]=varrp;HEAP32[((($5)+(4))>>2)]=0;
 var $6=HEAP32[((12136)>>2)];
 var $7=(($printbuf_i)|0);
 var $$etemp$0$0=513;
 var $$etemp$0$1=0;

 var $8=_vsnprintf($7,512,$fmt,$4);
 var $9=_waddstr($6,$7);
 var $10=($9|0)==-1;
 var $11=($10?-1:$8);
 var $$etemp$1$0=513;
 var $$etemp$1$1=0;


 var $_0=$11;label=3;break;
 case 3: 
 var $_0;
 STACKTOP=sp;return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _mvwprintw($win,$y,$x,$fmt,varrp){
 var label=0;
 var sp=STACKTOP;STACKTOP=(STACKTOP+536)|0; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $printbuf_i=sp;
 var $args=(sp)+(520);
 var $1=_wmove($win,$y,$x);
 var $2=($1|0)==-1;
 if($2){var $_0=-1;label=3;break;}else{label=2;break;}
 case 2: 
 var $4=(($args)|0);
 var $5=$args;
 HEAP32[(($5)>>2)]=varrp;HEAP32[((($5)+(4))>>2)]=0;
 var $6=(($printbuf_i)|0);
 var $$etemp$0$0=513;
 var $$etemp$0$1=0;

 var $7=_vsnprintf($6,512,$fmt,$4);
 var $8=_waddstr($win,$6);
 var $9=($8|0)==-1;
 var $10=($9?-1:$7);
 var $$etemp$1$0=513;
 var $$etemp$1$1=0;


 var $_0=$10;label=3;break;
 case 3: 
 var $_0;
 STACKTOP=sp;return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _wnoutrefresh($win){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=-1;label=22;break;}else{label=2;break;}
 case 2: 
 var $3=(($win+24)|0);
 var $4=HEAP32[(($3)>>2)];
 var $5=$4&48;
 var $6=($5|0)==0;
 if($6){label=3;break;}else{var $_0=-1;label=22;break;}
 case 3: 
 var $8=(($win+16)|0);
 var $9=HEAP32[(($8)>>2)];
 var $10=(($win+20)|0);
 var $11=HEAP32[(($10)>>2)];
 var $12=(($win+8)|0);
 var $13=HEAP32[(($12)>>2)];
 var $14=($13|0)>0;
 if($14){label=4;break;}else{label=18;break;}
 case 4: 
 var $15=(($win+48)|0);
 var $16=(($win+52)|0);
 var $17=(($win+44)|0);
 var $j_09=$9;var $i_010=0;label=5;break;
 case 5: 
 var $i_010;
 var $j_09;
 var $19=HEAP32[(($15)>>2)];
 var $20=(($19+($i_010<<2))|0);
 var $21=HEAP32[(($20)>>2)];
 var $22=($21|0)==-1;
 if($22){label=17;break;}else{label=6;break;}
 case 6: 
 var $24=HEAP32[(($17)>>2)];
 var $25=(($24+($i_010<<2))|0);
 var $26=HEAP32[(($25)>>2)];
 var $27=HEAP32[((12904)>>2)];
 var $28=(($27+44)|0);
 var $29=HEAP32[(($28)>>2)];
 var $30=(($29+($j_09<<2))|0);
 var $31=HEAP32[(($30)>>2)];
 var $32=HEAP32[(($16)>>2)];
 var $33=(($32+($i_010<<2))|0);
 var $34=HEAP32[(($33)>>2)];
 var $35=($21|0)>($34|0);
 if($35){var $first_0_lcssa=$21;label=9;break;}else{var $first_05=$21;label=8;break;}
 case 7: 
 var $37=($first_05|0)<($34|0);
 if($37){var $first_05=$43;label=8;break;}else{var $first_0_lcssa=$43;label=9;break;}
 case 8: 
 var $first_05;
 var $38=(($26+($first_05<<2))|0);
 var $39=HEAP32[(($38)>>2)];
 var $_sum3=((($first_05)+($11))|0);
 var $40=(($31+($_sum3<<2))|0);
 var $41=HEAP32[(($40)>>2)];
 var $42=($39|0)==($41|0);
 var $43=((($first_05)+(1))|0);
 if($42){label=7;break;}else{var $first_0_lcssa=$first_05;label=9;break;}
 case 9: 
 var $first_0_lcssa;
 var $44=($34|0)<($first_0_lcssa|0);
 if($44){label=16;break;}else{var $last_07=$34;label=11;break;}
 case 10: 
 var $45=((($last_07)-(1))|0);
 var $46=($last_07|0)>($first_0_lcssa|0);
 if($46){var $last_07=$45;label=11;break;}else{label=16;break;}
 case 11: 
 var $last_07;
 var $47=(($26+($last_07<<2))|0);
 var $48=HEAP32[(($47)>>2)];
 var $_sum2=((($last_07)+($11))|0);
 var $49=(($31+($_sum2<<2))|0);
 var $50=HEAP32[(($49)>>2)];
 var $51=($48|0)==($50|0);
 if($51){label=10;break;}else{label=12;break;}
 case 12: 
 var $_sum=((($first_0_lcssa)+($11))|0);
 var $53=(($31+($_sum<<2))|0);
 var $54=$53;
 var $55=(($26+($first_0_lcssa<<2))|0);
 var $56=$55;
 var $57=((($last_07)-($first_0_lcssa))|0);
 var $58=$57<<2;
 var $59=((($58)+(4))|0);
 assert($59 % 1 === 0);(_memcpy($54, $56, $59)|0);
 var $60=HEAP32[((12904)>>2)];
 var $61=(($60+48)|0);
 var $62=HEAP32[(($61)>>2)];
 var $63=(($62+($j_09<<2))|0);
 var $64=HEAP32[(($63)>>2)];
 var $65=($_sum|0)<($64|0);
 var $66=($64|0)==-1;
 var $or_cond=$65|$66;
 if($or_cond){label=13;break;}else{var $69=$60;label=14;break;}
 case 13: 
 HEAP32[(($63)>>2)]=$_sum;
 var $_pre=HEAP32[((12904)>>2)];
 var $69=$_pre;label=14;break;
 case 14: 
 var $69;
 var $70=(($69+52)|0);
 var $71=HEAP32[(($70)>>2)];
 var $72=(($71+($j_09<<2))|0);
 var $73=HEAP32[(($72)>>2)];
 var $74=($_sum2|0)>($73|0);
 if($74){label=15;break;}else{label=16;break;}
 case 15: 
 HEAP32[(($72)>>2)]=$_sum2;
 label=16;break;
 case 16: 
 var $76=HEAP32[(($15)>>2)];
 var $77=(($76+($i_010<<2))|0);
 HEAP32[(($77)>>2)]=-1;
 label=17;break;
 case 17: 
 var $79=HEAP32[(($16)>>2)];
 var $80=(($79+($i_010<<2))|0);
 HEAP32[(($80)>>2)]=-1;
 var $81=((($i_010)+(1))|0);
 var $82=((($j_09)+(1))|0);
 var $83=HEAP32[(($12)>>2)];
 var $84=($81|0)<($83|0);
 if($84){var $j_09=$82;var $i_010=$81;label=5;break;}else{label=18;break;}
 case 18: 
 var $85=(($win+36)|0);
 var $86=HEAP8[($85)];
 var $87=(($86<<24)>>24)==0;
 if($87){label=20;break;}else{label=19;break;}
 case 19: 
 HEAP8[($85)]=0;
 label=20;break;
 case 20: 
 var $90=(($win+37)|0);
 var $91=HEAP8[($90)];
 var $92=(($91<<24)>>24)==0;
 if($92){label=21;break;}else{var $_0=0;label=22;break;}
 case 21: 
 var $94=(($win)|0);
 var $95=HEAP32[(($94)>>2)];
 var $96=((($95)+($9))|0);
 var $97=HEAP32[((12904)>>2)];
 var $98=(($97)|0);
 HEAP32[(($98)>>2)]=$96;
 var $99=(($win+4)|0);
 var $100=HEAP32[(($99)>>2)];
 var $101=((($100)+($11))|0);
 var $102=HEAP32[((12904)>>2)];
 var $103=(($102+4)|0);
 HEAP32[(($103)>>2)]=$101;
 var $_0=0;label=22;break;
 case 22: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _doupdate(){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((12904)>>2)];
 var $2=($1|0)==0;
 if($2){var $_0=-1;label=37;break;}else{label=2;break;}
 case 2: 
 var $4=_isendwin();
 var $5=(($4<<24)>>24)==0;
 if($5){label=4;break;}else{label=3;break;}
 case 3: 
 var $7=_reset_prog_mode();
 var $8=HEAP32[((15744)>>2)];
 var $9=(($8)|0);
 HEAP8[($9)]=1;
 var $clearall_0=1;label=5;break;
 case 4: 
 var $11=HEAP32[((12904)>>2)];
 var $12=(($11+36)|0);
 var $13=HEAP8[($12)];
 var $clearall_0=$13;label=5;break;
 case 5: 
 var $clearall_0;
 var $15=HEAP32[((15744)>>2)];
 var $16=(($15+32)|0);
 var $17=HEAP32[(($16)>>2)];
 var $18=($17|0)>0;
 if($18){label=6;break;}else{label=34;break;}
 case 6: 
 var $19=(($clearall_0<<24)>>24)==0;
 var $20=(($clearall_0<<24)>>24)!=0;
 var $y_012=0;var $22=$15;label=7;break;
 case 7: 
 var $22;
 var $y_012;
 var $23=HEAP32[((12904)>>2)];
 if($19){label=8;break;}else{label=9;break;}
 case 8: 
 var $25=(($23+48)|0);
 var $26=HEAP32[(($25)>>2)];
 var $27=(($26+($y_012<<2))|0);
 var $28=HEAP32[(($27)>>2)];
 var $29=($28|0)==-1;
 if($29){var $118=$22;label=33;break;}else{label=9;break;}
 case 9: 
 var $30=(($23+44)|0);
 var $31=HEAP32[(($30)>>2)];
 var $32=(($31+($y_012<<2))|0);
 var $33=HEAP32[(($32)>>2)];
 var $34=HEAP32[((12328)>>2)];
 var $35=(($34+44)|0);
 var $36=HEAP32[(($35)>>2)];
 var $37=(($36+($y_012<<2))|0);
 var $38=HEAP32[(($37)>>2)];
 if($20){label=10;break;}else{label=11;break;}
 case 10: 
 var $40=HEAP32[((15784)>>2)];
 var $41=((($40)-(1))|0);
 var $last_0_ph=$41;var $first_0_ph=0;label=12;break;
 case 11: 
 var $43=(($23+48)|0);
 var $44=HEAP32[(($43)>>2)];
 var $45=(($44+($y_012<<2))|0);
 var $46=HEAP32[(($45)>>2)];
 var $47=(($23+52)|0);
 var $48=HEAP32[(($47)>>2)];
 var $49=(($48+($y_012<<2))|0);
 var $50=HEAP32[(($49)>>2)];
 var $last_0_ph=$50;var $first_0_ph=$46;label=12;break;
 case 12: 
 var $first_0_ph;
 var $last_0_ph;
 var $51=($first_0_ph|0)>($last_0_ph|0);
 if($51){var $109=$23;label=32;break;}else{label=13;break;}
 case 13: 
 if($20){var $first_010_us=$first_0_ph;label=14;break;}else{var $first_010=$first_0_ph;label=21;break;}
 case 14: 
 var $first_010_us;
 var $52=(((1)-($first_010_us))|0);
 var $53=((($52)+($last_0_ph))|0);
 var $54=($53|0)==0;
 if($54){var $first_1_ph_us=$first_010_us;label=18;break;}else{label=15;break;}
 case 15: 
 var $55=(($33+($first_010_us<<2))|0);
 _PDC_transform_line($y_012,$first_010_us,$53,$55);
 var $56=(($38+($first_010_us<<2))|0);
 var $57=$56;
 var $58=$55;
 var $59=$53<<2;
 assert($59 % 1 === 0);(_memcpy($57, $58, $59)|0);
 var $60=((($last_0_ph)+(1))|0);
 var $first_1_ph_us=$60;label=18;break;
 case 16: 
 var $62=($first_17_us|0)<($last_0_ph|0);
 if($62){var $first_17_us=$68;label=17;break;}else{var $first_1_lcssa_us=$68;label=19;break;}
 case 17: 
 var $first_17_us;
 var $63=(($33+($first_17_us<<2))|0);
 var $64=HEAP32[(($63)>>2)];
 var $65=(($38+($first_17_us<<2))|0);
 var $66=HEAP32[(($65)>>2)];
 var $67=($64|0)==($66|0);
 var $68=((($first_17_us)+(1))|0);
 if($67){label=16;break;}else{var $first_1_lcssa_us=$first_17_us;label=19;break;}
 case 18: 
 var $first_1_ph_us;
 var $69=($first_1_ph_us|0)>($last_0_ph|0);
 if($69){var $first_1_lcssa_us=$first_1_ph_us;label=19;break;}else{var $first_17_us=$first_1_ph_us;label=17;break;}
 case 19: 
 var $first_1_lcssa_us;
 var $70=($first_1_lcssa_us|0)>($last_0_ph|0);
 if($70){label=31;break;}else{var $first_010_us=$first_1_lcssa_us;label=14;break;}
 case 20: 
 var $first_1_lcssa;
 var $71=($first_1_lcssa|0)>($last_0_ph|0);
 if($71){label=31;break;}else{var $first_010=$first_1_lcssa;label=21;break;}
 case 21: 
 var $first_010;
 var $72=($first_010|0)>($last_0_ph|0);
 if($72){var $first_1_ph=$first_010;label=28;break;}else{var $len_05=0;var $73=$first_010;label=22;break;}
 case 22: 
 var $73;
 var $len_05;
 var $74=(($33+($73<<2))|0);
 var $75=HEAP32[(($74)>>2)];
 var $76=(($38+($73<<2))|0);
 var $77=HEAP32[(($76)>>2)];
 var $78=($75|0)==($77|0);
 if($78){label=23;break;}else{label=25;break;}
 case 23: 
 var $80=($len_05|0)!=0;
 var $81=($73|0)<($last_0_ph|0);
 var $or_cond=$80&$81;
 if($or_cond){label=24;break;}else{var $len_0_lcssa=$len_05;label=26;break;}
 case 24: 
 var $83=((($73)+(1))|0);
 var $84=(($33+($83<<2))|0);
 var $85=HEAP32[(($84)>>2)];
 var $86=(($38+($83<<2))|0);
 var $87=HEAP32[(($86)>>2)];
 var $88=($85|0)==($87|0);
 if($88){var $len_0_lcssa=$len_05;label=26;break;}else{label=25;break;}
 case 25: 
 var $89=((($len_05)+(1))|0);
 var $90=((($89)+($first_010))|0);
 var $91=($90|0)>($last_0_ph|0);
 if($91){var $len_0_lcssa=$89;label=26;break;}else{var $len_05=$89;var $73=$90;label=22;break;}
 case 26: 
 var $len_0_lcssa;
 var $92=($len_0_lcssa|0)==0;
 if($92){var $first_1_ph=$first_010;label=28;break;}else{label=27;break;}
 case 27: 
 var $94=(($33+($first_010<<2))|0);
 _PDC_transform_line($y_012,$first_010,$len_0_lcssa,$94);
 var $95=(($38+($first_010<<2))|0);
 var $96=$95;
 var $97=$94;
 var $98=$len_0_lcssa<<2;
 assert($98 % 1 === 0);(_memcpy($96, $97, $98)|0);
 var $99=((($len_0_lcssa)+($first_010))|0);
 var $first_1_ph=$99;label=28;break;
 case 28: 
 var $first_1_ph;
 var $100=($first_1_ph|0)>($last_0_ph|0);
 if($100){var $first_1_lcssa=$first_1_ph;label=20;break;}else{var $first_17=$first_1_ph;label=30;break;}
 case 29: 
 var $102=($first_17|0)<($last_0_ph|0);
 if($102){var $first_17=$108;label=30;break;}else{var $first_1_lcssa=$108;label=20;break;}
 case 30: 
 var $first_17;
 var $103=(($33+($first_17<<2))|0);
 var $104=HEAP32[(($103)>>2)];
 var $105=(($38+($first_17<<2))|0);
 var $106=HEAP32[(($105)>>2)];
 var $107=($104|0)==($106|0);
 var $108=((($first_17)+(1))|0);
 if($107){label=29;break;}else{var $first_1_lcssa=$first_17;label=20;break;}
 case 31: 
 var $_pre25=HEAP32[((12904)>>2)];
 var $109=$_pre25;label=32;break;
 case 32: 
 var $109;
 var $110=(($109+48)|0);
 var $111=HEAP32[(($110)>>2)];
 var $112=(($111+($y_012<<2))|0);
 HEAP32[(($112)>>2)]=-1;
 var $113=HEAP32[((12904)>>2)];
 var $114=(($113+52)|0);
 var $115=HEAP32[(($114)>>2)];
 var $116=(($115+($y_012<<2))|0);
 HEAP32[(($116)>>2)]=-1;
 var $_pre24=HEAP32[((15744)>>2)];
 var $118=$_pre24;label=33;break;
 case 33: 
 var $118;
 var $119=((($y_012)+(1))|0);
 var $120=(($118+32)|0);
 var $121=HEAP32[(($120)>>2)];
 var $122=($119|0)<($121|0);
 if($122){var $y_012=$119;var $22=$118;label=7;break;}else{label=34;break;}
 case 34: 
 var $123=HEAP32[((12904)>>2)];
 var $124=(($123+36)|0);
 HEAP8[($124)]=0;
 var $125=HEAP32[((15744)>>2)];
 var $126=(($125+24)|0);
 var $127=HEAP32[(($126)>>2)];
 var $128=($127|0)==0;
 if($128){var $136=$125;label=36;break;}else{label=35;break;}
 case 35: 
 var $130=HEAP32[((12904)>>2)];
 var $131=(($130)|0);
 var $132=HEAP32[(($131)>>2)];
 var $133=(($130+4)|0);
 var $134=HEAP32[(($133)>>2)];
 _PDC_gotoyx($132,$134);
 var $_pre=HEAP32[((15744)>>2)];
 var $136=$_pre;label=36;break;
 case 36: 
 var $136;
 var $137=HEAP32[((12904)>>2)];
 var $138=(($137)|0);
 var $139=HEAP32[(($138)>>2)];
 var $140=(($136+16)|0);
 HEAP32[(($140)>>2)]=$139;
 var $141=HEAP32[((12904)>>2)];
 var $142=(($141+4)|0);
 var $143=HEAP32[(($142)>>2)];
 var $144=HEAP32[((15744)>>2)];
 var $145=(($144+20)|0);
 HEAP32[(($145)>>2)]=$143;
 var $_0=0;label=37;break;
 case 37: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _wrefresh($win){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=-1;label=11;break;}else{label=2;break;}
 case 2: 
 var $3=(($win+24)|0);
 var $4=HEAP32[(($3)>>2)];
 var $5=$4&48;
 var $6=($5|0)==0;
 if($6){label=3;break;}else{var $_0=-1;label=11;break;}
 case 3: 
 var $8=(($win+36)|0);
 var $9=HEAP8[($8)];
 var $10=HEAP32[((12904)>>2)];
 var $11=($10|0)==($win|0);
 if($11){label=4;break;}else{label=5;break;}
 case 4: 
 HEAP8[($8)]=1;
 label=6;break;
 case 5: 
 var $14=_wnoutrefresh($win);
 label=6;break;
 case 6: 
 var $16=(($9<<24)>>24)==0;
 if($16){label=10;break;}else{label=7;break;}
 case 7: 
 var $18=(($win+8)|0);
 var $19=HEAP32[(($18)>>2)];
 var $20=HEAP32[((15744)>>2)];
 var $21=(($20+32)|0);
 var $22=HEAP32[(($21)>>2)];
 var $23=($19|0)==($22|0);
 if($23){label=8;break;}else{label=10;break;}
 case 8: 
 var $25=(($win+12)|0);
 var $26=HEAP32[(($25)>>2)];
 var $27=(($20+36)|0);
 var $28=HEAP32[(($27)>>2)];
 var $29=($26|0)==($28|0);
 if($29){label=9;break;}else{label=10;break;}
 case 9: 
 var $31=HEAP32[((12904)>>2)];
 var $32=(($31+36)|0);
 HEAP8[($32)]=1;
 label=10;break;
 case 10: 
 var $34=_doupdate();
 var $_0=$34;label=11;break;
 case 11: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _refresh(){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((12136)>>2)];
 var $2=($1|0)==0;
 if($2){var $_0_i=-1;label=11;break;}else{label=2;break;}
 case 2: 
 var $4=(($1+24)|0);
 var $5=HEAP32[(($4)>>2)];
 var $6=$5&48;
 var $7=($6|0)==0;
 if($7){label=3;break;}else{var $_0_i=-1;label=11;break;}
 case 3: 
 var $9=(($1+36)|0);
 var $10=HEAP8[($9)];
 var $11=HEAP32[((12904)>>2)];
 var $12=($11|0)==($1|0);
 if($12){label=4;break;}else{label=5;break;}
 case 4: 
 HEAP8[($9)]=1;
 label=6;break;
 case 5: 
 var $15=_wnoutrefresh($1);
 label=6;break;
 case 6: 
 var $17=(($10<<24)>>24)==0;
 if($17){label=10;break;}else{label=7;break;}
 case 7: 
 var $19=(($1+8)|0);
 var $20=HEAP32[(($19)>>2)];
 var $21=HEAP32[((15744)>>2)];
 var $22=(($21+32)|0);
 var $23=HEAP32[(($22)>>2)];
 var $24=($20|0)==($23|0);
 if($24){label=8;break;}else{label=10;break;}
 case 8: 
 var $26=(($1+12)|0);
 var $27=HEAP32[(($26)>>2)];
 var $28=(($21+36)|0);
 var $29=HEAP32[(($28)>>2)];
 var $30=($27|0)==($29|0);
 if($30){label=9;break;}else{label=10;break;}
 case 9: 
 var $32=HEAP32[((12904)>>2)];
 var $33=(($32+36)|0);
 HEAP8[($33)]=1;
 label=10;break;
 case 10: 
 var $35=_doupdate();
 var $_0_i=$35;label=11;break;
 case 11: 
 var $_0_i;
 return $_0_i;
  default: assert(0, "bad label: " + label);
 }

}


function __drawone($num){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $_b=HEAP8[(840)];
 if($_b){label=10;break;}else{label=2;break;}
 case 2: 
 var $2=HEAP32[((12144)>>2)];
 var $3=(($2+((($num)*(140))&-1)+128)|0);
 var $4=HEAP32[(($3)>>2)];
 var $5=(($2+((($num)*(140))&-1)+132)|0);
 var $6=HEAP32[(($5)>>2)];
 if(($6|0)==1){ label=3;break;}else if(($6|0)==0){ var $col_0=0;label=5;break;}else{label=4;break;}
 case 3: 
 var $8=HEAP32[((12832)>>2)];
 var $9=((($8)-($4))|0);
 var $10=(((($9|0))/(2))&-1);
 var $11=((($10)+($4))|0);
 var $12=($11|0)>($8|0);
 var $13=(($12<<31)>>31);
 var $_=((($13)+($10))|0);
 var $col_0=$_;label=5;break;
 case 4: 
 var $15=HEAP32[((12832)>>2)];
 var $16=((($15)-($4))|0);
 var $col_0=$16;label=5;break;
 case 5: 
 var $col_0;
 var $18=HEAP32[((15744)>>2)];
 var $19=(($18+56)|0);
 var $20=HEAP32[(($19)>>2)];
 var $_b1=HEAP8[(16)];
 var $21=($_b1&1);
 var $22=(($2+((($num)*(140))&-1)+136)|0);
 var $23=HEAP32[(($22)>>2)];
 var $24=_wmove($20,$21,$23);
 var $25=HEAP32[((12832)>>2)];
 var $26=($25|0)>0;
 if($26){label=6;break;}else{label=10;break;}
 case 6: 
 var $27=((($col_0)+($4))|0);
 var $i_03=0;label=7;break;
 case 7: 
 var $i_03;
 var $29=HEAP32[((15744)>>2)];
 var $30=(($29+56)|0);
 var $31=HEAP32[(($30)>>2)];
 var $32=($i_03|0)>=($col_0|0);
 var $33=($i_03|0)<($27|0);
 var $or_cond=$32&$33;
 if($or_cond){label=8;break;}else{var $40=32;label=9;break;}
 case 8: 
 var $35=((($i_03)-($col_0))|0);
 var $36=HEAP32[((12144)>>2)];
 var $37=(($36+((($num)*(140))&-1)+($35<<2))|0);
 var $38=HEAP32[(($37)>>2)];
 var $40=$38;label=9;break;
 case 9: 
 var $40;
 var $41=_waddch($31,$40);
 var $42=((($i_03)+(1))|0);
 var $43=HEAP32[((12832)>>2)];
 var $44=($42|0)<($43|0);
 if($44){var $i_03=$42;label=7;break;}else{label=10;break;}
 case 10: 
 return;
  default: assert(0, "bad label: " + label);
 }

}


function _slk_noutrefresh(){
 var label=0;


 var $1=HEAP32[((15744)>>2)];
 var $2=(($1+56)|0);
 var $3=HEAP32[(($2)>>2)];
 var $4=_wnoutrefresh($3);
 return $4;
}


function _PDC_slk_initialize(){
 var label=0;
 var tempVarArgs=0;
 var sp=STACKTOP; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((12144)>>2)];
 var $2=($1|0)==0;
 if($2){label=20;break;}else{label=2;break;}
 case 2: 
 var $4=HEAP32[((12840)>>2)];
 var $5=($4|0)==3;
 var $6=HEAP32[((15744)>>2)];
 var $7=(($6+52)|0);
 if($5){label=3;break;}else{label=4;break;}
 case 3: 
 HEAP32[(($7)>>2)]=2;
 HEAP8[(16)]=1;
 label=5;break;
 case 4: 
 HEAP32[(($7)>>2)]=1;
 label=5;break;
 case 5: 
 var $11=HEAP32[((15744)>>2)];
 var $12=(($11+56)|0);
 var $13=HEAP32[(($12)>>2)];
 var $14=($13|0)==0;
 if($14){label=6;break;}else{label=8;break;}
 case 6: 
 var $16=(($11+52)|0);
 var $17=HEAP32[(($16)>>2)];
 var $18=HEAP32[((15784)>>2)];
 var $19=HEAP32[((15776)>>2)];
 var $20=((($19)-($17))|0);
 var $21=_newwin($17,$18,$20,0);
 var $22=HEAP32[((15744)>>2)];
 var $23=(($22+56)|0);
 HEAP32[(($23)>>2)]=$21;
 var $24=($21|0)==0;
 if($24){label=20;break;}else{label=7;break;}
 case 7: 
 var $26=HEAP32[((15744)>>2)];
 var $27=(($26+56)|0);
 var $28=HEAP32[(($27)>>2)];
 var $29=_wattrset($28,2097152);
 label=8;break;
 case 8: 
 var $31=HEAP32[((15784)>>2)];
 var $32=HEAP32[((12824)>>2)];
 var $33=(((($31|0))/(($32|0)))&-1);
 var $34=($33|0)>31;
 var $__i=($34?31:$33);
 HEAP32[((12832)>>2)]=$__i;
 var $35=HEAP32[((12840)>>2)];
 if(($35|0)==0){ label=10;break;}else if(($35|0)==1){ label=14;break;}else if(($35|0)==2|($35|0)==3){ label=9;break;}else{label=13;break;}
 case 9: 
 var $36=HEAP32[((12144)>>2)];
 var $37=(($36+136)|0);
 HEAP32[(($37)>>2)]=0;
 var $38=HEAP32[((12832)>>2)];
 var $39=HEAP32[((12144)>>2)];
 var $40=(($39+276)|0);
 HEAP32[(($40)>>2)]=$38;
 var $41=HEAP32[((12832)>>2)];
 var $42=((($41)+($38))|0);
 var $43=HEAP32[((12144)>>2)];
 var $44=(($43+416)|0);
 HEAP32[(($44)>>2)]=$42;
 var $45=HEAP32[((12832)>>2)];
 var $46=((($45)+($42))|0);
 var $47=HEAP32[((12144)>>2)];
 var $48=(($47+556)|0);
 HEAP32[(($48)>>2)]=$46;
 var $49=HEAP32[((15784)>>2)];
 var $50=(((($49|0))/(2))&-1);
 var $51=HEAP32[((12832)>>2)];
 var $52=$51<<1;
 var $53=((($50)+(1))|0);
 var $54=((($53)-($52))|0);
 var $55=HEAP32[((12144)>>2)];
 var $56=(($55+696)|0);
 HEAP32[(($56)>>2)]=$54;
 var $57=HEAP32[((12832)>>2)];
 var $58=((($50)-(1))|0);
 var $59=((($58)-($57))|0);
 var $60=HEAP32[((12144)>>2)];
 var $61=(($60+836)|0);
 HEAP32[(($61)>>2)]=$59;
 var $62=HEAP32[((12144)>>2)];
 var $63=(($62+976)|0);
 HEAP32[(($63)>>2)]=$53;
 var $64=HEAP32[((12832)>>2)];
 var $65=((($64)+($53))|0);
 var $66=HEAP32[((12144)>>2)];
 var $67=(($66+1116)|0);
 HEAP32[(($67)>>2)]=$65;
 var $68=HEAP32[((15784)>>2)];
 var $69=HEAP32[((12832)>>2)];
 var $70=$69<<2;
 var $71=((($68)+(1))|0);
 var $72=((($71)-($70))|0);
 var $73=HEAP32[((12144)>>2)];
 var $74=(($73+1256)|0);
 HEAP32[(($74)>>2)]=$72;
 var $75=HEAP32[((12832)>>2)];
 var $76=((($75)+($72))|0);
 var $77=HEAP32[((12144)>>2)];
 var $78=(($77+1396)|0);
 HEAP32[(($78)>>2)]=$76;
 var $79=HEAP32[((12832)>>2)];
 var $80=((($79)+($76))|0);
 var $81=HEAP32[((12144)>>2)];
 var $82=(($81+1536)|0);
 HEAP32[(($82)>>2)]=$80;
 var $83=HEAP32[((12832)>>2)];
 var $84=((($83)+($80))|0);
 var $85=HEAP32[((12144)>>2)];
 var $86=(($85+1676)|0);
 HEAP32[(($86)>>2)]=$84;
 label=11;break;
 case 10: 
 var $88=((($__i)-(1))|0);
 HEAP32[((12832)>>2)]=$88;
 var $89=HEAP32[((12144)>>2)];
 var $90=(($89+136)|0);
 HEAP32[(($90)>>2)]=0;
 var $91=HEAP32[((12832)>>2)];
 var $92=HEAP32[((12144)>>2)];
 var $93=(($92+276)|0);
 HEAP32[(($93)>>2)]=$91;
 var $94=HEAP32[((12832)>>2)];
 var $95=((($94)+($91))|0);
 var $96=HEAP32[((12144)>>2)];
 var $97=(($96+416)|0);
 HEAP32[(($97)>>2)]=$95;
 var $98=HEAP32[((15784)>>2)];
 var $99=(((($98|0))/(2))&-1);
 var $100=HEAP32[((12832)>>2)];
 var $101=((($99)+(1))|0);
 var $102=((($101)-($100))|0);
 var $103=HEAP32[((12144)>>2)];
 var $104=(($103+556)|0);
 HEAP32[(($104)>>2)]=$102;
 var $105=HEAP32[((12144)>>2)];
 var $106=(($105+696)|0);
 HEAP32[(($106)>>2)]=$101;
 var $107=HEAP32[((15784)>>2)];
 var $108=HEAP32[((12832)>>2)];
 var $109=((($108)*(-3))&-1);
 var $110=((($107)+(1))|0);
 var $111=((($110)+($109))|0);
 var $112=HEAP32[((12144)>>2)];
 var $113=(($112+836)|0);
 HEAP32[(($113)>>2)]=$111;
 var $114=HEAP32[((12832)>>2)];
 var $115=((($111)+($114))|0);
 var $116=HEAP32[((12144)>>2)];
 var $117=(($116+976)|0);
 HEAP32[(($117)>>2)]=$115;
 var $118=HEAP32[((12832)>>2)];
 var $119=((($118)+($115))|0);
 var $120=HEAP32[((12144)>>2)];
 var $121=(($120+1116)|0);
 HEAP32[(($121)>>2)]=$119;
 label=11;break;
 case 11: 
 var $123=HEAP32[((12832)>>2)];
 var $124=((($123)-(1))|0);
 HEAP32[((12832)>>2)]=$124;
 var $125=HEAP32[((12824)>>2)];
 var $126=($125|0)>0;
 if($126){var $i_01_i_i=0;label=12;break;}else{label=15;break;}
 case 12: 
 var $i_01_i_i;
 __drawone($i_01_i_i);
 var $127=((($i_01_i_i)+(1))|0);
 var $128=HEAP32[((12824)>>2)];
 var $129=($127|0)<($128|0);
 if($129){var $i_01_i_i=$127;label=12;break;}else{label=15;break;}
 case 13: 
 var $130=HEAP32[((12144)>>2)];
 var $131=(($130+136)|0);
 HEAP32[(($131)>>2)]=0;
 var $132=HEAP32[((12832)>>2)];
 var $133=HEAP32[((12144)>>2)];
 var $134=(($133+276)|0);
 HEAP32[(($134)>>2)]=$132;
 var $135=HEAP32[((12832)>>2)];
 var $136=((($135)+($132))|0);
 var $137=HEAP32[((12144)>>2)];
 var $138=(($137+416)|0);
 HEAP32[(($138)>>2)]=$136;
 var $139=HEAP32[((12832)>>2)];
 var $140=((($139)+($136))|0);
 var $141=HEAP32[((12144)>>2)];
 var $142=(($141+556)|0);
 HEAP32[(($142)>>2)]=$140;
 var $143=HEAP32[((12832)>>2)];
 var $144=((($143)+($140))|0);
 var $145=HEAP32[((12144)>>2)];
 var $146=(($145+696)|0);
 HEAP32[(($146)>>2)]=$144;
 var $147=HEAP32[((12832)>>2)];
 var $148=HEAP32[((15784)>>2)];
 var $149=((($147)*(-5))&-1);
 var $150=((($149)+(1))|0);
 var $151=((($150)+($148))|0);
 var $152=HEAP32[((12144)>>2)];
 var $153=(($152+836)|0);
 HEAP32[(($153)>>2)]=$151;
 var $154=HEAP32[((12832)>>2)];
 var $155=((($154)+($151))|0);
 var $156=HEAP32[((12144)>>2)];
 var $157=(($156+976)|0);
 HEAP32[(($157)>>2)]=$155;
 var $158=HEAP32[((12832)>>2)];
 var $159=((($158)+($155))|0);
 var $160=HEAP32[((12144)>>2)];
 var $161=(($160+1116)|0);
 HEAP32[(($161)>>2)]=$159;
 var $162=HEAP32[((12832)>>2)];
 var $163=((($162)+($159))|0);
 var $164=HEAP32[((12144)>>2)];
 var $165=(($164+1256)|0);
 HEAP32[(($165)>>2)]=$163;
 var $166=HEAP32[((12832)>>2)];
 var $167=((($166)+($163))|0);
 var $168=HEAP32[((12144)>>2)];
 var $169=(($168+1396)|0);
 HEAP32[(($169)>>2)]=$167;
 label=11;break;
 case 14: 
 var $170=HEAP32[((12144)>>2)];
 var $171=(($170+136)|0);
 HEAP32[(($171)>>2)]=0;
 var $172=HEAP32[((12832)>>2)];
 var $173=HEAP32[((12144)>>2)];
 var $174=(($173+276)|0);
 HEAP32[(($174)>>2)]=$172;
 var $175=HEAP32[((12832)>>2)];
 var $176=((($175)+($172))|0);
 var $177=HEAP32[((12144)>>2)];
 var $178=(($177+416)|0);
 HEAP32[(($178)>>2)]=$176;
 var $179=HEAP32[((12832)>>2)];
 var $180=((($179)+($176))|0);
 var $181=HEAP32[((12144)>>2)];
 var $182=(($181+556)|0);
 HEAP32[(($182)>>2)]=$180;
 var $183=HEAP32[((12832)>>2)];
 var $184=HEAP32[((15784)>>2)];
 var $185=$183<<2;
 var $_neg1_3_i=(((-$185))|0);
 var $186=$_neg1_3_i|1;
 var $187=((($186)+($184))|0);
 var $188=HEAP32[((12144)>>2)];
 var $189=(($188+696)|0);
 HEAP32[(($189)>>2)]=$187;
 var $190=HEAP32[((12832)>>2)];
 var $191=((($190)+($187))|0);
 var $192=HEAP32[((12144)>>2)];
 var $193=(($192+836)|0);
 HEAP32[(($193)>>2)]=$191;
 var $194=HEAP32[((12832)>>2)];
 var $195=((($194)+($191))|0);
 var $196=HEAP32[((12144)>>2)];
 var $197=(($196+976)|0);
 HEAP32[(($197)>>2)]=$195;
 var $198=HEAP32[((12832)>>2)];
 var $199=((($198)+($195))|0);
 var $200=HEAP32[((12144)>>2)];
 var $201=(($200+1116)|0);
 HEAP32[(($201)>>2)]=$199;
 label=11;break;
 case 15: 
 var $202=HEAP32[((12840)>>2)];
 var $203=($202|0)==3;
 if($203){label=16;break;}else{label=19;break;}
 case 16: 
 var $205=HEAP32[((15744)>>2)];
 var $206=(($205+56)|0);
 var $207=HEAP32[(($206)>>2)];
 var $208=(($207+28)|0);
 var $209=HEAP32[(($208)>>2)];
 var $210=_wattrset($207,0);
 var $211=HEAP32[((15744)>>2)];
 var $212=(($211+56)|0);
 var $213=HEAP32[(($212)>>2)];
 var $214=_wmove($213,0,0);
 var $215=HEAP32[((15744)>>2)];
 var $216=(($215+56)|0);
 var $217=HEAP32[(($216)>>2)];
 var $218=HEAP32[((15784)>>2)];
 var $219=_whline($217,0,$218);
 var $220=HEAP32[((12824)>>2)];
 var $221=($220|0)>0;
 var $222=HEAP32[((15744)>>2)];
 var $223=(($222+56)|0);
 var $224=HEAP32[(($223)>>2)];
 if($221){var $i_02=0;var $225=$224;label=17;break;}else{var $_lcssa=$224;label=18;break;}
 case 17: 
 var $225;
 var $i_02;
 var $226=HEAP32[((12144)>>2)];
 var $227=(($226+((($i_02)*(140))&-1)+136)|0);
 var $228=HEAP32[(($227)>>2)];
 var $229=((($i_02)+(1))|0);
 var $230=_mvwprintw($225,0,$228,5872,(tempVarArgs=STACKTOP,STACKTOP = (STACKTOP + 8)|0,(assert((STACKTOP|0) < (STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$229,tempVarArgs)); STACKTOP=tempVarArgs;
 var $231=HEAP32[((12824)>>2)];
 var $232=($229|0)<($231|0);
 var $233=HEAP32[((15744)>>2)];
 var $234=(($233+56)|0);
 var $235=HEAP32[(($234)>>2)];
 if($232){var $i_02=$229;var $225=$235;label=17;break;}else{var $_lcssa=$235;label=18;break;}
 case 18: 
 var $_lcssa;
 var $236=(($_lcssa+28)|0);
 HEAP32[(($236)>>2)]=$209;
 label=19;break;
 case 19: 
 var $238=HEAP32[((15744)>>2)];
 var $239=(($238+56)|0);
 var $240=HEAP32[(($239)>>2)];
 var $241=_touchwin($240);
 label=20;break;
 case 20: 
 STACKTOP=sp;return;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_mouse_in_slk($y,$x){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((12144)>>2)];
 var $2=($1|0)==0;
 if($2){var $_0=0;label=10;break;}else{label=2;break;}
 case 2: 
 var $4=HEAP32[((15744)>>2)];
 var $5=(($4+56)|0);
 var $6=HEAP32[(($5)>>2)];
 var $7=($6|0)==0;
 if($7){var $_0=0;label=10;break;}else{label=3;break;}
 case 3: 
 var $9=(($6+16)|0);
 var $10=HEAP32[(($9)>>2)];
 var $_b=HEAP8[(16)];
 var $11=($_b&1);
 var $12=((($11)+($10))|0);
 var $13=($12|0)==($y|0);
 if($13){label=4;break;}else{var $_0=0;label=10;break;}
 case 4: 
 var $14=HEAP32[((12824)>>2)];
 var $15=($14|0)>0;
 if($15){label=5;break;}else{var $_0=0;label=10;break;}
 case 5: 
 var $16=HEAP32[((12832)>>2)];
 var $i_02=0;label=6;break;
 case 6: 
 var $i_02;
 var $18=(($1+((($i_02)*(140))&-1)+136)|0);
 var $19=HEAP32[(($18)>>2)];
 var $20=($19|0)>($x|0);
 if($20){label=9;break;}else{label=7;break;}
 case 7: 
 var $22=((($16)+($19))|0);
 var $23=($22|0)>($x|0);
 if($23){label=8;break;}else{label=9;break;}
 case 8: 
 var $25=((($i_02)+(1))|0);
 var $_0=$25;label=10;break;
 case 9: 
 var $27=((($i_02)+(1))|0);
 var $28=($27|0)<($14|0);
 if($28){var $i_02=$27;label=6;break;}else{var $_0=0;label=10;break;}
 case 10: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _touchwin($win){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=-1;label=5;break;}else{label=2;break;}
 case 2: 
 var $2=(($win+8)|0);
 var $3=HEAP32[(($2)>>2)];
 var $4=($3|0)>0;
 if($4){label=3;break;}else{var $_0=0;label=5;break;}
 case 3: 
 var $5=(($win+48)|0);
 var $6=(($win+12)|0);
 var $7=(($win+52)|0);
 var $i_01=0;label=4;break;
 case 4: 
 var $i_01;
 var $9=HEAP32[(($5)>>2)];
 var $10=(($9+($i_01<<2))|0);
 HEAP32[(($10)>>2)]=0;
 var $11=HEAP32[(($6)>>2)];
 var $12=((($11)-(1))|0);
 var $13=HEAP32[(($7)>>2)];
 var $14=(($13+($i_01<<2))|0);
 HEAP32[(($14)>>2)]=$12;
 var $15=((($i_01)+(1))|0);
 var $16=HEAP32[(($2)>>2)];
 var $17=($15|0)<($16|0);
 if($17){var $i_01=$15;label=4;break;}else{var $_0=0;label=5;break;}
 case 5: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _touchline($win,$start,$count){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=-1;label=7;break;}else{label=2;break;}
 case 2: 
 var $3=(($win+8)|0);
 var $4=HEAP32[(($3)>>2)];
 var $5=($4|0)<($start|0);
 if($5){var $_0=-1;label=7;break;}else{label=3;break;}
 case 3: 
 var $7=((($count)+($start))|0);
 var $8=($7|0)>($4|0);
 if($8){var $_0=-1;label=7;break;}else{label=4;break;}
 case 4: 
 var $9=($count|0)>0;
 if($9){label=5;break;}else{var $_0=0;label=7;break;}
 case 5: 
 var $10=(($win+48)|0);
 var $11=(($win+12)|0);
 var $12=(($win+52)|0);
 var $i_01=$start;label=6;break;
 case 6: 
 var $i_01;
 var $14=HEAP32[(($10)>>2)];
 var $15=(($14+($i_01<<2))|0);
 HEAP32[(($15)>>2)]=0;
 var $16=HEAP32[(($11)>>2)];
 var $17=((($16)-(1))|0);
 var $18=HEAP32[(($12)>>2)];
 var $19=(($18+($i_01<<2))|0);
 HEAP32[(($19)>>2)]=$17;
 var $20=((($i_01)+(1))|0);
 var $21=($20|0)<($7|0);
 if($21){var $i_01=$20;label=6;break;}else{var $_0=0;label=7;break;}
 case 7: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _untouchwin($win){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=-1;label=5;break;}else{label=2;break;}
 case 2: 
 var $2=(($win+8)|0);
 var $3=HEAP32[(($2)>>2)];
 var $4=($3|0)>0;
 if($4){label=3;break;}else{var $_0=0;label=5;break;}
 case 3: 
 var $5=(($win+48)|0);
 var $6=(($win+52)|0);
 var $i_01=0;label=4;break;
 case 4: 
 var $i_01;
 var $8=HEAP32[(($5)>>2)];
 var $9=(($8+($i_01<<2))|0);
 HEAP32[(($9)>>2)]=-1;
 var $10=HEAP32[(($6)>>2)];
 var $11=(($10+($i_01<<2))|0);
 HEAP32[(($11)>>2)]=-1;
 var $12=((($i_01)+(1))|0);
 var $13=HEAP32[(($2)>>2)];
 var $14=($12|0)<($13|0);
 if($14){var $i_01=$12;label=4;break;}else{var $_0=0;label=5;break;}
 case 5: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _is_wintouched($win){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=0;label=6;break;}else{label=2;break;}
 case 2: 
 var $2=(($win+8)|0);
 var $3=HEAP32[(($2)>>2)];
 var $4=($3|0)>0;
 if($4){label=3;break;}else{var $_0=0;label=6;break;}
 case 3: 
 var $5=(($win+48)|0);
 var $6=HEAP32[(($5)>>2)];
 var $i_01=0;label=5;break;
 case 4: 
 var $8=($13|0)<($3|0);
 if($8){var $i_01=$13;label=5;break;}else{var $_0=0;label=6;break;}
 case 5: 
 var $i_01;
 var $10=(($6+($i_01<<2))|0);
 var $11=HEAP32[(($10)>>2)];
 var $12=($11|0)==-1;
 var $13=((($i_01)+(1))|0);
 if($12){label=4;break;}else{var $_0=1;label=6;break;}
 case 6: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_makenew($nlines,$ncols,$begy,$begx){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=_calloc(1,80);
 var $2=$1;
 var $3=($1|0)==0;
 if($3){var $_0=$2;label=11;break;}else{label=2;break;}
 case 2: 
 var $5=$nlines<<2;
 var $6=_malloc($5);
 var $7=$6;
 var $8=(($1+44)|0);
 var $9=$8;
 HEAP32[(($9)>>2)]=$7;
 var $10=($6|0)==0;
 if($10){label=3;break;}else{label=4;break;}
 case 3: 
 _free($1);
 var $_0=0;label=11;break;
 case 4: 
 var $13=_malloc($5);
 var $14=$13;
 var $15=(($1+48)|0);
 var $16=$15;
 HEAP32[(($16)>>2)]=$14;
 var $17=($13|0)==0;
 if($17){label=5;break;}else{label=6;break;}
 case 5: 
 _free($6);
 _free($1);
 var $_0=0;label=11;break;
 case 6: 
 var $20=_malloc($5);
 var $21=$20;
 var $22=(($1+52)|0);
 var $23=$22;
 HEAP32[(($23)>>2)]=$21;
 var $24=($20|0)==0;
 if($24){label=7;break;}else{label=8;break;}
 case 7: 
 _free($13);
 var $26=HEAP32[(($9)>>2)];
 var $27=$26;
 _free($27);
 _free($1);
 var $_0=0;label=11;break;
 case 8: 
 var $29=(($1+8)|0);
 var $30=$29;
 HEAP32[(($30)>>2)]=$nlines;
 var $31=(($1+12)|0);
 var $32=$31;
 HEAP32[(($32)>>2)]=$ncols;
 var $33=(($1+16)|0);
 var $34=$33;
 HEAP32[(($34)>>2)]=$begy;
 var $35=(($1+20)|0);
 var $36=$35;
 HEAP32[(($36)>>2)]=$begx;
 var $37=(($1+32)|0);
 var $38=$37;
 HEAP32[(($38)>>2)]=32;
 var $39=HEAP32[((15776)>>2)];
 var $40=($39|0)==($nlines|0);
 if($40){label=9;break;}else{var $45=0;label=10;break;}
 case 9: 
 var $42=HEAP32[((15784)>>2)];
 var $43=($42|0)==($ncols|0);
 var $phitmp=($43&1);
 var $45=$phitmp;label=10;break;
 case 10: 
 var $45;
 var $46=(($1+36)|0);
 HEAP8[($46)]=$45;
 var $47=((($nlines)-(1))|0);
 var $48=(($1+60)|0);
 var $49=$48;
 HEAP32[(($49)>>2)]=$47;
 var $50=(($1+72)|0);
 var $51=$50;
 HEAP32[(($51)>>2)]=-1;
 var $52=(($1+68)|0);
 var $53=$52;
 HEAP32[(($53)>>2)]=-1;
 var $54=_touchwin($2);
 var $_0=$2;label=11;break;
 case 11: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_makelines($win){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=0;label=9;break;}else{label=2;break;}
 case 2: 
 var $3=(($win+8)|0);
 var $4=HEAP32[(($3)>>2)];
 var $5=($4|0)>0;
 if($5){label=3;break;}else{var $_0=$win;label=9;break;}
 case 3: 
 var $6=(($win+12)|0);
 var $7=HEAP32[(($6)>>2)];
 var $8=$7<<2;
 var $9=(($win+44)|0);
 var $i_03=0;label=5;break;
 case 4: 
 var $11=($18|0)<($4|0);
 if($11){var $i_03=$18;label=5;break;}else{var $_0=$win;label=9;break;}
 case 5: 
 var $i_03;
 var $13=_malloc($8);
 var $14=$13;
 var $15=HEAP32[(($9)>>2)];
 var $16=(($15+($i_03<<2))|0);
 HEAP32[(($16)>>2)]=$14;
 var $17=($13|0)==0;
 var $18=((($i_03)+(1))|0);
 if($17){label=6;break;}else{label=4;break;}
 case 6: 
 var $19=($i_03|0)>0;
 if($19){var $j_01=0;label=7;break;}else{label=8;break;}
 case 7: 
 var $j_01;
 var $20=HEAP32[(($9)>>2)];
 var $21=(($20+($j_01<<2))|0);
 var $22=HEAP32[(($21)>>2)];
 var $23=$22;
 _free($23);
 var $24=((($j_01)+(1))|0);
 var $25=($24|0)<($i_03|0);
 if($25){var $j_01=$24;label=7;break;}else{label=8;break;}
 case 8: 
 var $26=(($win+48)|0);
 var $27=HEAP32[(($26)>>2)];
 var $28=$27;
 _free($28);
 var $29=(($win+52)|0);
 var $30=HEAP32[(($29)>>2)];
 var $31=$30;
 _free($31);
 var $32=HEAP32[(($9)>>2)];
 var $33=$32;
 _free($33);
 var $34=$win;
 _free($34);
 var $_0=0;label=9;break;
 case 9: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_sync($win){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=(($win+40)|0);
 var $2=HEAP8[($1)];
 var $3=(($2<<24)>>24)==0;
 if($3){label=3;break;}else{label=2;break;}
 case 2: 
 var $5=_wrefresh($win);
 label=3;break;
 case 3: 
 var $7=(($win+41)|0);
 var $8=HEAP8[($7)];
 var $9=(($8<<24)>>24)==0;
 if($9){label=5;break;}else{var $tmp_01_i=$win;label=4;break;}
 case 4: 
 var $tmp_01_i;
 var $10=_touchwin($tmp_01_i);
 var $11=(($tmp_01_i+76)|0);
 var $12=HEAP32[(($11)>>2)];
 var $13=($12|0)==0;
 if($13){label=5;break;}else{var $tmp_01_i=$12;label=4;break;}
 case 5: 
 return;
  default: assert(0, "bad label: " + label);
 }

}


function _wsyncup($win){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){label=3;break;}else{var $tmp_01=$win;label=2;break;}
 case 2: 
 var $tmp_01;
 var $2=_touchwin($tmp_01);
 var $3=(($tmp_01+76)|0);
 var $4=HEAP32[(($3)>>2)];
 var $5=($4|0)==0;
 if($5){label=3;break;}else{var $tmp_01=$4;label=2;break;}
 case 3: 
 return;
  default: assert(0, "bad label: " + label);
 }

}


function _newwin($nlines,$ncols,$begy,$begx){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($nlines|0)==0;
 if($1){label=2;break;}else{var $_01=$nlines;label=3;break;}
 case 2: 
 var $3=HEAP32[((15776)>>2)];
 var $4=((($3)-($begy))|0);
 var $_01=$4;label=3;break;
 case 3: 
 var $_01;
 var $6=($ncols|0)==0;
 if($6){label=4;break;}else{var $_02=$ncols;label=5;break;}
 case 4: 
 var $8=HEAP32[((15784)>>2)];
 var $9=((($8)-($begx))|0);
 var $_02=$9;label=5;break;
 case 5: 
 var $_02;
 var $11=((($_01)+($begy))|0);
 var $12=HEAP32[((15744)>>2)];
 var $13=(($12+32)|0);
 var $14=HEAP32[(($13)>>2)];
 var $15=($11|0)>($14|0);
 if($15){var $_0=0;label=10;break;}else{label=6;break;}
 case 6: 
 var $17=((($_02)+($begx))|0);
 var $18=(($12+36)|0);
 var $19=HEAP32[(($18)>>2)];
 var $20=($17|0)>($19|0);
 if($20){var $_0=0;label=10;break;}else{label=7;break;}
 case 7: 
 var $22=_PDC_makenew($_01,$_02,$begy,$begx);
 var $23=($22|0)==0;
 if($23){var $_0=0;label=10;break;}else{label=8;break;}
 case 8: 
 var $25=_PDC_makelines($22);
 var $26=($25|0)==0;
 if($26){var $_0=0;label=10;break;}else{label=9;break;}
 case 9: 
 var $28=_werase($25);
 var $_0=$25;label=10;break;
 case 10: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _subwin($orig,$nlines,$ncols,$begy,$begx){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=(($orig+16)|0);
 var $2=HEAP32[(($1)>>2)];
 var $3=((($begy)-($2))|0);
 var $4=(($orig+20)|0);
 var $5=HEAP32[(($4)>>2)];
 var $6=((($begx)-($5))|0);
 var $7=($orig|0)==0;
 var $8=($2|0)>($begy|0);
 var $or_cond=$7|$8;
 var $9=($5|0)>($begx|0);
 var $or_cond3=$or_cond|$9;
 if($or_cond3){var $_0=0;label=13;break;}else{label=2;break;}
 case 2: 
 var $11=((($begy)+($nlines))|0);
 var $12=(($orig+8)|0);
 var $13=HEAP32[(($12)>>2)];
 var $14=((($13)+($2))|0);
 var $15=($11|0)>($14|0);
 if($15){var $_0=0;label=13;break;}else{label=3;break;}
 case 3: 
 var $17=((($begx)+($ncols))|0);
 var $18=(($orig+12)|0);
 var $19=HEAP32[(($18)>>2)];
 var $20=((($19)+($5))|0);
 var $21=($17|0)>($20|0);
 if($21){var $_0=0;label=13;break;}else{label=4;break;}
 case 4: 
 var $23=($nlines|0)==0;
 if($23){label=5;break;}else{var $_01=$nlines;label=6;break;}
 case 5: 
 var $25=$3^-1;
 var $26=((($13)+($25))|0);
 var $_01=$26;label=6;break;
 case 6: 
 var $_01;
 var $28=($ncols|0)==0;
 if($28){label=7;break;}else{var $_02=$ncols;label=8;break;}
 case 7: 
 var $30=$6^-1;
 var $31=((($19)+($30))|0);
 var $_02=$31;label=8;break;
 case 8: 
 var $_02;
 var $33=_PDC_makenew($_01,$_02,$begy,$begx);
 var $34=($33|0)==0;
 if($34){var $_0=0;label=13;break;}else{label=9;break;}
 case 9: 
 var $36=(($orig+28)|0);
 var $37=HEAP32[(($36)>>2)];
 var $38=(($33+28)|0);
 HEAP32[(($38)>>2)]=$37;
 var $39=(($orig+32)|0);
 var $40=HEAP32[(($39)>>2)];
 var $41=(($33+32)|0);
 HEAP32[(($41)>>2)]=$40;
 var $42=(($orig+37)|0);
 var $43=HEAP8[($42)];
 var $44=(($33+37)|0);
 HEAP8[($44)]=$43;
 var $45=(($orig+38)|0);
 var $46=HEAP8[($45)];
 var $47=(($33+38)|0);
 HEAP8[($47)]=$46;
 var $48=(($orig+39)|0);
 var $49=HEAP8[($48)];
 var $50=(($33+39)|0);
 HEAP8[($50)]=$49;
 var $51=(($orig+42)|0);
 var $52=HEAP8[($51)];
 var $53=(($33+42)|0);
 HEAP8[($53)]=$52;
 var $54=(($orig+40)|0);
 var $55=HEAP8[($54)];
 var $56=(($33+40)|0);
 HEAP8[($56)]=$55;
 var $57=(($orig+41)|0);
 var $58=HEAP8[($57)];
 var $59=(($33+41)|0);
 HEAP8[($59)]=$58;
 var $60=(($33+72)|0);
 HEAP32[(($60)>>2)]=$3;
 var $61=(($33+68)|0);
 HEAP32[(($61)>>2)]=$6;
 var $62=(($33+76)|0);
 HEAP32[(($62)>>2)]=$orig;
 var $63=($_01|0)>0;
 if($63){label=10;break;}else{label=12;break;}
 case 10: 
 var $64=(($orig+44)|0);
 var $65=(($33+44)|0);
 var $i_05=0;var $j_06=$3;label=11;break;
 case 11: 
 var $j_06;
 var $i_05;
 var $67=HEAP32[(($64)>>2)];
 var $68=(($67+($j_06<<2))|0);
 var $69=HEAP32[(($68)>>2)];
 var $70=(($69+($6<<2))|0);
 var $71=HEAP32[(($65)>>2)];
 var $72=(($71+($i_05<<2))|0);
 HEAP32[(($72)>>2)]=$70;
 var $73=((($i_05)+(1))|0);
 var $74=((($j_06)+(1))|0);
 var $75=($73|0)<($_01|0);
 if($75){var $i_05=$73;var $j_06=$74;label=11;break;}else{label=12;break;}
 case 12: 
 var $76=(($33+24)|0);
 var $77=HEAP32[(($76)>>2)];
 var $78=$77|1;
 HEAP32[(($76)>>2)]=$78;
 var $_0=$33;label=13;break;
 case 13: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _resize_window($win,$nlines,$ncols){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=0;label=20;break;}else{label=2;break;}
 case 2: 
 var $3=(($win+24)|0);
 var $4=HEAP32[(($3)>>2)];
 var $5=$4&32;
 var $6=($5|0)==0;
 if($6){label=4;break;}else{label=3;break;}
 case 3: 
 var $8=(($win+76)|0);
 var $9=HEAP32[(($8)>>2)];
 var $10=(($win+16)|0);
 var $11=HEAP32[(($10)>>2)];
 var $12=(($win+20)|0);
 var $13=HEAP32[(($12)>>2)];
 var $14=_subpad($9,$nlines,$ncols,$11,$13);
 var $15=($14|0)==0;
 if($15){var $_0=0;label=20;break;}else{var $new_0=$14;label=10;break;}
 case 4: 
 var $17=$4&1;
 var $18=($17|0)==0;
 if($18){label=6;break;}else{label=5;break;}
 case 5: 
 var $20=(($win+76)|0);
 var $21=HEAP32[(($20)>>2)];
 var $22=(($win+16)|0);
 var $23=HEAP32[(($22)>>2)];
 var $24=(($win+20)|0);
 var $25=HEAP32[(($24)>>2)];
 var $26=_subwin($21,$nlines,$ncols,$23,$25);
 var $27=($26|0)==0;
 if($27){var $_0=0;label=20;break;}else{var $new_0=$26;label=10;break;}
 case 6: 
 var $29=HEAP32[((15744)>>2)];
 var $30=(($29+56)|0);
 var $31=HEAP32[(($30)>>2)];
 var $32=($31|0)==($win|0);
 if($32){label=7;break;}else{label=8;break;}
 case 7: 
 var $34=(($29+32)|0);
 var $35=HEAP32[(($34)>>2)];
 var $36=(($29+52)|0);
 var $37=HEAP32[(($36)>>2)];
 var $38=((($35)-($37))|0);
 var $new_begx_0=0;var $new_begy_0=$38;label=9;break;
 case 8: 
 var $40=(($win+16)|0);
 var $41=HEAP32[(($40)>>2)];
 var $42=(($win+20)|0);
 var $43=HEAP32[(($42)>>2)];
 var $new_begx_0=$43;var $new_begy_0=$41;label=9;break;
 case 9: 
 var $new_begy_0;
 var $new_begx_0;
 var $45=_PDC_makenew($nlines,$ncols,$new_begy_0,$new_begx_0);
 var $46=($45|0)==0;
 if($46){var $_0=0;label=20;break;}else{var $new_0=$45;label=10;break;}
 case 10: 
 var $new_0;
 var $48=(($win+4)|0);
 var $49=HEAP32[(($48)>>2)];
 var $50=(($new_0+12)|0);
 var $51=HEAP32[(($50)>>2)];
 var $52=($49|0)<($51|0);
 var $_=($52?$49:$51);
 var $53=(($win)|0);
 var $54=HEAP32[(($53)>>2)];
 var $55=(($new_0+8)|0);
 var $56=HEAP32[(($55)>>2)];
 var $57=($54|0)<($56|0);
 var $58=($57?$54:$56);
 var $59=HEAP32[(($3)>>2)];
 var $60=$59&33;
 var $61=($60|0)==0;
 if($61){label=12;break;}else{label=11;break;}
 case 11: 
 var $_pre6=(($win+8)|0);
 var $new_1=$new_0;var $94=$59;var $93=$56;var $_pre_phi=$_pre6;label=17;break;
 case 12: 
 var $63=_PDC_makelines($new_0);
 var $64=($63|0)==0;
 if($64){var $_0=0;label=20;break;}else{label=13;break;}
 case 13: 
 var $66=_werase($63);
 var $67=(($win+8)|0);
 var $68=HEAP32[(($67)>>2)];
 var $69=(($63+8)|0);
 var $70=HEAP32[(($69)>>2)];
 var $71=($68|0)<($70|0);
 var $_1=($71?$68:$70);
 var $72=((($_1)-(1))|0);
 var $73=(($win+12)|0);
 var $74=HEAP32[(($73)>>2)];
 var $75=(($63+12)|0);
 var $76=HEAP32[(($75)>>2)];
 var $77=($74|0)<($76|0);
 var $78=($77?$74:$76);
 var $79=((($78)-(1))|0);
 var $80=_copywin($win,$63,0,0,0,0,$72,$79,0);
 var $81=(($win+44)|0);
 var $82=HEAP32[(($67)>>2)];
 var $83=($82|0)>0;
 if($83){var $i_04=0;label=14;break;}else{label=16;break;}
 case 14: 
 var $i_04;
 var $84=HEAP32[(($81)>>2)];
 var $85=(($84+($i_04<<2))|0);
 var $86=HEAP32[(($85)>>2)];
 var $87=($86|0)==0;
 if($87){label=16;break;}else{label=15;break;}
 case 15: 
 var $89=$86;
 _free($89);
 var $90=((($i_04)+(1))|0);
 var $91=HEAP32[(($67)>>2)];
 var $92=($90|0)<($91|0);
 if($92){var $i_04=$90;label=14;break;}else{label=16;break;}
 case 16: 
 var $_pre=HEAP32[(($3)>>2)];
 var $_pre5=HEAP32[(($69)>>2)];
 var $new_1=$63;var $94=$_pre;var $93=$_pre5;var $_pre_phi=$67;label=17;break;
 case 17: 
 var $_pre_phi;
 var $93;
 var $94;
 var $new_1;
 var $95=(($new_1+24)|0);
 HEAP32[(($95)>>2)]=$94;
 var $96=(($win+28)|0);
 var $97=HEAP32[(($96)>>2)];
 var $98=(($new_1+28)|0);
 HEAP32[(($98)>>2)]=$97;
 var $99=(($win+36)|0);
 var $100=HEAP8[($99)];
 var $101=(($new_1+36)|0);
 HEAP8[($101)]=$100;
 var $102=(($win+37)|0);
 var $103=HEAP8[($102)];
 var $104=(($new_1+37)|0);
 HEAP8[($104)]=$103;
 var $105=(($win+38)|0);
 var $106=HEAP8[($105)];
 var $107=(($new_1+38)|0);
 HEAP8[($107)]=$106;
 var $108=(($win+39)|0);
 var $109=HEAP8[($108)];
 var $110=(($new_1+39)|0);
 HEAP8[($110)]=$109;
 var $111=(($win+42)|0);
 var $112=HEAP8[($111)];
 var $113=(($new_1+42)|0);
 HEAP8[($113)]=$112;
 var $114=(($win+56)|0);
 var $115=HEAP32[(($114)>>2)];
 var $116=((($93)-(1))|0);
 var $117=($115|0)>($116|0);
 var $_2=($117?0:$115);
 var $118=(($new_1+56)|0);
 HEAP32[(($118)>>2)]=$_2;
 var $119=(($win+60)|0);
 var $120=HEAP32[(($119)>>2)];
 var $121=HEAP32[(($_pre_phi)>>2)];
 var $122=((($121)-(1))|0);
 var $123=($120|0)==($122|0);
 if($123){var $127=$116;label=19;break;}else{label=18;break;}
 case 18: 
 var $125=($120|0)<($116|0);
 var $_3=($125?$120:$116);
 var $127=$_3;label=19;break;
 case 19: 
 var $127;
 var $128=(($new_1+60)|0);
 HEAP32[(($128)>>2)]=$127;
 var $129=(($win+76)|0);
 var $130=HEAP32[(($129)>>2)];
 var $131=(($new_1+76)|0);
 HEAP32[(($131)>>2)]=$130;
 var $132=(($win+40)|0);
 var $133=HEAP8[($132)];
 var $134=(($new_1+40)|0);
 HEAP8[($134)]=$133;
 var $135=(($win+41)|0);
 var $136=HEAP8[($135)];
 var $137=(($new_1+41)|0);
 HEAP8[($137)]=$136;
 var $138=(($win+32)|0);
 var $139=HEAP32[(($138)>>2)];
 var $140=(($new_1+32)|0);
 HEAP32[(($140)>>2)]=$139;
 var $141=(($new_1+4)|0);
 HEAP32[(($141)>>2)]=$_;
 var $142=(($new_1)|0);
 HEAP32[(($142)>>2)]=$58;
 var $143=(($win+48)|0);
 var $144=HEAP32[(($143)>>2)];
 var $145=$144;
 _free($145);
 var $146=(($win+52)|0);
 var $147=HEAP32[(($146)>>2)];
 var $148=$147;
 _free($148);
 var $149=(($win+44)|0);
 var $150=HEAP32[(($149)>>2)];
 var $151=$150;
 _free($151);
 var $152=$win;
 var $153=$new_1;
 assert(80 % 1 === 0);(_memcpy($152, $153, 80)|0);
 _free($153);
 var $_0=$win;label=20;break;
 case 20: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _wresize($win,$nlines,$ncols){
 var label=0;


 var $1=_resize_window($win,$nlines,$ncols);
 var $not_=($1|0)==0;
 var $2=(($not_<<31)>>31);
 return $2;
}


function _PDC_update_rects(){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP32[((12168)>>2)];
 var $2=($1|0)==0;
 if($2){label=6;break;}else{label=2;break;}
 case 2: 
 var $4=($1|0)==200;
 var $5=HEAP32[((12216)>>2)];
 if($4){label=3;break;}else{label=4;break;}
 case 3: 
 var $7=_SDL_Flip($5);
 label=5;break;
 case 4: 
 _SDL_UpdateRects($5,$1,8800);
 label=5;break;
 case 5: 
 var $10=_SDL_GetTicks();
 HEAP32[((12320)>>2)]=$10;
 HEAP32[((12168)>>2)]=0;
 label=6;break;
 case 6: 
 return;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_gotoyx($row,$col){
 var label=0;
 var sp=STACKTOP;STACKTOP=(STACKTOP+32)|0; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $src=sp;
 var $dest=(sp)+(16);
 var $1=HEAP32[((15744)>>2)];
 var $2=(($1+7)|0);
 var $3=HEAP8[($2)];
 var $4=(($3<<24)>>24)==0;
 if($4){label=2;break;}else{label=9;break;}
 case 2: 
 var $6=(($1+16)|0);
 var $7=HEAP32[(($6)>>2)];
 var $8=(($1+20)|0);
 var $9=HEAP32[(($8)>>2)];
 var $10=HEAP32[((12904)>>2)];
 var $11=(($10+44)|0);
 var $12=HEAP32[(($11)>>2)];
 var $13=(($12+($7<<2))|0);
 var $14=HEAP32[(($13)>>2)];
 var $15=(($14+($9<<2))|0);
 _PDC_transform_line($7,$9,1,$15);
 var $16=HEAP32[((15744)>>2)];
 var $17=(($16+24)|0);
 var $18=HEAP32[(($17)>>2)];
 var $19=($18|0)==0;
 if($19){label=9;break;}else{label=3;break;}
 case 3: 
 var $21=HEAP32[((12904)>>2)];
 var $22=(($21+44)|0);
 var $23=HEAP32[(($22)>>2)];
 var $24=(($23+($row<<2))|0);
 var $25=HEAP32[(($24)>>2)];
 var $26=(($25+($col<<2))|0);
 var $27=HEAP32[(($26)>>2)];
 var $28=$27^2097152;
 __set_attr($28);
 var $29=$27&130944;
 var $30=($29|0)==65536;
 if($30){label=4;break;}else{var $ch_0=$28;label=5;break;}
 case 4: 
 var $32=$27&127;
 var $33=((5296+($32<<2))|0);
 var $34=HEAP32[(($33)>>2)];
 var $ch_0=$34;label=5;break;
 case 5: 
 var $ch_0;
 var $36=HEAP32[((15744)>>2)];
 var $37=(($36+24)|0);
 var $38=HEAP32[(($37)>>2)];
 var $39=($38|0)==1;
 var $40=HEAP32[((12376)>>2)];
 var $41=$40>>2;
 var $42=($39?$41:$40);
 var $43=(($src+12)|0);
 HEAP32[(($43)>>2)]=$42;
 var $44=HEAP32[((12352)>>2)];
 var $45=(($src+8)|0);
 HEAP32[(($45)>>2)]=$44;
 var $46=((($row)+(1))|0);
 var $47=(Math_imul($40,$46)|0);
 var $48=((($47)-($42))|0);
 var $49=HEAP32[((12176)>>2)];
 var $50=((($48)+($49))|0);
 var $51=(($dest+4)|0);
 HEAP32[(($51)>>2)]=$50;
 var $52=(Math_imul($44,$col)|0);
 var $53=HEAP32[((12184)>>2)];
 var $54=((($52)+($53))|0);
 var $55=(($dest)|0);
 HEAP32[(($55)>>2)]=$54;
 var $56=$ch_0&31;
 var $57=(Math_imul($44,$56)|0);
 var $58=(($src)|0);
 HEAP32[(($58)>>2)]=$57;
 var $59=$ch_0>>>5;
 var $60=$59&7;
 var $61=(Math_imul($40,$60)|0);
 var $62=((($40)-($42))|0);
 var $63=((($62)+($61))|0);
 var $64=(($src+4)|0);
 HEAP32[(($64)>>2)]=$63;
 var $65=HEAP32[((12360)>>2)];
 var $66=HEAP32[((12216)>>2)];
 var $67=_SDL_UpperBlit($65,$src,$66,$dest);
 var $68=($7|0)==($row|0);
 var $69=($9|0)==($col|0);
 var $or_cond2=$68&$69;
 if($or_cond2){label=9;break;}else{label=6;break;}
 case 6: 
 var $71=HEAP32[((12168)>>2)];
 var $72=($71|0)==200;
 if($72){label=7;break;}else{var $77=$71;label=8;break;}
 case 7: 
 var $73=HEAP32[((12216)>>2)];
 var $74=_SDL_Flip($73);
 var $75=_SDL_GetTicks();
 HEAP32[((12320)>>2)]=$75;
 HEAP32[((12168)>>2)]=0;
 var $77=0;label=8;break;
 case 8: 
 var $77;
 var $78=((($77)+(1))|0);
 HEAP32[((12168)>>2)]=$78;
 var $79=((8800+($77<<4))|0);
 var $80=$79;
 var $81=$dest;
 assert(16 % 1 === 0);HEAP32[(($80)>>2)]=HEAP32[(($81)>>2)];HEAP32[((($80)+(4))>>2)]=HEAP32[((($81)+(4))>>2)];HEAP32[((($80)+(8))>>2)]=HEAP32[((($81)+(8))>>2)];HEAP32[((($80)+(12))>>2)]=HEAP32[((($81)+(12))>>2)];
 label=9;break;
 case 9: 
 STACKTOP=sp;return;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_transform_line($lineno,$x,$len,$srcp){
 var label=0;
 var sp=STACKTOP;STACKTOP=(STACKTOP+32)|0; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $src=sp;
 var $dest=(sp)+(16);
 var $1=HEAP32[((12168)>>2)];
 var $2=($1|0)==200;
 if($2){label=2;break;}else{var $_pr=$1;label=3;break;}
 case 2: 
 var $3=HEAP32[((12216)>>2)];
 var $4=_SDL_Flip($3);
 var $5=_SDL_GetTicks();
 HEAP32[((12320)>>2)]=$5;
 HEAP32[((12168)>>2)]=0;
 var $_pr=0;label=3;break;
 case 3: 
 var $_pr;
 var $7=HEAP32[((12376)>>2)];
 var $8=(($src+12)|0);
 HEAP32[(($8)>>2)]=$7;
 var $9=HEAP32[((12352)>>2)];
 var $10=(($src+8)|0);
 HEAP32[(($10)>>2)]=$9;
 var $11=(Math_imul($7,$lineno)|0);
 var $12=HEAP32[((12176)>>2)];
 var $13=((($11)+($12))|0);
 var $14=(($dest+4)|0);
 HEAP32[(($14)>>2)]=$13;
 var $15=(Math_imul($9,$x)|0);
 var $16=HEAP32[((12184)>>2)];
 var $17=((($15)+($16))|0);
 var $18=(($dest)|0);
 HEAP32[(($18)>>2)]=$17;
 var $19=(($dest+12)|0);
 HEAP32[(($19)>>2)]=$7;
 var $20=(Math_imul($9,$len)|0);
 var $21=(($dest+8)|0);
 HEAP32[(($21)>>2)]=$20;
 var $22=($_pr|0)==0;
 if($22){var $47=0;label=9;break;}else{label=4;break;}
 case 4: 
 var $24=((($_pr)-(1))|0);
 var $25=((8800+($24<<4)+4)|0);
 var $26=HEAP32[(($25)>>2)];
 var $27=((8800+($24<<4)+8)|0);
 var $28=HEAP32[(($27)>>2)];
 var $29=((8800+($24<<4)+12)|0);
 var $30=HEAP32[(($29)>>2)];
 var $31=((8800+($24<<4))|0);
 var $32=HEAP32[(($31)>>2)];
 var $33=($32|0)==($17|0);
 var $34=($28|0)==($20|0);
 var $or_cond=$33&$34;
 if($or_cond){label=5;break;}else{var $47=$_pr;label=9;break;}
 case 5: 
 var $36=((($30)+($26))|0);
 var $37=($36|0)==($13|0);
 if($37){label=6;break;}else{label=7;break;}
 case 6: 
 var $39=((($7)+($30))|0);
 HEAP32[(($29)>>2)]=$39;
 label=10;break;
 case 7: 
 var $41=($26|0)==($13|0);
 if($41){label=10;break;}else{label=8;break;}
 case 8: 
 var $43=((($_pr)+(1))|0);
 HEAP32[((12168)>>2)]=$43;
 var $44=((8800+($_pr<<4))|0);
 var $45=$44;
 var $46=$dest;
 assert(16 % 1 === 0);HEAP32[(($45)>>2)]=HEAP32[(($46)>>2)];HEAP32[((($45)+(4))>>2)]=HEAP32[((($46)+(4))>>2)];HEAP32[((($45)+(8))>>2)]=HEAP32[((($46)+(8))>>2)];HEAP32[((($45)+(12))>>2)]=HEAP32[((($46)+(12))>>2)];
 label=10;break;
 case 9: 
 var $47;
 var $48=((($47)+(1))|0);
 HEAP32[((12168)>>2)]=$48;
 var $49=((8800+($47<<4))|0);
 var $50=$49;
 var $51=$dest;
 assert(16 % 1 === 0);HEAP32[(($50)>>2)]=HEAP32[(($51)>>2)];HEAP32[((($50)+(4))>>2)]=HEAP32[((($51)+(4))>>2)];HEAP32[((($50)+(8))>>2)]=HEAP32[((($51)+(8))>>2)];HEAP32[((($50)+(12))>>2)]=HEAP32[((($51)+(12))>>2)];
 label=10;break;
 case 10: 
 HEAP32[(($21)>>2)]=$9;
 var $53=($len|0)>0;
 if($53){label=11;break;}else{label=34;break;}
 case 11: 
 var $54=(($src)|0);
 var $55=(($src+4)|0);
 var $j_02=0;label=12;break;
 case 12: 
 var $j_02;
 var $57=(($srcp+($j_02<<2))|0);
 var $58=HEAP32[(($57)>>2)];
 __set_attr($58);
 var $59=$58&130944;
 var $60=($59|0)==65536;
 if($60){label=13;break;}else{var $ch_0=$58;label=14;break;}
 case 13: 
 var $62=$58&-131072;
 var $63=$58&127;
 var $64=((5296+($63<<2))|0);
 var $65=HEAP32[(($64)>>2)];
 var $66=$65|$62;
 var $ch_0=$66;label=14;break;
 case 14: 
 var $ch_0;
 var $68=HEAP16[((5288)>>1)];
 var $69=(($68<<16)>>16)==-1;
 if($69){label=15;break;}else{label=16;break;}
 case 15: 
 var $71=HEAP32[((12192)>>2)];
 var $72=HEAP32[((12216)>>2)];
 var $73=_SDL_UpperBlit($71,$dest,$72,$dest);
 label=16;break;
 case 16: 
 var $75=$ch_0&31;
 var $76=HEAP32[((12352)>>2)];
 var $77=(Math_imul($76,$75)|0);
 HEAP32[(($54)>>2)]=$77;
 var $78=$ch_0>>>5;
 var $79=$78&7;
 var $80=HEAP32[((12376)>>2)];
 var $81=(Math_imul($80,$79)|0);
 HEAP32[(($55)>>2)]=$81;
 var $82=HEAP32[((12360)>>2)];
 var $83=HEAP32[((12216)>>2)];
 var $84=_SDL_UpperBlit($82,$src,$83,$dest);
 var $85=$ch_0&1441792;
 var $86=($85|0)==0;
 if($86){label=33;break;}else{label=17;break;}
 case 17: 
 var $88=HEAP32[((15744)>>2)];
 var $89=(($88+84)|0);
 var $90=HEAP16[(($89)>>1)];
 var $91=(($88+7)|0);
 var $92=HEAP8[($91)];
 var $93=(($92<<24)>>24)==0;
 if($93){label=18;break;}else{label=33;break;}
 case 18: 
 var $95=$ch_0&1048576;
 var $96=($95|0)==0;
 if($96){label=27;break;}else{label=19;break;}
 case 19: 
 var $98=(($90<<16)>>16)!=-1;
 if($98){label=20;break;}else{label=21;break;}
 case 20: 
 var $100=(($90<<16)>>16);
 var $101=HEAP32[((12360)>>2)];
 var $102=((12392+($100<<2))|0);
 var $103=HEAP32[((12368)>>2)];
 var $104=_SDL_SetPalette($101,1,$102,$103,1);
 label=21;break;
 case 21: 
 var $106=HEAP32[((12352)>>2)];
 var $107=((($106)*(31))&-1);
 HEAP32[(($54)>>2)]=$107;
 var $108=HEAP32[((12376)>>2)];
 var $109=$108<<1;
 HEAP32[(($55)>>2)]=$109;
 var $110=HEAP16[((5288)>>1)];
 var $111=(($110<<16)>>16)==-1;
 if($111){label=23;break;}else{label=22;break;}
 case 22: 
 var $113=HEAP32[((12360)>>2)];
 var $114=_SDL_SetColorKey($113,131072,0);
 label=23;break;
 case 23: 
 var $116=HEAP32[((12360)>>2)];
 var $117=HEAP32[((12216)>>2)];
 var $118=_SDL_UpperBlit($116,$src,$117,$dest);
 var $119=HEAP16[((5288)>>1)];
 var $120=(($119<<16)>>16)==-1;
 if($120){label=25;break;}else{label=24;break;}
 case 24: 
 var $122=HEAP32[((12360)>>2)];
 var $123=_SDL_SetColorKey($122,0,0);
 label=25;break;
 case 25: 
 if($98){label=26;break;}else{label=27;break;}
 case 26: 
 var $126=HEAP32[((12360)>>2)];
 var $127=HEAP16[((848)>>1)];
 var $128=(($127<<16)>>16);
 var $129=((12392+($128<<2))|0);
 var $130=HEAP32[((12368)>>2)];
 var $131=_SDL_SetPalette($126,1,$129,$130,1);
 label=27;break;
 case 27: 
 var $133=$ch_0&393216;
 var $134=($133|0)==0;
 if($134){label=33;break;}else{label=28;break;}
 case 28: 
 var $136=(($90<<16)>>16)==-1;
 var $137=HEAP16[((848)>>1)];
 var $__i=($136?$137:$90);
 HEAP32[(($21)>>2)]=1;
 var $138=$ch_0&262144;
 var $139=($138|0)==0;
 if($139){label=30;break;}else{label=29;break;}
 case 29: 
 var $141=HEAP32[((12216)>>2)];
 var $142=(($__i<<16)>>16);
 var $143=((12256+($142<<2))|0);
 var $144=HEAP32[(($143)>>2)];
 var $145=_SDL_FillRect($141,$dest,$144);
 label=30;break;
 case 30: 
 var $147=$ch_0&131072;
 var $148=($147|0)==0;
 var $_pre=HEAP32[((12352)>>2)];
 if($148){var $161=$_pre;label=32;break;}else{label=31;break;}
 case 31: 
 var $150=((($_pre)-(1))|0);
 var $151=HEAP32[(($18)>>2)];
 var $152=((($150)+($151))|0);
 HEAP32[(($18)>>2)]=$152;
 var $153=HEAP32[((12216)>>2)];
 var $154=(($__i<<16)>>16);
 var $155=((12256+($154<<2))|0);
 var $156=HEAP32[(($155)>>2)];
 var $157=_SDL_FillRect($153,$dest,$156);
 var $158=HEAP32[((12352)>>2)];
 var $159=HEAP32[(($18)>>2)];
 var $_neg1_i=(((1)-($158))|0);
 var $160=((($_neg1_i)+($159))|0);
 HEAP32[(($18)>>2)]=$160;
 var $161=$158;label=32;break;
 case 32: 
 var $161;
 HEAP32[(($21)>>2)]=$161;
 label=33;break;
 case 33: 
 var $162=HEAP32[((12352)>>2)];
 var $163=HEAP32[(($18)>>2)];
 var $164=((($163)+($162))|0);
 HEAP32[(($18)>>2)]=$164;
 var $165=((($j_02)+(1))|0);
 var $166=($165|0)<($len|0);
 if($166){var $j_02=$165;label=12;break;}else{label=34;break;}
 case 34: 
 STACKTOP=sp;return;
  default: assert(0, "bad label: " + label);
 }

}


function __set_attr($ch){
 var label=0;
 var sp=STACKTOP;STACKTOP=(STACKTOP+16)|0; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $newfg=sp;
 var $newbg=(sp)+(8);
 var $1=$ch&-2097152;
 var $2=HEAP32[((8)>>2)];
 var $3=($2|0)==($1|0);
 if($3){label=15;break;}else{label=2;break;}
 case 2: 
 var $5=HEAP32[((15744)>>2)];
 var $6=(($5+7)|0);
 var $7=HEAP8[($6)];
 var $8=(($7<<24)>>24)==0;
 if($8){label=3;break;}else{label=15;break;}
 case 3: 
 var $10=$ch>>>24;
 var $11=(($10)&65535);
 var $12=_PDC_pair_content($11,$newfg,$newbg);
 var $13=$ch>>>20;
 var $14=$13&8;
 var $15=HEAP16[(($newfg)>>1)];
 var $16=($15&65535);
 var $17=$16|$14;
 var $18=(($17)&65535);
 HEAP16[(($newfg)>>1)]=$18;
 var $19=$ch>>>19;
 var $20=$19&8;
 var $21=HEAP16[(($newbg)>>1)];
 var $22=($21&65535);
 var $23=$22|$20;
 var $24=(($23)&65535);
 HEAP16[(($newbg)>>1)]=$24;
 var $25=$ch&2097152;
 var $26=($25|0)==0;
 if($26){var $30=$18;var $29=$24;label=5;break;}else{label=4;break;}
 case 4: 
 HEAP16[(($newfg)>>1)]=$24;
 HEAP16[(($newbg)>>1)]=$18;
 var $30=$24;var $29=$18;label=5;break;
 case 5: 
 var $29;
 var $30;
 var $31=HEAP16[((848)>>1)];
 var $32=(($30<<16)>>16)==(($31<<16)>>16);
 if($32){var $41=$29;label=7;break;}else{label=6;break;}
 case 6: 
 var $34=(($30<<16)>>16);
 var $35=HEAP32[((12360)>>2)];
 var $36=((12392+($34<<2))|0);
 var $37=HEAP32[((12368)>>2)];
 var $38=_SDL_SetPalette($35,1,$36,$37,1);
 var $39=HEAP16[(($newfg)>>1)];
 HEAP16[((848)>>1)]=$39;
 var $_pre=HEAP16[(($newbg)>>1)];
 var $41=$_pre;label=7;break;
 case 7: 
 var $41;
 var $42=HEAP16[((5288)>>1)];
 var $43=(($41<<16)>>16)==(($42<<16)>>16);
 if($43){label=14;break;}else{label=8;break;}
 case 8: 
 var $45=(($41<<16)>>16)==-1;
 if($45){label=9;break;}else{label=10;break;}
 case 9: 
 var $47=HEAP32[((12360)>>2)];
 var $48=_SDL_SetColorKey($47,131072,0);
 label=13;break;
 case 10: 
 var $50=(($42<<16)>>16)==-1;
 if($50){label=11;break;}else{var $55=$41;label=12;break;}
 case 11: 
 var $52=HEAP32[((12360)>>2)];
 var $53=_SDL_SetColorKey($52,0,0);
 var $_pre1=HEAP16[(($newbg)>>1)];
 var $55=$_pre1;label=12;break;
 case 12: 
 var $55;
 var $56=HEAP32[((12360)>>2)];
 var $57=(($55<<16)>>16);
 var $58=((12392+($57<<2))|0);
 var $59=_SDL_SetPalette($56,1,$58,0,1);
 label=13;break;
 case 13: 
 var $61=HEAP16[(($newbg)>>1)];
 HEAP16[((5288)>>1)]=$61;
 label=14;break;
 case 14: 
 HEAP32[((8)>>2)]=$1;
 label=15;break;
 case 15: 
 STACKTOP=sp;return;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_get_cursor_mode(){
 var label=0;


 return 0;
}


function _PDC_get_rows(){
 var label=0;


 var $1=HEAP32[((12208)>>2)];
 var $2=HEAP32[((12376)>>2)];
 var $3=(((($1|0))/(($2|0)))&-1);
 return $3;
}


function _PDC_get_columns(){
 var label=0;


 var $1=HEAP32[((12200)>>2)];
 var $2=HEAP32[((12352)>>2)];
 var $3=(((($1|0))/(($2|0)))&-1);
 return $3;
}


function _PDC_set_keyboard_binary($on){
 var label=0;


 return;
}


function _PDC_check_key(){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=_SDL_GetTicks();
 var $2=_SDL_PollEvent(12848);
 var $3=($2|0)==0;
 if($3){label=2;break;}else{label=3;break;}
 case 2: 
 var $5=HEAP32[((12320)>>2)];
 var $6=($1>>>0)<($5>>>0);
 var $7=((($1)-($5))|0);
 var $8=($7>>>0)>30;
 var $or_cond=$6|$8;
 if($or_cond){label=3;break;}else{label=4;break;}
 case 3: 
 _PDC_update_rects();
 label=4;break;
 case 4: 
 var $11=(($2)&255);
 return $11;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_get_key(){
 var label=0;
 var sp=STACKTOP;STACKTOP=(STACKTOP+48)|0; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $rel_i=sp;
 var $1=HEAP32[((12848)>>2)];
 if(($1|0)==256){ label=2;break;}else if(($1|0)==28673){ label=3;break;}else if(($1|0)==769|($1|0)==768){ label=31;break;}else if(($1|0)==1024){ label=8;break;}else if(($1|0)==1026|($1|0)==1025){ label=9;break;}else{var $_0=-1;label=72;break;}
 case 2: 
 _exit(1);
 throw "Reached an unreachable!";
 case 3: 
 var $4=HEAP8[(12224)];
 var $5=(($4<<24)>>24)==0;
 if($5){var $_0=-1;label=72;break;}else{label=4;break;}
 case 4: 
 var $7=HEAP32[((12856)>>2)];
 var $8=HEAP32[((12376)>>2)];
 var $9=(((($7|0))/(($8|0)))&-1);
 var $10=HEAP32[((15776)>>2)];
 var $11=($9|0)==($10|0);
 var $12=HEAP32[((12852)>>2)];
 if($11){label=5;break;}else{label=6;break;}
 case 5: 
 var $14=HEAP32[((12352)>>2)];
 var $15=(((($12|0))/(($14|0)))&-1);
 var $16=HEAP32[((15784)>>2)];
 var $17=($15|0)==($16|0);
 if($17){var $_0=-1;label=72;break;}else{label=6;break;}
 case 6: 
 HEAP32[((12208)>>2)]=$7;
 HEAP32[((12200)>>2)]=$12;
 var $18=HEAP32[((15744)>>2)];
 var $19=(($18+8)|0);
 var $20=HEAP8[($19)];
 var $21=(($20<<24)>>24)==0;
 if($21){label=7;break;}else{var $_0=-1;label=72;break;}
 case 7: 
 HEAP8[($19)]=1;
 var $_0=546;label=72;break;
 case 8: 
 var $24=_SDL_ShowCursor(1);
 label=9;break;
 case 9: 
 HEAP32[((12720)>>2)]=32;
 var $26=HEAP32[((15744)>>2)];
 var $27=(($26+40)|0);
 var $28=HEAP32[(($27)>>2)];
 var $29=($28|0)==0;
 if($29){var $_0=-1;label=72;break;}else{label=10;break;}
 case 10: 
 var $31=$rel_i;
 var $$etemp$0$0=48;
 var $$etemp$0$1=0;

 HEAP32[((12232)>>2)]=0; HEAP32[((12236)>>2)]=0; HEAP32[((12240)>>2)]=0; HEAP32[((12244)>>2)]=0; HEAP32[((12248)>>2)]=0;
 var $32=_SDL_GetModState();
 var $33=$32&3;
 var $34=($33|0)==0;
 var $__i=($34?0:8);
 var $35=$32&192;
 var $36=($35|0)==0;
 var $37=$__i|16;
 var $shift_flags_1_i=($36?$__i:$37);
 var $38=$32&768;
 var $39=($38|0)==0;
 var $40=$shift_flags_1_i|32;
 var $shift_flags_1__i=($39?$shift_flags_1_i:$40);
 var $41=HEAP32[((12848)>>2)];
 var $42=($41|0)==1024;
 if($42){label=11;break;}else{label=16;break;}
 case 11: 
 var $44=HEAP32[((12860)>>2)];
 var $45=HEAP32[((12352)>>2)];
 var $46=(((($44|0))/(($45|0)))&-1);
 HEAP32[((12232)>>2)]=$46;
 var $47=HEAP32[((12864)>>2)];
 var $48=HEAP32[((12376)>>2)];
 var $49=(((($47|0))/(($48|0)))&-1);
 HEAP32[((12236)>>2)]=$49;
 var $50=HEAP8[(12856)];
 var $51=(($50<<24)>>24)==0;
 if($51){var $_0=-1;label=72;break;}else{label=12;break;}
 case 12: 
 var $53=HEAP32[((12728)>>2)];
 var $54=($46|0)==($53|0);
 var $55=HEAP32[((12732)>>2)];
 var $56=($49|0)==($55|0);
 var $or_cond_i=$54&$56;
 if($or_cond_i){var $_0=-1;label=72;break;}else{label=13;break;}
 case 13: 
 HEAP32[((12248)>>2)]=8;
 var $58=($50&255);
 var $59=$shift_flags_1__i|5;
 var $60=$58&1;
 var $61=($60|0)==0;
 if($61){var $62=8;label=14;break;}else{label=15;break;}
 case 14: 
 var $62;
 var $63=$58&2;
 var $64=($63|0)==0;
 if($64){var $111=$62;label=29;break;}else{label=28;break;}
 case 15: 
 HEAP16[((12240)>>1)]=$59;
 HEAP32[((12248)>>2)]=9;
 var $62=9;label=14;break;
 case 16: 
 var $67=HEAP8[(12857)];
 var $68=(($67<<24)>>24)==1;
 var $69=($68&1);
 var $70=HEAP8[(12856)];
 if((($70<<24)>>24)==4|(($70<<24)>>24)==5){ label=17;break;}else if((($70<<24)>>24)==0){ var $_0=-1;label=72;break;}else{label=19;break;}
 case 17: 
 if($68){var $_0=-1;label=72;break;}else{label=18;break;}
 case 18: 
 HEAP32[((12236)>>2)]=-1;
 HEAP32[((12232)>>2)]=-1;
 var $73=(($70<<24)>>24)==5;
 var $74=($73?64:32);
 HEAP32[((12248)>>2)]=$74;
 var $_0=539;label=72;break;
 case 19: 
 var $_old_i=($70&255)>3;
 if($_old_i){var $_0=-1;label=72;break;}else{label=20;break;}
 case 20: 
 if($68){label=21;break;}else{var $action_0_i=$69;label=26;break;}
 case 21: 
 var $78=HEAP32[((15744)>>2)];
 var $79=(($78+48)|0);
 var $80=HEAP32[(($79)>>2)];
 var $81=($80|0)==0;
 if($81){var $action_0_i=$69;label=26;break;}else{label=22;break;}
 case 22: 
 var $83=_napms($80);
 var $84=_SDL_PollEvent($rel_i);
 var $85=($84|0)==0;
 if($85){var $action_0_i=$69;label=26;break;}else{label=23;break;}
 case 23: 
 var $87=(($rel_i)|0);
 var $88=HEAP32[(($87)>>2)];
 var $89=($88|0)==1026;
 if($89){label=24;break;}else{label=25;break;}
 case 24: 
 var $91=(($rel_i+8)|0);
 var $92=$91;
 var $93=HEAP8[($92)];
 var $94=(($93<<24)>>24)==(($70<<24)>>24);
 if($94){var $action_0_i=2;label=26;break;}else{label=25;break;}
 case 25: 
 var $96=_SDL_PushEvent($rel_i);
 var $action_0_i=$69;label=26;break;
 case 26: 
 var $action_0_i;
 var $98=HEAP32[((12860)>>2)];
 var $99=HEAP32[((12352)>>2)];
 var $100=(((($98|0))/(($99|0)))&-1);
 HEAP32[((12232)>>2)]=$100;
 var $101=HEAP32[((12864)>>2)];
 var $102=HEAP32[((12376)>>2)];
 var $103=(((($101|0))/(($102|0)))&-1);
 HEAP32[((12236)>>2)]=$103;
 var $104=((($70)-(1))&255);
 var $105=$action_0_i|$shift_flags_1__i;
 var $106=($104&255);
 var $107=((12240+($106<<1))|0);
 HEAP16[(($107)>>1)]=$105;
 var $108=1<<$106;
 HEAP32[((12248)>>2)]=$108;
 label=27;break;
 case 27: 
 assert(20 % 1 === 0);HEAP32[((12728)>>2)]=HEAP32[((12232)>>2)];HEAP32[((12732)>>2)]=HEAP32[((12236)>>2)];HEAP32[((12736)>>2)]=HEAP32[((12240)>>2)];HEAP32[((12740)>>2)]=HEAP32[((12244)>>2)];HEAP32[((12744)>>2)]=HEAP32[((12248)>>2)];
 var $_0=539;label=72;break;
 case 28: 
 HEAP16[((12242)>>1)]=$59;
 var $110=$62|2;
 HEAP32[((12248)>>2)]=$110;
 var $111=$110;label=29;break;
 case 29: 
 var $111;
 var $112=$58&4;
 var $113=($112|0)==0;
 if($113){label=27;break;}else{label=30;break;}
 case 30: 
 HEAP16[((12244)>>1)]=$59;
 var $115=$111|4;
 HEAP32[((12248)>>2)]=$115;
 label=27;break;
 case 31: 
 var $117=HEAP32[((15744)>>2)];
 var $118=(($117+40)|0);
 var $119=HEAP32[(($118)>>2)];
 var $120=($119|0)!=0;
 var $121=($120&1);
 var $122=_SDL_ShowCursor($121);
 HEAP32[((12336)>>2)]=0;
 var $123=HEAP32[((15744)>>2)];
 var $124=(($123+82)|0);
 HEAP8[($124)]=0;
 var $125=HEAP32[((12848)>>2)];
 var $126=($125|0)==769;
 if($126){label=32;break;}else{label=41;break;}
 case 32: 
 var $128=HEAP32[((15744)>>2)];
 var $129=(($128+81)|0);
 var $130=HEAP8[($129)];
 var $131=(($130<<24)>>24)==0;
 if($131){label=40;break;}else{label=33;break;}
 case 33: 
 var $133=HEAP32[((12864)>>2)];
 var $134=HEAP32[((12720)>>2)];
 var $135=($133|0)==($134|0);
 if($135){label=34;break;}else{label=40;break;}
 case 34: 
 switch(($133|0)){case 1249:{ label=35;break;}case 1252:{ label=36;break;}case 1248:{ label=37;break;}case 1254:{ label=38;break;}case 1250:{ label=39;break;}case 1253:{ var $_0=541;label=72;break;}default:{label=40;break;}}break;
 case 35: 
 var $_0=540;label=72;break;
 case 36: 
 var $_0=543;label=72;break;
 case 37: 
 var $_0=542;label=72;break;
 case 38: 
 var $_0=545;label=72;break;
 case 39: 
 var $_0=544;label=72;break;
 case 40: 
 var $_0=-1;label=72;break;
 case 41: 
 var $144=HEAP32[((12864)>>2)];
 HEAP32[((12720)>>2)]=$144;
 var $145=HEAP32[((15744)>>2)];
 var $146=(($145+80)|0);
 var $147=HEAP8[($146)];
 var $148=(($147<<24)>>24)==0;
 if($148){var $i_07_i=0;var $178=1104;label=51;break;}else{label=42;break;}
 case 42: 
 var $150=HEAP16[((12868)>>1)];
 var $151=$150&4096;
 var $152=(($151<<16)>>16)==0;
 if($152){label=44;break;}else{label=43;break;}
 case 43: 
 var $154=HEAP32[((12336)>>2)];
 var $155=$154|8;
 HEAP32[((12336)>>2)]=$155;
 label=44;break;
 case 44: 
 var $157=$150&3;
 var $158=(($157<<16)>>16)==0;
 if($158){label=46;break;}else{label=45;break;}
 case 45: 
 var $160=HEAP32[((12336)>>2)];
 var $161=$160|1;
 HEAP32[((12336)>>2)]=$161;
 label=46;break;
 case 46: 
 var $163=$150&192;
 var $164=(($163<<16)>>16)==0;
 if($164){label=48;break;}else{label=47;break;}
 case 47: 
 var $166=HEAP32[((12336)>>2)];
 var $167=$166|2;
 HEAP32[((12336)>>2)]=$167;
 label=48;break;
 case 48: 
 var $169=$150&768;
 var $170=(($169<<16)>>16)==0;
 if($170){var $i_07_i=0;var $178=1104;label=51;break;}else{label=49;break;}
 case 49: 
 var $172=HEAP32[((12336)>>2)];
 var $173=$172|4;
 HEAP32[((12336)>>2)]=$173;
 var $i_07_i=0;var $178=1104;label=51;break;
 case 50: 
 var $175=((24+($180<<4))|0);
 var $176=HEAP32[(($175)>>2)];
 var $177=($176|0)==0;
 if($177){label=63;break;}else{var $i_07_i=$180;var $178=$176;label=51;break;}
 case 51: 
 var $178;
 var $i_07_i;
 var $179=($178|0)==($144|0);
 var $180=((($i_07_i)+(1))|0);
 if($179){label=52;break;}else{label=50;break;}
 case 52: 
 var $182=HEAP16[((12868)>>1)];
 var $183=($182&65535);
 var $184=$183&3;
 var $185=($184|0)==0;
 if($185){label=53;break;}else{label=55;break;}
 case 53: 
 var $187=((24+($i_07_i<<4)+4)|0);
 var $188=HEAP8[($187)];
 var $189=(($188<<24)>>24)==0;
 if($189){label=56;break;}else{label=54;break;}
 case 54: 
 var $191=$183&4096;
 var $192=($191|0)==0;
 if($192){label=56;break;}else{label=55;break;}
 case 55: 
 var $194=((24+($i_07_i<<4)+8)|0);
 var $key_0_in_in_i=$194;label=61;break;
 case 56: 
 var $196=$183&192;
 var $197=($196|0)==0;
 if($197){label=58;break;}else{label=57;break;}
 case 57: 
 var $199=((24+($i_07_i<<4)+10)|0);
 var $key_0_in_in_i=$199;label=61;break;
 case 58: 
 var $201=$183&768;
 var $202=($201|0)==0;
 if($202){label=60;break;}else{label=59;break;}
 case 59: 
 var $204=((24+($i_07_i<<4)+12)|0);
 var $key_0_in_in_i=$204;label=61;break;
 case 60: 
 var $206=((24+($i_07_i<<4)+6)|0);
 var $key_0_in_in_i=$206;label=61;break;
 case 61: 
 var $key_0_in_in_i;
 var $key_0_in_i=HEAP16[(($key_0_in_in_i)>>1)];
 var $208=($key_0_in_i&65535)>256;
 var $209=($208&1);
 var $210=(($145+82)|0);
 HEAP8[($210)]=$209;
 var $211=(($key_0_in_i<<16)>>16)==0;
 if($211){label=63;break;}else{label=62;break;}
 case 62: 
 var $key_0_i=($key_0_in_i&65535);
 var $key_2_i=$key_0_i;label=64;break;
 case 63: 
 var $212=HEAP32[((12872)>>2)];
 var $213=($212|0)>127;
 var $__i1=($213?0:$212);
 var $key_2_i=$__i1;label=64;break;
 case 64: 
 var $key_2_i;
 var $215=HEAP16[((12868)>>1)];
 var $216=$215&768;
 var $217=(($216<<16)>>16)==0;
 if($217){var $key_5_i=$key_2_i;label=71;break;}else{label=65;break;}
 case 65: 
 var $key_2_off_i=((($key_2_i)-(65))|0);
 var $219=($key_2_off_i>>>0)<26;
 if($219){label=66;break;}else{var $key_3_i=$key_2_i;label=67;break;}
 case 66: 
 var $221=((($key_2_i)+(352))|0);
 var $222=HEAP32[((15744)>>2)];
 var $223=(($222+82)|0);
 HEAP8[($223)]=1;
 var $key_3_i=$221;label=67;break;
 case 67: 
 var $key_3_i;
 var $key_3_off_i=((($key_3_i)-(97))|0);
 var $225=($key_3_off_i>>>0)<26;
 if($225){label=68;break;}else{var $key_4_i=$key_3_i;label=69;break;}
 case 68: 
 var $227=((($key_3_i)+(320))|0);
 var $228=HEAP32[((15744)>>2)];
 var $229=(($228+82)|0);
 HEAP8[($229)]=1;
 var $key_4_i=$227;label=69;break;
 case 69: 
 var $key_4_i;
 var $key_4_off_i=((($key_4_i)-(48))|0);
 var $231=($key_4_off_i>>>0)<10;
 if($231){label=70;break;}else{var $key_5_i=$key_4_i;label=71;break;}
 case 70: 
 var $233=((($key_4_i)+(359))|0);
 var $234=HEAP32[((15744)>>2)];
 var $235=(($234+82)|0);
 HEAP8[($235)]=1;
 var $key_5_i=$233;label=71;break;
 case 71: 
 var $key_5_i;
 var $237=($key_5_i|0)!=0;
 var $238=($237?$key_5_i:-1);
 var $_0=$238;label=72;break;
 case 72: 
 var $_0;
 STACKTOP=sp;return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_mouse_set(){
 var label=0;


 var $1=HEAP32[((15744)>>2)];
 var $2=(($1+40)|0);
 var $3=HEAP32[(($2)>>2)];
 var $4=($3|0)!=0;
 var $5=($4&1);
 var $6=_SDL_ShowCursor($5);
 return 0;
}


function _PDC_flushinp(){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 label=2;break;
 case 2: 
 var $2=_SDL_GetTicks();
 var $3=_SDL_PollEvent(12848);
 var $4=($3|0)==0;
 if($4){label=3;break;}else{label=4;break;}
 case 3: 
 var $6=HEAP32[((12320)>>2)];
 var $7=($2>>>0)<($6>>>0);
 var $8=((($2)-($6))|0);
 var $9=($8>>>0)>30;
 var $or_cond_i=$7|$9;
 if($or_cond_i){label=4;break;}else{label=5;break;}
 case 4: 
 _PDC_update_rects();
 label=5;break;
 case 5: 
 var $11=(($3)&255);
 var $12=(($11<<24)>>24)==0;
 if($12){label=6;break;}else{label=2;break;}
 case 6: 
 return;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_retile(){
 var label=0;
 var sp=STACKTOP;STACKTOP=(STACKTOP+16)|0; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $dest=sp;
 var $1=HEAP32[((12192)>>2)];
 var $2=($1|0)==0;
 if($2){label=3;break;}else{label=2;break;}
 case 2: 
 _SDL_FreeSurface($1);
 label=3;break;
 case 3: 
 var $5=HEAP32[((12216)>>2)];
 var $6=_SDL_DisplayFormat($5);
 HEAP32[((12192)>>2)]=$6;
 var $7=HEAP32[((12456)>>2)];
 var $8=($7|0)==0;
 if($8){label=11;break;}else{label=4;break;}
 case 4: 
 var $10=(($dest+4)|0);
 HEAP32[(($10)>>2)]=0;
 var $11=(($6+12)|0);
 var $12=HEAP32[(($11)>>2)];
 var $13=($12|0)>0;
 if($13){label=5;break;}else{var $_lcssa2=$6;label=10;break;}
 case 5: 
 var $14=(($dest)|0);
 var $18=$6;var $17=$7;var $16=0;label=6;break;
 case 6: 
 var $16;
 var $17;
 var $18;
 HEAP32[(($14)>>2)]=0;
 var $19=(($18+8)|0);
 var $20=HEAP32[(($19)>>2)];
 var $21=($20|0)>0;
 if($21){var $23=$18;var $22=$17;label=7;break;}else{var $37=$17;var $36=$16;var $35=$18;label=9;break;}
 case 7: 
 var $22;
 var $23;
 var $24=_SDL_UpperBlit($22,0,$23,$dest);
 var $25=HEAP32[((12456)>>2)];
 var $26=(($25+8)|0);
 var $27=HEAP32[(($26)>>2)];
 var $28=HEAP32[(($14)>>2)];
 var $29=((($28)+($27))|0);
 HEAP32[(($14)>>2)]=$29;
 var $30=HEAP32[((12192)>>2)];
 var $31=(($30+8)|0);
 var $32=HEAP32[(($31)>>2)];
 var $33=($29|0)<($32|0);
 if($33){var $23=$30;var $22=$25;label=7;break;}else{label=8;break;}
 case 8: 
 var $_pre=HEAP32[(($10)>>2)];
 var $37=$25;var $36=$_pre;var $35=$30;label=9;break;
 case 9: 
 var $35;
 var $36;
 var $37;
 var $38=(($37+12)|0);
 var $39=HEAP32[(($38)>>2)];
 var $40=((($36)+($39))|0);
 HEAP32[(($10)>>2)]=$40;
 var $41=(($35+12)|0);
 var $42=HEAP32[(($41)>>2)];
 var $43=($40|0)<($42|0);
 if($43){var $18=$35;var $17=$37;var $16=$40;label=6;break;}else{var $_lcssa2=$35;label=10;break;}
 case 10: 
 var $_lcssa2;
 var $44=HEAP32[((12216)>>2)];
 var $45=_SDL_UpperBlit($_lcssa2,0,$44,0);
 label=11;break;
 case 11: 
 STACKTOP=sp;return;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_scr_close(){
 var label=0;


 return;
}


function _PDC_scr_open($argc,$argv){
 var label=0;
 var tempVarArgs=0;
 var sp=STACKTOP; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=_calloc(1,88);
 var $2=$1;
 HEAP32[((15744)>>2)]=$2;
 var $3=($1|0)==0;
 if($3){var $_0=-1;label=44;break;}else{label=2;break;}
 case 2: 
 var $5=HEAP32[((12216)>>2)];
 var $6=($5|0)==0;
 var $7=($6&1);
 HEAP8[(12224)]=$7;
 if($6){label=3;break;}else{label=6;break;}
 case 3: 
 var $9=_SDL_Init(33);
 var $10=($9|0)<0;
 if($10){label=4;break;}else{label=5;break;}
 case 4: 
 var $12=HEAP32[((_stderr)>>2)];
 var $13=_SDL_GetError();
 var $14=_fprintf($12,6416,(tempVarArgs=STACKTOP,STACKTOP = (STACKTOP + 8)|0,(assert((STACKTOP|0) < (STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$13,tempVarArgs)); STACKTOP=tempVarArgs;
 var $_0=-1;label=44;break;
 case 5: 
 var $16=_atexit(6);
 label=6;break;
 case 6: 
 var $18=HEAP32[((12360)>>2)];
 var $19=($18|0)==0;
 if($19){label=7;break;}else{var $33=$18;label=10;break;}
 case 7: 
 var $21=_getenv(6552);
 var $22=($21|0)!=0;
 var $23=($22?$21:6360);
 var $24=_SDL_RWFromFile($23,6272);
 var $25=_IMG_Load_RW($24,1);
 HEAP32[((12360)>>2)]=$25;
 var $26=($25|0)==0;
 if($26){label=8;break;}else{var $33=$25;label=10;break;}
 case 8: 
 var $27=_SDL_RWFromConstMem(1056,4158);
 var $28=_IMG_Load_RW($27,0);
 HEAP32[((12360)>>2)]=$28;
 var $29=($28|0)==0;
 if($29){label=9;break;}else{var $33=$28;label=10;break;}
 case 9: 
 var $31=HEAP32[((_stderr)>>2)];
 var $32=_fwrite(6176,20,1,$31);
 var $_0=-1;label=44;break;
 case 10: 
 var $33;
 var $34=(($33+4)|0);
 var $35=HEAP32[(($34)>>2)];
 var $36=(($35+4)|0);
 var $37=HEAP32[(($36)>>2)];
 var $38=($37|0)==0;
 var $39=($38&1);
 var $40=HEAP32[((15744)>>2)];
 var $41=(($40+7)|0);
 HEAP8[($41)]=$39;
 var $42=HEAP32[((15744)>>2)];
 var $43=(($42+7)|0);
 var $44=HEAP8[($43)];
 var $45=(($44<<24)>>24)!=0;
 var $46=HEAP32[((12456)>>2)];
 var $47=($46|0)!=0;
 var $or_cond=$45|$47;
 if($or_cond){var $57=$42;var $56=$44;var $55=$46;label=12;break;}else{label=11;break;}
 case 11: 
 var $49=_getenv(6080);
 var $50=($49|0)!=0;
 var $51=($50?$49:5992);
 var $52=_SDL_RWFromFile($51,6272);
 var $53=_IMG_Load_RW($52,1);
 HEAP32[((12456)>>2)]=$53;
 var $_pre=HEAP32[((15744)>>2)];
 var $_phi_trans_insert=(($_pre+7)|0);
 var $_pre14=HEAP8[($_phi_trans_insert)];
 var $57=$_pre;var $56=$_pre14;var $55=$53;label=12;break;
 case 12: 
 var $55;
 var $56;
 var $57;
 var $58=(($56<<24)>>24)==0;
 if($58){label=13;break;}else{label=15;break;}
 case 13: 
 var $60=($55|0)==0;
 var $61=HEAP8[(12224)];
 var $62=(($61<<24)>>24)!=0;
 var $or_cond3=$60&$62;
 if($or_cond3){label=15;break;}else{label=14;break;}
 case 14: 
 var $64=(($57+9)|0);
 HEAP8[($64)]=1;
 var $65=HEAP32[((15744)>>2)];
 var $66=(($65+10)|0);
 HEAP16[(($66)>>1)]=7;
 var $67=HEAP32[((15744)>>2)];
 var $68=(($67+12)|0);
 HEAP16[(($68)>>1)]=-1;
 label=16;break;
 case 15: 
 var $70=(($57+9)|0);
 HEAP8[($70)]=0;
 label=16;break;
 case 16: 
 var $72=HEAP32[((12360)>>2)];
 var $73=(($72+12)|0);
 var $74=HEAP32[(($73)>>2)];
 var $75=(((($74|0))/(8))&-1);
 HEAP32[((12376)>>2)]=$75;
 var $76=(($72+8)|0);
 var $77=HEAP32[(($76)>>2)];
 var $78=(((($77|0))/(32))&-1);
 HEAP32[((12352)>>2)]=$78;
 var $79=HEAP32[((15744)>>2)];
 var $80=(($79+7)|0);
 var $81=HEAP8[($80)];
 var $82=(($81<<24)>>24)==0;
 if($82){label=17;break;}else{label=18;break;}
 case 17: 
 var $84=(($72+4)|0);
 var $85=HEAP32[(($84)>>2)];
 var $86=(($85+4)|0);
 var $87=HEAP32[(($86)>>2)];
 var $88=(($87)|0);
 var $89=HEAP32[(($88)>>2)];
 var $90=((($89)-(1))|0);
 HEAP32[((12368)>>2)]=$90;
 label=18;break;
 case 18: 
 var $92=HEAP8[(12224)];
 var $93=(($92<<24)>>24)==0;
 var $94=HEAP32[((12344)>>2)];
 var $95=($94|0)!=0;
 var $or_cond5=$93|$95;
 if($or_cond5){var $109=$92;label=23;break;}else{label=19;break;}
 case 19: 
 var $97=_getenv(5912);
 var $98=($97|0)!=0;
 var $99=($98?$97:5856);
 var $100=_SDL_RWFromFile($99,6272);
 var $101=_IMG_Load_RW($100,1);
 HEAP32[((12344)>>2)]=$101;
 var $102=($101|0)==0;
 if($102){label=20;break;}else{var $107=$101;label=21;break;}
 case 20: 
 var $104=_SDL_RWFromConstMem(864,190);
 var $105=_IMG_Load_RW($104,0);
 HEAP32[((12344)>>2)]=$105;
 var $106=($105|0)==0;
 if($106){label=22;break;}else{var $107=$105;label=21;break;}
 case 21: 
 var $107;
 _SDL_WM_SetIcon($107,0);
 label=22;break;
 case 22: 
 var $_pr8=HEAP8[(12224)];
 var $109=$_pr8;label=23;break;
 case 23: 
 var $109;
 var $110=(($109<<24)>>24)==0;
 if($110){label=29;break;}else{label=24;break;}
 case 24: 
 var $112=_getenv(5808);
 var $113=($112|0)==0;
 if($113){var $116=25;label=26;break;}else{label=25;break;}
 case 25: 
 var $115=_atoi($112);
 var $116=$115;label=26;break;
 case 26: 
 var $116;
 var $117=HEAP32[((12376)>>2)];
 var $118=(Math_imul($117,$116)|0);
 HEAP32[((12208)>>2)]=$118;
 var $119=_getenv(6632);
 var $120=($119|0)==0;
 if($120){var $123=80;label=28;break;}else{label=27;break;}
 case 27: 
 var $122=_atoi($119);
 var $123=$122;label=28;break;
 case 28: 
 var $123;
 var $124=HEAP32[((12352)>>2)];
 var $125=(Math_imul($124,$123)|0);
 HEAP32[((12200)>>2)]=$125;
 var $126=_SDL_SetVideoMode($125,$118,0,17825792);
 HEAP32[((12216)>>2)]=$126;
 var $145=$126;label=33;break;
 case 29: 
 var $128=HEAP32[((12208)>>2)];
 var $129=($128|0)==0;
 if($129){label=30;break;}else{label=31;break;}
 case 30: 
 var $131=HEAP32[((12216)>>2)];
 var $132=(($131+12)|0);
 var $133=HEAP32[(($132)>>2)];
 var $134=HEAP32[((12176)>>2)];
 var $135=((($133)-($134))|0);
 HEAP32[((12208)>>2)]=$135;
 label=31;break;
 case 31: 
 var $137=HEAP32[((12200)>>2)];
 var $138=($137|0)==0;
 var $139=HEAP32[((12216)>>2)];
 if($138){label=32;break;}else{var $145=$139;label=33;break;}
 case 32: 
 var $141=(($139+8)|0);
 var $142=HEAP32[(($141)>>2)];
 var $143=HEAP32[((12184)>>2)];
 var $144=((($142)-($143))|0);
 HEAP32[((12200)>>2)]=$144;
 var $145=$139;label=33;break;
 case 33: 
 var $145;
 var $146=($145|0)==0;
 if($146){label=34;break;}else{label=35;break;}
 case 34: 
 var $148=HEAP32[((_stderr)>>2)];
 var $149=_SDL_GetError();
 var $150=_fprintf($148,6568,(tempVarArgs=STACKTOP,STACKTOP = (STACKTOP + 8)|0,(assert((STACKTOP|0) < (STACK_MAX|0))|0),HEAP32[((tempVarArgs)>>2)]=$149,tempVarArgs)); STACKTOP=tempVarArgs;
 var $_0=-1;label=44;break;
 case 35: 
 var $152=HEAP32[((15744)>>2)];
 var $153=(($152+9)|0);
 var $154=HEAP8[($153)];
 var $155=(($154<<24)>>24)==0;
 if($155){var $i_013=0;label=37;break;}else{label=36;break;}
 case 36: 
 _PDC_retile();
 var $i_013=0;label=37;break;
 case 37: 
 var $i_013;
 var $157=$i_013&4;
 var $158=($157|0)!=0;
 var $159=($158?-64:0);
 var $160=((12392+($i_013<<2))|0);
 HEAP8[($160)]=$159;
 var $161=$i_013&2;
 var $162=($161|0)!=0;
 var $163=($162?-64:0);
 var $164=((12392+($i_013<<2)+1)|0);
 HEAP8[($164)]=$163;
 var $165=$i_013&1;
 var $166=($165|0)!=0;
 var $167=($166?-64:0);
 var $168=((12392+($i_013<<2)+2)|0);
 HEAP8[($168)]=$167;
 var $169=($158?-1:64);
 var $170=((($i_013)+(8))|0);
 var $171=((12392+($170<<2))|0);
 HEAP8[($171)]=$169;
 var $172=($162?-1:64);
 var $173=((12392+($170<<2)+1)|0);
 HEAP8[($173)]=$172;
 var $174=($166?-1:64);
 var $175=((12392+($170<<2)+2)|0);
 HEAP8[($175)]=$174;
 var $176=((($i_013)+(1))|0);
 var $177=($176|0)<8;
 if($177){var $i_013=$176;label=37;break;}else{var $i_111=0;label=38;break;}
 case 38: 
 var $i_111;
 var $178=HEAP32[((12216)>>2)];
 var $179=(($178+4)|0);
 var $180=HEAP32[(($179)>>2)];
 var $181=((12392+($i_111<<2))|0);
 var $182=HEAP8[($181)];
 var $183=((12392+($i_111<<2)+1)|0);
 var $184=HEAP8[($183)];
 var $185=((12392+($i_111<<2)+2)|0);
 var $186=HEAP8[($185)];
 var $187=_SDL_MapRGB($180,$182,$184,$186);
 var $188=((12256+($i_111<<2))|0);
 HEAP32[(($188)>>2)]=$187;
 var $189=((($i_111)+(1))|0);
 var $190=($189|0)<16;
 if($190){var $i_111=$189;label=38;break;}else{label=39;break;}
 case 39: 
 var $192=_SDL_EnableUNICODE(1);
 var $193=_PDC_mouse_set();
 var $194=HEAP8[(12224)];
 var $195=(($194<<24)>>24)==0;
 if($195){label=43;break;}else{label=40;break;}
 case 40: 
 var $197=($argc|0)==0;
 if($197){var $201=6504;label=42;break;}else{label=41;break;}
 case 41: 
 var $199=HEAP32[(($argv)>>2)];
 var $201=$199;label=42;break;
 case 42: 
 var $201;
 _PDC_set_title($201);
 label=43;break;
 case 43: 
 var $203=_PDC_get_rows();
 var $204=HEAP32[((15744)>>2)];
 var $205=(($204+32)|0);
 HEAP32[(($205)>>2)]=$203;
 var $206=_PDC_get_columns();
 var $207=HEAP32[((15744)>>2)];
 var $208=(($207+36)|0);
 HEAP32[(($208)>>2)]=$206;
 var $209=HEAP32[((15744)>>2)];
 var $210=(($209+48)|0);
 HEAP32[(($210)>>2)]=150;
 var $211=HEAP32[((15744)>>2)];
 var $212=(($211+6)|0);
 HEAP8[($212)]=0;
 _PDC_flushinp();
 var $213=_SDL_EnableKeyRepeat(500,30);
 var $_0=0;label=44;break;
 case 44: 
 var $_0;
 STACKTOP=sp;return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_reset_prog_mode(){
 var label=0;


 _PDC_flushinp();
 var $1=_SDL_EnableKeyRepeat(500,30);
 return;
}


function _PDC_resize_screen($nlines,$ncols){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP8[(12224)];
 var $2=(($1<<24)>>24)==0;
 if($2){var $_0=-1;label=7;break;}else{label=2;break;}
 case 2: 
 var $4=($nlines|0)==0;
 var $5=($ncols|0)==0;
 var $or_cond=$4|$5;
 if($or_cond){label=4;break;}else{label=3;break;}
 case 3: 
 var $7=HEAP32[((12376)>>2)];
 var $8=(Math_imul($7,$nlines)|0);
 HEAP32[((12208)>>2)]=$8;
 var $9=HEAP32[((12352)>>2)];
 var $10=(Math_imul($9,$ncols)|0);
 HEAP32[((12200)>>2)]=$10;
 label=4;break;
 case 4: 
 var $12=HEAP32[((12216)>>2)];
 _SDL_FreeSurface($12);
 var $13=HEAP32[((12200)>>2)];
 var $14=HEAP32[((12208)>>2)];
 var $15=_SDL_SetVideoMode($13,$14,0,17825792);
 HEAP32[((12216)>>2)]=$15;
 var $16=HEAP32[((12192)>>2)];
 var $17=($16|0)==0;
 if($17){label=6;break;}else{label=5;break;}
 case 5: 
 _PDC_retile();
 label=6;break;
 case 6: 
 var $20=HEAP32[((15744)>>2)];
 var $21=(($20+8)|0);
 HEAP8[($21)]=0;
 var $22=HEAP32[((15744)>>2)];
 var $23=(($22+20)|0);
 HEAP32[(($23)>>2)]=0;
 var $24=HEAP32[((15744)>>2)];
 var $25=(($24+16)|0);
 HEAP32[(($25)>>2)]=0;
 var $_0=0;label=7;break;
 case 7: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_restore_screen_mode($i){
 var label=0;


 return;
}


function _PDC_save_screen_mode($i){
 var label=0;


 return;
}


function _PDC_init_pair($pair,$fg,$bg){
 var label=0;


 var $1=(($pair<<16)>>16);
 var $2=((14248+($1<<2))|0);
 HEAP16[(($2)>>1)]=$fg;
 var $3=((14248+($1<<2)+2)|0);
 HEAP16[(($3)>>1)]=$bg;
 return;
}


function _PDC_pair_content($pair,$fg,$bg){
 var label=0;


 var $1=(($pair<<16)>>16);
 var $2=((14248+($1<<2))|0);
 var $3=HEAP16[(($2)>>1)];
 HEAP16[(($fg)>>1)]=$3;
 var $4=((14248+($1<<2)+2)|0);
 var $5=HEAP16[(($4)>>1)];
 HEAP16[(($bg)>>1)]=$5;
 return 0;
}


function _PDC_can_change_color(){
 var label=0;


 return 1;
}


function _PDC_init_color($color,$red,$green,$blue){
 var label=0;


 var $1=(($red<<16)>>16);
 var $2=((($1)*(255))&-1);
 var $3=((($2)+(500))|0);
 var $4=(((($3|0))/(1000))&-1);
 var $5=(($4)&255);
 var $6=(($color<<16)>>16);
 var $7=((12392+($6<<2))|0);
 HEAP8[($7)]=$5;
 var $8=(($green<<16)>>16);
 var $9=((($8)*(255))&-1);
 var $10=((($9)+(500))|0);
 var $11=(((($10|0))/(1000))&-1);
 var $12=(($11)&255);
 var $13=((12392+($6<<2)+1)|0);
 HEAP8[($13)]=$12;
 var $14=(($blue<<16)>>16);
 var $15=((($14)*(255))&-1);
 var $16=((($15)+(500))|0);
 var $17=(((($16|0))/(1000))&-1);
 var $18=(($17)&255);
 var $19=((12392+($6<<2)+2)|0);
 HEAP8[($19)]=$18;
 var $20=HEAP32[((12216)>>2)];
 var $21=(($20+4)|0);
 var $22=HEAP32[(($21)>>2)];
 var $23=_SDL_MapRGB($22,$5,$12,$18);
 var $24=((12256+($6<<2))|0);
 HEAP32[(($24)>>2)]=$23;
 var $25=HEAP32[((12904)>>2)];
 var $26=_wrefresh($25);
 return 0;
}


function _PDC_curs_set($visibility){
 var label=0;


 var $1=HEAP32[((15744)>>2)];
 var $2=(($1+24)|0);
 var $3=HEAP32[(($2)>>2)];
 HEAP32[(($2)>>2)]=$visibility;
 var $4=HEAP32[((15744)>>2)];
 var $5=(($4+16)|0);
 var $6=HEAP32[(($5)>>2)];
 var $7=(($4+20)|0);
 var $8=HEAP32[(($7)>>2)];
 _PDC_gotoyx($6,$8);
 return $3;
}


function _PDC_set_title($title){
 var label=0;


 _SDL_WM_SetCaption($title,$title);
 return;
}


function _PDC_set_blink($blinkon){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=HEAP8[(12384)];
 var $2=(($1<<24)>>24)==0;
 if($2){label=3;break;}else{label=2;break;}
 case 2: 
 HEAP32[((15792)>>2)]=16;
 label=3;break;
 case 3: 
 var $5=(($blinkon<<24)>>24)!=0;
 var $6=(($5<<31)>>31);
 return $6;
  default: assert(0, "bad label: " + label);
 }

}


function _PDC_napms($ms){
 var label=0;


 _PDC_update_rects();
 _SDL_Delay($ms);
 return;
}


function _PDC_napms_async($ms,$callback){
 var label=0;


 _PDC_update_rects();
 var $1=_emscripten_async_call($callback,0,$ms);
 return;
}


function _PDC_sysname(){
 var label=0;


 return 6408;
}


function _waddch($win,$ch){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=-1;label=39;break;}else{label=2;break;}
 case 2: 
 var $2=(($win+4)|0);
 var $3=(($win)|0);
 var $4=(($win+8)|0);
 var $5=(($win+12)|0);
 var $ch_tr56=$ch;label=3;break;
 case 3: 
 var $ch_tr56;
 var $6=HEAP32[(($2)>>2)];
 var $7=HEAP32[(($3)>>2)];
 var $8=HEAP32[(($4)>>2)];
 var $9=($7|0)>($8|0);
 if($9){var $_0=-1;label=39;break;}else{label=4;break;}
 case 4: 
 var $11=HEAP32[(($5)>>2)];
 var $12=($6|0)>($11|0);
 var $13=($7|0)<0;
 var $or_cond3=$12|$13;
 var $14=($6|0)<0;
 var $or_cond4=$or_cond3|$14;
 if($or_cond4){var $_0=-1;label=39;break;}else{label=5;break;}
 case 5: 
 var $16=HEAP32[((15744)>>2)];
 var $17=(($16+5)|0);
 var $18=HEAP8[($17)];
 var $19=(($18<<24)>>24)==0;
 if($19){label=7;break;}else{label=6;break;}
 case 6: 
 var $20=$ch_tr56&65535;
 var $21=$ch_tr56&-65536;
 var $65=$20;var $64=$21;label=21;break;
 case 7: 
 var $_lobit=$ch_tr56&65536;
 var $phitmp=($_lobit|0)==0;
 var $23=$ch_tr56&65535;
 var $24=$ch_tr56&-65536;
 if($phitmp){label=8;break;}else{var $65=$23;var $64=$24;label=21;break;}
 case 8: 
 var $26=($23>>>0)<32;
 var $27=($23|0)==127;
 var $or_cond=$26|$27;
 if($or_cond){label=9;break;}else{var $65=$23;var $64=$24;label=21;break;}
 case 9: 
 switch(($23|0)){case 9:{ label=10;break;}case 10:{ label=13;break;}case 8:{ label=15;break;}case 13:{ label=16;break;}case 127:{ label=17;break;}default:{label=19;break;}}break;
 case 10: 
 var $phitmp127=$24|32;
 var $30=HEAP32[((6712)>>2)];
 var $31=(((($6|0))/(($30|0)))&-1);
 var $32=((($31)+(1))|0);
 var $33=(Math_imul($32,$30)|0);
 var $34=($6|0)<($33|0);
 if($34){var $x_06=$6;label=11;break;}else{var $_0=0;label=39;break;}
 case 11: 
 var $x_06;
 var $35=_waddch($win,$phitmp127);
 var $36=($35|0)==-1;
 if($36){var $_0=-1;label=39;break;}else{label=12;break;}
 case 12: 
 var $38=HEAP32[(($2)>>2)];
 var $39=($38|0)!=0;
 var $40=((($x_06)+(1))|0);
 var $41=($40|0)<($33|0);
 var $or_cond128=$39&$41;
 if($or_cond128){var $x_06=$40;label=11;break;}else{var $_0=0;label=39;break;}
 case 13: 
 var $42=_wclrtoeol($win);
 var $43=((($7)+(1))|0);
 var $44=(($win+60)|0);
 var $45=HEAP32[(($44)>>2)];
 var $46=($7|0)<($45|0);
 if($46){var $x_2=0;var $y_0=$43;label=35;break;}else{label=14;break;}
 case 14: 
 var $48=_wscrl($win,1);
 var $49=($48|0)==-1;
 if($49){var $_0=-1;label=39;break;}else{var $x_2=0;var $y_0=$7;label=35;break;}
 case 15: 
 var $50=((($6)-(1))|0);
 var $51=($6|0)<1;
 if($51){label=16;break;}else{var $x_2=$50;var $y_0=$7;label=35;break;}
 case 16: 
 var $x_2=0;var $y_0=$7;label=35;break;
 case 17: 
 var $53=$24|94;
 var $54=_waddch($win,$53);
 var $55=($54|0)==-1;
 if($55){var $_0=-1;label=39;break;}else{label=18;break;}
 case 18: 
 var $57=$24|63;
 var $ch_tr56=$57;label=3;break;
 case 19: 
 var $59=$24|94;
 var $60=_waddch($win,$59);
 var $61=($60|0)==-1;
 if($61){var $_0=-1;label=39;break;}else{label=20;break;}
 case 20: 
 var $63=((($ch_tr56)+(64))|0);
 var $ch_tr56=$63;label=3;break;
 case 21: 
 var $64;
 var $65;
 var $66=($ch_tr56>>>0)>16777215;
 if($66){var $attr_0=$64;label=23;break;}else{label=22;break;}
 case 22: 
 var $68=(($win+28)|0);
 var $69=HEAP32[(($68)>>2)];
 var $70=$69|$64;
 var $attr_0=$70;label=23;break;
 case 23: 
 var $attr_0;
 var $72=($attr_0>>>0)>16777215;
 var $73=(($win+32)|0);
 var $74=HEAP32[(($73)>>2)];
 var $_pn_v=($72?16711680:-65536);
 var $_pn=$_pn_v&$74;
 var $attr_1=$_pn|$attr_0;
 var $75=($65|0)==32;
 var $76=$74&65535;
 var $_5=($75?$76:$65);
 var $77=$attr_1|$_5;
 var $78=(($win+44)|0);
 var $79=HEAP32[(($78)>>2)];
 var $80=(($79+($7<<2))|0);
 var $81=HEAP32[(($80)>>2)];
 var $82=(($81+($6<<2))|0);
 var $83=HEAP32[(($82)>>2)];
 var $84=($83|0)==($77|0);
 if($84){var $113=$11;label=31;break;}else{label=24;break;}
 case 24: 
 var $86=(($win+48)|0);
 var $87=HEAP32[(($86)>>2)];
 var $88=(($87+($7<<2))|0);
 var $89=HEAP32[(($88)>>2)];
 var $90=($89|0)==-1;
 if($90){label=25;break;}else{label=26;break;}
 case 25: 
 var $92=(($win+52)|0);
 var $93=HEAP32[(($92)>>2)];
 var $94=(($93+($7<<2))|0);
 HEAP32[(($94)>>2)]=$6;
 var $95=HEAP32[(($86)>>2)];
 var $96=(($95+($7<<2))|0);
 HEAP32[(($96)>>2)]=$6;
 label=30;break;
 case 26: 
 var $98=($6|0)<($89|0);
 if($98){label=27;break;}else{label=28;break;}
 case 27: 
 HEAP32[(($88)>>2)]=$6;
 label=30;break;
 case 28: 
 var $101=(($win+52)|0);
 var $102=HEAP32[(($101)>>2)];
 var $103=(($102+($7<<2))|0);
 var $104=HEAP32[(($103)>>2)];
 var $105=($6|0)>($104|0);
 if($105){label=29;break;}else{label=30;break;}
 case 29: 
 HEAP32[(($103)>>2)]=$6;
 label=30;break;
 case 30: 
 var $108=HEAP32[(($78)>>2)];
 var $109=(($108+($7<<2))|0);
 var $110=HEAP32[(($109)>>2)];
 var $111=(($110+($6<<2))|0);
 HEAP32[(($111)>>2)]=$77;
 var $_pre=HEAP32[(($5)>>2)];
 var $113=$_pre;label=31;break;
 case 31: 
 var $113;
 var $114=((($6)+(1))|0);
 var $115=($114|0)<($113|0);
 if($115){var $x_2=$114;var $y_0=$7;label=35;break;}else{label=32;break;}
 case 32: 
 var $117=((($7)+(1))|0);
 var $118=(($win+60)|0);
 var $119=HEAP32[(($118)>>2)];
 var $120=($7|0)<($119|0);
 if($120){var $x_2=0;var $y_0=$117;label=35;break;}else{label=33;break;}
 case 33: 
 var $122=_wscrl($win,1);
 var $123=($122|0)==-1;
 if($123){label=34;break;}else{var $x_2=0;var $y_0=$7;label=35;break;}
 case 34: 
 _PDC_sync($win);
 var $_0=-1;label=39;break;
 case 35: 
 var $y_0;
 var $x_2;
 HEAP32[(($2)>>2)]=$x_2;
 HEAP32[(($3)>>2)]=$y_0;
 var $126=(($win+40)|0);
 var $127=HEAP8[($126)];
 var $128=(($127<<24)>>24)==0;
 if($128){label=37;break;}else{label=36;break;}
 case 36: 
 var $130=_wrefresh($win);
 label=37;break;
 case 37: 
 var $132=(($win+41)|0);
 var $133=HEAP8[($132)];
 var $134=(($133<<24)>>24)==0;
 if($134){var $_0=0;label=39;break;}else{label=38;break;}
 case 38: 
 _wsyncup($win);
 var $_0=0;label=39;break;
 case 39: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _waddstr($win,$str){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 var $2=($str|0)==0;
 var $or_cond3_i=$1|$2;
 if($or_cond3_i){var $_0_i=-1;label=4;break;}else{var $i_0_us_i=0;label=2;break;}
 case 2: 
 var $i_0_us_i;
 var $3=(($str+$i_0_us_i)|0);
 var $4=HEAP8[($3)];
 var $5=(($4<<24)>>24)==0;
 if($5){var $_0_i=0;label=4;break;}else{label=3;break;}
 case 3: 
 var $6=((($i_0_us_i)+(1))|0);
 var $7=($4&255);
 var $8=_waddch($win,$7);
 var $9=($8|0)==-1;
 if($9){var $_0_i=-1;label=4;break;}else{var $i_0_us_i=$6;label=2;break;}
 case 4: 
 var $_0_i;
 return $_0_i;
  default: assert(0, "bad label: " + label);
 }

}


function _wclrtoeol($win){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=-1;label=8;break;}else{label=2;break;}
 case 2: 
 var $3=(($win)|0);
 var $4=HEAP32[(($3)>>2)];
 var $5=(($win+4)|0);
 var $6=HEAP32[(($5)>>2)];
 var $7=(($win+32)|0);
 var $8=HEAP32[(($7)>>2)];
 var $9=(($win+12)|0);
 var $10=HEAP32[(($9)>>2)];
 var $11=($6|0)<($10|0);
 if($11){label=3;break;}else{var $22=$10;label=5;break;}
 case 3: 
 var $12=(($win+44)|0);
 var $13=HEAP32[(($12)>>2)];
 var $14=(($13+($4<<2))|0);
 var $15=HEAP32[(($14)>>2)];
 var $16=(($15+($6<<2))|0);
 var $minx_01=$6;var $ptr_02=$16;label=4;break;
 case 4: 
 var $ptr_02;
 var $minx_01;
 HEAP32[(($ptr_02)>>2)]=$8;
 var $18=((($minx_01)+(1))|0);
 var $19=(($ptr_02+4)|0);
 var $20=HEAP32[(($9)>>2)];
 var $21=($18|0)<($20|0);
 if($21){var $minx_01=$18;var $ptr_02=$19;label=4;break;}else{var $22=$20;label=5;break;}
 case 5: 
 var $22;
 var $23=(($win+48)|0);
 var $24=HEAP32[(($23)>>2)];
 var $25=(($24+($4<<2))|0);
 var $26=HEAP32[(($25)>>2)];
 var $27=($6|0)<($26|0);
 var $28=($26|0)==-1;
 var $or_cond=$27|$28;
 if($or_cond){label=6;break;}else{var $31=$22;label=7;break;}
 case 6: 
 HEAP32[(($25)>>2)]=$6;
 var $_pre=HEAP32[(($9)>>2)];
 var $31=$_pre;label=7;break;
 case 7: 
 var $31;
 var $32=((($31)-(1))|0);
 var $33=(($win+52)|0);
 var $34=HEAP32[(($33)>>2)];
 var $35=(($34+($4<<2))|0);
 HEAP32[(($35)>>2)]=$32;
 _PDC_sync($win);
 var $_0=0;label=8;break;
 case 8: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _wclrtobot($win){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=(($win)|0);
 var $2=HEAP32[(($1)>>2)];
 var $3=(($win+4)|0);
 var $4=HEAP32[(($3)>>2)];
 var $5=($win|0)==0;
 if($5){var $_0=-1;label=17;break;}else{label=2;break;}
 case 2: 
 var $7=((($2)+(1))|0);
 var $8=(($win+8)|0);
 var $9=HEAP32[(($8)>>2)];
 var $10=($7|0)<($9|0);
 if($10){label=3;break;}else{label=11;break;}
 case 3: 
 HEAP32[(($3)>>2)]=0;
 HEAP32[(($1)>>2)]=$7;
 var $11=(($win+32)|0);
 var $12=(($win+12)|0);
 var $13=(($win+44)|0);
 var $14=(($win+48)|0);
 var $15=(($win+52)|0);
 var $storemerge12=$7;label=5;break;
 case 4: 
 var $16;
 var $17=((($16)-(1))|0);
 var $18=HEAP32[(($15)>>2)];
 var $19=(($18+($storemerge12<<2))|0);
 HEAP32[(($19)>>2)]=$17;
 _PDC_sync($win);
 var $storemerge_in_pre=HEAP32[(($1)>>2)];
 var $_pre=HEAP32[(($8)>>2)];
 var $storemerge=((($storemerge_in_pre)+(1))|0);
 HEAP32[(($1)>>2)]=$storemerge;
 var $20=($_pre|0)>($storemerge|0);
 if($20){var $storemerge12=$storemerge;label=5;break;}else{label=10;break;}
 case 5: 
 var $storemerge12;
 var $22=HEAP32[(($3)>>2)];
 var $23=HEAP32[(($11)>>2)];
 var $24=HEAP32[(($12)>>2)];
 var $25=($22|0)<($24|0);
 if($25){label=6;break;}else{var $35=$24;label=8;break;}
 case 6: 
 var $26=HEAP32[(($13)>>2)];
 var $27=(($26+($storemerge12<<2))|0);
 var $28=HEAP32[(($27)>>2)];
 var $29=(($28+($22<<2))|0);
 var $minx_01_i=$22;var $ptr_02_i=$29;label=7;break;
 case 7: 
 var $ptr_02_i;
 var $minx_01_i;
 HEAP32[(($ptr_02_i)>>2)]=$23;
 var $31=((($minx_01_i)+(1))|0);
 var $32=(($ptr_02_i+4)|0);
 var $33=HEAP32[(($12)>>2)];
 var $34=($31|0)<($33|0);
 if($34){var $minx_01_i=$31;var $ptr_02_i=$32;label=7;break;}else{var $35=$33;label=8;break;}
 case 8: 
 var $35;
 var $36=HEAP32[(($14)>>2)];
 var $37=(($36+($storemerge12<<2))|0);
 var $38=HEAP32[(($37)>>2)];
 var $39=($22|0)<($38|0);
 var $40=($38|0)==-1;
 var $or_cond_i=$39|$40;
 if($or_cond_i){label=9;break;}else{var $16=$35;label=4;break;}
 case 9: 
 HEAP32[(($37)>>2)]=$22;
 var $_pre_i=HEAP32[(($12)>>2)];
 var $16=$_pre_i;label=4;break;
 case 10: 
 HEAP32[(($1)>>2)]=$2;
 HEAP32[(($3)>>2)]=$4;
 label=11;break;
 case 11: 
 var $43=(($win+32)|0);
 var $44=HEAP32[(($43)>>2)];
 var $45=(($win+12)|0);
 var $46=HEAP32[(($45)>>2)];
 var $47=($4|0)<($46|0);
 if($47){label=12;break;}else{var $58=$46;label=14;break;}
 case 12: 
 var $48=(($win+44)|0);
 var $49=HEAP32[(($48)>>2)];
 var $50=(($49+($2<<2))|0);
 var $51=HEAP32[(($50)>>2)];
 var $52=(($51+($4<<2))|0);
 var $minx_01_i3=$4;var $ptr_02_i2=$52;label=13;break;
 case 13: 
 var $ptr_02_i2;
 var $minx_01_i3;
 HEAP32[(($ptr_02_i2)>>2)]=$44;
 var $54=((($minx_01_i3)+(1))|0);
 var $55=(($ptr_02_i2+4)|0);
 var $56=HEAP32[(($45)>>2)];
 var $57=($54|0)<($56|0);
 if($57){var $minx_01_i3=$54;var $ptr_02_i2=$55;label=13;break;}else{var $58=$56;label=14;break;}
 case 14: 
 var $58;
 var $59=(($win+48)|0);
 var $60=HEAP32[(($59)>>2)];
 var $61=(($60+($2<<2))|0);
 var $62=HEAP32[(($61)>>2)];
 var $63=($4|0)<($62|0);
 var $64=($62|0)==-1;
 var $or_cond_i4=$63|$64;
 if($or_cond_i4){label=15;break;}else{var $66=$58;label=16;break;}
 case 15: 
 HEAP32[(($61)>>2)]=$4;
 var $_pre_i6=HEAP32[(($45)>>2)];
 var $66=$_pre_i6;label=16;break;
 case 16: 
 var $66;
 var $67=((($66)-(1))|0);
 var $68=(($win+52)|0);
 var $69=HEAP32[(($68)>>2)];
 var $70=(($69+($2<<2))|0);
 HEAP32[(($70)>>2)]=$67;
 _PDC_sync($win);
 _PDC_sync($win);
 var $_0=0;label=17;break;
 case 17: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _werase($win){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=_wmove($win,0,0);
 var $2=($1|0)==-1;
 if($2){var $_0=-1;label=3;break;}else{label=2;break;}
 case 2: 
 var $4=_wclrtobot($win);
 var $_0=$4;label=3;break;
 case 3: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function __copy_win($src_w,$dst_w,$src_tr,$src_tc,$src_br,$src_bc,$dst_tr,$dst_tc,$overlay){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=((($src_bc)-($src_tc))|0);
 var $2=((($src_br)-($src_tr))|0);
 var $3=($src_w|0)==0;
 var $4=($dst_w|0)==0;
 var $or_cond=$3|$4;
 if($or_cond){var $_0=-1;label=25;break;}else{label=2;break;}
 case 2: 
 var $6=(($dst_w+48)|0);
 var $7=HEAP32[(($6)>>2)];
 var $8=(($dst_w+52)|0);
 var $9=HEAP32[(($8)>>2)];
 var $10=($dst_tr|0)>0;
 if($10){label=3;break;}else{var $minchng_0_lcssa=$7;var $maxchng_0_lcssa=$9;label=4;break;}
 case 3: 
 var $scevgep=(($9+($dst_tr<<2))|0);
 var $scevgep34=(($7+($dst_tr<<2))|0);
 var $minchng_0_lcssa=$scevgep34;var $maxchng_0_lcssa=$scevgep;label=4;break;
 case 4: 
 var $maxchng_0_lcssa;
 var $minchng_0_lcssa;
 var $11=($2|0)>0;
 if($11){label=5;break;}else{var $_0=0;label=25;break;}
 case 5: 
 var $12=(($src_w+44)|0);
 var $13=(($dst_w+44)|0);
 var $14=($1|0)>0;
 var $15=(($overlay<<24)>>24)==0;
 if($14){var $line_08_us=0;var $minchng_19_us=$minchng_0_lcssa;var $maxchng_110_us=$maxchng_0_lcssa;var $lc_012_us=0;label=18;break;}else{var $line_08=0;var $minchng_19=$minchng_0_lcssa;var $maxchng_110=$maxchng_0_lcssa;label=22;break;}
 case 6: 
 var $split_us;
 var $split7_us;
 var $16=HEAP32[(($minchng_19_us)>>2)];
 var $17=($16|0)==-1;
 if($17){label=12;break;}else{label=7;break;}
 case 7: 
 var $19=($split7_us|0)==-1;
 if($19){label=13;break;}else{label=8;break;}
 case 8: 
 var $21=($split7_us|0)<($16|0);
 if($21){label=9;break;}else{label=10;break;}
 case 9: 
 HEAP32[(($minchng_19_us)>>2)]=$split7_us;
 label=10;break;
 case 10: 
 var $24=HEAP32[(($maxchng_110_us)>>2)];
 var $25=($split_us|0)>($24|0);
 if($25){label=11;break;}else{label=13;break;}
 case 11: 
 HEAP32[(($maxchng_110_us)>>2)]=$split_us;
 label=13;break;
 case 12: 
 HEAP32[(($minchng_19_us)>>2)]=$split7_us;
 HEAP32[(($maxchng_110_us)>>2)]=$split_us;
 label=13;break;
 case 13: 
 var $29=((($line_08_us)+(1))|0);
 var $30=($29|0)<($2|0);
 if($30){label=14;break;}else{var $_0=0;label=25;break;}
 case 14: 
 var $31=(($maxchng_110_us+4)|0);
 var $32=(($minchng_19_us+4)|0);
 var $line_08_us=$29;var $minchng_19_us=$32;var $maxchng_110_us=$31;var $lc_012_us=$split_us;label=18;break;
 case 15: 
 var $col_06_us14;
 var $lc_15_us15;
 var $w2ptr_04_us16;
 var $w1ptr_03_us17;
 var $fc_02_us18;
 var $33=HEAP32[(($w1ptr_03_us17)>>2)];
 var $34=HEAP32[(($w2ptr_04_us16)>>2)];
 var $35=($33|0)==($34|0);
 var $36=$33&65535;
 var $37=($36|0)==32;
 var $or_cond37=$35|$37;
 if($or_cond37){var $lc_2_us21=$lc_15_us15;var $fc_2_us20=$fc_02_us18;label=17;break;}else{label=16;break;}
 case 16: 
 HEAP32[(($w2ptr_04_us16)>>2)]=$33;
 var $39=($fc_02_us18|0)==-1;
 var $40=((($col_06_us14)+($dst_tc))|0);
 var $_fc_0_us19=($39?$40:$fc_02_us18);
 var $lc_2_us21=$40;var $fc_2_us20=$_fc_0_us19;label=17;break;
 case 17: 
 var $fc_2_us20;
 var $lc_2_us21;
 var $42=(($w1ptr_03_us17+4)|0);
 var $43=(($w2ptr_04_us16+4)|0);
 var $44=((($col_06_us14)+(1))|0);
 var $45=($44|0)<($1|0);
 if($45){var $fc_02_us18=$fc_2_us20;var $w1ptr_03_us17=$42;var $w2ptr_04_us16=$43;var $lc_15_us15=$lc_2_us21;var $col_06_us14=$44;label=15;break;}else{var $split7_us=$fc_2_us20;var $split_us=$lc_2_us21;label=6;break;}
 case 18: 
 var $lc_012_us;
 var $maxchng_110_us;
 var $minchng_19_us;
 var $line_08_us;
 var $46=((($line_08_us)+($src_tr))|0);
 var $47=HEAP32[(($12)>>2)];
 var $48=(($47+($46<<2))|0);
 var $49=HEAP32[(($48)>>2)];
 var $50=(($49+($src_tc<<2))|0);
 var $51=((($line_08_us)+($dst_tr))|0);
 var $52=HEAP32[(($13)>>2)];
 var $53=(($52+($51<<2))|0);
 var $54=HEAP32[(($53)>>2)];
 var $55=(($54+($dst_tc<<2))|0);
 if($15){var $fc_02_us_us=-1;var $w1ptr_03_us_us=$50;var $w2ptr_04_us_us=$55;var $lc_15_us_us=$lc_012_us;var $col_06_us_us=0;label=19;break;}else{var $fc_02_us18=-1;var $w1ptr_03_us17=$50;var $w2ptr_04_us16=$55;var $lc_15_us15=$lc_012_us;var $col_06_us14=0;label=15;break;}
 case 19: 
 var $col_06_us_us;
 var $lc_15_us_us;
 var $w2ptr_04_us_us;
 var $w1ptr_03_us_us;
 var $fc_02_us_us;
 var $56=HEAP32[(($w1ptr_03_us_us)>>2)];
 var $57=HEAP32[(($w2ptr_04_us_us)>>2)];
 var $58=($56|0)==($57|0);
 if($58){var $lc_2_us_us=$lc_15_us_us;var $fc_2_us_us=$fc_02_us_us;label=21;break;}else{label=20;break;}
 case 20: 
 HEAP32[(($w2ptr_04_us_us)>>2)]=$56;
 var $60=($fc_02_us_us|0)==-1;
 var $61=((($col_06_us_us)+($dst_tc))|0);
 var $_fc_0_us_us=($60?$61:$fc_02_us_us);
 var $lc_2_us_us=$61;var $fc_2_us_us=$_fc_0_us_us;label=21;break;
 case 21: 
 var $fc_2_us_us;
 var $lc_2_us_us;
 var $63=(($w1ptr_03_us_us+4)|0);
 var $64=(($w2ptr_04_us_us+4)|0);
 var $65=((($col_06_us_us)+(1))|0);
 var $66=($65|0)<($1|0);
 if($66){var $fc_02_us_us=$fc_2_us_us;var $w1ptr_03_us_us=$63;var $w2ptr_04_us_us=$64;var $lc_15_us_us=$lc_2_us_us;var $col_06_us_us=$65;label=19;break;}else{var $split7_us=$fc_2_us_us;var $split_us=$lc_2_us_us;label=6;break;}
 case 22: 
 var $maxchng_110;
 var $minchng_19;
 var $line_08;
 var $68=HEAP32[(($minchng_19)>>2)];
 var $69=($68|0)==-1;
 if($69){label=23;break;}else{label=24;break;}
 case 23: 
 HEAP32[(($minchng_19)>>2)]=-1;
 HEAP32[(($maxchng_110)>>2)]=0;
 label=24;break;
 case 24: 
 var $72=(($minchng_19+4)|0);
 var $73=(($maxchng_110+4)|0);
 var $74=((($line_08)+(1))|0);
 var $75=($74|0)<($2|0);
 if($75){var $line_08=$74;var $minchng_19=$72;var $maxchng_110=$73;label=22;break;}else{var $_0=0;label=25;break;}
 case 25: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _copywin($src_w,$dst_w,$src_tr,$src_tc,$dst_tr,$dst_tc,$dst_br,$dst_bc,$overlay){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($src_w|0)==0;
 var $2=($dst_w|0)==0;
 var $or_cond=$1|$2;
 var $3=HEAP32[((12904)>>2)];
 var $4=($3|0)==($dst_w|0);
 var $or_cond2=$or_cond|$4;
 if($or_cond2){var $_0=-1;label=5;break;}else{label=2;break;}
 case 2: 
 var $6=(($dst_w+8)|0);
 var $7=HEAP32[(($6)>>2)];
 var $8=($7|0)<($dst_br|0);
 if($8){var $_0=-1;label=5;break;}else{label=3;break;}
 case 3: 
 var $10=(($dst_w+12)|0);
 var $11=HEAP32[(($10)>>2)];
 var $12=($11|0)<($dst_bc|0);
 var $13=($dst_tr|0)<0;
 var $or_cond3=$12|$13;
 var $14=($dst_tc|0)<0;
 var $or_cond4=$or_cond3|$14;
 if($or_cond4){var $_0=-1;label=5;break;}else{label=4;break;}
 case 4: 
 var $16=(($src_w+8)|0);
 var $17=HEAP32[(($16)>>2)];
 var $18=((($17)-($src_tr))|0);
 var $19=(($src_w+12)|0);
 var $20=HEAP32[(($19)>>2)];
 var $21=((($20)-($src_tc))|0);
 var $22=((($dst_br)-($dst_tr))|0);
 var $23=((($22)+(1))|0);
 var $24=((($dst_bc)-($dst_tc))|0);
 var $25=((($24)+(1))|0);
 var $26=($18|0)<($23|0);
 var $27=($26?$18:$23);
 var $28=($21|0)<($25|0);
 var $29=($28?$21:$25);
 var $30=((($27)+($src_tr))|0);
 var $31=((($29)+($src_tc))|0);
 var $32=(($overlay)&255);
 var $33=__copy_win($src_w,$dst_w,$src_tr,$src_tc,$30,$31,$dst_tr,$dst_tc,$32);
 var $_0=$33;label=5;break;
 case 5: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _subpad($orig,$nlines,$ncols,$begy,$begx){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($orig|0)==0;
 if($1){var $_0=0;label=16;break;}else{label=2;break;}
 case 2: 
 var $3=(($orig+24)|0);
 var $4=HEAP32[(($3)>>2)];
 var $5=$4&16;
 var $6=($5|0)==0;
 if($6){var $_0=0;label=16;break;}else{label=3;break;}
 case 3: 
 var $8=(($orig+16)|0);
 var $9=HEAP32[(($8)>>2)];
 var $10=($9|0)>($begy|0);
 if($10){var $_0=0;label=16;break;}else{label=4;break;}
 case 4: 
 var $12=(($orig+20)|0);
 var $13=HEAP32[(($12)>>2)];
 var $14=($13|0)>($begx|0);
 if($14){var $_0=0;label=16;break;}else{label=5;break;}
 case 5: 
 var $16=((($begy)+($nlines))|0);
 var $17=(($orig+8)|0);
 var $18=HEAP32[(($17)>>2)];
 var $19=((($18)+($9))|0);
 var $20=($16|0)>($19|0);
 if($20){var $_0=0;label=16;break;}else{label=6;break;}
 case 6: 
 var $22=((($begx)+($ncols))|0);
 var $23=(($orig+12)|0);
 var $24=HEAP32[(($23)>>2)];
 var $25=((($24)+($13))|0);
 var $26=($22|0)>($25|0);
 if($26){var $_0=0;label=16;break;}else{label=7;break;}
 case 7: 
 var $28=($nlines|0)==0;
 if($28){label=8;break;}else{var $_01=$nlines;label=9;break;}
 case 8: 
 var $30=$begy^-1;
 var $31=((($18)+($30))|0);
 var $_01=$31;label=9;break;
 case 9: 
 var $_01;
 var $33=($ncols|0)==0;
 if($33){label=10;break;}else{var $_02=$ncols;label=11;break;}
 case 10: 
 var $35=$begx^-1;
 var $36=((($24)+($35))|0);
 var $_02=$36;label=11;break;
 case 11: 
 var $_02;
 var $38=_PDC_makenew($_01,$_02,$begy,$begx);
 var $39=($38|0)==0;
 if($39){var $_0=0;label=16;break;}else{label=12;break;}
 case 12: 
 var $41=(($orig+28)|0);
 var $42=HEAP32[(($41)>>2)];
 var $43=(($38+28)|0);
 HEAP32[(($43)>>2)]=$42;
 var $44=(($orig+37)|0);
 var $45=HEAP8[($44)];
 var $46=(($38+37)|0);
 HEAP8[($46)]=$45;
 var $47=(($orig+38)|0);
 var $48=HEAP8[($47)];
 var $49=(($38+38)|0);
 HEAP8[($49)]=$48;
 var $50=(($orig+39)|0);
 var $51=HEAP8[($50)];
 var $52=(($38+39)|0);
 HEAP8[($52)]=$51;
 var $53=(($orig+42)|0);
 var $54=HEAP8[($53)];
 var $55=(($38+42)|0);
 HEAP8[($55)]=$54;
 var $56=(($38+76)|0);
 HEAP32[(($56)>>2)]=$orig;
 var $57=($_01|0)>0;
 if($57){label=13;break;}else{label=15;break;}
 case 13: 
 var $58=(($orig+44)|0);
 var $59=(($38+44)|0);
 var $i_03=0;var $j_04=$begy;label=14;break;
 case 14: 
 var $j_04;
 var $i_03;
 var $61=((($j_04)+(1))|0);
 var $62=HEAP32[(($58)>>2)];
 var $63=(($62+($j_04<<2))|0);
 var $64=HEAP32[(($63)>>2)];
 var $65=(($64+($begx<<2))|0);
 var $66=HEAP32[(($59)>>2)];
 var $67=(($66+($i_03<<2))|0);
 HEAP32[(($67)>>2)]=$65;
 var $68=((($i_03)+(1))|0);
 var $69=($68|0)<($_01|0);
 if($69){var $i_03=$68;var $j_04=$61;label=14;break;}else{label=15;break;}
 case 15: 
 var $70=(($38+24)|0);
 HEAP32[(($70)>>2)]=32;
 var $71=HEAP32[((15776)>>2)];
 var $72=($71|0)<($_01|0);
 var $73=($72?$71:$_01);
 var $74=((($73)-(1))|0);
 HEAP32[((12152)>>2)]=$74;
 var $75=HEAP32[((15784)>>2)];
 var $76=($75|0)<($_02|0);
 var $77=($76?$75:$_02);
 var $78=((($77)-(1))|0);
 HEAP32[((12160)>>2)]=$78;
 var $_0=$38;label=16;break;
 case 16: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _wscrl($win,$n){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($win|0)==0;
 if($1){var $_0=-1;label=17;break;}else{label=2;break;}
 case 2: 
 var $3=(($win+38)|0);
 var $4=HEAP8[($3)];
 var $5=(($4<<24)>>24)==0;
 var $6=($n|0)==0;
 var $or_cond=$5|$6;
 if($or_cond){var $_0=-1;label=17;break;}else{label=3;break;}
 case 3: 
 var $8=(($win+32)|0);
 var $9=HEAP32[(($8)>>2)];
 var $10=($n|0)>0;
 if($10){label=4;break;}else{label=5;break;}
 case 4: 
 var $12=(($win+56)|0);
 var $13=(($win+60)|0);
 var $end_0_in=$13;var $start_0_in=$12;var $dir_0=1;label=6;break;
 case 5: 
 var $15=(($win+60)|0);
 var $16=(($win+56)|0);
 var $end_0_in=$16;var $start_0_in=$15;var $dir_0=-1;label=6;break;
 case 6: 
 var $dir_0;
 var $start_0_in;
 var $end_0_in;
 var $end_0=HEAP32[(($end_0_in)>>2)];
 var $start_0=HEAP32[(($start_0_in)>>2)];
 var $18=(Math_imul($dir_0,$n)|0);
 var $19=($18|0)>0;
 if($19){label=7;break;}else{label=16;break;}
 case 7: 
 var $20=(($win+44)|0);
 var $21=($start_0|0)==($end_0|0);
 var $22=(($win+12)|0);
 if($21){var $l_07_us=0;label=8;break;}else{var $l_07=0;label=11;break;}
 case 8: 
 var $l_07_us;
 var $24=HEAP32[(($20)>>2)];
 var $25=(($24+($end_0<<2))|0);
 var $26=HEAP32[(($25)>>2)];
 var $27=HEAP32[(($22)>>2)];
 var $28=($27|0)>0;
 if($28){var $i_12_us=0;var $temp_03_us=$26;label=10;break;}else{label=9;break;}
 case 9: 
 var $29=((($l_07_us)+(1))|0);
 var $30=($29|0)<($18|0);
 if($30){var $l_07_us=$29;label=8;break;}else{label=16;break;}
 case 10: 
 var $temp_03_us;
 var $i_12_us;
 var $31=(($temp_03_us+4)|0);
 HEAP32[(($temp_03_us)>>2)]=$9;
 var $32=((($i_12_us)+(1))|0);
 var $33=HEAP32[(($22)>>2)];
 var $34=($32|0)<($33|0);
 if($34){var $i_12_us=$32;var $temp_03_us=$31;label=10;break;}else{label=9;break;}
 case 11: 
 var $l_07;
 var $35=HEAP32[(($20)>>2)];
 var $36=(($35+($start_0<<2))|0);
 var $37=HEAP32[(($36)>>2)];
 var $i_01=$start_0;var $38=$35;label=12;break;
 case 12: 
 var $38;
 var $i_01;
 var $39=((($i_01)+($dir_0))|0);
 var $40=(($38+($39<<2))|0);
 var $41=HEAP32[(($40)>>2)];
 var $42=(($38+($i_01<<2))|0);
 HEAP32[(($42)>>2)]=$41;
 var $43=($39|0)==($end_0|0);
 var $_pre=HEAP32[(($20)>>2)];
 if($43){label=13;break;}else{var $i_01=$39;var $38=$_pre;label=12;break;}
 case 13: 
 var $45=(($_pre+($end_0<<2))|0);
 HEAP32[(($45)>>2)]=$37;
 var $46=HEAP32[(($22)>>2)];
 var $47=($46|0)>0;
 if($47){var $i_12=0;var $temp_03=$37;label=14;break;}else{label=15;break;}
 case 14: 
 var $temp_03;
 var $i_12;
 var $48=(($temp_03+4)|0);
 HEAP32[(($temp_03)>>2)]=$9;
 var $49=((($i_12)+(1))|0);
 var $50=HEAP32[(($22)>>2)];
 var $51=($49|0)<($50|0);
 if($51){var $i_12=$49;var $temp_03=$48;label=14;break;}else{label=15;break;}
 case 15: 
 var $52=((($l_07)+(1))|0);
 var $53=($52|0)<($18|0);
 if($53){var $l_07=$52;label=11;break;}else{label=16;break;}
 case 16: 
 var $54=(($win+56)|0);
 var $55=HEAP32[(($54)>>2)];
 var $56=(($win+60)|0);
 var $57=HEAP32[(($56)>>2)];
 var $58=(((1)-($55))|0);
 var $59=((($58)+($57))|0);
 var $60=_touchline($win,$55,$59);
 _PDC_sync($win);
 var $_0=0;label=17;break;
 case 17: 
 var $_0;
 return $_0;
  default: assert(0, "bad label: " + label);
 }

}


function _malloc($bytes){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($bytes>>>0)<245;
 if($1){label=2;break;}else{label=78;break;}
 case 2: 
 var $3=($bytes>>>0)<11;
 if($3){var $8=16;label=4;break;}else{label=3;break;}
 case 3: 
 var $5=((($bytes)+(11))|0);
 var $6=$5&-8;
 var $8=$6;label=4;break;
 case 4: 
 var $8;
 var $9=$8>>>3;
 var $10=HEAP32[((15272)>>2)];
 var $11=$10>>>($9>>>0);
 var $12=$11&3;
 var $13=($12|0)==0;
 if($13){label=12;break;}else{label=5;break;}
 case 5: 
 var $15=$11&1;
 var $16=$15^1;
 var $17=((($16)+($9))|0);
 var $18=$17<<1;
 var $19=((15312+($18<<2))|0);
 var $20=$19;
 var $_sum11=((($18)+(2))|0);
 var $21=((15312+($_sum11<<2))|0);
 var $22=HEAP32[(($21)>>2)];
 var $23=(($22+8)|0);
 var $24=HEAP32[(($23)>>2)];
 var $25=($20|0)==($24|0);
 if($25){label=6;break;}else{label=7;break;}
 case 6: 
 var $27=1<<$17;
 var $28=$27^-1;
 var $29=$10&$28;
 HEAP32[((15272)>>2)]=$29;
 label=11;break;
 case 7: 
 var $31=$24;
 var $32=HEAP32[((15288)>>2)];
 var $33=($31>>>0)<($32>>>0);
 if($33){label=10;break;}else{label=8;break;}
 case 8: 
 var $35=(($24+12)|0);
 var $36=HEAP32[(($35)>>2)];
 var $37=($36|0)==($22|0);
 if($37){label=9;break;}else{label=10;break;}
 case 9: 
 HEAP32[(($35)>>2)]=$20;
 HEAP32[(($21)>>2)]=$24;
 label=11;break;
 case 10: 
 _abort();
 throw "Reached an unreachable!";
 case 11: 
 var $40=$17<<3;
 var $41=$40|3;
 var $42=(($22+4)|0);
 HEAP32[(($42)>>2)]=$41;
 var $43=$22;
 var $_sum1314=$40|4;
 var $44=(($43+$_sum1314)|0);
 var $45=$44;
 var $46=HEAP32[(($45)>>2)];
 var $47=$46|1;
 HEAP32[(($45)>>2)]=$47;
 var $48=$23;
 var $mem_0=$48;label=344;break;
 case 12: 
 var $50=HEAP32[((15280)>>2)];
 var $51=($8>>>0)>($50>>>0);
 if($51){label=13;break;}else{var $nb_0=$8;label=161;break;}
 case 13: 
 var $53=($11|0)==0;
 if($53){label=27;break;}else{label=14;break;}
 case 14: 
 var $55=$11<<$9;
 var $56=2<<$9;
 var $57=(((-$56))|0);
 var $58=$56|$57;
 var $59=$55&$58;
 var $60=(((-$59))|0);
 var $61=$59&$60;
 var $62=((($61)-(1))|0);
 var $63=$62>>>12;
 var $64=$63&16;
 var $65=$62>>>($64>>>0);
 var $66=$65>>>5;
 var $67=$66&8;
 var $68=$67|$64;
 var $69=$65>>>($67>>>0);
 var $70=$69>>>2;
 var $71=$70&4;
 var $72=$68|$71;
 var $73=$69>>>($71>>>0);
 var $74=$73>>>1;
 var $75=$74&2;
 var $76=$72|$75;
 var $77=$73>>>($75>>>0);
 var $78=$77>>>1;
 var $79=$78&1;
 var $80=$76|$79;
 var $81=$77>>>($79>>>0);
 var $82=((($80)+($81))|0);
 var $83=$82<<1;
 var $84=((15312+($83<<2))|0);
 var $85=$84;
 var $_sum4=((($83)+(2))|0);
 var $86=((15312+($_sum4<<2))|0);
 var $87=HEAP32[(($86)>>2)];
 var $88=(($87+8)|0);
 var $89=HEAP32[(($88)>>2)];
 var $90=($85|0)==($89|0);
 if($90){label=15;break;}else{label=16;break;}
 case 15: 
 var $92=1<<$82;
 var $93=$92^-1;
 var $94=$10&$93;
 HEAP32[((15272)>>2)]=$94;
 label=20;break;
 case 16: 
 var $96=$89;
 var $97=HEAP32[((15288)>>2)];
 var $98=($96>>>0)<($97>>>0);
 if($98){label=19;break;}else{label=17;break;}
 case 17: 
 var $100=(($89+12)|0);
 var $101=HEAP32[(($100)>>2)];
 var $102=($101|0)==($87|0);
 if($102){label=18;break;}else{label=19;break;}
 case 18: 
 HEAP32[(($100)>>2)]=$85;
 HEAP32[(($86)>>2)]=$89;
 label=20;break;
 case 19: 
 _abort();
 throw "Reached an unreachable!";
 case 20: 
 var $105=$82<<3;
 var $106=((($105)-($8))|0);
 var $107=$8|3;
 var $108=(($87+4)|0);
 HEAP32[(($108)>>2)]=$107;
 var $109=$87;
 var $110=(($109+$8)|0);
 var $111=$110;
 var $112=$106|1;
 var $_sum67=$8|4;
 var $113=(($109+$_sum67)|0);
 var $114=$113;
 HEAP32[(($114)>>2)]=$112;
 var $115=(($109+$105)|0);
 var $116=$115;
 HEAP32[(($116)>>2)]=$106;
 var $117=HEAP32[((15280)>>2)];
 var $118=($117|0)==0;
 if($118){label=26;break;}else{label=21;break;}
 case 21: 
 var $120=HEAP32[((15292)>>2)];
 var $121=$117>>>3;
 var $122=$121<<1;
 var $123=((15312+($122<<2))|0);
 var $124=$123;
 var $125=HEAP32[((15272)>>2)];
 var $126=1<<$121;
 var $127=$125&$126;
 var $128=($127|0)==0;
 if($128){label=22;break;}else{label=23;break;}
 case 22: 
 var $130=$125|$126;
 HEAP32[((15272)>>2)]=$130;
 var $_sum9_pre=((($122)+(2))|0);
 var $_pre=((15312+($_sum9_pre<<2))|0);
 var $F4_0=$124;var $_pre_phi=$_pre;label=25;break;
 case 23: 
 var $_sum10=((($122)+(2))|0);
 var $132=((15312+($_sum10<<2))|0);
 var $133=HEAP32[(($132)>>2)];
 var $134=$133;
 var $135=HEAP32[((15288)>>2)];
 var $136=($134>>>0)<($135>>>0);
 if($136){label=24;break;}else{var $F4_0=$133;var $_pre_phi=$132;label=25;break;}
 case 24: 
 _abort();
 throw "Reached an unreachable!";
 case 25: 
 var $_pre_phi;
 var $F4_0;
 HEAP32[(($_pre_phi)>>2)]=$120;
 var $139=(($F4_0+12)|0);
 HEAP32[(($139)>>2)]=$120;
 var $140=(($120+8)|0);
 HEAP32[(($140)>>2)]=$F4_0;
 var $141=(($120+12)|0);
 HEAP32[(($141)>>2)]=$124;
 label=26;break;
 case 26: 
 HEAP32[((15280)>>2)]=$106;
 HEAP32[((15292)>>2)]=$111;
 var $143=$88;
 var $mem_0=$143;label=344;break;
 case 27: 
 var $145=HEAP32[((15276)>>2)];
 var $146=($145|0)==0;
 if($146){var $nb_0=$8;label=161;break;}else{label=28;break;}
 case 28: 
 var $148=(((-$145))|0);
 var $149=$145&$148;
 var $150=((($149)-(1))|0);
 var $151=$150>>>12;
 var $152=$151&16;
 var $153=$150>>>($152>>>0);
 var $154=$153>>>5;
 var $155=$154&8;
 var $156=$155|$152;
 var $157=$153>>>($155>>>0);
 var $158=$157>>>2;
 var $159=$158&4;
 var $160=$156|$159;
 var $161=$157>>>($159>>>0);
 var $162=$161>>>1;
 var $163=$162&2;
 var $164=$160|$163;
 var $165=$161>>>($163>>>0);
 var $166=$165>>>1;
 var $167=$166&1;
 var $168=$164|$167;
 var $169=$165>>>($167>>>0);
 var $170=((($168)+($169))|0);
 var $171=((15576+($170<<2))|0);
 var $172=HEAP32[(($171)>>2)];
 var $173=(($172+4)|0);
 var $174=HEAP32[(($173)>>2)];
 var $175=$174&-8;
 var $176=((($175)-($8))|0);
 var $t_0_i=$172;var $v_0_i=$172;var $rsize_0_i=$176;label=29;break;
 case 29: 
 var $rsize_0_i;
 var $v_0_i;
 var $t_0_i;
 var $178=(($t_0_i+16)|0);
 var $179=HEAP32[(($178)>>2)];
 var $180=($179|0)==0;
 if($180){label=30;break;}else{var $185=$179;label=31;break;}
 case 30: 
 var $182=(($t_0_i+20)|0);
 var $183=HEAP32[(($182)>>2)];
 var $184=($183|0)==0;
 if($184){label=32;break;}else{var $185=$183;label=31;break;}
 case 31: 
 var $185;
 var $186=(($185+4)|0);
 var $187=HEAP32[(($186)>>2)];
 var $188=$187&-8;
 var $189=((($188)-($8))|0);
 var $190=($189>>>0)<($rsize_0_i>>>0);
 var $_rsize_0_i=($190?$189:$rsize_0_i);
 var $_v_0_i=($190?$185:$v_0_i);
 var $t_0_i=$185;var $v_0_i=$_v_0_i;var $rsize_0_i=$_rsize_0_i;label=29;break;
 case 32: 
 var $192=$v_0_i;
 var $193=HEAP32[((15288)>>2)];
 var $194=($192>>>0)<($193>>>0);
 if($194){label=76;break;}else{label=33;break;}
 case 33: 
 var $196=(($192+$8)|0);
 var $197=$196;
 var $198=($192>>>0)<($196>>>0);
 if($198){label=34;break;}else{label=76;break;}
 case 34: 
 var $200=(($v_0_i+24)|0);
 var $201=HEAP32[(($200)>>2)];
 var $202=(($v_0_i+12)|0);
 var $203=HEAP32[(($202)>>2)];
 var $204=($203|0)==($v_0_i|0);
 if($204){label=40;break;}else{label=35;break;}
 case 35: 
 var $206=(($v_0_i+8)|0);
 var $207=HEAP32[(($206)>>2)];
 var $208=$207;
 var $209=($208>>>0)<($193>>>0);
 if($209){label=39;break;}else{label=36;break;}
 case 36: 
 var $211=(($207+12)|0);
 var $212=HEAP32[(($211)>>2)];
 var $213=($212|0)==($v_0_i|0);
 if($213){label=37;break;}else{label=39;break;}
 case 37: 
 var $215=(($203+8)|0);
 var $216=HEAP32[(($215)>>2)];
 var $217=($216|0)==($v_0_i|0);
 if($217){label=38;break;}else{label=39;break;}
 case 38: 
 HEAP32[(($211)>>2)]=$203;
 HEAP32[(($215)>>2)]=$207;
 var $R_1_i=$203;label=47;break;
 case 39: 
 _abort();
 throw "Reached an unreachable!";
 case 40: 
 var $220=(($v_0_i+20)|0);
 var $221=HEAP32[(($220)>>2)];
 var $222=($221|0)==0;
 if($222){label=41;break;}else{var $R_0_i=$221;var $RP_0_i=$220;label=42;break;}
 case 41: 
 var $224=(($v_0_i+16)|0);
 var $225=HEAP32[(($224)>>2)];
 var $226=($225|0)==0;
 if($226){var $R_1_i=0;label=47;break;}else{var $R_0_i=$225;var $RP_0_i=$224;label=42;break;}
 case 42: 
 var $RP_0_i;
 var $R_0_i;
 var $227=(($R_0_i+20)|0);
 var $228=HEAP32[(($227)>>2)];
 var $229=($228|0)==0;
 if($229){label=43;break;}else{var $R_0_i=$228;var $RP_0_i=$227;label=42;break;}
 case 43: 
 var $231=(($R_0_i+16)|0);
 var $232=HEAP32[(($231)>>2)];
 var $233=($232|0)==0;
 if($233){label=44;break;}else{var $R_0_i=$232;var $RP_0_i=$231;label=42;break;}
 case 44: 
 var $235=$RP_0_i;
 var $236=($235>>>0)<($193>>>0);
 if($236){label=46;break;}else{label=45;break;}
 case 45: 
 HEAP32[(($RP_0_i)>>2)]=0;
 var $R_1_i=$R_0_i;label=47;break;
 case 46: 
 _abort();
 throw "Reached an unreachable!";
 case 47: 
 var $R_1_i;
 var $240=($201|0)==0;
 if($240){label=67;break;}else{label=48;break;}
 case 48: 
 var $242=(($v_0_i+28)|0);
 var $243=HEAP32[(($242)>>2)];
 var $244=((15576+($243<<2))|0);
 var $245=HEAP32[(($244)>>2)];
 var $246=($v_0_i|0)==($245|0);
 if($246){label=49;break;}else{label=51;break;}
 case 49: 
 HEAP32[(($244)>>2)]=$R_1_i;
 var $cond_i=($R_1_i|0)==0;
 if($cond_i){label=50;break;}else{label=57;break;}
 case 50: 
 var $248=HEAP32[(($242)>>2)];
 var $249=1<<$248;
 var $250=$249^-1;
 var $251=HEAP32[((15276)>>2)];
 var $252=$251&$250;
 HEAP32[((15276)>>2)]=$252;
 label=67;break;
 case 51: 
 var $254=$201;
 var $255=HEAP32[((15288)>>2)];
 var $256=($254>>>0)<($255>>>0);
 if($256){label=55;break;}else{label=52;break;}
 case 52: 
 var $258=(($201+16)|0);
 var $259=HEAP32[(($258)>>2)];
 var $260=($259|0)==($v_0_i|0);
 if($260){label=53;break;}else{label=54;break;}
 case 53: 
 HEAP32[(($258)>>2)]=$R_1_i;
 label=56;break;
 case 54: 
 var $263=(($201+20)|0);
 HEAP32[(($263)>>2)]=$R_1_i;
 label=56;break;
 case 55: 
 _abort();
 throw "Reached an unreachable!";
 case 56: 
 var $266=($R_1_i|0)==0;
 if($266){label=67;break;}else{label=57;break;}
 case 57: 
 var $268=$R_1_i;
 var $269=HEAP32[((15288)>>2)];
 var $270=($268>>>0)<($269>>>0);
 if($270){label=66;break;}else{label=58;break;}
 case 58: 
 var $272=(($R_1_i+24)|0);
 HEAP32[(($272)>>2)]=$201;
 var $273=(($v_0_i+16)|0);
 var $274=HEAP32[(($273)>>2)];
 var $275=($274|0)==0;
 if($275){label=62;break;}else{label=59;break;}
 case 59: 
 var $277=$274;
 var $278=HEAP32[((15288)>>2)];
 var $279=($277>>>0)<($278>>>0);
 if($279){label=61;break;}else{label=60;break;}
 case 60: 
 var $281=(($R_1_i+16)|0);
 HEAP32[(($281)>>2)]=$274;
 var $282=(($274+24)|0);
 HEAP32[(($282)>>2)]=$R_1_i;
 label=62;break;
 case 61: 
 _abort();
 throw "Reached an unreachable!";
 case 62: 
 var $285=(($v_0_i+20)|0);
 var $286=HEAP32[(($285)>>2)];
 var $287=($286|0)==0;
 if($287){label=67;break;}else{label=63;break;}
 case 63: 
 var $289=$286;
 var $290=HEAP32[((15288)>>2)];
 var $291=($289>>>0)<($290>>>0);
 if($291){label=65;break;}else{label=64;break;}
 case 64: 
 var $293=(($R_1_i+20)|0);
 HEAP32[(($293)>>2)]=$286;
 var $294=(($286+24)|0);
 HEAP32[(($294)>>2)]=$R_1_i;
 label=67;break;
 case 65: 
 _abort();
 throw "Reached an unreachable!";
 case 66: 
 _abort();
 throw "Reached an unreachable!";
 case 67: 
 var $298=($rsize_0_i>>>0)<16;
 if($298){label=68;break;}else{label=69;break;}
 case 68: 
 var $300=((($rsize_0_i)+($8))|0);
 var $301=$300|3;
 var $302=(($v_0_i+4)|0);
 HEAP32[(($302)>>2)]=$301;
 var $_sum4_i=((($300)+(4))|0);
 var $303=(($192+$_sum4_i)|0);
 var $304=$303;
 var $305=HEAP32[(($304)>>2)];
 var $306=$305|1;
 HEAP32[(($304)>>2)]=$306;
 label=77;break;
 case 69: 
 var $308=$8|3;
 var $309=(($v_0_i+4)|0);
 HEAP32[(($309)>>2)]=$308;
 var $310=$rsize_0_i|1;
 var $_sum_i37=$8|4;
 var $311=(($192+$_sum_i37)|0);
 var $312=$311;
 HEAP32[(($312)>>2)]=$310;
 var $_sum1_i=((($rsize_0_i)+($8))|0);
 var $313=(($192+$_sum1_i)|0);
 var $314=$313;
 HEAP32[(($314)>>2)]=$rsize_0_i;
 var $315=HEAP32[((15280)>>2)];
 var $316=($315|0)==0;
 if($316){label=75;break;}else{label=70;break;}
 case 70: 
 var $318=HEAP32[((15292)>>2)];
 var $319=$315>>>3;
 var $320=$319<<1;
 var $321=((15312+($320<<2))|0);
 var $322=$321;
 var $323=HEAP32[((15272)>>2)];
 var $324=1<<$319;
 var $325=$323&$324;
 var $326=($325|0)==0;
 if($326){label=71;break;}else{label=72;break;}
 case 71: 
 var $328=$323|$324;
 HEAP32[((15272)>>2)]=$328;
 var $_sum2_pre_i=((($320)+(2))|0);
 var $_pre_i=((15312+($_sum2_pre_i<<2))|0);
 var $F1_0_i=$322;var $_pre_phi_i=$_pre_i;label=74;break;
 case 72: 
 var $_sum3_i=((($320)+(2))|0);
 var $330=((15312+($_sum3_i<<2))|0);
 var $331=HEAP32[(($330)>>2)];
 var $332=$331;
 var $333=HEAP32[((15288)>>2)];
 var $334=($332>>>0)<($333>>>0);
 if($334){label=73;break;}else{var $F1_0_i=$331;var $_pre_phi_i=$330;label=74;break;}
 case 73: 
 _abort();
 throw "Reached an unreachable!";
 case 74: 
 var $_pre_phi_i;
 var $F1_0_i;
 HEAP32[(($_pre_phi_i)>>2)]=$318;
 var $337=(($F1_0_i+12)|0);
 HEAP32[(($337)>>2)]=$318;
 var $338=(($318+8)|0);
 HEAP32[(($338)>>2)]=$F1_0_i;
 var $339=(($318+12)|0);
 HEAP32[(($339)>>2)]=$322;
 label=75;break;
 case 75: 
 HEAP32[((15280)>>2)]=$rsize_0_i;
 HEAP32[((15292)>>2)]=$197;
 label=77;break;
 case 76: 
 _abort();
 throw "Reached an unreachable!";
 case 77: 
 var $342=(($v_0_i+8)|0);
 var $343=$342;
 var $mem_0=$343;label=344;break;
 case 78: 
 var $345=($bytes>>>0)>4294967231;
 if($345){var $nb_0=-1;label=161;break;}else{label=79;break;}
 case 79: 
 var $347=((($bytes)+(11))|0);
 var $348=$347&-8;
 var $349=HEAP32[((15276)>>2)];
 var $350=($349|0)==0;
 if($350){var $nb_0=$348;label=161;break;}else{label=80;break;}
 case 80: 
 var $352=(((-$348))|0);
 var $353=$347>>>8;
 var $354=($353|0)==0;
 if($354){var $idx_0_i=0;label=83;break;}else{label=81;break;}
 case 81: 
 var $356=($348>>>0)>16777215;
 if($356){var $idx_0_i=31;label=83;break;}else{label=82;break;}
 case 82: 
 var $358=((($353)+(1048320))|0);
 var $359=$358>>>16;
 var $360=$359&8;
 var $361=$353<<$360;
 var $362=((($361)+(520192))|0);
 var $363=$362>>>16;
 var $364=$363&4;
 var $365=$364|$360;
 var $366=$361<<$364;
 var $367=((($366)+(245760))|0);
 var $368=$367>>>16;
 var $369=$368&2;
 var $370=$365|$369;
 var $371=(((14)-($370))|0);
 var $372=$366<<$369;
 var $373=$372>>>15;
 var $374=((($371)+($373))|0);
 var $375=$374<<1;
 var $376=((($374)+(7))|0);
 var $377=$348>>>($376>>>0);
 var $378=$377&1;
 var $379=$378|$375;
 var $idx_0_i=$379;label=83;break;
 case 83: 
 var $idx_0_i;
 var $381=((15576+($idx_0_i<<2))|0);
 var $382=HEAP32[(($381)>>2)];
 var $383=($382|0)==0;
 if($383){var $v_2_i=0;var $rsize_2_i=$352;var $t_1_i=0;label=90;break;}else{label=84;break;}
 case 84: 
 var $385=($idx_0_i|0)==31;
 if($385){var $390=0;label=86;break;}else{label=85;break;}
 case 85: 
 var $387=$idx_0_i>>>1;
 var $388=(((25)-($387))|0);
 var $390=$388;label=86;break;
 case 86: 
 var $390;
 var $391=$348<<$390;
 var $v_0_i18=0;var $rsize_0_i17=$352;var $t_0_i16=$382;var $sizebits_0_i=$391;var $rst_0_i=0;label=87;break;
 case 87: 
 var $rst_0_i;
 var $sizebits_0_i;
 var $t_0_i16;
 var $rsize_0_i17;
 var $v_0_i18;
 var $393=(($t_0_i16+4)|0);
 var $394=HEAP32[(($393)>>2)];
 var $395=$394&-8;
 var $396=((($395)-($348))|0);
 var $397=($396>>>0)<($rsize_0_i17>>>0);
 if($397){label=88;break;}else{var $v_1_i=$v_0_i18;var $rsize_1_i=$rsize_0_i17;label=89;break;}
 case 88: 
 var $399=($395|0)==($348|0);
 if($399){var $v_2_i=$t_0_i16;var $rsize_2_i=$396;var $t_1_i=$t_0_i16;label=90;break;}else{var $v_1_i=$t_0_i16;var $rsize_1_i=$396;label=89;break;}
 case 89: 
 var $rsize_1_i;
 var $v_1_i;
 var $401=(($t_0_i16+20)|0);
 var $402=HEAP32[(($401)>>2)];
 var $403=$sizebits_0_i>>>31;
 var $404=(($t_0_i16+16+($403<<2))|0);
 var $405=HEAP32[(($404)>>2)];
 var $406=($402|0)==0;
 var $407=($402|0)==($405|0);
 var $or_cond_i=$406|$407;
 var $rst_1_i=($or_cond_i?$rst_0_i:$402);
 var $408=($405|0)==0;
 var $409=$sizebits_0_i<<1;
 if($408){var $v_2_i=$v_1_i;var $rsize_2_i=$rsize_1_i;var $t_1_i=$rst_1_i;label=90;break;}else{var $v_0_i18=$v_1_i;var $rsize_0_i17=$rsize_1_i;var $t_0_i16=$405;var $sizebits_0_i=$409;var $rst_0_i=$rst_1_i;label=87;break;}
 case 90: 
 var $t_1_i;
 var $rsize_2_i;
 var $v_2_i;
 var $410=($t_1_i|0)==0;
 var $411=($v_2_i|0)==0;
 var $or_cond21_i=$410&$411;
 if($or_cond21_i){label=91;break;}else{var $t_2_ph_i=$t_1_i;label=93;break;}
 case 91: 
 var $413=2<<$idx_0_i;
 var $414=(((-$413))|0);
 var $415=$413|$414;
 var $416=$349&$415;
 var $417=($416|0)==0;
 if($417){var $nb_0=$348;label=161;break;}else{label=92;break;}
 case 92: 
 var $419=(((-$416))|0);
 var $420=$416&$419;
 var $421=((($420)-(1))|0);
 var $422=$421>>>12;
 var $423=$422&16;
 var $424=$421>>>($423>>>0);
 var $425=$424>>>5;
 var $426=$425&8;
 var $427=$426|$423;
 var $428=$424>>>($426>>>0);
 var $429=$428>>>2;
 var $430=$429&4;
 var $431=$427|$430;
 var $432=$428>>>($430>>>0);
 var $433=$432>>>1;
 var $434=$433&2;
 var $435=$431|$434;
 var $436=$432>>>($434>>>0);
 var $437=$436>>>1;
 var $438=$437&1;
 var $439=$435|$438;
 var $440=$436>>>($438>>>0);
 var $441=((($439)+($440))|0);
 var $442=((15576+($441<<2))|0);
 var $443=HEAP32[(($442)>>2)];
 var $t_2_ph_i=$443;label=93;break;
 case 93: 
 var $t_2_ph_i;
 var $444=($t_2_ph_i|0)==0;
 if($444){var $rsize_3_lcssa_i=$rsize_2_i;var $v_3_lcssa_i=$v_2_i;label=96;break;}else{var $t_230_i=$t_2_ph_i;var $rsize_331_i=$rsize_2_i;var $v_332_i=$v_2_i;label=94;break;}
 case 94: 
 var $v_332_i;
 var $rsize_331_i;
 var $t_230_i;
 var $445=(($t_230_i+4)|0);
 var $446=HEAP32[(($445)>>2)];
 var $447=$446&-8;
 var $448=((($447)-($348))|0);
 var $449=($448>>>0)<($rsize_331_i>>>0);
 var $_rsize_3_i=($449?$448:$rsize_331_i);
 var $t_2_v_3_i=($449?$t_230_i:$v_332_i);
 var $450=(($t_230_i+16)|0);
 var $451=HEAP32[(($450)>>2)];
 var $452=($451|0)==0;
 if($452){label=95;break;}else{var $t_230_i=$451;var $rsize_331_i=$_rsize_3_i;var $v_332_i=$t_2_v_3_i;label=94;break;}
 case 95: 
 var $453=(($t_230_i+20)|0);
 var $454=HEAP32[(($453)>>2)];
 var $455=($454|0)==0;
 if($455){var $rsize_3_lcssa_i=$_rsize_3_i;var $v_3_lcssa_i=$t_2_v_3_i;label=96;break;}else{var $t_230_i=$454;var $rsize_331_i=$_rsize_3_i;var $v_332_i=$t_2_v_3_i;label=94;break;}
 case 96: 
 var $v_3_lcssa_i;
 var $rsize_3_lcssa_i;
 var $456=($v_3_lcssa_i|0)==0;
 if($456){var $nb_0=$348;label=161;break;}else{label=97;break;}
 case 97: 
 var $458=HEAP32[((15280)>>2)];
 var $459=((($458)-($348))|0);
 var $460=($rsize_3_lcssa_i>>>0)<($459>>>0);
 if($460){label=98;break;}else{var $nb_0=$348;label=161;break;}
 case 98: 
 var $462=$v_3_lcssa_i;
 var $463=HEAP32[((15288)>>2)];
 var $464=($462>>>0)<($463>>>0);
 if($464){label=159;break;}else{label=99;break;}
 case 99: 
 var $466=(($462+$348)|0);
 var $467=$466;
 var $468=($462>>>0)<($466>>>0);
 if($468){label=100;break;}else{label=159;break;}
 case 100: 
 var $470=(($v_3_lcssa_i+24)|0);
 var $471=HEAP32[(($470)>>2)];
 var $472=(($v_3_lcssa_i+12)|0);
 var $473=HEAP32[(($472)>>2)];
 var $474=($473|0)==($v_3_lcssa_i|0);
 if($474){label=106;break;}else{label=101;break;}
 case 101: 
 var $476=(($v_3_lcssa_i+8)|0);
 var $477=HEAP32[(($476)>>2)];
 var $478=$477;
 var $479=($478>>>0)<($463>>>0);
 if($479){label=105;break;}else{label=102;break;}
 case 102: 
 var $481=(($477+12)|0);
 var $482=HEAP32[(($481)>>2)];
 var $483=($482|0)==($v_3_lcssa_i|0);
 if($483){label=103;break;}else{label=105;break;}
 case 103: 
 var $485=(($473+8)|0);
 var $486=HEAP32[(($485)>>2)];
 var $487=($486|0)==($v_3_lcssa_i|0);
 if($487){label=104;break;}else{label=105;break;}
 case 104: 
 HEAP32[(($481)>>2)]=$473;
 HEAP32[(($485)>>2)]=$477;
 var $R_1_i22=$473;label=113;break;
 case 105: 
 _abort();
 throw "Reached an unreachable!";
 case 106: 
 var $490=(($v_3_lcssa_i+20)|0);
 var $491=HEAP32[(($490)>>2)];
 var $492=($491|0)==0;
 if($492){label=107;break;}else{var $R_0_i20=$491;var $RP_0_i19=$490;label=108;break;}
 case 107: 
 var $494=(($v_3_lcssa_i+16)|0);
 var $495=HEAP32[(($494)>>2)];
 var $496=($495|0)==0;
 if($496){var $R_1_i22=0;label=113;break;}else{var $R_0_i20=$495;var $RP_0_i19=$494;label=108;break;}
 case 108: 
 var $RP_0_i19;
 var $R_0_i20;
 var $497=(($R_0_i20+20)|0);
 var $498=HEAP32[(($497)>>2)];
 var $499=($498|0)==0;
 if($499){label=109;break;}else{var $R_0_i20=$498;var $RP_0_i19=$497;label=108;break;}
 case 109: 
 var $501=(($R_0_i20+16)|0);
 var $502=HEAP32[(($501)>>2)];
 var $503=($502|0)==0;
 if($503){label=110;break;}else{var $R_0_i20=$502;var $RP_0_i19=$501;label=108;break;}
 case 110: 
 var $505=$RP_0_i19;
 var $506=($505>>>0)<($463>>>0);
 if($506){label=112;break;}else{label=111;break;}
 case 111: 
 HEAP32[(($RP_0_i19)>>2)]=0;
 var $R_1_i22=$R_0_i20;label=113;break;
 case 112: 
 _abort();
 throw "Reached an unreachable!";
 case 113: 
 var $R_1_i22;
 var $510=($471|0)==0;
 if($510){label=133;break;}else{label=114;break;}
 case 114: 
 var $512=(($v_3_lcssa_i+28)|0);
 var $513=HEAP32[(($512)>>2)];
 var $514=((15576+($513<<2))|0);
 var $515=HEAP32[(($514)>>2)];
 var $516=($v_3_lcssa_i|0)==($515|0);
 if($516){label=115;break;}else{label=117;break;}
 case 115: 
 HEAP32[(($514)>>2)]=$R_1_i22;
 var $cond_i23=($R_1_i22|0)==0;
 if($cond_i23){label=116;break;}else{label=123;break;}
 case 116: 
 var $518=HEAP32[(($512)>>2)];
 var $519=1<<$518;
 var $520=$519^-1;
 var $521=HEAP32[((15276)>>2)];
 var $522=$521&$520;
 HEAP32[((15276)>>2)]=$522;
 label=133;break;
 case 117: 
 var $524=$471;
 var $525=HEAP32[((15288)>>2)];
 var $526=($524>>>0)<($525>>>0);
 if($526){label=121;break;}else{label=118;break;}
 case 118: 
 var $528=(($471+16)|0);
 var $529=HEAP32[(($528)>>2)];
 var $530=($529|0)==($v_3_lcssa_i|0);
 if($530){label=119;break;}else{label=120;break;}
 case 119: 
 HEAP32[(($528)>>2)]=$R_1_i22;
 label=122;break;
 case 120: 
 var $533=(($471+20)|0);
 HEAP32[(($533)>>2)]=$R_1_i22;
 label=122;break;
 case 121: 
 _abort();
 throw "Reached an unreachable!";
 case 122: 
 var $536=($R_1_i22|0)==0;
 if($536){label=133;break;}else{label=123;break;}
 case 123: 
 var $538=$R_1_i22;
 var $539=HEAP32[((15288)>>2)];
 var $540=($538>>>0)<($539>>>0);
 if($540){label=132;break;}else{label=124;break;}
 case 124: 
 var $542=(($R_1_i22+24)|0);
 HEAP32[(($542)>>2)]=$471;
 var $543=(($v_3_lcssa_i+16)|0);
 var $544=HEAP32[(($543)>>2)];
 var $545=($544|0)==0;
 if($545){label=128;break;}else{label=125;break;}
 case 125: 
 var $547=$544;
 var $548=HEAP32[((15288)>>2)];
 var $549=($547>>>0)<($548>>>0);
 if($549){label=127;break;}else{label=126;break;}
 case 126: 
 var $551=(($R_1_i22+16)|0);
 HEAP32[(($551)>>2)]=$544;
 var $552=(($544+24)|0);
 HEAP32[(($552)>>2)]=$R_1_i22;
 label=128;break;
 case 127: 
 _abort();
 throw "Reached an unreachable!";
 case 128: 
 var $555=(($v_3_lcssa_i+20)|0);
 var $556=HEAP32[(($555)>>2)];
 var $557=($556|0)==0;
 if($557){label=133;break;}else{label=129;break;}
 case 129: 
 var $559=$556;
 var $560=HEAP32[((15288)>>2)];
 var $561=($559>>>0)<($560>>>0);
 if($561){label=131;break;}else{label=130;break;}
 case 130: 
 var $563=(($R_1_i22+20)|0);
 HEAP32[(($563)>>2)]=$556;
 var $564=(($556+24)|0);
 HEAP32[(($564)>>2)]=$R_1_i22;
 label=133;break;
 case 131: 
 _abort();
 throw "Reached an unreachable!";
 case 132: 
 _abort();
 throw "Reached an unreachable!";
 case 133: 
 var $568=($rsize_3_lcssa_i>>>0)<16;
 if($568){label=134;break;}else{label=135;break;}
 case 134: 
 var $570=((($rsize_3_lcssa_i)+($348))|0);
 var $571=$570|3;
 var $572=(($v_3_lcssa_i+4)|0);
 HEAP32[(($572)>>2)]=$571;
 var $_sum19_i=((($570)+(4))|0);
 var $573=(($462+$_sum19_i)|0);
 var $574=$573;
 var $575=HEAP32[(($574)>>2)];
 var $576=$575|1;
 HEAP32[(($574)>>2)]=$576;
 label=160;break;
 case 135: 
 var $578=$348|3;
 var $579=(($v_3_lcssa_i+4)|0);
 HEAP32[(($579)>>2)]=$578;
 var $580=$rsize_3_lcssa_i|1;
 var $_sum_i2536=$348|4;
 var $581=(($462+$_sum_i2536)|0);
 var $582=$581;
 HEAP32[(($582)>>2)]=$580;
 var $_sum1_i26=((($rsize_3_lcssa_i)+($348))|0);
 var $583=(($462+$_sum1_i26)|0);
 var $584=$583;
 HEAP32[(($584)>>2)]=$rsize_3_lcssa_i;
 var $585=$rsize_3_lcssa_i>>>3;
 var $586=($rsize_3_lcssa_i>>>0)<256;
 if($586){label=136;break;}else{label=141;break;}
 case 136: 
 var $588=$585<<1;
 var $589=((15312+($588<<2))|0);
 var $590=$589;
 var $591=HEAP32[((15272)>>2)];
 var $592=1<<$585;
 var $593=$591&$592;
 var $594=($593|0)==0;
 if($594){label=137;break;}else{label=138;break;}
 case 137: 
 var $596=$591|$592;
 HEAP32[((15272)>>2)]=$596;
 var $_sum15_pre_i=((($588)+(2))|0);
 var $_pre_i27=((15312+($_sum15_pre_i<<2))|0);
 var $F5_0_i=$590;var $_pre_phi_i28=$_pre_i27;label=140;break;
 case 138: 
 var $_sum18_i=((($588)+(2))|0);
 var $598=((15312+($_sum18_i<<2))|0);
 var $599=HEAP32[(($598)>>2)];
 var $600=$599;
 var $601=HEAP32[((15288)>>2)];
 var $602=($600>>>0)<($601>>>0);
 if($602){label=139;break;}else{var $F5_0_i=$599;var $_pre_phi_i28=$598;label=140;break;}
 case 139: 
 _abort();
 throw "Reached an unreachable!";
 case 140: 
 var $_pre_phi_i28;
 var $F5_0_i;
 HEAP32[(($_pre_phi_i28)>>2)]=$467;
 var $605=(($F5_0_i+12)|0);
 HEAP32[(($605)>>2)]=$467;
 var $_sum16_i=((($348)+(8))|0);
 var $606=(($462+$_sum16_i)|0);
 var $607=$606;
 HEAP32[(($607)>>2)]=$F5_0_i;
 var $_sum17_i=((($348)+(12))|0);
 var $608=(($462+$_sum17_i)|0);
 var $609=$608;
 HEAP32[(($609)>>2)]=$590;
 label=160;break;
 case 141: 
 var $611=$466;
 var $612=$rsize_3_lcssa_i>>>8;
 var $613=($612|0)==0;
 if($613){var $I7_0_i=0;label=144;break;}else{label=142;break;}
 case 142: 
 var $615=($rsize_3_lcssa_i>>>0)>16777215;
 if($615){var $I7_0_i=31;label=144;break;}else{label=143;break;}
 case 143: 
 var $617=((($612)+(1048320))|0);
 var $618=$617>>>16;
 var $619=$618&8;
 var $620=$612<<$619;
 var $621=((($620)+(520192))|0);
 var $622=$621>>>16;
 var $623=$622&4;
 var $624=$623|$619;
 var $625=$620<<$623;
 var $626=((($625)+(245760))|0);
 var $627=$626>>>16;
 var $628=$627&2;
 var $629=$624|$628;
 var $630=(((14)-($629))|0);
 var $631=$625<<$628;
 var $632=$631>>>15;
 var $633=((($630)+($632))|0);
 var $634=$633<<1;
 var $635=((($633)+(7))|0);
 var $636=$rsize_3_lcssa_i>>>($635>>>0);
 var $637=$636&1;
 var $638=$637|$634;
 var $I7_0_i=$638;label=144;break;
 case 144: 
 var $I7_0_i;
 var $640=((15576+($I7_0_i<<2))|0);
 var $_sum2_i=((($348)+(28))|0);
 var $641=(($462+$_sum2_i)|0);
 var $642=$641;
 HEAP32[(($642)>>2)]=$I7_0_i;
 var $_sum3_i29=((($348)+(16))|0);
 var $643=(($462+$_sum3_i29)|0);
 var $_sum4_i30=((($348)+(20))|0);
 var $644=(($462+$_sum4_i30)|0);
 var $645=$644;
 HEAP32[(($645)>>2)]=0;
 var $646=$643;
 HEAP32[(($646)>>2)]=0;
 var $647=HEAP32[((15276)>>2)];
 var $648=1<<$I7_0_i;
 var $649=$647&$648;
 var $650=($649|0)==0;
 if($650){label=145;break;}else{label=146;break;}
 case 145: 
 var $652=$647|$648;
 HEAP32[((15276)>>2)]=$652;
 HEAP32[(($640)>>2)]=$611;
 var $653=$640;
 var $_sum5_i=((($348)+(24))|0);
 var $654=(($462+$_sum5_i)|0);
 var $655=$654;
 HEAP32[(($655)>>2)]=$653;
 var $_sum6_i=((($348)+(12))|0);
 var $656=(($462+$_sum6_i)|0);
 var $657=$656;
 HEAP32[(($657)>>2)]=$611;
 var $_sum7_i=((($348)+(8))|0);
 var $658=(($462+$_sum7_i)|0);
 var $659=$658;
 HEAP32[(($659)>>2)]=$611;
 label=160;break;
 case 146: 
 var $661=HEAP32[(($640)>>2)];
 var $662=($I7_0_i|0)==31;
 if($662){var $667=0;label=148;break;}else{label=147;break;}
 case 147: 
 var $664=$I7_0_i>>>1;
 var $665=(((25)-($664))|0);
 var $667=$665;label=148;break;
 case 148: 
 var $667;
 var $668=(($661+4)|0);
 var $669=HEAP32[(($668)>>2)];
 var $670=$669&-8;
 var $671=($670|0)==($rsize_3_lcssa_i|0);
 if($671){var $T_0_lcssa_i=$661;label=155;break;}else{label=149;break;}
 case 149: 
 var $672=$rsize_3_lcssa_i<<$667;
 var $T_026_i=$661;var $K12_027_i=$672;label=151;break;
 case 150: 
 var $674=$K12_027_i<<1;
 var $675=(($682+4)|0);
 var $676=HEAP32[(($675)>>2)];
 var $677=$676&-8;
 var $678=($677|0)==($rsize_3_lcssa_i|0);
 if($678){var $T_0_lcssa_i=$682;label=155;break;}else{var $T_026_i=$682;var $K12_027_i=$674;label=151;break;}
 case 151: 
 var $K12_027_i;
 var $T_026_i;
 var $680=$K12_027_i>>>31;
 var $681=(($T_026_i+16+($680<<2))|0);
 var $682=HEAP32[(($681)>>2)];
 var $683=($682|0)==0;
 if($683){label=152;break;}else{label=150;break;}
 case 152: 
 var $685=$681;
 var $686=HEAP32[((15288)>>2)];
 var $687=($685>>>0)<($686>>>0);
 if($687){label=154;break;}else{label=153;break;}
 case 153: 
 HEAP32[(($681)>>2)]=$611;
 var $_sum12_i=((($348)+(24))|0);
 var $689=(($462+$_sum12_i)|0);
 var $690=$689;
 HEAP32[(($690)>>2)]=$T_026_i;
 var $_sum13_i=((($348)+(12))|0);
 var $691=(($462+$_sum13_i)|0);
 var $692=$691;
 HEAP32[(($692)>>2)]=$611;
 var $_sum14_i=((($348)+(8))|0);
 var $693=(($462+$_sum14_i)|0);
 var $694=$693;
 HEAP32[(($694)>>2)]=$611;
 label=160;break;
 case 154: 
 _abort();
 throw "Reached an unreachable!";
 case 155: 
 var $T_0_lcssa_i;
 var $696=(($T_0_lcssa_i+8)|0);
 var $697=HEAP32[(($696)>>2)];
 var $698=$T_0_lcssa_i;
 var $699=HEAP32[((15288)>>2)];
 var $700=($698>>>0)<($699>>>0);
 if($700){label=158;break;}else{label=156;break;}
 case 156: 
 var $702=$697;
 var $703=($702>>>0)<($699>>>0);
 if($703){label=158;break;}else{label=157;break;}
 case 157: 
 var $705=(($697+12)|0);
 HEAP32[(($705)>>2)]=$611;
 HEAP32[(($696)>>2)]=$611;
 var $_sum9_i=((($348)+(8))|0);
 var $706=(($462+$_sum9_i)|0);
 var $707=$706;
 HEAP32[(($707)>>2)]=$697;
 var $_sum10_i=((($348)+(12))|0);
 var $708=(($462+$_sum10_i)|0);
 var $709=$708;
 HEAP32[(($709)>>2)]=$T_0_lcssa_i;
 var $_sum11_i=((($348)+(24))|0);
 var $710=(($462+$_sum11_i)|0);
 var $711=$710;
 HEAP32[(($711)>>2)]=0;
 label=160;break;
 case 158: 
 _abort();
 throw "Reached an unreachable!";
 case 159: 
 _abort();
 throw "Reached an unreachable!";
 case 160: 
 var $713=(($v_3_lcssa_i+8)|0);
 var $714=$713;
 var $mem_0=$714;label=344;break;
 case 161: 
 var $nb_0;
 var $715=HEAP32[((15280)>>2)];
 var $716=($nb_0>>>0)>($715>>>0);
 if($716){label=166;break;}else{label=162;break;}
 case 162: 
 var $718=((($715)-($nb_0))|0);
 var $719=HEAP32[((15292)>>2)];
 var $720=($718>>>0)>15;
 if($720){label=163;break;}else{label=164;break;}
 case 163: 
 var $722=$719;
 var $723=(($722+$nb_0)|0);
 var $724=$723;
 HEAP32[((15292)>>2)]=$724;
 HEAP32[((15280)>>2)]=$718;
 var $725=$718|1;
 var $_sum2=((($nb_0)+(4))|0);
 var $726=(($722+$_sum2)|0);
 var $727=$726;
 HEAP32[(($727)>>2)]=$725;
 var $728=(($722+$715)|0);
 var $729=$728;
 HEAP32[(($729)>>2)]=$718;
 var $730=$nb_0|3;
 var $731=(($719+4)|0);
 HEAP32[(($731)>>2)]=$730;
 label=165;break;
 case 164: 
 HEAP32[((15280)>>2)]=0;
 HEAP32[((15292)>>2)]=0;
 var $733=$715|3;
 var $734=(($719+4)|0);
 HEAP32[(($734)>>2)]=$733;
 var $735=$719;
 var $_sum1=((($715)+(4))|0);
 var $736=(($735+$_sum1)|0);
 var $737=$736;
 var $738=HEAP32[(($737)>>2)];
 var $739=$738|1;
 HEAP32[(($737)>>2)]=$739;
 label=165;break;
 case 165: 
 var $741=(($719+8)|0);
 var $742=$741;
 var $mem_0=$742;label=344;break;
 case 166: 
 var $744=HEAP32[((15284)>>2)];
 var $745=($nb_0>>>0)<($744>>>0);
 if($745){label=167;break;}else{label=168;break;}
 case 167: 
 var $747=((($744)-($nb_0))|0);
 HEAP32[((15284)>>2)]=$747;
 var $748=HEAP32[((15296)>>2)];
 var $749=$748;
 var $750=(($749+$nb_0)|0);
 var $751=$750;
 HEAP32[((15296)>>2)]=$751;
 var $752=$747|1;
 var $_sum=((($nb_0)+(4))|0);
 var $753=(($749+$_sum)|0);
 var $754=$753;
 HEAP32[(($754)>>2)]=$752;
 var $755=$nb_0|3;
 var $756=(($748+4)|0);
 HEAP32[(($756)>>2)]=$755;
 var $757=(($748+8)|0);
 var $758=$757;
 var $mem_0=$758;label=344;break;
 case 168: 
 var $760=HEAP32[((12752)>>2)];
 var $761=($760|0)==0;
 if($761){label=169;break;}else{label=172;break;}
 case 169: 
 var $763=_sysconf(30);
 var $764=((($763)-(1))|0);
 var $765=$764&$763;
 var $766=($765|0)==0;
 if($766){label=171;break;}else{label=170;break;}
 case 170: 
 _abort();
 throw "Reached an unreachable!";
 case 171: 
 HEAP32[((12760)>>2)]=$763;
 HEAP32[((12756)>>2)]=$763;
 HEAP32[((12764)>>2)]=-1;
 HEAP32[((12768)>>2)]=-1;
 HEAP32[((12772)>>2)]=0;
 HEAP32[((15716)>>2)]=0;
 var $768=_time(0);
 var $769=$768&-16;
 var $770=$769^1431655768;
 HEAP32[((12752)>>2)]=$770;
 label=172;break;
 case 172: 
 var $772=((($nb_0)+(48))|0);
 var $773=HEAP32[((12760)>>2)];
 var $774=((($nb_0)+(47))|0);
 var $775=((($773)+($774))|0);
 var $776=(((-$773))|0);
 var $777=$775&$776;
 var $778=($777>>>0)>($nb_0>>>0);
 if($778){label=173;break;}else{var $mem_0=0;label=344;break;}
 case 173: 
 var $780=HEAP32[((15712)>>2)];
 var $781=($780|0)==0;
 if($781){label=175;break;}else{label=174;break;}
 case 174: 
 var $783=HEAP32[((15704)>>2)];
 var $784=((($783)+($777))|0);
 var $785=($784>>>0)<=($783>>>0);
 var $786=($784>>>0)>($780>>>0);
 var $or_cond1_i=$785|$786;
 if($or_cond1_i){var $mem_0=0;label=344;break;}else{label=175;break;}
 case 175: 
 var $788=HEAP32[((15716)>>2)];
 var $789=$788&4;
 var $790=($789|0)==0;
 if($790){label=176;break;}else{var $tsize_1_i=0;label=199;break;}
 case 176: 
 var $792=HEAP32[((15296)>>2)];
 var $793=($792|0)==0;
 if($793){label=182;break;}else{label=177;break;}
 case 177: 
 var $795=$792;
 var $sp_0_i_i=15720;label=178;break;
 case 178: 
 var $sp_0_i_i;
 var $797=(($sp_0_i_i)|0);
 var $798=HEAP32[(($797)>>2)];
 var $799=($798>>>0)>($795>>>0);
 if($799){label=180;break;}else{label=179;break;}
 case 179: 
 var $801=(($sp_0_i_i+4)|0);
 var $802=HEAP32[(($801)>>2)];
 var $803=(($798+$802)|0);
 var $804=($803>>>0)>($795>>>0);
 if($804){label=181;break;}else{label=180;break;}
 case 180: 
 var $806=(($sp_0_i_i+8)|0);
 var $807=HEAP32[(($806)>>2)];
 var $808=($807|0)==0;
 if($808){label=182;break;}else{var $sp_0_i_i=$807;label=178;break;}
 case 181: 
 var $809=($sp_0_i_i|0)==0;
 if($809){label=182;break;}else{label=189;break;}
 case 182: 
 var $810=_sbrk(0);
 var $811=($810|0)==-1;
 if($811){var $tsize_0323841_i=0;label=198;break;}else{label=183;break;}
 case 183: 
 var $813=$810;
 var $814=HEAP32[((12756)>>2)];
 var $815=((($814)-(1))|0);
 var $816=$815&$813;
 var $817=($816|0)==0;
 if($817){var $ssize_0_i=$777;label=185;break;}else{label=184;break;}
 case 184: 
 var $819=((($815)+($813))|0);
 var $820=(((-$814))|0);
 var $821=$819&$820;
 var $822=((($777)-($813))|0);
 var $823=((($822)+($821))|0);
 var $ssize_0_i=$823;label=185;break;
 case 185: 
 var $ssize_0_i;
 var $825=HEAP32[((15704)>>2)];
 var $826=((($825)+($ssize_0_i))|0);
 var $827=($ssize_0_i>>>0)>($nb_0>>>0);
 var $828=($ssize_0_i>>>0)<2147483647;
 var $or_cond_i31=$827&$828;
 if($or_cond_i31){label=186;break;}else{var $tsize_0323841_i=0;label=198;break;}
 case 186: 
 var $830=HEAP32[((15712)>>2)];
 var $831=($830|0)==0;
 if($831){label=188;break;}else{label=187;break;}
 case 187: 
 var $833=($826>>>0)<=($825>>>0);
 var $834=($826>>>0)>($830>>>0);
 var $or_cond2_i=$833|$834;
 if($or_cond2_i){var $tsize_0323841_i=0;label=198;break;}else{label=188;break;}
 case 188: 
 var $836=_sbrk($ssize_0_i);
 var $837=($836|0)==($810|0);
 var $ssize_0__i=($837?$ssize_0_i:0);
 var $__i=($837?$810:-1);
 var $tbase_0_i=$__i;var $tsize_0_i=$ssize_0__i;var $br_0_i=$836;var $ssize_1_i=$ssize_0_i;label=191;break;
 case 189: 
 var $839=HEAP32[((15284)>>2)];
 var $840=((($775)-($839))|0);
 var $841=$840&$776;
 var $842=($841>>>0)<2147483647;
 if($842){label=190;break;}else{var $tsize_0323841_i=0;label=198;break;}
 case 190: 
 var $844=_sbrk($841);
 var $845=HEAP32[(($797)>>2)];
 var $846=HEAP32[(($801)>>2)];
 var $847=(($845+$846)|0);
 var $848=($844|0)==($847|0);
 var $_3_i=($848?$841:0);
 var $_4_i=($848?$844:-1);
 var $tbase_0_i=$_4_i;var $tsize_0_i=$_3_i;var $br_0_i=$844;var $ssize_1_i=$841;label=191;break;
 case 191: 
 var $ssize_1_i;
 var $br_0_i;
 var $tsize_0_i;
 var $tbase_0_i;
 var $850=(((-$ssize_1_i))|0);
 var $851=($tbase_0_i|0)==-1;
 if($851){label=192;break;}else{var $tsize_246_i=$tsize_0_i;var $tbase_247_i=$tbase_0_i;label=202;break;}
 case 192: 
 var $853=($br_0_i|0)!=-1;
 var $854=($ssize_1_i>>>0)<2147483647;
 var $or_cond5_i=$853&$854;
 var $855=($ssize_1_i>>>0)<($772>>>0);
 var $or_cond6_i=$or_cond5_i&$855;
 if($or_cond6_i){label=193;break;}else{var $ssize_2_i=$ssize_1_i;label=197;break;}
 case 193: 
 var $857=HEAP32[((12760)>>2)];
 var $858=((($774)-($ssize_1_i))|0);
 var $859=((($858)+($857))|0);
 var $860=(((-$857))|0);
 var $861=$859&$860;
 var $862=($861>>>0)<2147483647;
 if($862){label=194;break;}else{var $ssize_2_i=$ssize_1_i;label=197;break;}
 case 194: 
 var $864=_sbrk($861);
 var $865=($864|0)==-1;
 if($865){label=196;break;}else{label=195;break;}
 case 195: 
 var $867=((($861)+($ssize_1_i))|0);
 var $ssize_2_i=$867;label=197;break;
 case 196: 
 var $869=_sbrk($850);
 var $tsize_0323841_i=$tsize_0_i;label=198;break;
 case 197: 
 var $ssize_2_i;
 var $871=($br_0_i|0)==-1;
 if($871){var $tsize_0323841_i=$tsize_0_i;label=198;break;}else{var $tsize_246_i=$ssize_2_i;var $tbase_247_i=$br_0_i;label=202;break;}
 case 198: 
 var $tsize_0323841_i;
 var $872=HEAP32[((15716)>>2)];
 var $873=$872|4;
 HEAP32[((15716)>>2)]=$873;
 var $tsize_1_i=$tsize_0323841_i;label=199;break;
 case 199: 
 var $tsize_1_i;
 var $875=($777>>>0)<2147483647;
 if($875){label=200;break;}else{label=343;break;}
 case 200: 
 var $877=_sbrk($777);
 var $878=_sbrk(0);
 var $notlhs_i=($877|0)!=-1;
 var $notrhs_i=($878|0)!=-1;
 var $or_cond8_not_i=$notrhs_i&$notlhs_i;
 var $879=($877>>>0)<($878>>>0);
 var $or_cond9_i=$or_cond8_not_i&$879;
 if($or_cond9_i){label=201;break;}else{label=343;break;}
 case 201: 
 var $880=$878;
 var $881=$877;
 var $882=((($880)-($881))|0);
 var $883=((($nb_0)+(40))|0);
 var $884=($882>>>0)>($883>>>0);
 var $_tsize_1_i=($884?$882:$tsize_1_i);
 if($884){var $tsize_246_i=$_tsize_1_i;var $tbase_247_i=$877;label=202;break;}else{label=343;break;}
 case 202: 
 var $tbase_247_i;
 var $tsize_246_i;
 var $885=HEAP32[((15704)>>2)];
 var $886=((($885)+($tsize_246_i))|0);
 HEAP32[((15704)>>2)]=$886;
 var $887=HEAP32[((15708)>>2)];
 var $888=($886>>>0)>($887>>>0);
 if($888){label=203;break;}else{label=204;break;}
 case 203: 
 HEAP32[((15708)>>2)]=$886;
 label=204;break;
 case 204: 
 var $890=HEAP32[((15296)>>2)];
 var $891=($890|0)==0;
 if($891){label=205;break;}else{var $sp_075_i=15720;label=212;break;}
 case 205: 
 var $893=HEAP32[((15288)>>2)];
 var $894=($893|0)==0;
 var $895=($tbase_247_i>>>0)<($893>>>0);
 var $or_cond10_i=$894|$895;
 if($or_cond10_i){label=206;break;}else{label=207;break;}
 case 206: 
 HEAP32[((15288)>>2)]=$tbase_247_i;
 label=207;break;
 case 207: 
 HEAP32[((15720)>>2)]=$tbase_247_i;
 HEAP32[((15724)>>2)]=$tsize_246_i;
 HEAP32[((15732)>>2)]=0;
 var $897=HEAP32[((12752)>>2)];
 HEAP32[((15308)>>2)]=$897;
 HEAP32[((15304)>>2)]=-1;
 var $i_02_i_i=0;label=208;break;
 case 208: 
 var $i_02_i_i;
 var $899=$i_02_i_i<<1;
 var $900=((15312+($899<<2))|0);
 var $901=$900;
 var $_sum_i_i=((($899)+(3))|0);
 var $902=((15312+($_sum_i_i<<2))|0);
 HEAP32[(($902)>>2)]=$901;
 var $_sum1_i_i=((($899)+(2))|0);
 var $903=((15312+($_sum1_i_i<<2))|0);
 HEAP32[(($903)>>2)]=$901;
 var $904=((($i_02_i_i)+(1))|0);
 var $905=($904>>>0)<32;
 if($905){var $i_02_i_i=$904;label=208;break;}else{label=209;break;}
 case 209: 
 var $906=((($tsize_246_i)-(40))|0);
 var $907=(($tbase_247_i+8)|0);
 var $908=$907;
 var $909=$908&7;
 var $910=($909|0)==0;
 if($910){var $914=0;label=211;break;}else{label=210;break;}
 case 210: 
 var $912=(((-$908))|0);
 var $913=$912&7;
 var $914=$913;label=211;break;
 case 211: 
 var $914;
 var $915=(($tbase_247_i+$914)|0);
 var $916=$915;
 var $917=((($906)-($914))|0);
 HEAP32[((15296)>>2)]=$916;
 HEAP32[((15284)>>2)]=$917;
 var $918=$917|1;
 var $_sum_i14_i=((($914)+(4))|0);
 var $919=(($tbase_247_i+$_sum_i14_i)|0);
 var $920=$919;
 HEAP32[(($920)>>2)]=$918;
 var $_sum2_i_i=((($tsize_246_i)-(36))|0);
 var $921=(($tbase_247_i+$_sum2_i_i)|0);
 var $922=$921;
 HEAP32[(($922)>>2)]=40;
 var $923=HEAP32[((12768)>>2)];
 HEAP32[((15300)>>2)]=$923;
 label=341;break;
 case 212: 
 var $sp_075_i;
 var $924=(($sp_075_i)|0);
 var $925=HEAP32[(($924)>>2)];
 var $926=(($sp_075_i+4)|0);
 var $927=HEAP32[(($926)>>2)];
 var $928=(($925+$927)|0);
 var $929=($tbase_247_i|0)==($928|0);
 if($929){label=214;break;}else{label=213;break;}
 case 213: 
 var $931=(($sp_075_i+8)|0);
 var $932=HEAP32[(($931)>>2)];
 var $933=($932|0)==0;
 if($933){label=219;break;}else{var $sp_075_i=$932;label=212;break;}
 case 214: 
 var $934=(($sp_075_i+12)|0);
 var $935=HEAP32[(($934)>>2)];
 var $936=$935&8;
 var $937=($936|0)==0;
 if($937){label=215;break;}else{label=219;break;}
 case 215: 
 var $939=$890;
 var $940=($939>>>0)>=($925>>>0);
 var $941=($939>>>0)<($tbase_247_i>>>0);
 var $or_cond49_i=$940&$941;
 if($or_cond49_i){label=216;break;}else{label=219;break;}
 case 216: 
 var $943=((($927)+($tsize_246_i))|0);
 HEAP32[(($926)>>2)]=$943;
 var $944=HEAP32[((15296)>>2)];
 var $945=HEAP32[((15284)>>2)];
 var $946=((($945)+($tsize_246_i))|0);
 var $947=$944;
 var $948=(($944+8)|0);
 var $949=$948;
 var $950=$949&7;
 var $951=($950|0)==0;
 if($951){var $955=0;label=218;break;}else{label=217;break;}
 case 217: 
 var $953=(((-$949))|0);
 var $954=$953&7;
 var $955=$954;label=218;break;
 case 218: 
 var $955;
 var $956=(($947+$955)|0);
 var $957=$956;
 var $958=((($946)-($955))|0);
 HEAP32[((15296)>>2)]=$957;
 HEAP32[((15284)>>2)]=$958;
 var $959=$958|1;
 var $_sum_i18_i=((($955)+(4))|0);
 var $960=(($947+$_sum_i18_i)|0);
 var $961=$960;
 HEAP32[(($961)>>2)]=$959;
 var $_sum2_i19_i=((($946)+(4))|0);
 var $962=(($947+$_sum2_i19_i)|0);
 var $963=$962;
 HEAP32[(($963)>>2)]=40;
 var $964=HEAP32[((12768)>>2)];
 HEAP32[((15300)>>2)]=$964;
 label=341;break;
 case 219: 
 var $965=HEAP32[((15288)>>2)];
 var $966=($tbase_247_i>>>0)<($965>>>0);
 if($966){label=220;break;}else{label=221;break;}
 case 220: 
 HEAP32[((15288)>>2)]=$tbase_247_i;
 label=221;break;
 case 221: 
 var $968=(($tbase_247_i+$tsize_246_i)|0);
 var $sp_168_i=15720;label=222;break;
 case 222: 
 var $sp_168_i;
 var $970=(($sp_168_i)|0);
 var $971=HEAP32[(($970)>>2)];
 var $972=($971|0)==($968|0);
 if($972){label=224;break;}else{label=223;break;}
 case 223: 
 var $974=(($sp_168_i+8)|0);
 var $975=HEAP32[(($974)>>2)];
 var $976=($975|0)==0;
 if($976){label=306;break;}else{var $sp_168_i=$975;label=222;break;}
 case 224: 
 var $977=(($sp_168_i+12)|0);
 var $978=HEAP32[(($977)>>2)];
 var $979=$978&8;
 var $980=($979|0)==0;
 if($980){label=225;break;}else{label=306;break;}
 case 225: 
 HEAP32[(($970)>>2)]=$tbase_247_i;
 var $982=(($sp_168_i+4)|0);
 var $983=HEAP32[(($982)>>2)];
 var $984=((($983)+($tsize_246_i))|0);
 HEAP32[(($982)>>2)]=$984;
 var $985=(($tbase_247_i+8)|0);
 var $986=$985;
 var $987=$986&7;
 var $988=($987|0)==0;
 if($988){var $993=0;label=227;break;}else{label=226;break;}
 case 226: 
 var $990=(((-$986))|0);
 var $991=$990&7;
 var $993=$991;label=227;break;
 case 227: 
 var $993;
 var $994=(($tbase_247_i+$993)|0);
 var $_sum107_i=((($tsize_246_i)+(8))|0);
 var $995=(($tbase_247_i+$_sum107_i)|0);
 var $996=$995;
 var $997=$996&7;
 var $998=($997|0)==0;
 if($998){var $1003=0;label=229;break;}else{label=228;break;}
 case 228: 
 var $1000=(((-$996))|0);
 var $1001=$1000&7;
 var $1003=$1001;label=229;break;
 case 229: 
 var $1003;
 var $_sum108_i=((($1003)+($tsize_246_i))|0);
 var $1004=(($tbase_247_i+$_sum108_i)|0);
 var $1005=$1004;
 var $1006=$1004;
 var $1007=$994;
 var $1008=((($1006)-($1007))|0);
 var $_sum_i21_i=((($993)+($nb_0))|0);
 var $1009=(($tbase_247_i+$_sum_i21_i)|0);
 var $1010=$1009;
 var $1011=((($1008)-($nb_0))|0);
 var $1012=$nb_0|3;
 var $_sum1_i22_i=((($993)+(4))|0);
 var $1013=(($tbase_247_i+$_sum1_i22_i)|0);
 var $1014=$1013;
 HEAP32[(($1014)>>2)]=$1012;
 var $1015=HEAP32[((15296)>>2)];
 var $1016=($1005|0)==($1015|0);
 if($1016){label=230;break;}else{label=231;break;}
 case 230: 
 var $1018=HEAP32[((15284)>>2)];
 var $1019=((($1018)+($1011))|0);
 HEAP32[((15284)>>2)]=$1019;
 HEAP32[((15296)>>2)]=$1010;
 var $1020=$1019|1;
 var $_sum46_i_i=((($_sum_i21_i)+(4))|0);
 var $1021=(($tbase_247_i+$_sum46_i_i)|0);
 var $1022=$1021;
 HEAP32[(($1022)>>2)]=$1020;
 label=305;break;
 case 231: 
 var $1024=HEAP32[((15292)>>2)];
 var $1025=($1005|0)==($1024|0);
 if($1025){label=232;break;}else{label=233;break;}
 case 232: 
 var $1027=HEAP32[((15280)>>2)];
 var $1028=((($1027)+($1011))|0);
 HEAP32[((15280)>>2)]=$1028;
 HEAP32[((15292)>>2)]=$1010;
 var $1029=$1028|1;
 var $_sum44_i_i=((($_sum_i21_i)+(4))|0);
 var $1030=(($tbase_247_i+$_sum44_i_i)|0);
 var $1031=$1030;
 HEAP32[(($1031)>>2)]=$1029;
 var $_sum45_i_i=((($1028)+($_sum_i21_i))|0);
 var $1032=(($tbase_247_i+$_sum45_i_i)|0);
 var $1033=$1032;
 HEAP32[(($1033)>>2)]=$1028;
 label=305;break;
 case 233: 
 var $_sum2_i23_i=((($tsize_246_i)+(4))|0);
 var $_sum109_i=((($_sum2_i23_i)+($1003))|0);
 var $1035=(($tbase_247_i+$_sum109_i)|0);
 var $1036=$1035;
 var $1037=HEAP32[(($1036)>>2)];
 var $1038=$1037&3;
 var $1039=($1038|0)==1;
 if($1039){label=234;break;}else{var $oldfirst_0_i_i=$1005;var $qsize_0_i_i=$1011;label=281;break;}
 case 234: 
 var $1041=$1037&-8;
 var $1042=$1037>>>3;
 var $1043=($1037>>>0)<256;
 if($1043){label=235;break;}else{label=247;break;}
 case 235: 
 var $_sum3940_i_i=$1003|8;
 var $_sum119_i=((($_sum3940_i_i)+($tsize_246_i))|0);
 var $1045=(($tbase_247_i+$_sum119_i)|0);
 var $1046=$1045;
 var $1047=HEAP32[(($1046)>>2)];
 var $_sum41_i_i=((($tsize_246_i)+(12))|0);
 var $_sum120_i=((($_sum41_i_i)+($1003))|0);
 var $1048=(($tbase_247_i+$_sum120_i)|0);
 var $1049=$1048;
 var $1050=HEAP32[(($1049)>>2)];
 var $1051=$1042<<1;
 var $1052=((15312+($1051<<2))|0);
 var $1053=$1052;
 var $1054=($1047|0)==($1053|0);
 if($1054){label=238;break;}else{label=236;break;}
 case 236: 
 var $1056=$1047;
 var $1057=HEAP32[((15288)>>2)];
 var $1058=($1056>>>0)<($1057>>>0);
 if($1058){label=246;break;}else{label=237;break;}
 case 237: 
 var $1060=(($1047+12)|0);
 var $1061=HEAP32[(($1060)>>2)];
 var $1062=($1061|0)==($1005|0);
 if($1062){label=238;break;}else{label=246;break;}
 case 238: 
 var $1063=($1050|0)==($1047|0);
 if($1063){label=239;break;}else{label=240;break;}
 case 239: 
 var $1065=1<<$1042;
 var $1066=$1065^-1;
 var $1067=HEAP32[((15272)>>2)];
 var $1068=$1067&$1066;
 HEAP32[((15272)>>2)]=$1068;
 label=280;break;
 case 240: 
 var $1070=($1050|0)==($1053|0);
 if($1070){label=241;break;}else{label=242;break;}
 case 241: 
 var $_pre61_i_i=(($1050+8)|0);
 var $_pre_phi62_i_i=$_pre61_i_i;label=244;break;
 case 242: 
 var $1072=$1050;
 var $1073=HEAP32[((15288)>>2)];
 var $1074=($1072>>>0)<($1073>>>0);
 if($1074){label=245;break;}else{label=243;break;}
 case 243: 
 var $1076=(($1050+8)|0);
 var $1077=HEAP32[(($1076)>>2)];
 var $1078=($1077|0)==($1005|0);
 if($1078){var $_pre_phi62_i_i=$1076;label=244;break;}else{label=245;break;}
 case 244: 
 var $_pre_phi62_i_i;
 var $1079=(($1047+12)|0);
 HEAP32[(($1079)>>2)]=$1050;
 HEAP32[(($_pre_phi62_i_i)>>2)]=$1047;
 label=280;break;
 case 245: 
 _abort();
 throw "Reached an unreachable!";
 case 246: 
 _abort();
 throw "Reached an unreachable!";
 case 247: 
 var $1081=$1004;
 var $_sum34_i_i=$1003|24;
 var $_sum110_i=((($_sum34_i_i)+($tsize_246_i))|0);
 var $1082=(($tbase_247_i+$_sum110_i)|0);
 var $1083=$1082;
 var $1084=HEAP32[(($1083)>>2)];
 var $_sum5_i_i=((($tsize_246_i)+(12))|0);
 var $_sum111_i=((($_sum5_i_i)+($1003))|0);
 var $1085=(($tbase_247_i+$_sum111_i)|0);
 var $1086=$1085;
 var $1087=HEAP32[(($1086)>>2)];
 var $1088=($1087|0)==($1081|0);
 if($1088){label=253;break;}else{label=248;break;}
 case 248: 
 var $_sum3637_i_i=$1003|8;
 var $_sum112_i=((($_sum3637_i_i)+($tsize_246_i))|0);
 var $1090=(($tbase_247_i+$_sum112_i)|0);
 var $1091=$1090;
 var $1092=HEAP32[(($1091)>>2)];
 var $1093=$1092;
 var $1094=HEAP32[((15288)>>2)];
 var $1095=($1093>>>0)<($1094>>>0);
 if($1095){label=252;break;}else{label=249;break;}
 case 249: 
 var $1097=(($1092+12)|0);
 var $1098=HEAP32[(($1097)>>2)];
 var $1099=($1098|0)==($1081|0);
 if($1099){label=250;break;}else{label=252;break;}
 case 250: 
 var $1101=(($1087+8)|0);
 var $1102=HEAP32[(($1101)>>2)];
 var $1103=($1102|0)==($1081|0);
 if($1103){label=251;break;}else{label=252;break;}
 case 251: 
 HEAP32[(($1097)>>2)]=$1087;
 HEAP32[(($1101)>>2)]=$1092;
 var $R_1_i_i=$1087;label=260;break;
 case 252: 
 _abort();
 throw "Reached an unreachable!";
 case 253: 
 var $_sum67_i_i=$1003|16;
 var $_sum117_i=((($_sum2_i23_i)+($_sum67_i_i))|0);
 var $1106=(($tbase_247_i+$_sum117_i)|0);
 var $1107=$1106;
 var $1108=HEAP32[(($1107)>>2)];
 var $1109=($1108|0)==0;
 if($1109){label=254;break;}else{var $R_0_i_i=$1108;var $RP_0_i_i=$1107;label=255;break;}
 case 254: 
 var $_sum118_i=((($_sum67_i_i)+($tsize_246_i))|0);
 var $1111=(($tbase_247_i+$_sum118_i)|0);
 var $1112=$1111;
 var $1113=HEAP32[(($1112)>>2)];
 var $1114=($1113|0)==0;
 if($1114){var $R_1_i_i=0;label=260;break;}else{var $R_0_i_i=$1113;var $RP_0_i_i=$1112;label=255;break;}
 case 255: 
 var $RP_0_i_i;
 var $R_0_i_i;
 var $1115=(($R_0_i_i+20)|0);
 var $1116=HEAP32[(($1115)>>2)];
 var $1117=($1116|0)==0;
 if($1117){label=256;break;}else{var $R_0_i_i=$1116;var $RP_0_i_i=$1115;label=255;break;}
 case 256: 
 var $1119=(($R_0_i_i+16)|0);
 var $1120=HEAP32[(($1119)>>2)];
 var $1121=($1120|0)==0;
 if($1121){label=257;break;}else{var $R_0_i_i=$1120;var $RP_0_i_i=$1119;label=255;break;}
 case 257: 
 var $1123=$RP_0_i_i;
 var $1124=HEAP32[((15288)>>2)];
 var $1125=($1123>>>0)<($1124>>>0);
 if($1125){label=259;break;}else{label=258;break;}
 case 258: 
 HEAP32[(($RP_0_i_i)>>2)]=0;
 var $R_1_i_i=$R_0_i_i;label=260;break;
 case 259: 
 _abort();
 throw "Reached an unreachable!";
 case 260: 
 var $R_1_i_i;
 var $1129=($1084|0)==0;
 if($1129){label=280;break;}else{label=261;break;}
 case 261: 
 var $_sum31_i_i=((($tsize_246_i)+(28))|0);
 var $_sum113_i=((($_sum31_i_i)+($1003))|0);
 var $1131=(($tbase_247_i+$_sum113_i)|0);
 var $1132=$1131;
 var $1133=HEAP32[(($1132)>>2)];
 var $1134=((15576+($1133<<2))|0);
 var $1135=HEAP32[(($1134)>>2)];
 var $1136=($1081|0)==($1135|0);
 if($1136){label=262;break;}else{label=264;break;}
 case 262: 
 HEAP32[(($1134)>>2)]=$R_1_i_i;
 var $cond_i_i=($R_1_i_i|0)==0;
 if($cond_i_i){label=263;break;}else{label=270;break;}
 case 263: 
 var $1138=HEAP32[(($1132)>>2)];
 var $1139=1<<$1138;
 var $1140=$1139^-1;
 var $1141=HEAP32[((15276)>>2)];
 var $1142=$1141&$1140;
 HEAP32[((15276)>>2)]=$1142;
 label=280;break;
 case 264: 
 var $1144=$1084;
 var $1145=HEAP32[((15288)>>2)];
 var $1146=($1144>>>0)<($1145>>>0);
 if($1146){label=268;break;}else{label=265;break;}
 case 265: 
 var $1148=(($1084+16)|0);
 var $1149=HEAP32[(($1148)>>2)];
 var $1150=($1149|0)==($1081|0);
 if($1150){label=266;break;}else{label=267;break;}
 case 266: 
 HEAP32[(($1148)>>2)]=$R_1_i_i;
 label=269;break;
 case 267: 
 var $1153=(($1084+20)|0);
 HEAP32[(($1153)>>2)]=$R_1_i_i;
 label=269;break;
 case 268: 
 _abort();
 throw "Reached an unreachable!";
 case 269: 
 var $1156=($R_1_i_i|0)==0;
 if($1156){label=280;break;}else{label=270;break;}
 case 270: 
 var $1158=$R_1_i_i;
 var $1159=HEAP32[((15288)>>2)];
 var $1160=($1158>>>0)<($1159>>>0);
 if($1160){label=279;break;}else{label=271;break;}
 case 271: 
 var $1162=(($R_1_i_i+24)|0);
 HEAP32[(($1162)>>2)]=$1084;
 var $_sum3233_i_i=$1003|16;
 var $_sum114_i=((($_sum3233_i_i)+($tsize_246_i))|0);
 var $1163=(($tbase_247_i+$_sum114_i)|0);
 var $1164=$1163;
 var $1165=HEAP32[(($1164)>>2)];
 var $1166=($1165|0)==0;
 if($1166){label=275;break;}else{label=272;break;}
 case 272: 
 var $1168=$1165;
 var $1169=HEAP32[((15288)>>2)];
 var $1170=($1168>>>0)<($1169>>>0);
 if($1170){label=274;break;}else{label=273;break;}
 case 273: 
 var $1172=(($R_1_i_i+16)|0);
 HEAP32[(($1172)>>2)]=$1165;
 var $1173=(($1165+24)|0);
 HEAP32[(($1173)>>2)]=$R_1_i_i;
 label=275;break;
 case 274: 
 _abort();
 throw "Reached an unreachable!";
 case 275: 
 var $_sum115_i=((($_sum2_i23_i)+($_sum3233_i_i))|0);
 var $1176=(($tbase_247_i+$_sum115_i)|0);
 var $1177=$1176;
 var $1178=HEAP32[(($1177)>>2)];
 var $1179=($1178|0)==0;
 if($1179){label=280;break;}else{label=276;break;}
 case 276: 
 var $1181=$1178;
 var $1182=HEAP32[((15288)>>2)];
 var $1183=($1181>>>0)<($1182>>>0);
 if($1183){label=278;break;}else{label=277;break;}
 case 277: 
 var $1185=(($R_1_i_i+20)|0);
 HEAP32[(($1185)>>2)]=$1178;
 var $1186=(($1178+24)|0);
 HEAP32[(($1186)>>2)]=$R_1_i_i;
 label=280;break;
 case 278: 
 _abort();
 throw "Reached an unreachable!";
 case 279: 
 _abort();
 throw "Reached an unreachable!";
 case 280: 
 var $_sum9_i_i=$1041|$1003;
 var $_sum116_i=((($_sum9_i_i)+($tsize_246_i))|0);
 var $1190=(($tbase_247_i+$_sum116_i)|0);
 var $1191=$1190;
 var $1192=((($1041)+($1011))|0);
 var $oldfirst_0_i_i=$1191;var $qsize_0_i_i=$1192;label=281;break;
 case 281: 
 var $qsize_0_i_i;
 var $oldfirst_0_i_i;
 var $1194=(($oldfirst_0_i_i+4)|0);
 var $1195=HEAP32[(($1194)>>2)];
 var $1196=$1195&-2;
 HEAP32[(($1194)>>2)]=$1196;
 var $1197=$qsize_0_i_i|1;
 var $_sum10_i_i=((($_sum_i21_i)+(4))|0);
 var $1198=(($tbase_247_i+$_sum10_i_i)|0);
 var $1199=$1198;
 HEAP32[(($1199)>>2)]=$1197;
 var $_sum11_i_i=((($qsize_0_i_i)+($_sum_i21_i))|0);
 var $1200=(($tbase_247_i+$_sum11_i_i)|0);
 var $1201=$1200;
 HEAP32[(($1201)>>2)]=$qsize_0_i_i;
 var $1202=$qsize_0_i_i>>>3;
 var $1203=($qsize_0_i_i>>>0)<256;
 if($1203){label=282;break;}else{label=287;break;}
 case 282: 
 var $1205=$1202<<1;
 var $1206=((15312+($1205<<2))|0);
 var $1207=$1206;
 var $1208=HEAP32[((15272)>>2)];
 var $1209=1<<$1202;
 var $1210=$1208&$1209;
 var $1211=($1210|0)==0;
 if($1211){label=283;break;}else{label=284;break;}
 case 283: 
 var $1213=$1208|$1209;
 HEAP32[((15272)>>2)]=$1213;
 var $_sum27_pre_i_i=((($1205)+(2))|0);
 var $_pre_i24_i=((15312+($_sum27_pre_i_i<<2))|0);
 var $F4_0_i_i=$1207;var $_pre_phi_i25_i=$_pre_i24_i;label=286;break;
 case 284: 
 var $_sum30_i_i=((($1205)+(2))|0);
 var $1215=((15312+($_sum30_i_i<<2))|0);
 var $1216=HEAP32[(($1215)>>2)];
 var $1217=$1216;
 var $1218=HEAP32[((15288)>>2)];
 var $1219=($1217>>>0)<($1218>>>0);
 if($1219){label=285;break;}else{var $F4_0_i_i=$1216;var $_pre_phi_i25_i=$1215;label=286;break;}
 case 285: 
 _abort();
 throw "Reached an unreachable!";
 case 286: 
 var $_pre_phi_i25_i;
 var $F4_0_i_i;
 HEAP32[(($_pre_phi_i25_i)>>2)]=$1010;
 var $1222=(($F4_0_i_i+12)|0);
 HEAP32[(($1222)>>2)]=$1010;
 var $_sum28_i_i=((($_sum_i21_i)+(8))|0);
 var $1223=(($tbase_247_i+$_sum28_i_i)|0);
 var $1224=$1223;
 HEAP32[(($1224)>>2)]=$F4_0_i_i;
 var $_sum29_i_i=((($_sum_i21_i)+(12))|0);
 var $1225=(($tbase_247_i+$_sum29_i_i)|0);
 var $1226=$1225;
 HEAP32[(($1226)>>2)]=$1207;
 label=305;break;
 case 287: 
 var $1228=$1009;
 var $1229=$qsize_0_i_i>>>8;
 var $1230=($1229|0)==0;
 if($1230){var $I7_0_i_i=0;label=290;break;}else{label=288;break;}
 case 288: 
 var $1232=($qsize_0_i_i>>>0)>16777215;
 if($1232){var $I7_0_i_i=31;label=290;break;}else{label=289;break;}
 case 289: 
 var $1234=((($1229)+(1048320))|0);
 var $1235=$1234>>>16;
 var $1236=$1235&8;
 var $1237=$1229<<$1236;
 var $1238=((($1237)+(520192))|0);
 var $1239=$1238>>>16;
 var $1240=$1239&4;
 var $1241=$1240|$1236;
 var $1242=$1237<<$1240;
 var $1243=((($1242)+(245760))|0);
 var $1244=$1243>>>16;
 var $1245=$1244&2;
 var $1246=$1241|$1245;
 var $1247=(((14)-($1246))|0);
 var $1248=$1242<<$1245;
 var $1249=$1248>>>15;
 var $1250=((($1247)+($1249))|0);
 var $1251=$1250<<1;
 var $1252=((($1250)+(7))|0);
 var $1253=$qsize_0_i_i>>>($1252>>>0);
 var $1254=$1253&1;
 var $1255=$1254|$1251;
 var $I7_0_i_i=$1255;label=290;break;
 case 290: 
 var $I7_0_i_i;
 var $1257=((15576+($I7_0_i_i<<2))|0);
 var $_sum12_i26_i=((($_sum_i21_i)+(28))|0);
 var $1258=(($tbase_247_i+$_sum12_i26_i)|0);
 var $1259=$1258;
 HEAP32[(($1259)>>2)]=$I7_0_i_i;
 var $_sum13_i_i=((($_sum_i21_i)+(16))|0);
 var $1260=(($tbase_247_i+$_sum13_i_i)|0);
 var $_sum14_i_i=((($_sum_i21_i)+(20))|0);
 var $1261=(($tbase_247_i+$_sum14_i_i)|0);
 var $1262=$1261;
 HEAP32[(($1262)>>2)]=0;
 var $1263=$1260;
 HEAP32[(($1263)>>2)]=0;
 var $1264=HEAP32[((15276)>>2)];
 var $1265=1<<$I7_0_i_i;
 var $1266=$1264&$1265;
 var $1267=($1266|0)==0;
 if($1267){label=291;break;}else{label=292;break;}
 case 291: 
 var $1269=$1264|$1265;
 HEAP32[((15276)>>2)]=$1269;
 HEAP32[(($1257)>>2)]=$1228;
 var $1270=$1257;
 var $_sum15_i_i=((($_sum_i21_i)+(24))|0);
 var $1271=(($tbase_247_i+$_sum15_i_i)|0);
 var $1272=$1271;
 HEAP32[(($1272)>>2)]=$1270;
 var $_sum16_i_i=((($_sum_i21_i)+(12))|0);
 var $1273=(($tbase_247_i+$_sum16_i_i)|0);
 var $1274=$1273;
 HEAP32[(($1274)>>2)]=$1228;
 var $_sum17_i_i=((($_sum_i21_i)+(8))|0);
 var $1275=(($tbase_247_i+$_sum17_i_i)|0);
 var $1276=$1275;
 HEAP32[(($1276)>>2)]=$1228;
 label=305;break;
 case 292: 
 var $1278=HEAP32[(($1257)>>2)];
 var $1279=($I7_0_i_i|0)==31;
 if($1279){var $1284=0;label=294;break;}else{label=293;break;}
 case 293: 
 var $1281=$I7_0_i_i>>>1;
 var $1282=(((25)-($1281))|0);
 var $1284=$1282;label=294;break;
 case 294: 
 var $1284;
 var $1285=(($1278+4)|0);
 var $1286=HEAP32[(($1285)>>2)];
 var $1287=$1286&-8;
 var $1288=($1287|0)==($qsize_0_i_i|0);
 if($1288){var $T_0_lcssa_i28_i=$1278;label=301;break;}else{label=295;break;}
 case 295: 
 var $1289=$qsize_0_i_i<<$1284;
 var $T_055_i_i=$1278;var $K8_056_i_i=$1289;label=297;break;
 case 296: 
 var $1291=$K8_056_i_i<<1;
 var $1292=(($1299+4)|0);
 var $1293=HEAP32[(($1292)>>2)];
 var $1294=$1293&-8;
 var $1295=($1294|0)==($qsize_0_i_i|0);
 if($1295){var $T_0_lcssa_i28_i=$1299;label=301;break;}else{var $T_055_i_i=$1299;var $K8_056_i_i=$1291;label=297;break;}
 case 297: 
 var $K8_056_i_i;
 var $T_055_i_i;
 var $1297=$K8_056_i_i>>>31;
 var $1298=(($T_055_i_i+16+($1297<<2))|0);
 var $1299=HEAP32[(($1298)>>2)];
 var $1300=($1299|0)==0;
 if($1300){label=298;break;}else{label=296;break;}
 case 298: 
 var $1302=$1298;
 var $1303=HEAP32[((15288)>>2)];
 var $1304=($1302>>>0)<($1303>>>0);
 if($1304){label=300;break;}else{label=299;break;}
 case 299: 
 HEAP32[(($1298)>>2)]=$1228;
 var $_sum24_i_i=((($_sum_i21_i)+(24))|0);
 var $1306=(($tbase_247_i+$_sum24_i_i)|0);
 var $1307=$1306;
 HEAP32[(($1307)>>2)]=$T_055_i_i;
 var $_sum25_i_i=((($_sum_i21_i)+(12))|0);
 var $1308=(($tbase_247_i+$_sum25_i_i)|0);
 var $1309=$1308;
 HEAP32[(($1309)>>2)]=$1228;
 var $_sum26_i_i=((($_sum_i21_i)+(8))|0);
 var $1310=(($tbase_247_i+$_sum26_i_i)|0);
 var $1311=$1310;
 HEAP32[(($1311)>>2)]=$1228;
 label=305;break;
 case 300: 
 _abort();
 throw "Reached an unreachable!";
 case 301: 
 var $T_0_lcssa_i28_i;
 var $1313=(($T_0_lcssa_i28_i+8)|0);
 var $1314=HEAP32[(($1313)>>2)];
 var $1315=$T_0_lcssa_i28_i;
 var $1316=HEAP32[((15288)>>2)];
 var $1317=($1315>>>0)<($1316>>>0);
 if($1317){label=304;break;}else{label=302;break;}
 case 302: 
 var $1319=$1314;
 var $1320=($1319>>>0)<($1316>>>0);
 if($1320){label=304;break;}else{label=303;break;}
 case 303: 
 var $1322=(($1314+12)|0);
 HEAP32[(($1322)>>2)]=$1228;
 HEAP32[(($1313)>>2)]=$1228;
 var $_sum21_i_i=((($_sum_i21_i)+(8))|0);
 var $1323=(($tbase_247_i+$_sum21_i_i)|0);
 var $1324=$1323;
 HEAP32[(($1324)>>2)]=$1314;
 var $_sum22_i_i=((($_sum_i21_i)+(12))|0);
 var $1325=(($tbase_247_i+$_sum22_i_i)|0);
 var $1326=$1325;
 HEAP32[(($1326)>>2)]=$T_0_lcssa_i28_i;
 var $_sum23_i_i=((($_sum_i21_i)+(24))|0);
 var $1327=(($tbase_247_i+$_sum23_i_i)|0);
 var $1328=$1327;
 HEAP32[(($1328)>>2)]=0;
 label=305;break;
 case 304: 
 _abort();
 throw "Reached an unreachable!";
 case 305: 
 var $_sum1819_i_i=$993|8;
 var $1329=(($tbase_247_i+$_sum1819_i_i)|0);
 var $mem_0=$1329;label=344;break;
 case 306: 
 var $1330=$890;
 var $sp_0_i_i_i=15720;label=307;break;
 case 307: 
 var $sp_0_i_i_i;
 var $1332=(($sp_0_i_i_i)|0);
 var $1333=HEAP32[(($1332)>>2)];
 var $1334=($1333>>>0)>($1330>>>0);
 if($1334){label=309;break;}else{label=308;break;}
 case 308: 
 var $1336=(($sp_0_i_i_i+4)|0);
 var $1337=HEAP32[(($1336)>>2)];
 var $1338=(($1333+$1337)|0);
 var $1339=($1338>>>0)>($1330>>>0);
 if($1339){label=310;break;}else{label=309;break;}
 case 309: 
 var $1341=(($sp_0_i_i_i+8)|0);
 var $1342=HEAP32[(($1341)>>2)];
 var $sp_0_i_i_i=$1342;label=307;break;
 case 310: 
 var $_sum_i15_i=((($1337)-(47))|0);
 var $_sum1_i16_i=((($1337)-(39))|0);
 var $1343=(($1333+$_sum1_i16_i)|0);
 var $1344=$1343;
 var $1345=$1344&7;
 var $1346=($1345|0)==0;
 if($1346){var $1351=0;label=312;break;}else{label=311;break;}
 case 311: 
 var $1348=(((-$1344))|0);
 var $1349=$1348&7;
 var $1351=$1349;label=312;break;
 case 312: 
 var $1351;
 var $_sum2_i17_i=((($_sum_i15_i)+($1351))|0);
 var $1352=(($1333+$_sum2_i17_i)|0);
 var $1353=(($890+16)|0);
 var $1354=$1353;
 var $1355=($1352>>>0)<($1354>>>0);
 var $1356=($1355?$1330:$1352);
 var $1357=(($1356+8)|0);
 var $1358=$1357;
 var $1359=((($tsize_246_i)-(40))|0);
 var $1360=(($tbase_247_i+8)|0);
 var $1361=$1360;
 var $1362=$1361&7;
 var $1363=($1362|0)==0;
 if($1363){var $1367=0;label=314;break;}else{label=313;break;}
 case 313: 
 var $1365=(((-$1361))|0);
 var $1366=$1365&7;
 var $1367=$1366;label=314;break;
 case 314: 
 var $1367;
 var $1368=(($tbase_247_i+$1367)|0);
 var $1369=$1368;
 var $1370=((($1359)-($1367))|0);
 HEAP32[((15296)>>2)]=$1369;
 HEAP32[((15284)>>2)]=$1370;
 var $1371=$1370|1;
 var $_sum_i_i_i=((($1367)+(4))|0);
 var $1372=(($tbase_247_i+$_sum_i_i_i)|0);
 var $1373=$1372;
 HEAP32[(($1373)>>2)]=$1371;
 var $_sum2_i_i_i=((($tsize_246_i)-(36))|0);
 var $1374=(($tbase_247_i+$_sum2_i_i_i)|0);
 var $1375=$1374;
 HEAP32[(($1375)>>2)]=40;
 var $1376=HEAP32[((12768)>>2)];
 HEAP32[((15300)>>2)]=$1376;
 var $1377=(($1356+4)|0);
 var $1378=$1377;
 HEAP32[(($1378)>>2)]=27;
 assert(16 % 1 === 0);HEAP32[(($1357)>>2)]=HEAP32[((15720)>>2)];HEAP32[((($1357)+(4))>>2)]=HEAP32[((15724)>>2)];HEAP32[((($1357)+(8))>>2)]=HEAP32[((15728)>>2)];HEAP32[((($1357)+(12))>>2)]=HEAP32[((15732)>>2)];
 HEAP32[((15720)>>2)]=$tbase_247_i;
 HEAP32[((15724)>>2)]=$tsize_246_i;
 HEAP32[((15732)>>2)]=0;
 HEAP32[((15728)>>2)]=$1358;
 var $1379=(($1356+28)|0);
 var $1380=$1379;
 HEAP32[(($1380)>>2)]=7;
 var $1381=(($1356+32)|0);
 var $1382=($1381>>>0)<($1338>>>0);
 if($1382){var $1383=$1380;label=315;break;}else{label=316;break;}
 case 315: 
 var $1383;
 var $1384=(($1383+4)|0);
 HEAP32[(($1384)>>2)]=7;
 var $1385=(($1383+8)|0);
 var $1386=$1385;
 var $1387=($1386>>>0)<($1338>>>0);
 if($1387){var $1383=$1384;label=315;break;}else{label=316;break;}
 case 316: 
 var $1388=($1356|0)==($1330|0);
 if($1388){label=341;break;}else{label=317;break;}
 case 317: 
 var $1390=$1356;
 var $1391=$890;
 var $1392=((($1390)-($1391))|0);
 var $1393=(($1330+$1392)|0);
 var $_sum3_i_i=((($1392)+(4))|0);
 var $1394=(($1330+$_sum3_i_i)|0);
 var $1395=$1394;
 var $1396=HEAP32[(($1395)>>2)];
 var $1397=$1396&-2;
 HEAP32[(($1395)>>2)]=$1397;
 var $1398=$1392|1;
 var $1399=(($890+4)|0);
 HEAP32[(($1399)>>2)]=$1398;
 var $1400=$1393;
 HEAP32[(($1400)>>2)]=$1392;
 var $1401=$1392>>>3;
 var $1402=($1392>>>0)<256;
 if($1402){label=318;break;}else{label=323;break;}
 case 318: 
 var $1404=$1401<<1;
 var $1405=((15312+($1404<<2))|0);
 var $1406=$1405;
 var $1407=HEAP32[((15272)>>2)];
 var $1408=1<<$1401;
 var $1409=$1407&$1408;
 var $1410=($1409|0)==0;
 if($1410){label=319;break;}else{label=320;break;}
 case 319: 
 var $1412=$1407|$1408;
 HEAP32[((15272)>>2)]=$1412;
 var $_sum11_pre_i_i=((($1404)+(2))|0);
 var $_pre_i_i=((15312+($_sum11_pre_i_i<<2))|0);
 var $F_0_i_i=$1406;var $_pre_phi_i_i=$_pre_i_i;label=322;break;
 case 320: 
 var $_sum12_i_i=((($1404)+(2))|0);
 var $1414=((15312+($_sum12_i_i<<2))|0);
 var $1415=HEAP32[(($1414)>>2)];
 var $1416=$1415;
 var $1417=HEAP32[((15288)>>2)];
 var $1418=($1416>>>0)<($1417>>>0);
 if($1418){label=321;break;}else{var $F_0_i_i=$1415;var $_pre_phi_i_i=$1414;label=322;break;}
 case 321: 
 _abort();
 throw "Reached an unreachable!";
 case 322: 
 var $_pre_phi_i_i;
 var $F_0_i_i;
 HEAP32[(($_pre_phi_i_i)>>2)]=$890;
 var $1421=(($F_0_i_i+12)|0);
 HEAP32[(($1421)>>2)]=$890;
 var $1422=(($890+8)|0);
 HEAP32[(($1422)>>2)]=$F_0_i_i;
 var $1423=(($890+12)|0);
 HEAP32[(($1423)>>2)]=$1406;
 label=341;break;
 case 323: 
 var $1425=$890;
 var $1426=$1392>>>8;
 var $1427=($1426|0)==0;
 if($1427){var $I1_0_i_i=0;label=326;break;}else{label=324;break;}
 case 324: 
 var $1429=($1392>>>0)>16777215;
 if($1429){var $I1_0_i_i=31;label=326;break;}else{label=325;break;}
 case 325: 
 var $1431=((($1426)+(1048320))|0);
 var $1432=$1431>>>16;
 var $1433=$1432&8;
 var $1434=$1426<<$1433;
 var $1435=((($1434)+(520192))|0);
 var $1436=$1435>>>16;
 var $1437=$1436&4;
 var $1438=$1437|$1433;
 var $1439=$1434<<$1437;
 var $1440=((($1439)+(245760))|0);
 var $1441=$1440>>>16;
 var $1442=$1441&2;
 var $1443=$1438|$1442;
 var $1444=(((14)-($1443))|0);
 var $1445=$1439<<$1442;
 var $1446=$1445>>>15;
 var $1447=((($1444)+($1446))|0);
 var $1448=$1447<<1;
 var $1449=((($1447)+(7))|0);
 var $1450=$1392>>>($1449>>>0);
 var $1451=$1450&1;
 var $1452=$1451|$1448;
 var $I1_0_i_i=$1452;label=326;break;
 case 326: 
 var $I1_0_i_i;
 var $1454=((15576+($I1_0_i_i<<2))|0);
 var $1455=(($890+28)|0);
 var $I1_0_c_i_i=$I1_0_i_i;
 HEAP32[(($1455)>>2)]=$I1_0_c_i_i;
 var $1456=(($890+20)|0);
 HEAP32[(($1456)>>2)]=0;
 var $1457=(($890+16)|0);
 HEAP32[(($1457)>>2)]=0;
 var $1458=HEAP32[((15276)>>2)];
 var $1459=1<<$I1_0_i_i;
 var $1460=$1458&$1459;
 var $1461=($1460|0)==0;
 if($1461){label=327;break;}else{label=328;break;}
 case 327: 
 var $1463=$1458|$1459;
 HEAP32[((15276)>>2)]=$1463;
 HEAP32[(($1454)>>2)]=$1425;
 var $1464=(($890+24)|0);
 var $_c_i_i=$1454;
 HEAP32[(($1464)>>2)]=$_c_i_i;
 var $1465=(($890+12)|0);
 HEAP32[(($1465)>>2)]=$890;
 var $1466=(($890+8)|0);
 HEAP32[(($1466)>>2)]=$890;
 label=341;break;
 case 328: 
 var $1468=HEAP32[(($1454)>>2)];
 var $1469=($I1_0_i_i|0)==31;
 if($1469){var $1474=0;label=330;break;}else{label=329;break;}
 case 329: 
 var $1471=$I1_0_i_i>>>1;
 var $1472=(((25)-($1471))|0);
 var $1474=$1472;label=330;break;
 case 330: 
 var $1474;
 var $1475=(($1468+4)|0);
 var $1476=HEAP32[(($1475)>>2)];
 var $1477=$1476&-8;
 var $1478=($1477|0)==($1392|0);
 if($1478){var $T_0_lcssa_i_i=$1468;label=337;break;}else{label=331;break;}
 case 331: 
 var $1479=$1392<<$1474;
 var $T_014_i_i=$1468;var $K2_015_i_i=$1479;label=333;break;
 case 332: 
 var $1481=$K2_015_i_i<<1;
 var $1482=(($1489+4)|0);
 var $1483=HEAP32[(($1482)>>2)];
 var $1484=$1483&-8;
 var $1485=($1484|0)==($1392|0);
 if($1485){var $T_0_lcssa_i_i=$1489;label=337;break;}else{var $T_014_i_i=$1489;var $K2_015_i_i=$1481;label=333;break;}
 case 333: 
 var $K2_015_i_i;
 var $T_014_i_i;
 var $1487=$K2_015_i_i>>>31;
 var $1488=(($T_014_i_i+16+($1487<<2))|0);
 var $1489=HEAP32[(($1488)>>2)];
 var $1490=($1489|0)==0;
 if($1490){label=334;break;}else{label=332;break;}
 case 334: 
 var $1492=$1488;
 var $1493=HEAP32[((15288)>>2)];
 var $1494=($1492>>>0)<($1493>>>0);
 if($1494){label=336;break;}else{label=335;break;}
 case 335: 
 HEAP32[(($1488)>>2)]=$1425;
 var $1496=(($890+24)|0);
 var $T_0_c8_i_i=$T_014_i_i;
 HEAP32[(($1496)>>2)]=$T_0_c8_i_i;
 var $1497=(($890+12)|0);
 HEAP32[(($1497)>>2)]=$890;
 var $1498=(($890+8)|0);
 HEAP32[(($1498)>>2)]=$890;
 label=341;break;
 case 336: 
 _abort();
 throw "Reached an unreachable!";
 case 337: 
 var $T_0_lcssa_i_i;
 var $1500=(($T_0_lcssa_i_i+8)|0);
 var $1501=HEAP32[(($1500)>>2)];
 var $1502=$T_0_lcssa_i_i;
 var $1503=HEAP32[((15288)>>2)];
 var $1504=($1502>>>0)<($1503>>>0);
 if($1504){label=340;break;}else{label=338;break;}
 case 338: 
 var $1506=$1501;
 var $1507=($1506>>>0)<($1503>>>0);
 if($1507){label=340;break;}else{label=339;break;}
 case 339: 
 var $1509=(($1501+12)|0);
 HEAP32[(($1509)>>2)]=$1425;
 HEAP32[(($1500)>>2)]=$1425;
 var $1510=(($890+8)|0);
 var $_c7_i_i=$1501;
 HEAP32[(($1510)>>2)]=$_c7_i_i;
 var $1511=(($890+12)|0);
 var $T_0_c_i_i=$T_0_lcssa_i_i;
 HEAP32[(($1511)>>2)]=$T_0_c_i_i;
 var $1512=(($890+24)|0);
 HEAP32[(($1512)>>2)]=0;
 label=341;break;
 case 340: 
 _abort();
 throw "Reached an unreachable!";
 case 341: 
 var $1513=HEAP32[((15284)>>2)];
 var $1514=($1513>>>0)>($nb_0>>>0);
 if($1514){label=342;break;}else{label=343;break;}
 case 342: 
 var $1516=((($1513)-($nb_0))|0);
 HEAP32[((15284)>>2)]=$1516;
 var $1517=HEAP32[((15296)>>2)];
 var $1518=$1517;
 var $1519=(($1518+$nb_0)|0);
 var $1520=$1519;
 HEAP32[((15296)>>2)]=$1520;
 var $1521=$1516|1;
 var $_sum_i34=((($nb_0)+(4))|0);
 var $1522=(($1518+$_sum_i34)|0);
 var $1523=$1522;
 HEAP32[(($1523)>>2)]=$1521;
 var $1524=$nb_0|3;
 var $1525=(($1517+4)|0);
 HEAP32[(($1525)>>2)]=$1524;
 var $1526=(($1517+8)|0);
 var $1527=$1526;
 var $mem_0=$1527;label=344;break;
 case 343: 
 var $1528=___errno_location();
 HEAP32[(($1528)>>2)]=12;
 var $mem_0=0;label=344;break;
 case 344: 
 var $mem_0;
 return $mem_0;
  default: assert(0, "bad label: " + label);
 }

}
Module["_malloc"] = _malloc;

function _free($mem){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($mem|0)==0;
 if($1){label=141;break;}else{label=2;break;}
 case 2: 
 var $3=((($mem)-(8))|0);
 var $4=$3;
 var $5=HEAP32[((15288)>>2)];
 var $6=($3>>>0)<($5>>>0);
 if($6){label=140;break;}else{label=3;break;}
 case 3: 
 var $8=((($mem)-(4))|0);
 var $9=$8;
 var $10=HEAP32[(($9)>>2)];
 var $11=$10&3;
 var $12=($11|0)==1;
 if($12){label=140;break;}else{label=4;break;}
 case 4: 
 var $14=$10&-8;
 var $_sum=((($14)-(8))|0);
 var $15=(($mem+$_sum)|0);
 var $16=$15;
 var $17=$10&1;
 var $18=($17|0)==0;
 if($18){label=5;break;}else{var $p_0=$4;var $psize_0=$14;label=56;break;}
 case 5: 
 var $20=$3;
 var $21=HEAP32[(($20)>>2)];
 var $22=($11|0)==0;
 if($22){label=141;break;}else{label=6;break;}
 case 6: 
 var $_sum3=(((-8)-($21))|0);
 var $24=(($mem+$_sum3)|0);
 var $25=$24;
 var $26=((($21)+($14))|0);
 var $27=($24>>>0)<($5>>>0);
 if($27){label=140;break;}else{label=7;break;}
 case 7: 
 var $29=HEAP32[((15292)>>2)];
 var $30=($25|0)==($29|0);
 if($30){label=54;break;}else{label=8;break;}
 case 8: 
 var $32=$21>>>3;
 var $33=($21>>>0)<256;
 if($33){label=9;break;}else{label=21;break;}
 case 9: 
 var $_sum47=((($_sum3)+(8))|0);
 var $35=(($mem+$_sum47)|0);
 var $36=$35;
 var $37=HEAP32[(($36)>>2)];
 var $_sum48=((($_sum3)+(12))|0);
 var $38=(($mem+$_sum48)|0);
 var $39=$38;
 var $40=HEAP32[(($39)>>2)];
 var $41=$32<<1;
 var $42=((15312+($41<<2))|0);
 var $43=$42;
 var $44=($37|0)==($43|0);
 if($44){label=12;break;}else{label=10;break;}
 case 10: 
 var $46=$37;
 var $47=($46>>>0)<($5>>>0);
 if($47){label=20;break;}else{label=11;break;}
 case 11: 
 var $49=(($37+12)|0);
 var $50=HEAP32[(($49)>>2)];
 var $51=($50|0)==($25|0);
 if($51){label=12;break;}else{label=20;break;}
 case 12: 
 var $52=($40|0)==($37|0);
 if($52){label=13;break;}else{label=14;break;}
 case 13: 
 var $54=1<<$32;
 var $55=$54^-1;
 var $56=HEAP32[((15272)>>2)];
 var $57=$56&$55;
 HEAP32[((15272)>>2)]=$57;
 var $p_0=$25;var $psize_0=$26;label=56;break;
 case 14: 
 var $59=($40|0)==($43|0);
 if($59){label=15;break;}else{label=16;break;}
 case 15: 
 var $_pre81=(($40+8)|0);
 var $_pre_phi82=$_pre81;label=18;break;
 case 16: 
 var $61=$40;
 var $62=($61>>>0)<($5>>>0);
 if($62){label=19;break;}else{label=17;break;}
 case 17: 
 var $64=(($40+8)|0);
 var $65=HEAP32[(($64)>>2)];
 var $66=($65|0)==($25|0);
 if($66){var $_pre_phi82=$64;label=18;break;}else{label=19;break;}
 case 18: 
 var $_pre_phi82;
 var $67=(($37+12)|0);
 HEAP32[(($67)>>2)]=$40;
 HEAP32[(($_pre_phi82)>>2)]=$37;
 var $p_0=$25;var $psize_0=$26;label=56;break;
 case 19: 
 _abort();
 throw "Reached an unreachable!";
 case 20: 
 _abort();
 throw "Reached an unreachable!";
 case 21: 
 var $69=$24;
 var $_sum37=((($_sum3)+(24))|0);
 var $70=(($mem+$_sum37)|0);
 var $71=$70;
 var $72=HEAP32[(($71)>>2)];
 var $_sum38=((($_sum3)+(12))|0);
 var $73=(($mem+$_sum38)|0);
 var $74=$73;
 var $75=HEAP32[(($74)>>2)];
 var $76=($75|0)==($69|0);
 if($76){label=27;break;}else{label=22;break;}
 case 22: 
 var $_sum44=((($_sum3)+(8))|0);
 var $78=(($mem+$_sum44)|0);
 var $79=$78;
 var $80=HEAP32[(($79)>>2)];
 var $81=$80;
 var $82=($81>>>0)<($5>>>0);
 if($82){label=26;break;}else{label=23;break;}
 case 23: 
 var $84=(($80+12)|0);
 var $85=HEAP32[(($84)>>2)];
 var $86=($85|0)==($69|0);
 if($86){label=24;break;}else{label=26;break;}
 case 24: 
 var $88=(($75+8)|0);
 var $89=HEAP32[(($88)>>2)];
 var $90=($89|0)==($69|0);
 if($90){label=25;break;}else{label=26;break;}
 case 25: 
 HEAP32[(($84)>>2)]=$75;
 HEAP32[(($88)>>2)]=$80;
 var $R_1=$75;label=34;break;
 case 26: 
 _abort();
 throw "Reached an unreachable!";
 case 27: 
 var $_sum40=((($_sum3)+(20))|0);
 var $93=(($mem+$_sum40)|0);
 var $94=$93;
 var $95=HEAP32[(($94)>>2)];
 var $96=($95|0)==0;
 if($96){label=28;break;}else{var $R_0=$95;var $RP_0=$94;label=29;break;}
 case 28: 
 var $_sum39=((($_sum3)+(16))|0);
 var $98=(($mem+$_sum39)|0);
 var $99=$98;
 var $100=HEAP32[(($99)>>2)];
 var $101=($100|0)==0;
 if($101){var $R_1=0;label=34;break;}else{var $R_0=$100;var $RP_0=$99;label=29;break;}
 case 29: 
 var $RP_0;
 var $R_0;
 var $102=(($R_0+20)|0);
 var $103=HEAP32[(($102)>>2)];
 var $104=($103|0)==0;
 if($104){label=30;break;}else{var $R_0=$103;var $RP_0=$102;label=29;break;}
 case 30: 
 var $106=(($R_0+16)|0);
 var $107=HEAP32[(($106)>>2)];
 var $108=($107|0)==0;
 if($108){label=31;break;}else{var $R_0=$107;var $RP_0=$106;label=29;break;}
 case 31: 
 var $110=$RP_0;
 var $111=($110>>>0)<($5>>>0);
 if($111){label=33;break;}else{label=32;break;}
 case 32: 
 HEAP32[(($RP_0)>>2)]=0;
 var $R_1=$R_0;label=34;break;
 case 33: 
 _abort();
 throw "Reached an unreachable!";
 case 34: 
 var $R_1;
 var $115=($72|0)==0;
 if($115){var $p_0=$25;var $psize_0=$26;label=56;break;}else{label=35;break;}
 case 35: 
 var $_sum41=((($_sum3)+(28))|0);
 var $117=(($mem+$_sum41)|0);
 var $118=$117;
 var $119=HEAP32[(($118)>>2)];
 var $120=((15576+($119<<2))|0);
 var $121=HEAP32[(($120)>>2)];
 var $122=($69|0)==($121|0);
 if($122){label=36;break;}else{label=38;break;}
 case 36: 
 HEAP32[(($120)>>2)]=$R_1;
 var $cond=($R_1|0)==0;
 if($cond){label=37;break;}else{label=44;break;}
 case 37: 
 var $124=HEAP32[(($118)>>2)];
 var $125=1<<$124;
 var $126=$125^-1;
 var $127=HEAP32[((15276)>>2)];
 var $128=$127&$126;
 HEAP32[((15276)>>2)]=$128;
 var $p_0=$25;var $psize_0=$26;label=56;break;
 case 38: 
 var $130=$72;
 var $131=HEAP32[((15288)>>2)];
 var $132=($130>>>0)<($131>>>0);
 if($132){label=42;break;}else{label=39;break;}
 case 39: 
 var $134=(($72+16)|0);
 var $135=HEAP32[(($134)>>2)];
 var $136=($135|0)==($69|0);
 if($136){label=40;break;}else{label=41;break;}
 case 40: 
 HEAP32[(($134)>>2)]=$R_1;
 label=43;break;
 case 41: 
 var $139=(($72+20)|0);
 HEAP32[(($139)>>2)]=$R_1;
 label=43;break;
 case 42: 
 _abort();
 throw "Reached an unreachable!";
 case 43: 
 var $142=($R_1|0)==0;
 if($142){var $p_0=$25;var $psize_0=$26;label=56;break;}else{label=44;break;}
 case 44: 
 var $144=$R_1;
 var $145=HEAP32[((15288)>>2)];
 var $146=($144>>>0)<($145>>>0);
 if($146){label=53;break;}else{label=45;break;}
 case 45: 
 var $148=(($R_1+24)|0);
 HEAP32[(($148)>>2)]=$72;
 var $_sum42=((($_sum3)+(16))|0);
 var $149=(($mem+$_sum42)|0);
 var $150=$149;
 var $151=HEAP32[(($150)>>2)];
 var $152=($151|0)==0;
 if($152){label=49;break;}else{label=46;break;}
 case 46: 
 var $154=$151;
 var $155=HEAP32[((15288)>>2)];
 var $156=($154>>>0)<($155>>>0);
 if($156){label=48;break;}else{label=47;break;}
 case 47: 
 var $158=(($R_1+16)|0);
 HEAP32[(($158)>>2)]=$151;
 var $159=(($151+24)|0);
 HEAP32[(($159)>>2)]=$R_1;
 label=49;break;
 case 48: 
 _abort();
 throw "Reached an unreachable!";
 case 49: 
 var $_sum43=((($_sum3)+(20))|0);
 var $162=(($mem+$_sum43)|0);
 var $163=$162;
 var $164=HEAP32[(($163)>>2)];
 var $165=($164|0)==0;
 if($165){var $p_0=$25;var $psize_0=$26;label=56;break;}else{label=50;break;}
 case 50: 
 var $167=$164;
 var $168=HEAP32[((15288)>>2)];
 var $169=($167>>>0)<($168>>>0);
 if($169){label=52;break;}else{label=51;break;}
 case 51: 
 var $171=(($R_1+20)|0);
 HEAP32[(($171)>>2)]=$164;
 var $172=(($164+24)|0);
 HEAP32[(($172)>>2)]=$R_1;
 var $p_0=$25;var $psize_0=$26;label=56;break;
 case 52: 
 _abort();
 throw "Reached an unreachable!";
 case 53: 
 _abort();
 throw "Reached an unreachable!";
 case 54: 
 var $_sum4=((($14)-(4))|0);
 var $176=(($mem+$_sum4)|0);
 var $177=$176;
 var $178=HEAP32[(($177)>>2)];
 var $179=$178&3;
 var $180=($179|0)==3;
 if($180){label=55;break;}else{var $p_0=$25;var $psize_0=$26;label=56;break;}
 case 55: 
 HEAP32[((15280)>>2)]=$26;
 var $182=HEAP32[(($177)>>2)];
 var $183=$182&-2;
 HEAP32[(($177)>>2)]=$183;
 var $184=$26|1;
 var $_sum35=((($_sum3)+(4))|0);
 var $185=(($mem+$_sum35)|0);
 var $186=$185;
 HEAP32[(($186)>>2)]=$184;
 var $187=$15;
 HEAP32[(($187)>>2)]=$26;
 label=141;break;
 case 56: 
 var $psize_0;
 var $p_0;
 var $189=$p_0;
 var $190=($189>>>0)<($15>>>0);
 if($190){label=57;break;}else{label=140;break;}
 case 57: 
 var $_sum34=((($14)-(4))|0);
 var $192=(($mem+$_sum34)|0);
 var $193=$192;
 var $194=HEAP32[(($193)>>2)];
 var $195=$194&1;
 var $phitmp=($195|0)==0;
 if($phitmp){label=140;break;}else{label=58;break;}
 case 58: 
 var $197=$194&2;
 var $198=($197|0)==0;
 if($198){label=59;break;}else{label=112;break;}
 case 59: 
 var $200=HEAP32[((15296)>>2)];
 var $201=($16|0)==($200|0);
 if($201){label=60;break;}else{label=62;break;}
 case 60: 
 var $203=HEAP32[((15284)>>2)];
 var $204=((($203)+($psize_0))|0);
 HEAP32[((15284)>>2)]=$204;
 HEAP32[((15296)>>2)]=$p_0;
 var $205=$204|1;
 var $206=(($p_0+4)|0);
 HEAP32[(($206)>>2)]=$205;
 var $207=HEAP32[((15292)>>2)];
 var $208=($p_0|0)==($207|0);
 if($208){label=61;break;}else{label=141;break;}
 case 61: 
 HEAP32[((15292)>>2)]=0;
 HEAP32[((15280)>>2)]=0;
 label=141;break;
 case 62: 
 var $211=HEAP32[((15292)>>2)];
 var $212=($16|0)==($211|0);
 if($212){label=63;break;}else{label=64;break;}
 case 63: 
 var $214=HEAP32[((15280)>>2)];
 var $215=((($214)+($psize_0))|0);
 HEAP32[((15280)>>2)]=$215;
 HEAP32[((15292)>>2)]=$p_0;
 var $216=$215|1;
 var $217=(($p_0+4)|0);
 HEAP32[(($217)>>2)]=$216;
 var $218=(($189+$215)|0);
 var $219=$218;
 HEAP32[(($219)>>2)]=$215;
 label=141;break;
 case 64: 
 var $221=$194&-8;
 var $222=((($221)+($psize_0))|0);
 var $223=$194>>>3;
 var $224=($194>>>0)<256;
 if($224){label=65;break;}else{label=77;break;}
 case 65: 
 var $226=(($mem+$14)|0);
 var $227=$226;
 var $228=HEAP32[(($227)>>2)];
 var $_sum2829=$14|4;
 var $229=(($mem+$_sum2829)|0);
 var $230=$229;
 var $231=HEAP32[(($230)>>2)];
 var $232=$223<<1;
 var $233=((15312+($232<<2))|0);
 var $234=$233;
 var $235=($228|0)==($234|0);
 if($235){label=68;break;}else{label=66;break;}
 case 66: 
 var $237=$228;
 var $238=HEAP32[((15288)>>2)];
 var $239=($237>>>0)<($238>>>0);
 if($239){label=76;break;}else{label=67;break;}
 case 67: 
 var $241=(($228+12)|0);
 var $242=HEAP32[(($241)>>2)];
 var $243=($242|0)==($16|0);
 if($243){label=68;break;}else{label=76;break;}
 case 68: 
 var $244=($231|0)==($228|0);
 if($244){label=69;break;}else{label=70;break;}
 case 69: 
 var $246=1<<$223;
 var $247=$246^-1;
 var $248=HEAP32[((15272)>>2)];
 var $249=$248&$247;
 HEAP32[((15272)>>2)]=$249;
 label=110;break;
 case 70: 
 var $251=($231|0)==($234|0);
 if($251){label=71;break;}else{label=72;break;}
 case 71: 
 var $_pre79=(($231+8)|0);
 var $_pre_phi80=$_pre79;label=74;break;
 case 72: 
 var $253=$231;
 var $254=HEAP32[((15288)>>2)];
 var $255=($253>>>0)<($254>>>0);
 if($255){label=75;break;}else{label=73;break;}
 case 73: 
 var $257=(($231+8)|0);
 var $258=HEAP32[(($257)>>2)];
 var $259=($258|0)==($16|0);
 if($259){var $_pre_phi80=$257;label=74;break;}else{label=75;break;}
 case 74: 
 var $_pre_phi80;
 var $260=(($228+12)|0);
 HEAP32[(($260)>>2)]=$231;
 HEAP32[(($_pre_phi80)>>2)]=$228;
 label=110;break;
 case 75: 
 _abort();
 throw "Reached an unreachable!";
 case 76: 
 _abort();
 throw "Reached an unreachable!";
 case 77: 
 var $262=$15;
 var $_sum6=((($14)+(16))|0);
 var $263=(($mem+$_sum6)|0);
 var $264=$263;
 var $265=HEAP32[(($264)>>2)];
 var $_sum78=$14|4;
 var $266=(($mem+$_sum78)|0);
 var $267=$266;
 var $268=HEAP32[(($267)>>2)];
 var $269=($268|0)==($262|0);
 if($269){label=83;break;}else{label=78;break;}
 case 78: 
 var $271=(($mem+$14)|0);
 var $272=$271;
 var $273=HEAP32[(($272)>>2)];
 var $274=$273;
 var $275=HEAP32[((15288)>>2)];
 var $276=($274>>>0)<($275>>>0);
 if($276){label=82;break;}else{label=79;break;}
 case 79: 
 var $278=(($273+12)|0);
 var $279=HEAP32[(($278)>>2)];
 var $280=($279|0)==($262|0);
 if($280){label=80;break;}else{label=82;break;}
 case 80: 
 var $282=(($268+8)|0);
 var $283=HEAP32[(($282)>>2)];
 var $284=($283|0)==($262|0);
 if($284){label=81;break;}else{label=82;break;}
 case 81: 
 HEAP32[(($278)>>2)]=$268;
 HEAP32[(($282)>>2)]=$273;
 var $R7_1=$268;label=90;break;
 case 82: 
 _abort();
 throw "Reached an unreachable!";
 case 83: 
 var $_sum10=((($14)+(12))|0);
 var $287=(($mem+$_sum10)|0);
 var $288=$287;
 var $289=HEAP32[(($288)>>2)];
 var $290=($289|0)==0;
 if($290){label=84;break;}else{var $R7_0=$289;var $RP9_0=$288;label=85;break;}
 case 84: 
 var $_sum9=((($14)+(8))|0);
 var $292=(($mem+$_sum9)|0);
 var $293=$292;
 var $294=HEAP32[(($293)>>2)];
 var $295=($294|0)==0;
 if($295){var $R7_1=0;label=90;break;}else{var $R7_0=$294;var $RP9_0=$293;label=85;break;}
 case 85: 
 var $RP9_0;
 var $R7_0;
 var $296=(($R7_0+20)|0);
 var $297=HEAP32[(($296)>>2)];
 var $298=($297|0)==0;
 if($298){label=86;break;}else{var $R7_0=$297;var $RP9_0=$296;label=85;break;}
 case 86: 
 var $300=(($R7_0+16)|0);
 var $301=HEAP32[(($300)>>2)];
 var $302=($301|0)==0;
 if($302){label=87;break;}else{var $R7_0=$301;var $RP9_0=$300;label=85;break;}
 case 87: 
 var $304=$RP9_0;
 var $305=HEAP32[((15288)>>2)];
 var $306=($304>>>0)<($305>>>0);
 if($306){label=89;break;}else{label=88;break;}
 case 88: 
 HEAP32[(($RP9_0)>>2)]=0;
 var $R7_1=$R7_0;label=90;break;
 case 89: 
 _abort();
 throw "Reached an unreachable!";
 case 90: 
 var $R7_1;
 var $310=($265|0)==0;
 if($310){label=110;break;}else{label=91;break;}
 case 91: 
 var $_sum21=((($14)+(20))|0);
 var $312=(($mem+$_sum21)|0);
 var $313=$312;
 var $314=HEAP32[(($313)>>2)];
 var $315=((15576+($314<<2))|0);
 var $316=HEAP32[(($315)>>2)];
 var $317=($262|0)==($316|0);
 if($317){label=92;break;}else{label=94;break;}
 case 92: 
 HEAP32[(($315)>>2)]=$R7_1;
 var $cond69=($R7_1|0)==0;
 if($cond69){label=93;break;}else{label=100;break;}
 case 93: 
 var $319=HEAP32[(($313)>>2)];
 var $320=1<<$319;
 var $321=$320^-1;
 var $322=HEAP32[((15276)>>2)];
 var $323=$322&$321;
 HEAP32[((15276)>>2)]=$323;
 label=110;break;
 case 94: 
 var $325=$265;
 var $326=HEAP32[((15288)>>2)];
 var $327=($325>>>0)<($326>>>0);
 if($327){label=98;break;}else{label=95;break;}
 case 95: 
 var $329=(($265+16)|0);
 var $330=HEAP32[(($329)>>2)];
 var $331=($330|0)==($262|0);
 if($331){label=96;break;}else{label=97;break;}
 case 96: 
 HEAP32[(($329)>>2)]=$R7_1;
 label=99;break;
 case 97: 
 var $334=(($265+20)|0);
 HEAP32[(($334)>>2)]=$R7_1;
 label=99;break;
 case 98: 
 _abort();
 throw "Reached an unreachable!";
 case 99: 
 var $337=($R7_1|0)==0;
 if($337){label=110;break;}else{label=100;break;}
 case 100: 
 var $339=$R7_1;
 var $340=HEAP32[((15288)>>2)];
 var $341=($339>>>0)<($340>>>0);
 if($341){label=109;break;}else{label=101;break;}
 case 101: 
 var $343=(($R7_1+24)|0);
 HEAP32[(($343)>>2)]=$265;
 var $_sum22=((($14)+(8))|0);
 var $344=(($mem+$_sum22)|0);
 var $345=$344;
 var $346=HEAP32[(($345)>>2)];
 var $347=($346|0)==0;
 if($347){label=105;break;}else{label=102;break;}
 case 102: 
 var $349=$346;
 var $350=HEAP32[((15288)>>2)];
 var $351=($349>>>0)<($350>>>0);
 if($351){label=104;break;}else{label=103;break;}
 case 103: 
 var $353=(($R7_1+16)|0);
 HEAP32[(($353)>>2)]=$346;
 var $354=(($346+24)|0);
 HEAP32[(($354)>>2)]=$R7_1;
 label=105;break;
 case 104: 
 _abort();
 throw "Reached an unreachable!";
 case 105: 
 var $_sum23=((($14)+(12))|0);
 var $357=(($mem+$_sum23)|0);
 var $358=$357;
 var $359=HEAP32[(($358)>>2)];
 var $360=($359|0)==0;
 if($360){label=110;break;}else{label=106;break;}
 case 106: 
 var $362=$359;
 var $363=HEAP32[((15288)>>2)];
 var $364=($362>>>0)<($363>>>0);
 if($364){label=108;break;}else{label=107;break;}
 case 107: 
 var $366=(($R7_1+20)|0);
 HEAP32[(($366)>>2)]=$359;
 var $367=(($359+24)|0);
 HEAP32[(($367)>>2)]=$R7_1;
 label=110;break;
 case 108: 
 _abort();
 throw "Reached an unreachable!";
 case 109: 
 _abort();
 throw "Reached an unreachable!";
 case 110: 
 var $371=$222|1;
 var $372=(($p_0+4)|0);
 HEAP32[(($372)>>2)]=$371;
 var $373=(($189+$222)|0);
 var $374=$373;
 HEAP32[(($374)>>2)]=$222;
 var $375=HEAP32[((15292)>>2)];
 var $376=($p_0|0)==($375|0);
 if($376){label=111;break;}else{var $psize_1=$222;label=113;break;}
 case 111: 
 HEAP32[((15280)>>2)]=$222;
 label=141;break;
 case 112: 
 var $379=$194&-2;
 HEAP32[(($193)>>2)]=$379;
 var $380=$psize_0|1;
 var $381=(($p_0+4)|0);
 HEAP32[(($381)>>2)]=$380;
 var $382=(($189+$psize_0)|0);
 var $383=$382;
 HEAP32[(($383)>>2)]=$psize_0;
 var $psize_1=$psize_0;label=113;break;
 case 113: 
 var $psize_1;
 var $385=$psize_1>>>3;
 var $386=($psize_1>>>0)<256;
 if($386){label=114;break;}else{label=119;break;}
 case 114: 
 var $388=$385<<1;
 var $389=((15312+($388<<2))|0);
 var $390=$389;
 var $391=HEAP32[((15272)>>2)];
 var $392=1<<$385;
 var $393=$391&$392;
 var $394=($393|0)==0;
 if($394){label=115;break;}else{label=116;break;}
 case 115: 
 var $396=$391|$392;
 HEAP32[((15272)>>2)]=$396;
 var $_sum19_pre=((($388)+(2))|0);
 var $_pre=((15312+($_sum19_pre<<2))|0);
 var $F16_0=$390;var $_pre_phi=$_pre;label=118;break;
 case 116: 
 var $_sum20=((($388)+(2))|0);
 var $398=((15312+($_sum20<<2))|0);
 var $399=HEAP32[(($398)>>2)];
 var $400=$399;
 var $401=HEAP32[((15288)>>2)];
 var $402=($400>>>0)<($401>>>0);
 if($402){label=117;break;}else{var $F16_0=$399;var $_pre_phi=$398;label=118;break;}
 case 117: 
 _abort();
 throw "Reached an unreachable!";
 case 118: 
 var $_pre_phi;
 var $F16_0;
 HEAP32[(($_pre_phi)>>2)]=$p_0;
 var $405=(($F16_0+12)|0);
 HEAP32[(($405)>>2)]=$p_0;
 var $406=(($p_0+8)|0);
 HEAP32[(($406)>>2)]=$F16_0;
 var $407=(($p_0+12)|0);
 HEAP32[(($407)>>2)]=$390;
 label=141;break;
 case 119: 
 var $409=$p_0;
 var $410=$psize_1>>>8;
 var $411=($410|0)==0;
 if($411){var $I18_0=0;label=122;break;}else{label=120;break;}
 case 120: 
 var $413=($psize_1>>>0)>16777215;
 if($413){var $I18_0=31;label=122;break;}else{label=121;break;}
 case 121: 
 var $415=((($410)+(1048320))|0);
 var $416=$415>>>16;
 var $417=$416&8;
 var $418=$410<<$417;
 var $419=((($418)+(520192))|0);
 var $420=$419>>>16;
 var $421=$420&4;
 var $422=$421|$417;
 var $423=$418<<$421;
 var $424=((($423)+(245760))|0);
 var $425=$424>>>16;
 var $426=$425&2;
 var $427=$422|$426;
 var $428=(((14)-($427))|0);
 var $429=$423<<$426;
 var $430=$429>>>15;
 var $431=((($428)+($430))|0);
 var $432=$431<<1;
 var $433=((($431)+(7))|0);
 var $434=$psize_1>>>($433>>>0);
 var $435=$434&1;
 var $436=$435|$432;
 var $I18_0=$436;label=122;break;
 case 122: 
 var $I18_0;
 var $438=((15576+($I18_0<<2))|0);
 var $439=(($p_0+28)|0);
 var $I18_0_c=$I18_0;
 HEAP32[(($439)>>2)]=$I18_0_c;
 var $440=(($p_0+20)|0);
 HEAP32[(($440)>>2)]=0;
 var $441=(($p_0+16)|0);
 HEAP32[(($441)>>2)]=0;
 var $442=HEAP32[((15276)>>2)];
 var $443=1<<$I18_0;
 var $444=$442&$443;
 var $445=($444|0)==0;
 if($445){label=123;break;}else{label=124;break;}
 case 123: 
 var $447=$442|$443;
 HEAP32[((15276)>>2)]=$447;
 HEAP32[(($438)>>2)]=$409;
 var $448=(($p_0+24)|0);
 var $_c=$438;
 HEAP32[(($448)>>2)]=$_c;
 var $449=(($p_0+12)|0);
 HEAP32[(($449)>>2)]=$p_0;
 var $450=(($p_0+8)|0);
 HEAP32[(($450)>>2)]=$p_0;
 label=137;break;
 case 124: 
 var $452=HEAP32[(($438)>>2)];
 var $453=($I18_0|0)==31;
 if($453){var $458=0;label=126;break;}else{label=125;break;}
 case 125: 
 var $455=$I18_0>>>1;
 var $456=(((25)-($455))|0);
 var $458=$456;label=126;break;
 case 126: 
 var $458;
 var $459=(($452+4)|0);
 var $460=HEAP32[(($459)>>2)];
 var $461=$460&-8;
 var $462=($461|0)==($psize_1|0);
 if($462){var $T_0_lcssa=$452;label=133;break;}else{label=127;break;}
 case 127: 
 var $463=$psize_1<<$458;
 var $T_071=$452;var $K19_072=$463;label=129;break;
 case 128: 
 var $465=$K19_072<<1;
 var $466=(($473+4)|0);
 var $467=HEAP32[(($466)>>2)];
 var $468=$467&-8;
 var $469=($468|0)==($psize_1|0);
 if($469){var $T_0_lcssa=$473;label=133;break;}else{var $T_071=$473;var $K19_072=$465;label=129;break;}
 case 129: 
 var $K19_072;
 var $T_071;
 var $471=$K19_072>>>31;
 var $472=(($T_071+16+($471<<2))|0);
 var $473=HEAP32[(($472)>>2)];
 var $474=($473|0)==0;
 if($474){label=130;break;}else{label=128;break;}
 case 130: 
 var $476=$472;
 var $477=HEAP32[((15288)>>2)];
 var $478=($476>>>0)<($477>>>0);
 if($478){label=132;break;}else{label=131;break;}
 case 131: 
 HEAP32[(($472)>>2)]=$409;
 var $480=(($p_0+24)|0);
 var $T_0_c16=$T_071;
 HEAP32[(($480)>>2)]=$T_0_c16;
 var $481=(($p_0+12)|0);
 HEAP32[(($481)>>2)]=$p_0;
 var $482=(($p_0+8)|0);
 HEAP32[(($482)>>2)]=$p_0;
 label=137;break;
 case 132: 
 _abort();
 throw "Reached an unreachable!";
 case 133: 
 var $T_0_lcssa;
 var $484=(($T_0_lcssa+8)|0);
 var $485=HEAP32[(($484)>>2)];
 var $486=$T_0_lcssa;
 var $487=HEAP32[((15288)>>2)];
 var $488=($486>>>0)<($487>>>0);
 if($488){label=136;break;}else{label=134;break;}
 case 134: 
 var $490=$485;
 var $491=($490>>>0)<($487>>>0);
 if($491){label=136;break;}else{label=135;break;}
 case 135: 
 var $493=(($485+12)|0);
 HEAP32[(($493)>>2)]=$409;
 HEAP32[(($484)>>2)]=$409;
 var $494=(($p_0+8)|0);
 var $_c15=$485;
 HEAP32[(($494)>>2)]=$_c15;
 var $495=(($p_0+12)|0);
 var $T_0_c=$T_0_lcssa;
 HEAP32[(($495)>>2)]=$T_0_c;
 var $496=(($p_0+24)|0);
 HEAP32[(($496)>>2)]=0;
 label=137;break;
 case 136: 
 _abort();
 throw "Reached an unreachable!";
 case 137: 
 var $498=HEAP32[((15304)>>2)];
 var $499=((($498)-(1))|0);
 HEAP32[((15304)>>2)]=$499;
 var $500=($499|0)==0;
 if($500){var $sp_0_in_i=15728;label=138;break;}else{label=141;break;}
 case 138: 
 var $sp_0_in_i;
 var $sp_0_i=HEAP32[(($sp_0_in_i)>>2)];
 var $501=($sp_0_i|0)==0;
 var $502=(($sp_0_i+8)|0);
 if($501){label=139;break;}else{var $sp_0_in_i=$502;label=138;break;}
 case 139: 
 HEAP32[((15304)>>2)]=-1;
 label=141;break;
 case 140: 
 _abort();
 throw "Reached an unreachable!";
 case 141: 
 return;
  default: assert(0, "bad label: " + label);
 }

}
Module["_free"] = _free;

function _calloc($n_elements,$elem_size){
 var label=0;

 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1=($n_elements|0)==0;
 if($1){var $req_0=0;label=4;break;}else{label=2;break;}
 case 2: 
 var $3=(Math_imul($elem_size,$n_elements)|0);
 var $4=$elem_size|$n_elements;
 var $5=($4>>>0)>65535;
 if($5){label=3;break;}else{var $req_0=$3;label=4;break;}
 case 3: 
 var $7=(((($3>>>0))/(($n_elements>>>0)))&-1);
 var $8=($7|0)==($elem_size|0);
 var $_=($8?$3:-1);
 var $req_0=$_;label=4;break;
 case 4: 
 var $req_0;
 var $10=_malloc($req_0);
 var $11=($10|0)==0;
 if($11){label=7;break;}else{label=5;break;}
 case 5: 
 var $13=((($10)-(4))|0);
 var $14=$13;
 var $15=HEAP32[(($14)>>2)];
 var $16=$15&3;
 var $17=($16|0)==0;
 if($17){label=7;break;}else{label=6;break;}
 case 6: 
 _memset($10, 0, $req_0)|0;
 label=7;break;
 case 7: 
 return $10;
  default: assert(0, "bad label: " + label);
 }

}
Module["_calloc"] = _calloc;


// EMSCRIPTEN_END_FUNCS
// EMSCRIPTEN_END_FUNCS

// Warning: printing of i64 values may be slightly rounded! No deep i64 math used, so precise i64 code not included
var i64Math = null;

// === Auto-generated postamble setup entry stuff ===

if (memoryInitializer) {
  function applyData(data) {
    HEAPU8.set(data, STATIC_BASE);
  }
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    applyData(Module['readBinary'](memoryInitializer));
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      applyData(data);
      removeRunDependency('memory initializer');
    }, function(data) {
      throw 'could not load memory initializer ' + memoryInitializer;
    });
  }
}

function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun'] && shouldRunNow) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
    Module.printErr('preload time: ' + (Date.now() - preloadStartTime) + ' ms');
  }

  ensureInitRuntime();

  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);

  initialStackTop = STACKTOP;

  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
    if (!Module['noExitRuntime']) {
      exit(ret);
    }
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}




function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    ensureInitRuntime();

    preMain();

    if (Module['_main'] && shouldRunNow) {
      Module['callMain'](args);
    }

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      if (!ABORT) doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;

function exit(status) {
  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;

  // exit the runtime
  exitRuntime();

  // TODO We should handle this differently based on environment.
  // In the browser, the best we can do is throw an exception
  // to halt execution, but in node we could process.exit and
  // I'd imagine SM shell would have something equivalent.
  // This would let us set a proper exit status (which
  // would be great for checking test exit statuses).
  // https://github.com/kripken/emscripten/issues/1371

  // throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;

function abort(text) {
  if (text) {
    Module.print(text);
    Module.printErr(text);
  }

  ABORT = true;
  EXITSTATUS = 1;

  throw 'abort() at ' + stackTrace();
}
Module['abort'] = Module.abort = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}

run();

// {{POST_RUN_ADDITIONS}}






// {{MODULE_ADDITIONS}}



//@ sourceMappingURL=bn.html.map