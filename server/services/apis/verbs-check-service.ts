import { getPropNumber } from "../../commons/configuration-properties";
import * as queries from "../../database/queries";
import { InternalServerError } from "../../exceptions/global-exceptions";
import { mapToBECheckVerbsResponse } from "../../mappers/be-verbs-mapper";
import { BECheckVerb, BEResponseCheckVerbs, BEVerb } from "../../models/be-models";

export default async function checkVerbs(inputVerbs: BECheckVerb[]): Promise<BEResponseCheckVerbs> {

  const arrayIds: number[] = extractVerbsIds(inputVerbs);

  const correctVerbs: BEVerb[] = await queries.getVerbsByIds(arrayIds);
  const correctVerbsMap: Map<number, BEVerb> = createCorrectVerbsMap(correctVerbs);

  const outputVerbs: BECheckVerb[] = [];

  let score: number = 0;
  inputVerbs.forEach((v: BECheckVerb) => {
    const correctVerb: BEVerb | undefined = correctVerbsMap.get(v.id);
    if (correctVerb === undefined) {
      throw new InternalServerError("Verb id not match");
    }

    const outputVerb: BECheckVerb = { ...v };

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

  return mapToBECheckVerbsResponse(outputVerbs, getPropNumber('service.quiz.rows.number', 5), score);
}

function extractVerbsIds(verbs: BECheckVerb[]): number[] {
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
