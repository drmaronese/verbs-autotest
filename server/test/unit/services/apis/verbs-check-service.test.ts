import checkVerbs from "../../../../services/apis/verbs-check-service"; // Adjust the import path as necessary
import * as queries from "../../../../database/queries";
import { InternalServerError } from "../../../../exceptions/global-exceptions";
import { mapToBECheckVerbsResponse } from "../../../../mappers/be-verbs-mapper";
import { BECheckVerb, BEResponseCheckVerbs, BEVerb } from "../../../../models/be-models";

jest.mock('../../../../database/queries');
jest.mock('../../../../mappers/be-verbs-mapper');
jest.mock('../../../../commons/configuration-properties', () => ({
  getPropNumber: jest.fn().mockReturnValue(5),
}));

describe('checkVerbs', () => {
  const mockCorrectVerbs: BEVerb[] = [
    { id: 1, baseForm: 'go', simplePast: 'went', pastParticiple: 'gone', meaning: 'andare' },
    { id: 2, baseForm: 'see', simplePast: 'saw', pastParticiple: 'seen', meaning: 'vedere' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return corrected base form when the input base form is incorrect', async () => {
    (queries.getVerbsByIds as jest.Mock).mockResolvedValue(mockCorrectVerbs);
    (mapToBECheckVerbsResponse as jest.Mock).mockReturnValue({ output: 'someResponse' });

    const inputVerbs: BECheckVerb[] = [
      { id: 1, baseForm: 'going', simplePast: 'going', pastParticiple: 'going', meaning: 'andare', baseFormPreset: false, simplePastPreset: true, pastParticiplePreset: false }
    ];

    const response: BEResponseCheckVerbs = await checkVerbs(inputVerbs);

    expect(response).toEqual({ output: 'someResponse' });
    expect(mapToBECheckVerbsResponse).toHaveBeenCalledWith(expect.any(Array), 5, 0);
  });

  it('should throw InternalServerError if verb id does not match', async () => {
    (queries.getVerbsByIds as jest.Mock).mockResolvedValue(mockCorrectVerbs);

    const inputVerbs: BECheckVerb[] = [
      { id: 3, baseForm: 'run', simplePast: 'ran', pastParticiple: 'run', meaning: 'andare', baseFormPreset: false, simplePastPreset: true, pastParticiplePreset: false }
    ];

    await expect(checkVerbs(inputVerbs)).rejects.toThrow(InternalServerError);
    await expect(checkVerbs(inputVerbs)).rejects.toThrow("Verb id not match");
  });

  it('should handle verbs with options in correct verb form', async () => {
    const mockedVerbs: BEVerb[] = [
      { id: 1, baseForm: 'go/start', simplePast: 'went', pastParticiple: 'gone', meaning: 'andare' },
    ];

    (queries.getVerbsByIds as jest.Mock).mockResolvedValue(mockedVerbs);
    (mapToBECheckVerbsResponse as jest.Mock).mockReturnValue({ output: 'someResponse' });

    const inputVerbs: BECheckVerb[] = [
      { id: 1, baseForm: 'start', simplePast: 'went', pastParticiple: 'gone', meaning: 'andare', baseFormPreset: false, simplePastPreset: true, pastParticiplePreset: false }
    ];

    const response: BEResponseCheckVerbs = await checkVerbs(inputVerbs);

    expect(response).toEqual({ output: 'someResponse' });
    expect(mapToBECheckVerbsResponse).toHaveBeenCalledWith(expect.any(Array), 5, 2);
  });

  it('should compute score correctly when all forms are correct', async () => {
    (queries.getVerbsByIds as jest.Mock).mockResolvedValue(mockCorrectVerbs);
    (mapToBECheckVerbsResponse as jest.Mock).mockReturnValue({ output: 'someResponse' });

    const inputVerbs: BECheckVerb[] = [
      { id: 1, baseForm: 'go', simplePast: 'went', pastParticiple: 'gone', meaning: 'andare', baseFormPreset: true, simplePastPreset: false, pastParticiplePreset: false },
      { id: 2, baseForm: 'see', simplePast: 'saw', pastParticiple: 'seen', meaning: 'vedere', baseFormPreset: true, simplePastPreset: false, pastParticiplePreset: false }
    ];

    const response: BEResponseCheckVerbs = await checkVerbs(inputVerbs);

    expect(mapToBECheckVerbsResponse).toHaveBeenCalledWith(expect.any(Array), 5, 4);
  });
});
