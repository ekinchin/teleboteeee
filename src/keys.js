import fs from 'fs';

export const { tlgrm_token, weather_token, port } = process.env;

export const key = fs.readFileSync('cert/privkey1.pem');
export const cert = fs.readFileSync('cert/fullchain1.pem');
export const ca = fs.readFileSync('cert/chain1.pem');
