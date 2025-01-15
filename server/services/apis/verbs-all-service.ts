import * as queries from "../../database/queries";
import { mapToBEAllVerbsResponse } from "../../mappers/be-verbs-mapper";
import { BEResponseAllVerbs, BEVerb } from "../../models/be-models";

export default async function allVerbs(): Promise<BEResponseAllVerbs> {

  const verbs: BEVerb[] = await queries.allVerbs();

  return mapToBEAllVerbsResponse(verbs);
}

