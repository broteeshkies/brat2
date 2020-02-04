/* eslint-disable no-console */
import ServerApp from '@lskjs/server';

export default class App extends ServerApp {
  async init() {
    await super.init();
    console.log('Fucking init');
  }
  getModels() {
    return {
      UserModel: require('./UserModel').default(this),
    };
  }
  async run() {
    await super.run();
    console.log('Fucking run');
  }
}
