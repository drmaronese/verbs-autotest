import allVerbs from '../../../../services/apis/verbs-all-service'; // adjust the import as necessary
import * as queries from "../../../../database/queries";
import { mapToBEAllVerbsResponse } from "../../../../mappers/be-verbs-mapper";
import { BEResponseAllVerbs, BEVerb } from "../../../../models/be-models";

jest.mock("../../../../database/queries");
jest.mock("../../../../mappers/be-verbs-mapper");

describe('allVerbs', () => {
  it('should return mapped response when verbs are fetched successfully', async () => {
    const mockedVerbs: BEVerb[] = [
      { id: 1, baseForm: 'go', simplePast: 'went', pastParticiple: 'gone', meaning: 'andare' },
      { id: 2, baseForm: 'see', simplePast: 'saw', pastParticiple: 'seen', meaning: 'vedere' },
    ];
    const mockedResponse: BEResponseAllVerbs = { rows: mockedVerbs }; // adjust structure based on actual response
    (queries.allVerbs as jest.Mock).mockResolvedValue(mockedVerbs);
    (mapToBEAllVerbsResponse as jest.Mock).mockReturnValue(mockedResponse);
    
    const result = await allVerbs();

    expect(queries.allVerbs).toHaveBeenCalled();
    expect(mapToBEAllVerbsResponse).toHaveBeenCalledWith(mockedVerbs);
    expect(result).toEqual(mockedResponse);
  });

  it('should handle an empty array of verbs', async () => {
    const mockedVerbs: BEVerb[] = [];
    const mockedResponse: BEResponseAllVerbs = { rows: mockedVerbs }; // adjust structure based on actual response
    (queries.allVerbs as jest.Mock).mockResolvedValue(mockedVerbs);
    (mapToBEAllVerbsResponse as jest.Mock).mockReturnValue(mockedResponse);
    
    const result = await allVerbs();

    expect(queries.allVerbs).toHaveBeenCalled();
    expect(mapToBEAllVerbsResponse).toHaveBeenCalledWith(mockedVerbs);
    expect(result).toEqual(mockedResponse);
  });

  it('should throw an error when queries.allVerbs fails', async () => {
    const errorMessage = 'Database query failed';
    (queries.allVerbs as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(allVerbs()).rejects.toThrow(errorMessage);
    expect(queries.allVerbs).toHaveBeenCalled();
    expect(mapToBEAllVerbsResponse).not.toHaveBeenCalled();
  });

  it('should throw an error when mapping function fails', async () => {
    const mockedVerbs: BEVerb[] = [
      { id: 1, baseForm: 'go', simplePast: 'went', pastParticiple: 'gone', meaning: 'andare' },
      { id: 2, baseForm: 'see', simplePast: 'saw', pastParticiple: 'seen', meaning: 'vedere' },
    ];
    (queries.allVerbs as jest.Mock).mockResolvedValue(mockedVerbs);
    const errorMessage = 'Mapping error';
    (mapToBEAllVerbsResponse as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await expect(allVerbs()).rejects.toThrow(errorMessage);
    expect(queries.allVerbs).toHaveBeenCalled();
    expect(mapToBEAllVerbsResponse).toHaveBeenCalledWith(mockedVerbs);
  });
});
