import { getPropNumber } from "../../commons/configuration-properties";
import { randomNumberRange } from "../../commons/utils";
import * as queries from "../../database/queries";
import { InternalServerError } from "../../exceptions/global-exceptions";
import { mapToBECheckVerbsResponse } from "../../mappers/be-verbs-mapper";
import { BECheckVerb, BEResponseCheckVerbs, BEVerb } from "../../models/be-models";

export default async function quizVerbs(): Promise<BEResponseCheckVerbs>  {
  const quizRowsNum = getPropNumber('service.quiz.rows.number', 5);

  const verbs: BEVerb[] = await queries.allVerbs();
  const totalVerbs: number = verbs.length;

  if (quizRowsNum > totalVerbs) {
    throw new InternalServerError("Quiz rows number greater than total verbs");
  }

  let quizVerbsRows: BECheckVerb[] = [];
  for(let i=0; i<quizRowsNum; i++) {
    let beVerb: BEVerb = randomVerb(verbs, quizVerbsRows);
    let beCheckVerb: BECheckVerb = {
      id: beVerb.id,
      baseForm: "",
      baseFormPreset: false,
      simplePast: "",
      simplePastPreset: false,
      pastParticiple: "",
      pastParticiplePreset: false,
      meaning: beVerb.meaning
    };

    const ixFormToKeep: number = randomNumberRange(0, 2);
    switch(ixFormToKeep) {
      case 0:
        beCheckVerb.baseForm = beVerb.baseForm + "";
        beCheckVerb.baseFormPreset = true;
        break;
      case 1:
        beCheckVerb.simplePast = beVerb.simplePast + "";
        beCheckVerb.simplePastPreset = true;
        break;
      case 2:
        beCheckVerb.pastParticiple = beVerb.pastParticiple + "";
        beCheckVerb.pastParticiplePreset = true;
        break;
    }
    
    quizVerbsRows.push(beCheckVerb);
  }

  return mapToBECheckVerbsResponse(quizVerbsRows);
}

function randomVerb(verbs: BEVerb[], quizVerbsRows: BEVerb[]): BEVerb {

  let remainingVerbs = verbs.filter((v) => {
    return quizVerbsRows.find((qv) => qv.id === v.id) === undefined;
  });

  return remainingVerbs[randomNumberRange(0, remainingVerbs.length - 1)];
}
