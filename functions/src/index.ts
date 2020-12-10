
import * as functions from 'firebase-functions';
import * as express from 'express';
import  { registerAccount, searchByDiscordID }  from './handlers/accounts';

const app = express();

app.post('/newAccount', registerAccount);
app.get('/searchSummoner/:id', searchByDiscordID);

exports.api = functions.https.onRequest(app);
