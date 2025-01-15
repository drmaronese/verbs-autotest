import * as BEModels from "../models/be-models";
import * as DBModels from "../models/db-models";
import { BEResponseAllVerbs } from '../models/be-models';

// BACKEND
//
export function mapToBEAllVerbsResponse(beVerbs: BEModels.BEVerb[]): BEModels.BEResponseAllVerbs {
  return {
    rows: beVerbs
  };
}

export function mapToBECheckVerbsResponse(beCheckVerbs: BEModels.BECheckVerb[], rowsNumber?: number, score?: number): BEModels.BEResponseCheckVerbs {
  return {
    rows: beCheckVerbs,
    rowsNumber: rowsNumber,
    score: score
  };
}

export function mapToBEVerbs(dbVerbs: DBModels.DBVerb[]): BEModels.BEVerb[] {

  let verbs: BEModels.BEVerb[] = [];

  dbVerbs.forEach((dbVerb) => {
    verbs.push(mapToBEVerb(dbVerb));
  });

  return verbs;
}

export function mapToBEVerb(dbVerb: DBModels.DBVerb): BEModels.BEVerb {

  return {
    id: dbVerb.id,
    baseForm: dbVerb.baseForm,
    simplePast: dbVerb.simplePast,
    pastParticiple: dbVerb.pastParticiple,
    meaning: dbVerb.meaning
  } as BEModels.BEVerb;
}

