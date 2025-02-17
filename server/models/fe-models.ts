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

export interface FEResponseVerbs extends ResponseResult {
  rows: FEVerb[];
}

export interface FEResponseCheckVerbs extends ResponseResult {
  rows: FECheckVerb[];
  rowsNumber?: number;
  score?: number;
}
