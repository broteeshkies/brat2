import ServerApp from '@lskjs/server';
import Telegraf from 'telegraf';
import mapValues from 'lodash/mapValues';
import forEach from 'lodash/forEach';
import * as actionClasses from './actions';  //eslint-disable-line

export default class App extends ServerApp {
  async init() {
    await super.init();
    if (this.config.telegram) {
      this.bot = new Telegraf(this.config.telegram.token);
      this.bot.startPolling();
      this.actionClasses = actionClasses;
      this.actions = mapValues(this.actionClasses, ActionClass => {
        return new ActionClass({ bot: this.bot });
      });
    }
  }
  startedAt = new Date();
  getModels() {
    return {
      UserModel: require('./UserModel').default(this),
    };
  }
  async onMessage({ message }) {
    if (__DEV__) console.log('[M] ', message); // eslint-disable-line no-console
    if (message.date * 1000 < this.startedAt) return false;
    forEach(this.actions, action => {
      action.log('test');
      try {
        if (action.test(message)) {
          action.log('exec');
          action.exec(message);
        }
      } catch (err) {
        console.error(`Error in ${action.name}`, err); // eslint-disable-line no-console
      }
    });
    return false;
  }
  async run() {
    await super.run();
    if (this.bot) {
      // this.bot.on('text', this.onMessage.bind(this));
      this.bot.command('идинахуй', ctx => {
        // Explicit usage
        ctx.telegram.leaveChat(ctx.message.chat.id);

        // Using context shortcut
        ctx.leaveChat();
      });
      this.bot.on('text', this.onMessage.bind(this));
    }
    if (this.actions) {
      forEach(this.actions, action => {
        if (action.run) action.run();
      });
    }
  }
}
