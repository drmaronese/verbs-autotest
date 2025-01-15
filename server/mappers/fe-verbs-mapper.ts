import * as BEModels from "../models/be-models";
import { BEResponseAllVerbs, BEResponseCheckVerbs } from '../models/be-models';
import * as FEModels from "../models/fe-models";

// FRONTEND
//
function getResultOk() {
  return {
    code: "0",
    message: "OK"
  }
}

export function mapToFEResponseVerbs(beAllVerbsResponse: BEResponseAllVerbs): FEModels.FEResponseVerbs {
  return {
    ...getResultOk(),
    rows: mapToFEVerbs(beAllVerbsResponse.rows)
  };
}

export function mapToFEResponseCheckVerbs(beCheckVerbsResponse: BEResponseCheckVerbs): FEModels.FEResponseCheckVerbs {
  return {
    ...getResultOk(),
    rows: mapToFECheckVerbs(beCheckVerbsResponse.rows),
    rowsNumber: beCheckVerbsResponse.rowsNumber,
    score: beCheckVerbsResponse.score
  };
}

export function mapToFEVerbs(beVerbs: BEModels.BEVerb[]): FEModels.FEVerb[] {

  let feVerbs: FEModels.FEVerb[] = [];

  beVerbs.forEach((verb) => {
    feVerbs.push(mapToFEVerb(verb));
  });

  return feVerbs;
}

export function mapToFEVerb(beVerb: BEModels.BEVerb): FEModels.FEVerb {

  return {
    id: beVerb.id,
    baseForm: beVerb.baseForm,
    simplePast: beVerb.simplePast,
    pastParticiple: beVerb.pastParticiple,
    meaning: beVerb.meaning
  }
}

export function mapToFECheckVerbs(beCheckVerbs: BEModels.BECheckVerb[]): FEModels.FECheckVerb[] {

  let feCheckVerbs: FEModels.FECheckVerb[] = [];

  beCheckVerbs.forEach((beCheckVerb) => {
    feCheckVerbs.push(mapToFECheckVerb(beCheckVerb));
  });

  return feCheckVerbs;
}

export function mapToFECheckVerb(beCheckVerb: BEModels.BECheckVerb): FEModels.FECheckVerb {

  return {
    id: beCheckVerb.id,
    baseForm: beCheckVerb.baseForm,
    simplePast: beCheckVerb.simplePast,
    pastParticiple: beCheckVerb.pastParticiple,
    meaning: beCheckVerb.meaning,

    baseFormCorrect: beCheckVerb.baseFormCorrect,
    simplePastCorrect: beCheckVerb.simplePastCorrect,
    pastParticipleCorrect: beCheckVerb.pastParticipleCorrect,

    baseFormPreset: beCheckVerb.baseFormPreset,
    simplePastPreset: beCheckVerb.simplePastPreset,
    pastParticiplePreset: beCheckVerb.pastParticiplePreset
  }
}

