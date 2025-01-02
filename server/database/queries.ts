import { FieldPacket } from 'mysql2';
import { DBVerb } from '../models/db-models';
import { BEVerb } from "../models/be-models";
import * as VerbsMapper from "../mappers/verbs-mapper";
import { pool } from "./database";


export async function allVerbs(): Promise<BEVerb[]> {

  try {
    const [dbVerbs]: [DBVerb[], FieldPacket[]] = await pool.query<DBVerb[]>('\
      SELECT id, base_form AS baseForm, simple_past AS simplePast, past_participle AS pastParticiple \
      FROM verbs \
      ORDER BY id');

    return VerbsMapper.mapToBEVerbs(dbVerbs);

  } catch (e) {
    console.log('Error reading all verbs from DB', e);
    throw e;
  }
}

export async function getVerbById(id: number): Promise<BEVerb> {

  try {
    const [dbVerbs]: [DBVerb[], FieldPacket[]] = await pool.query<DBVerb[]>('\
      SELECT id, base_form AS baseForm, simple_past AS simplePast, past_participle AS pastParticiple \
      FROM verbs \
      WHERE id = ?', id);

    return VerbsMapper.mapToBEVerb(dbVerbs[0]);

  } catch (e) {
    console.log('Error reading all verbs from DB', e);
    throw e;
  }
}
