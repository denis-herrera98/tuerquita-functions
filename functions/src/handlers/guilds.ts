import { Request, Response, NextFunction } from 'express'
import Admin, { db }  from '../utils/firebase-app';
import { checkIfDocumentsExists } from '../helpers/firestore';

export const searchGuildConfiguration = async (req: Request, res: Response) => {

  const id = req.params.id;

  const doc = await checkIfDocumentsExists('guilds', id);

  if (!doc) {
    return res.status(404).send('Guild does not exists')
  } else {
    return res.status(200).json(doc.data());
  }

}


export const setGuildLanguage = async (req: Request, res: Response) => {

  const { idGuild, language } = req.body;

  try {

    const doc = await checkIfDocumentsExists('guilds', idGuild);

    if (!doc){
      await createGuildDoc(idGuild, {language})
    } else {
      await db.collection('guilds').doc(idGuild).set({language}, {merge: true});
    }

    return res.status(200).send('Guild language changed');

  } catch (error){
    console.log(error);
    return res.status(500).json(error);
  }
}


export const setGuildRegions = async (req: Request, res: Response) => {

  const { idGuild, region } = req.body;

  try {

    const doc = await checkIfDocumentsExists('guilds', idGuild);

    const regions = [region];

    if (!doc){
      await createGuildDoc(idGuild, {regions});
    } else {

      const guildRef = db.collection('guilds').doc(idGuild);
      await guildRef.update({
        regions: Admin.firestore.FieldValue.arrayUnion(region),
      });
    }

    return res.status(200).send('Region added');
  } catch (error){
    console.log(error);
    return res.status(500).json(error)
  }
}


export const deleteGuildRegion = async (req: Request, res: Response) => {

  const { idGuild, region } = req.body;

  try {

    const doc = await checkIfDocumentsExists('guilds', idGuild);

    if (doc){

      const guildRef = db.collection('guilds').doc(idGuild);

      await guildRef.update({
        regions: Admin.firestore.FieldValue.arrayRemove(region),
      });

    return res.status(200).send('Region deleted');

    } else {

    return res.status(404).send('Guild does not exists')

    }

  } catch (error){
    console.log(error);
    return res.status(500).json(error)
  }
}

const createGuildDoc = (idGuild: string, data: any) => {

  console.log(data);
  return db.collection('guilds').doc(idGuild).set(data);

}
