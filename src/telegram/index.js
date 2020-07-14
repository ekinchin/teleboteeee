/* eslint-disable camelcase */
import { URL } from 'url';
import request from '../request';

const { TELEGRAM_TOKEN } = process.env;
const WWWTELEGRAM = 'https://api.telegram.org/';

const getWebhookInfo = async () => {
  const telegramUrl = new URL(WWWTELEGRAM);
  telegramUrl.pathname = `bot${TELEGRAM_TOKEN}/getWebhookInfo`;
  return request(telegramUrl, {}, 'GET')();
};

const setWebhook = async (url) => {
  const telegramUrl = new URL(WWWTELEGRAM);
  telegramUrl.pathname = `bot${TELEGRAM_TOKEN}/setWebhook`;
  telegramUrl.searchParams.append(
    'url',
    url,
  );
  return request(telegramUrl, {}, 'GET')();
};

const sendMessage = async (chat_id, text, reply_markup) => {
  const telegramUrl = new URL(WWWTELEGRAM);
  telegramUrl.pathname = `bot${TELEGRAM_TOKEN}/sendMessage`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const data = {
    method: 'sendMessage',
    chat_id,
    text,
    reply_markup,
  };
  if (!chat_id || !text) return Error('undefined parameters');
  return request(telegramUrl, headers, 'POST', JSON.stringify(data))();
};

const connect = async (serverUrl) => {
  let parsed = {};
  try {
    const webhookinfo = await getWebhookInfo();
    parsed = JSON.parse(webhookinfo);
  } catch (error) {
    return Error(error);
  }
  const { result } = parsed;
  const { url } = result;
  if (url === serverUrl) {
    return result;
  }
  try {
    const webhook = await setWebhook(serverUrl);
    parsed = JSON.parse(webhook);
  } catch (error) {
    return Error(error);
  }
  return parsed;
};

// connect('https://storage.ekinchin.ru:8443')
//   .then((result) => { console.log(result); })
//   .catch((err) => { console.log(err); });


export {
  getWebhookInfo, setWebhook, sendMessage, connect,
};
