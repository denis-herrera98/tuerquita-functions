
import * as functions from 'firebase-functions';
import * as express from 'express';
import  { registerSummoner, searchSummonerByDiscordID, searchAccountByDiscordID }  from './handlers/accounts';

const app = express();

app.post('/newAccount', registerSummoner);
app.get('/searchSummoner/:id', searchSummonerByDiscordID);
app.get('/searchAccount/:id', searchAccountByDiscordID)

exports.api = functions.https.onRequest(app);
