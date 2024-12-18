import * as DbModels from "../models/db-models";
import * as ApiModels from "../models/api-models";

export function mapToVerbs(dbVerbs: DbModels.DBVerb[]): ApiModels.Verb[] {

  let verbs: ApiModels.Verb[] = [];

  dbVerbs.forEach((dbVerb) => {
    verbs.push(mapToVerb(dbVerb));
  });

  return verbs;
}

export function mapToVerb(dbVerb: DbModels.DBVerb): ApiModels.Verb {

  return {
    id: dbVerb.id,
    baseForm: dbVerb.baseForm,
    simplePast: dbVerb.simplePast,
    pastParticiple: dbVerb.pastParticiple
  }
}
