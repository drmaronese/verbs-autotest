import * as DBModels from "../models/db-models";
import * as BEModels from "../models/be-models";

export function mapToVerbs(dbVerbs: DBModels.DBVerb[]): BEModels.BEVerb[] {

  let verbs: BEModels.BEVerb[] = [];

  dbVerbs.forEach((dbVerb) => {
    verbs.push(mapToVerb(dbVerb));
  });

  return verbs;
}

export function mapToVerb(dbVerb: DBModels.DBVerb): BEModels.BEVerb {

  return {
    id: dbVerb.id,
    baseForm: dbVerb.baseForm,
    simplePast: dbVerb.simplePast,
    pastParticiple: dbVerb.pastParticiple
  }
}
