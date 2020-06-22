import fs from 'fs';

export const { tlgrm_token, weather_token, port } = process.env;

export const key = fs.readFileSync('/etc/letsencrypt/archive/storage.ekinchin.ru/privkey1.pem');
export const cert = fs.readFileSync('/etc/letsencrypt/archive/storage.ekinchin.ru/fullchain1.pem');
export const ca = fs.readFileSync('/etc/letsencrypt/archive/storage.ekinchin.ru/chain1.pem');
