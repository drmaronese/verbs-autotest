import { Request, Response } from "express";
import * as queries from "../../database/queries"
import { BEVerb } from "../../models/be-models";
import { FECheckVerb, ResponseCheckVerbs } from '../../models/fe-models';
import * as VerbsMapper from "../../mappers/verbs-mapper";

export default async function checkVerbs(req: Request, resp: Response) {
  console.log("Check Verbs");

  console.log(req.body);
  const inputVerbs: FECheckVerb[] = req.body.verbs;

  const arrayIds: number[] = extractVerbsIds(inputVerbs);

  const correctVerbs: BEVerb[] = await queries.getVerbsByIds(arrayIds);
  const correctVerbsMap: Map<number, BEVerb> = createCorrectVerbsMap(correctVerbs);

  console.log("inputVerbs");
  console.log(inputVerbs);

  const outputVerbs: FECheckVerb[] = [];

  inputVerbs.forEach((v: FECheckVerb) => {
    const correctVerb: BEVerb | undefined = correctVerbsMap.get(v.id);
    if (! correctVerb) {
      throw new Error("Verb id not match");
    }

    const outputVerb: FECheckVerb = {
      id: v.id,
      baseFormPreset: v.baseFormPreset,
      simplePastPreset: v.simplePastPreset,
      pastParticiplePreset: v.pastParticiplePreset
    };

    outputVerb.baseForm = v.baseForm;
    if (v.baseForm?.toLowerCase() !== correctVerb.baseForm?.toLowerCase()) {
      outputVerb.baseFormCorrect = correctVerb.baseForm;
    }

    outputVerb.simplePast = v.simplePast;
    if (v.simplePast?.toLowerCase() !== correctVerb.simplePast?.toLowerCase()) {
      outputVerb.simplePastCorrect = correctVerb.simplePast;
    }

    outputVerb.pastParticiple = v.pastParticiple;
    if (v.pastParticiple?.toLowerCase() !== correctVerb.pastParticiple?.toLowerCase()) {
      outputVerb.pastParticipleCorrect = correctVerb.pastParticiple;
    }
  
    outputVerbs.push(outputVerb);
  });


  const respCheckVerbs: ResponseCheckVerbs = {
    code: 0,
    message: "OK",
    rows: outputVerbs
  }

  resp.json(respCheckVerbs);
}

function extractVerbsIds(verbs: FECheckVerb[]): number[] {

  return verbs.map(v => v.id);
}

function createCorrectVerbsMap(correctVerbs: BEVerb[]): Map<number, BEVerb> {

  const result: Map<number, BEVerb> = new Map<number, BEVerb>();

  correctVerbs.forEach(v => {
    result.set(v.id, v);
  })

  return result;
}