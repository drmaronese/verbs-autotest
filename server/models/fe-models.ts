
export interface ResponseResult {
  code: string;
  message: string;
}

export interface FEVerb {
  id: number;

  baseForm: string;
  simplePast: string;
  pastParticiple: string;
  meaning: string;
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
  rows: FEVerb[];
}

export interface ResponseCheckVerbs extends ResponseResult {
  rows: FECheckVerb[];
  rowsNumber: number;
  score: number;
}
