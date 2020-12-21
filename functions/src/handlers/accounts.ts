import { Request, Response, NextFunction } from 'express'
import Admin, { db }  from '../utils/firebase-app';

export const registerSummoner = async (req: Request, res: Response) => {

  const { discordID, accountId,  puuid, regionURL, summonerId } = req.body;

  const accountsRef = db.collection('summoners');
  const snapshot = await accountsRef.where('discordID', '==', discordID).where('puuid', '==', puuid).get();

  if (!snapshot.empty) {
    return res.status(409).send('You have already registered that account')
  }
  console.log('sigio la caca');

  const userAccount = await db.collection('accounts').doc(discordID).get();

  if (!userAccount.exists){
    await registerAccount(discordID);
  }

  console.log(userAccount.data());

  if (userAccount.data()?.premium ){

    db.collection('summoners').add({
      puuid,
      discordID,
      regionURL,
      accountId,
      summonerId,
    }).then(() => {
      return res.status(200).send('Summoner added')
    }).catch((error: any) => {
      console.error(error);
      return res.status(400).json({message: "Account could not be added", error: error});
    });

  } else {

    const oldAccountSnapshotQuery = await db.collection('summoners').where('discordID', "==", discordID).get();

    if (!oldAccountSnapshotQuery.empty){
     try {
      oldAccountSnapshotQuery.forEach((querySnapshot: any) => {
       querySnapshot.ref.delete();
      })
     } catch (error) {
      return res.status(400).send('Account could not be added')
     }

    }

    db.collection('summoners').add({
      puuid,
      discordID,
      regionURL,
      accountId,
      summonerId,
    }).then(() => {

      return res.status(200).send('The account was overwritten')
    }).catch((error: any) => {
      console.error(error);
      return res.status(400).json({message: "Can not added summoner", error: error});
    });



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

        return res.status(404).send("User not found")

      } else {

        const accounts: any = [];

        querySnapshot.forEach((doc: any) => {
          accounts.push({
            ...doc.data(),
          });
        });

        return res.status(200).json(accounts);

      }
    }).catch((error: any) => {
      console.error(error);
      return res.status(400).json(error);
    });
};

export const searchAccountByDiscordID = (req: Request, res: Response ) => {

  const id = req.params.id;

  const accountRef = db.collection('accounts').doc(id);
  accountRef.get().then((doc: any) => {

    if(doc.exists){
      return res.status(200).json(doc.data());
    } else {
      return res.status(404).send("User not found")
    }

  }).catch((error: any) => {
    console.error(error);
    return res.status(400).json(error);
  });
};

