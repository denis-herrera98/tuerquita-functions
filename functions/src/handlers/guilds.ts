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
    return res.status(500).json('An error ocurred')
  }
}

export const createGuildWeebHook = async (req: Request, res: Response) => {

  try {

  const { id, guild_id, name, token, url } = req.body;
  const guildRef = db.collection('guilds').doc(guild_id);


  await guildRef.set({
    weebhook_id: id,
    weebhook_name: name,
    weebhook_token: token,
    weebhook_url: url,
  }, {merge: true});

  return res.status(200).send('Weebhook added');

  } catch (error){
    console.log(error);
    return res.status(500).json(error)
  }
}


export const deleteWeebHook = async (req: Request, res: Response) => {

  try {

    const id = req.params.id;
    const FieldValue = Admin.firestore.FieldValue;
    const guildRef = db.collection('guilds').doc(id);

    await guildRef.update({
      weebhook_url: FieldValue.delete(),
      weebhook_name: FieldValue.delete(),
      weebhook_id: FieldValue.delete(),
      weebhook_token: FieldValue.delete(),
    });

    return res.status(200).send('Weebhook delete');

  } catch (error){
    console.log(error);
    return res.status(500).json(error)
  }
}

export const deleteGuild = async (req: Request, res: Response) => {

  try {

    const id = req.params.id;
    await db.collection('guilds').doc(id).delete();

    return res.status(200).send('Guild delete');

  } catch (error){
    console.log(error);
    return res.status(500).json(error)
  }
}



const createGuildDoc = (idGuild: string, data: any) => {
  return db.collection('guilds').doc(idGuild).set(data);
}
