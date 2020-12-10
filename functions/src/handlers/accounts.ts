import { Request, Response, NextFunction } from 'express'
import firebase from 'firebase';

const { db, admin } = require('../utils/firebase-app');

export const registerAccount = (req: Request, res: Response, next: NextFunction) => {

  const { discordID, accountId,  puuid, regionURL, summonerId } = req.body;

  db.collection('summoners').add({
    puuid,
    discordID,
    regionURL,
    accountId,
    summonerId,
  }).then(() => {
    res.status(200).send('Summoner added')
  })
    .catch((error: any) => {
      console.error(error);
      res.status(400).json({message: "Can not added summoner", error: error});
    });
};

export const searchByDiscordID = (req: Request, res: Response, next: NextFunction) => {

  const id = req.params.id;

  db.collection('summoners').where('discordID', "==", id)
    .get().then(( querySnapshot: firebase.firestore.QuerySnapshot) => {

      if (querySnapshot.empty){

        res.status(404).send("User not found")

      } else {

        const accounts: any = [];

        querySnapshot.forEach((doc: any) => {
          accounts.push({
            accountID: doc.id,
            ...doc.data(),
          });
        });

        res.status(200).json(accounts);

      }


    }).catch((error: any) => {
      console.error(error);
      res.status(400).json(error);
    });

};
