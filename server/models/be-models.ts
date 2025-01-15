export interface BEVerb {
  id: number;

  baseForm: string;
  simplePast: string;
  pastParticiple: string;
  meaning: string
}

export interface BECheckVerb extends BEVerb {
  baseFormCorrect?: string;
  simplePastCorrect?: string;
  pastParticipleCorrect?: string;

  baseFormPreset: boolean;
  simplePastPreset: boolean;
  pastParticiplePreset: boolean;
}

export interface BEResponseAllVerbs {
  rows: BEVerb[];
}

export interface BEResponseCheckVerbs {
  rows: BECheckVerb[];
  rowsNumber?: number;
  score?: number;
}
