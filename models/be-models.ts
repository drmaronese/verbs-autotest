
export interface BEVerb {
  [key: string]: number | string | undefined,
  id: number;
  baseForm?: string;
  simplePast?: string;
  pastParticiple?: string;
}