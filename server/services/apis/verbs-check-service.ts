import { Request, Response } from "express";
import * as queries from "../../database/queries"
import { BEVerb } from "../../models/be-models";
import { FECheckVerb, ResponseCheckVerbs } from '../../models/fe-models';

export default async function checkVerbs(req: Request, resp: Response) {
  //console.log("Check Verbs");

  const inputVerbs: FECheckVerb[] = req.body.verbs;

  const arrayIds: number[] = extractVerbsIds(inputVerbs);

  const correctVerbs: BEVerb[] = await queries.getVerbsByIds(arrayIds);
  const correctVerbsMap: Map<number, BEVerb> = createCorrectVerbsMap(correctVerbs);

  const outputVerbs: FECheckVerb[] = [];

  let score: number = 0;
  inputVerbs.forEach((v: FECheckVerb) => {
    const correctVerb: BEVerb | undefined = correctVerbsMap.get(v.id);
    if (correctVerb === undefined) {
      throw new Error("Verb id not match");
    }

    const outputVerb: FECheckVerb = {
      id: v.id,
      baseForm: v.baseForm,
      simplePast: v.simplePast,
      pastParticiple: v.pastParticiple,

      baseFormPreset: v.baseFormPreset,
      simplePastPreset: v.simplePastPreset,
      pastParticiplePreset: v.pastParticiplePreset
    };

    if (! checkVerbForm(v.baseForm, correctVerb.baseForm)) {
      outputVerb.baseFormCorrect = correctVerb.baseForm;
    } else if (! v.baseFormPreset) {
      score++;
    }

    if (! checkVerbForm(v.simplePast, correctVerb.simplePast)) {
      outputVerb.simplePastCorrect = correctVerb.simplePast;
    } else if (! v.simplePastPreset) {
      score++;
    }

    if (! checkVerbForm(v.pastParticiple, correctVerb.pastParticiple)) {
      outputVerb.pastParticipleCorrect = correctVerb.pastParticiple;
    } else if (! v.pastParticiplePreset) {
      score++;
    }
  
    outputVerbs.push(outputVerb);
  });


  const respCheckVerbs: ResponseCheckVerbs = {
    code: 0,
    message: "OK",
    rows: outputVerbs,
    score: score
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

function checkVerbForm(inputVerb: string, correctVerb: string | undefined): boolean {
  if (correctVerb === undefined || inputVerb.toLowerCase() === correctVerb.toLowerCase()) {
    return true;
  }

  if (correctVerb.indexOf("/") !== -1) {
    const verbOptions: string[] = correctVerb.split("/");
    if (inputVerb.toLowerCase() === verbOptions[0].toLowerCase() ||
        inputVerb.toLowerCase() === verbOptions[1].toLowerCase()) {
        return true;  
    }
  }

  return false;
}
