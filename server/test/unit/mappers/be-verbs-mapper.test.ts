import { 
  mapToBEAllVerbsResponse, 
  mapToBECheckVerbsResponse, 
  mapToBEVerbs, 
  mapToBEVerb 
} from '../../../mappers/be-verbs-mapper';
import * as BEModels from "../../../models/be-models";
import * as DBModels from "../../../models/db-models";

describe('Mapping Functions', () => {
  describe('mapToBEAllVerbsResponse', () => {
    it('should return an object with rows containing the provided verbs', () => {
      const input: BEModels.BEVerb[] = [{ id: 1, baseForm: 'be', simplePast: 'was', pastParticiple: 'been', meaning: 'to exist' }];
      const expectedOutput: BEModels.BEResponseAllVerbs = { rows: input };
      
      const result = mapToBEAllVerbsResponse(input);
      expect(result).toEqual(expectedOutput);
    });

    it('should return an empty rows array when given an empty input', () => {
      const input: BEModels.BEVerb[] = [];
      const expectedOutput: BEModels.BEResponseAllVerbs = { rows: [] };

      const result = mapToBEAllVerbsResponse(input);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('mapToBECheckVerbsResponse', () => {
    it('should return an object with rows, rowsNumber, and score', () => {
      const input: BEModels.BECheckVerb[] = [
        { id: 1, baseForm: 'run', simplePast: 'ran', pastParticiple: 'run', meaning: 'andare', baseFormPreset: false, simplePastPreset: true, pastParticiplePreset: false }
      ];
      const expectedOutput: BEModels.BEResponseCheckVerbs = { rows: input, rowsNumber: 1, score: 10 };
      
      const result = mapToBECheckVerbsResponse(input, 1, 10);
      expect(result).toEqual(expectedOutput);
    });

    it('should handle optional parameters correctly', () => {
      const input: BEModels.BECheckVerb[] = [
        { id: 1, baseForm: 'run', simplePast: 'ran', pastParticiple: 'run', meaning: 'andare', baseFormPreset: false, simplePastPreset: true, pastParticiplePreset: false }
      ];
      const expectedOutput: BEModels.BEResponseCheckVerbs = { rows: input, rowsNumber: undefined, score: undefined };

      const result = mapToBECheckVerbsResponse(input);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('mapToBEVerbs', () => {
    it('should convert DBVerbs to BEVerbs', () => {
      const input: DBModels.DBVerb[] = [{ id: 1, baseForm: 'run', simplePast: 'ran', pastParticiple: 'run', meaning: 'to move swiftly', constructor: { name: 'RowDataPacket' }, }];
      const expectedOutput: BEModels.BEVerb[] = [{ id: 1, baseForm: 'run', simplePast: 'ran', pastParticiple: 'run', meaning: 'to move swiftly' }];
      
      const result = mapToBEVerbs(input);
      expect(result).toEqual(expectedOutput);
    });

    it('should return an empty array when given an empty input', () => {
      const input: DBModels.DBVerb[] = [];
      const expectedOutput: BEModels.BEVerb[] = [];

      const result = mapToBEVerbs(input);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('mapToBEVerb', () => {
    it('should map DBVerb to BEVerb correctly', () => {
      const input: DBModels.DBVerb = { id: 1, baseForm: 'go', simplePast: 'went', pastParticiple: 'gone', meaning: 'to move from one place to another', constructor: { name: 'RowDataPacket' } };
      const expectedOutput: BEModels.BEVerb = { id: 1, baseForm: 'go', simplePast: 'went', pastParticiple: 'gone', meaning: 'to move from one place to another' };

      const result = mapToBEVerb(input);
      expect(result).toEqual(expectedOutput);
    });

    it('should handle edge cases with empty values in DBVerb', () => {
      const input: DBModels.DBVerb = { id: 1, baseForm: '', simplePast: '', pastParticiple: '', meaning: '', constructor: { name: 'RowDataPacket' } };
      const expectedOutput: BEModels.BEVerb = { id: 1, baseForm: '', simplePast: '', pastParticiple: '', meaning: '' };

      const result = mapToBEVerb(input);
      expect(result).toEqual(expectedOutput);
    });
  });
});
