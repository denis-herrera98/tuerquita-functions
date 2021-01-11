import { Request, Response, NextFunction } from 'express'
import Admin, { db }  from '../utils/firebase-app';
import { findRegion } from '../helpers/regions';
import axios from 'axios';
import { embedGenerator } from '../helpers/lkfteam_embed';

export const postTeam = async (req: Request, res: Response) => {

  try {


    await db.collection('lkfteam').add(req.body,);

    const { info, data, author } = req.body;
    const guildsRef = db.collection('guilds');
    const region = findRegion(data[0].region);
    const guilds = await guildsRef.where('regions', 'array-contains', region).get();

    if (guilds.empty){
      console.log('No matching guilds with that region', region);
      return res.status(404).send('Not guilds in that region!');
    } else {

      const urls: string[] = [];

      guilds.forEach(doc => {
        if (doc.data().weebhook?.url){
          urls.push(doc.data().weebhook.url);
        }
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
      res.status(200).send('lkfteam send!')

      return Promise.all(promises);


    }
  } catch (error){
    console.log(error);
    return res.status(500).send('Internal error')
  }

}


