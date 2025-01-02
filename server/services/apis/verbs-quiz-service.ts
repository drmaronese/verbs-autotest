import { Request, Response } from "express";
import * as queries from "../../database/queries"
import { BEVerb } from "../../models/be-models";
import { FEVerb, ResponseVerbs } from "../../models/fe-models";
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

  let quizVerbsRows: FEVerb[] = [];
  for(let i=0; i<quizRowsNum; i++) {
    let beVerb: BEVerb = randomVerb(verbs, quizVerbsRows);
    let feVerb: FEVerb = { id: beVerb.id };

    const verbForms: (string | undefined)[] = [ beVerb.baseForm, beVerb.simplePast, beVerb.pastParticiple ];
    const ixFormToKeep: number = randomNumberRange(0, 2);
    for(let f=0; f<=2; f++) {
      if (f !== ixFormToKeep) {
        verbForms[f] = "";
      }
    }

    [ feVerb.baseForm, feVerb.simplePast, feVerb.pastParticiple ] = verbForms;
    
    quizVerbsRows.push(feVerb);
  }

  const respVerbs: ResponseVerbs = {
    code: 0,
    message: "OK",
    isVerbsCheck: false,
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

