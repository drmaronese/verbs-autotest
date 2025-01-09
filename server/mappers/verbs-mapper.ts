import * as BEModels from "../models/be-models";
import * as DBModels from "../models/db-models";
import * as FEModels from "../models/fe-models";

// BACKEND
//
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
    pastParticiple: dbVerb.pastParticiple
  }
}

// FRONTEND
//
export function mapToFEVerbs(dbVerbs: BEModels.BEVerb[]): FEModels.FEVerb[] {

  let verbs: FEModels.FEVerb[] = [];

  dbVerbs.forEach((feVerb) => {
    verbs.push(mapToFEVerb(feVerb));
  });

  return verbs;
}

export function mapToFEVerb(beVerb: BEModels.BEVerb): FEModels.FEVerb {

  return {
    id: beVerb.id,
    baseForm: beVerb.baseForm + "",
    simplePast: beVerb.simplePast + "",
    pastParticiple: beVerb.pastParticiple + ""
  }
}

