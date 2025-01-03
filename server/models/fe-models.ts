
export interface ResponseResult {
  code: number,
  message: string
}

export interface FEVerb {
  id: number;

  baseForm: string;
  simplePast: string;
  pastParticiple: string;
}

export interface FECheckVerb extends FEVerb {
  baseFormCorrect?: string;
  simplePastCorrect?: string;
  pastParticipleCorrect?: string;

  baseFormPreset: boolean;
  simplePastPreset: boolean;
  pastParticiplePreset: boolean;
}

export interface ResponseVerbs extends ResponseResult {
  rows: FEVerb[]
}

export interface ResponseCheckVerbs extends ResponseResult {
  rows: FECheckVerb[]
  score: number;
}
