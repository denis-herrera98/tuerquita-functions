import { Request, Response, NextFunction } from 'express'
import Admin, { db }  from '../utils/firebase-app';
import { findRegion } from '../helpers/regions';
import axios from 'axios';
import { embedGenerator } from '../helpers/lkfteam_embed';

export const postTeam = async (req: Request, res: Response) => {

  try {

    await db.collection('lkfteam').add(JSON.parse(JSON.stringify(req.body)));

    const { info, data, author } = req.body;
    const guildsRef = db.collection('guilds');
    const region = findRegion(data[0].region);
    const guilds = await guildsRef.where('regions', 'array-contains', region).where('weebhook_url', '!=', null).get();

    if (guilds.empty){
      console.log('No matching guilds with that region', region);
      return res.status(404).send('Not guilds in that region!');
    }

    const urls: string[] = [];

    guilds.forEach(doc => {
        urls.push(doc.data().weebhook_url);
    });


    const promises = [];

    const embed = embedGenerator(data, info, author);

    for (const url of urls) {
      promises.push(
        axios.post(
          url,
          embed
        )
      );
    }



    const invalidUrls: string[] = [];

    await Promise.all(promises.map(p => p.catch(e => {

      if (e.code === 'ENOTFOUND'){
        invalidUrls.push(e.config.url);
      }

    })))
      .catch(e => {
        console.error(e)
      });


    await deleleInvalidWeebhooks(invalidUrls);

    return res.status(200).send('lkfteam send!')

  } catch (error){
    console.error('Error postTeam');
    return res.status(500).send('Internal error')
  }

}

const deleleInvalidWeebhooks = async (weebhooks: string[]) => {

  const FieldValue = Admin.firestore.FieldValue;

  for (const url of weebhooks) {

    console.log(url);
    const snapshot = await db.collection('guilds').where('weebhook_url', '==', url).get();

    snapshot.forEach(async (doc) => {
      await doc.ref.update({
        weebhook_url: FieldValue.delete(),
      });

    })

  }

}
