export interface ResponseResult {
  code: number,
  message: string
}

export interface FEVerb {
  id: number;

  baseForm?: string;
  baseFormCorrect?: string;

  simplePast?: string;
  simplePastCorrect?: string;

  pastParticiple?: string;
  pastParticipleCorrect?: string;
}


export interface ResponseVerbs extends ResponseResult {
  isVerbsCheck: boolean,
  rows: FEVerb[]
}
