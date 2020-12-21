import { Request, Response, NextFunction } from 'express'
import firebase from 'firebase';

import Admin, { db }  from '../utils/firebase-app';

export const registerSummoner = async (req: Request, res: Response) => {

  const { discordID, accountId,  puuid, regionURL, summonerId } = req.body;

  const accountsRef = db.collection('summoners');

  const snapshot = await accountsRef.where('discordID', '==', discordID).where('puuid', '==', puuid).get();

  if (snapshot.empty) {

  await registerAccount(discordID);

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

  } else {
      res.status(409).send("User already added account");
  }

};

const registerAccount = async (discordID: string) => {

  const accountRef = db.collection('accounts').doc(discordID);
  const doc = await accountRef.get();

  if(!doc.exists){
    await db.collection('accounts').doc(discordID).set({premium: false});
  }

}

export const searchSummonerByDiscordID = (req: Request, res: Response ) => {

  const id = req.params.id;

  db.collection('summoners').where('discordID', "==", id)
    .get().then(( querySnapshot: any) => {

      if (querySnapshot.empty){

        res.status(404).send("User not found")

      } else {

        const accounts: any = [];

        querySnapshot.forEach((doc: any) => {
          accounts.push({
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

export const searchAccountByDiscordID = (req: Request, res: Response ) => {

  const id = req.params.id;

  const accountRef = db.collection('accounts').doc(id);
  accountRef.get().then((doc: any) => {

    if(doc.exists){
      res.status(200).json(doc.data());
    } else {
      res.status(404).send("User not found")
    }

  }).catch((error: any) => {
    console.error(error);
    res.status(400).json(error);
  });
};

