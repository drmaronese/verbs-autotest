import { Request, Response } from "express";
import * as queries from "../../database/queries"
import { BEVerb } from "../../models/be-models";
import { FECheckVerb, ResponseVerbs } from "../../models/fe-models";
import { randomNumberRange } from "../../commons/utils"
import * as VerbsMapper from "../../mappers/verbs-mapper";

export default async function quizVerbs(req: Request, resp: Response) {
  console.log("Quiz Verbs");

  const quizRowsNum = 5;

  const verbs: BEVerb[] = await queries.allVerbs();
  const totalVerbs: number = verbs.length;

  if (quizRowsNum > totalVerbs) {
    throw RangeError("Quiz rows number greater than total verbs");
  }

  let quizVerbsRows: FECheckVerb[] = [];
  for(let i=0; i<quizRowsNum; i++) {
    let beVerb: BEVerb = randomVerb(verbs, quizVerbsRows);
    let feVerb: FECheckVerb = {
      id: beVerb.id,
      baseForm: "",
      baseFormPreset: false,
      simplePast: "",
      simplePastPreset: false,
      pastParticiple: "",
      pastParticiplePreset: false,
    };

    const verbForms: (string | undefined)[] = [ beVerb.baseForm, beVerb.simplePast, beVerb.pastParticiple ];
    const ixFormToKeep: number = randomNumberRange(0, 2);
    switch(ixFormToKeep) {
      case 0:
        feVerb.baseForm = beVerb.baseForm + "";
        feVerb.baseFormPreset = true;
        break;
      case 1:
        feVerb.simplePast = beVerb.simplePast + "";
        feVerb.simplePastPreset = true;
        break;
      case 2:
        feVerb.pastParticiple = beVerb.pastParticiple + "";
        feVerb.pastParticiplePreset = true;
        break;
    }
    
    quizVerbsRows.push(feVerb);
  }

  const respVerbs: ResponseVerbs = {
    code: 0,
    message: "OK",
    rows: quizVerbsRows
  }

  resp.json(respVerbs);
}

function randomVerb(verbs: BEVerb[], quizVerbsRows: BEVerb[]): BEVerb {

  let remainingVerbs = verbs.filter((v) => {
    return quizVerbsRows.find((qv) => qv.id === v.id) === undefined;
  });

  return remainingVerbs[randomNumberRange(0, remainingVerbs.length - 1)];
}

