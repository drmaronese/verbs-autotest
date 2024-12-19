import { Request, Response } from "express";
import * as queries from "../../database/queries"
import { BEVerb } from "../../models/be-models";
import { randomNumberRange } from "../../commons/utils"

export default async function quizVerbs(req: Request, resp: Response) {
  console.log("Quiz Verbs");

  const quizRowsNum = 15;

  const verbs: BEVerb[] = await queries.allVerbs();
  const totalVerbs: number = verbs.length;

  if (quizRowsNum > totalVerbs) {
    throw RangeError("Quiz rows number greater than total verbs");
  }

  let quizVerbsRows: BEVerb[] = [];
  for(let i=0; i<quizRowsNum; i++) {
    let verb: BEVerb = randomVerb(verbs, quizVerbsRows);

    const verbForms = [ verb.baseForm, verb.simplePast, verb.pastParticiple ];
    const ixFormToKeep = randomNumberRange(0, 2);
    for(let f=0; f<=2; f++) {
      if (f !== ixFormToKeep) {
        verbForms[f] = "";
      }
    }
    [ verb.baseForm, verb.simplePast, verb.pastParticiple ] = verbForms;
    
    quizVerbsRows.push(verb);
  }

  resp.json({
    code: 0,
    message: "OK",
    rows: quizVerbsRows
  });
}

function randomVerb(verbs: BEVerb[], quizVerbsRows: BEVerb[]): BEVerb {

  let remainingVerbs = verbs.filter((v) => {
    return quizVerbsRows.find((qv) => qv.id === v.id) === undefined;
  });

  return remainingVerbs[randomNumberRange(0, remainingVerbs.length - 1)];
}

