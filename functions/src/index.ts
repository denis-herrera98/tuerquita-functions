import * as functions from 'firebase-functions';
import * as express from 'express';
import { registerSummoner, searchSummonerByDiscordID, searchAccountByDiscordID }  from './handlers/accounts';
import { deleteWeebHook, deleteGuild, searchGuildConfiguration, setGuildLanguage, setGuildRegions, deleteGuildRegion, createGuildWeebHook }  from './handlers/guilds';
import { postTeam } from './handlers/teams';

const app = express();

//ACCOUNTS
app.post('/accounts/register', registerSummoner);
app.get('/accounts/:id', searchAccountByDiscordID)

//SUMMONER
app.get('/summoners/:id', searchSummonerByDiscordID);

//GUILDS
app.post('/guilds/set-language', setGuildLanguage);
app.post('/guilds/add-region', setGuildRegions);
app.post('/guilds/delete-region', deleteGuildRegion);
app.get('/guilds/:id', searchGuildConfiguration);
app.delete('/guilds/delete/:id', deleteGuild)

//WEEBHOOKS
app.post('/weebhook/create', createGuildWeebHook);
app.delete('/weebhook/delete/:id', deleteWeebHook);

//TEAMS
app.post('/teams/post', postTeam);
exports.api = functions.https.onRequest(app);
