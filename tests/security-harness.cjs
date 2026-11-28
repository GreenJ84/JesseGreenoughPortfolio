const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');

// Executes actual TypeScript modules with request, database and mail boundaries replaced.
// Each harness has an isolated module cache, environment and global scope.
exports.loadSource = function loadSource(mocks = {}, env = {}) {
  const cache = new Map();
  const context = vm.createContext({
    process: { env }, console: { ...console, error() {} },
    Buffer, Date, Error, URL, URLSearchParams, FormData, File, Blob, Headers, Request, Response, fetch: mocks.fetch ?? fetch,
    TextEncoder, TextDecoder, Uint8Array, ReadableStream, AbortController, AbortSignal,
  });
  function load(file) {
    file = file.startsWith('/') ? file : path.join(root, file);
    if (Object.hasOwn(mocks, file)) return mocks[file];
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    }).outputText;
    function requireSource(name) {
      if (Object.hasOwn(mocks, name)) return mocks[name];
      if (name === 'server-only') return {};
      if (name.startsWith('.') || name.startsWith('@/')) {
        const resolved = name.startsWith('@/') ? path.join(root, 'src', name.slice(2)) : path.resolve(path.dirname(file), name);
        const target = fs.existsSync(`${resolved}.ts`) ? `${resolved}.ts` : resolved;
        return load(target);
      }
      return require(name);
    }
    vm.runInContext(`(function (require, module, exports) { ${code}\n})`, context)(requireSource, module, module.exports);
    return module.exports;
  }
  return load;
};
exports.sourcePath = relative => path.join(root, relative);
