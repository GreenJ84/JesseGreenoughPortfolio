const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const source = readFileSync(new URL('../src/app/_utils/Database.ts', `file://${__filename}`), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2018, esModuleInterop: true },
}).outputText;

function databaseRuntime(env) {
  const clients = [];
  class MongoClient {
    constructor(uri) {
      this.uri = uri;
      clients.push(this);
    }
    db(name) { return { name, client: this }; }
    connect() { assert.fail('Import must not connect to MongoDB'); }
    close() { assert.fail('Import must not close the application client'); }
  }
  const context = vm.createContext({
    process: { env },
    exports: {},
    require(name) {
      if (name === 'mongodb') return { MongoClient };
      if (name === 'dotenv') return { config() {} };
      assert.fail(`Unexpected startup dependency: ${name}`);
    },
  });
  return {
    clients,
    load() {
      context.exports = {};
      vm.runInContext(`(function () { ${compiled}\n })()`, context);
      return context.exports;
    },
  };
}

test('database import is lazy and keeps the development client across reloads', () => {
  const runtime = databaseRuntime({ NODE_ENV: 'development' });
  const first = runtime.load();
  const second = runtime.load();
  assert.equal(runtime.clients.length, 1);
  assert.equal(first.DB.client, second.DB.client);
  assert.equal(first.DB.client.uri, 'mongodb://localhost:27017');
  assert.equal(first.DB.name, 'PersonalPortfolio');
  assert.equal(first.DB_INFO.collections.WORK, 'work');
  assert.equal(first.DB_INFO.collections.SWORK, 'secondaryExperience');
});

test('explicit development database configuration is respected', () => {
  const runtime = databaseRuntime({ NODE_ENV: 'development', DB_CONN_STRING: 'mongodb://example.test:27017' });
  assert.equal(runtime.load().DB.client.uri, 'mongodb://example.test:27017');
});

test('production requires explicit database configuration before creating a client', () => {
  const runtime = databaseRuntime({ NODE_ENV: 'production', DB_CONN_STRING: '  ' });
  assert.throws(() => runtime.load(), /DB_CONN_STRING must be configured/);
  assert.equal(runtime.clients.length, 0);
});

test('configured production import creates no connection or migration activity', () => {
  const runtime = databaseRuntime({ NODE_ENV: 'production', DB_CONN_STRING: 'mongodb://example.test:27017' });
  assert.equal(runtime.load().DB.client.uri, 'mongodb://example.test:27017');
});
