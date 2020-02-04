import ready from '@lskjs/utils/polyfill';
import App from './App';
import config from './config';

ready();

const app = new App({ config });
app.start();
