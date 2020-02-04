import { Telegram } from 'telegraf';

export type ActionProps = {
  bot: Telegram;
  [name: string]: any;
};

export interface IAction {
  // new (props: ActionProps): Action;
  bot: Telegram;
  name: string;
  log(): void;
  test?(): boolean;
  exec?(): void;
}

export default class Action implements IAction {
  public bot: Telegram;
  public name: string;
  constructor(props: ActionProps) {
    const { bot } = props;
    this.bot = bot;
    this.name = 'Action';
  }

  // test(message) {
  // }

  public log(...args: any[]): void {
    if (__DEV__) {
      console.log(`[${this.name}]`, ...args); // eslint-disable-line no-console
    }
  }
}
