import { RowDataPacket } from 'mysql2/promise';

export interface DBVerb extends RowDataPacket {
  id: number;
  baseForm: string;
  simplePast: string;
  pastParticiple: string;
}