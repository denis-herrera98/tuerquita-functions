import * as functions from 'firebase-functions';
import * as express from 'express';
import  { registerSummoner, searchSummonerByDiscordID, searchAccountByDiscordID }  from './handlers/accounts';
import  { searchGuildConfiguration, setGuildLanguage, setGuildRegions }  from './handlers/guilds';

const app = express();

//ACCOUNTS
app.post('/accounts/register', registerSummoner);
app.get('/accounts/:id', searchAccountByDiscordID)

//SUMMONER
app.get('/summoners/:id', searchSummonerByDiscordID);

//GUILDS
app.post('/guilds/set-language', setGuildLanguage);
app.post('/guilds/add-region', setGuildRegions);
app.get('/guilds/:id', searchGuildConfiguration);

exports.api = functions.https.onRequest(app);
