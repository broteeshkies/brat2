/* eslint-disable @typescript-eslint/camelcase */
import shuffle from 'lodash/shuffle'; // eslint-disable-line
import { IncomingMessage } from 'telegraf/typings/telegram-types'; // eslint-disable-line
import Action, { ActionProps } from './Action'; // eslint-disable-line

export class PolundraAction extends Action {
  constructor(props: ActionProps) {
    super(props);
    this.name = 'PolundraAction';
  }

  texts = [
    'Ларин чушка ебаная',
    'Сколько можно терпеть это гейство в чате...',
    'Бля Тольятти уже бухает',
    'Го бухать, я создал.',
    'Не проходи мимо, не будь равнодушным!',
    'ТАК, ЧЕЙ ПИСЮН?!!',
  ];
  users = [
    'isuvorov',
    'volkovpishet',
    'natavts',
    'anoru',
    'immuzov',
    'antouhou',
    'yukioru',
    'durob',
    'AtNovember',
    'THEHVZE',
    'flood7',
    'romankalinkin',
    'Andru_x',
    'vozilov',
    'NightRomantic',
    'selslack',
    'Sanich63',
    'hinex',
    'xfocuse',
    'edinstvennyi',
    'ma3xxx',
    'leyoiv',
    'seegi',
    'ArkadyB',
    'hopacha',
    'ga2mer',
    'unipon',
    'dkorostelev',
    'demeliorator',
    'Grishot',
    'dinogameandroid',
    'Seempoke',
    'nenatta',
    'unrealjke',
    'kreynes',
    'rsega',
    'Khorunzhev',
    'grunindesign',
    'dwnste',
    'MagzNikitin',
    'fpsthirty',
    'zounds',
    'arkady_b',
    'MaxOlin33',
    'metallcorn',
    'dmitryvlasov',
    'aboolean',
    'f1x3rr',
    'Nikita_Solovev',
    'rogozhko',
    'Ghost910',
    'RoyPalmer',
    'superkate',
    'bethlis',
    'teslaaa',
    'romankusty',
    'iamallah_n',
    'Tetrisi',
    'ivbra',
    'OviNik',
    'n1ght_fox',
    'bangdbang',
    'satiataoff',
    'shmelevs',
    'konstantinevdokimov',
    'SergioBabinetsC',
  ];
  userIds: number[] = [];

  public test(message: IncomingMessage): boolean {
    const userId = message.from?.id;
    if (userId && this.userIds.indexOf(userId) === -1) {
      this.userIds.push(userId);
      // console.log('userIds', this.userIds);
    }
    if (!message.text) return false;
    const text = message.text.toLowerCase();
    return text.match(/полундра|аларма|алярма/) != null;
  }

  public exec(message: IncomingMessage): void {
    const chatId = message.chat.id || message.from?.id;
    if (!chatId) return;
    const users = shuffle(this.userIds);
    const getUserByNumber = (i: number): number => users[i % users.length];
    const text = shuffle(this.texts)[0]
      .split('')
      .map((letter, num) => `[${letter}](tg://user?id=${getUserByNumber(num)})`)
      .join('');

    // [Daniil Gentili](mention:@danogentili)
    // @immuzov(T)ext
    this.bot.telegram.sendMessage(chatId, text, {
      reply_to_message_id: message.message_id,
      parse_mode: 'Markdown',
    });
  }
}
