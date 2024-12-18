import vatDatabase, { pool } from './vat-database'
import { DBVerb } from '../models/db-models';
import { FieldPacket } from 'mysql2';
import { Verb } from "../models/api-models";
import * as VerbsMapper from "../mappers/verbs-mapper";


export async function allVerbs(): Promise<Verb[] | undefined> {

  try {
    const [dbVerbs]: [DBVerb[], FieldPacket[]] = await pool.query<DBVerb[]>('\
      SELECT id, base_form AS baseForm, simple_past AS simplePast, past_participle AS pastParticiple \
      FROM verbs \
      ORDER BY id');

    return VerbsMapper.mapToVerbs(dbVerbs);

  } catch (e) {
    console.log('Error reading all verbs from DB', e);
  }
}
