import { Request, Response, NextFunction } from 'express'
import Admin, { db }  from '../utils/firebase-app';

export const checkIfDocumentsExists = async( collection: string, docID: string) => {

    return db.collection(collection).doc(docID).get()
        .then(doc => {
            if (!doc.exists){
                return null
            }
            return doc;
        }).catch(error => {
            console.log(error);
            return null
        });


}
