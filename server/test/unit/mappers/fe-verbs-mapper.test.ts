import { 
  mapToFEResponseVerbs, 
  mapToFEResponseCheckVerbs, 
  mapToFEVerbs, 
  mapToFEVerb, 
  mapToFECheckVerbs, 
  mapToFECheckVerb 
} from '../../../mappers/fe-verbs-mapper';

import * as BEModels from "../../../models/be-models";
import * as FEModels from "../../../models/fe-models";

describe('Mapping Functions', () => {

  describe('mapToFEResponseVerbs', () => {
    it('should correctly map BEResponseAllVerbs to FEResponseVerbs', () => {
      const beResponse = {
        rows: [
          { id: 1, baseForm: "go", simplePast: "went", pastParticiple: "gone", meaning: "to move" }
        ]
      } as BEModels.BEResponseAllVerbs;

      const result = mapToFEResponseVerbs(beResponse);
      expect(result).toHaveProperty('code', '0');
      expect(result).toHaveProperty('message', 'OK');
      expect(result.rows).toHaveLength(1);
      expect(result.rows[0]).toEqual({
        id: 1,
        baseForm: "go",
        simplePast: "went",
        pastParticiple: "gone",
        meaning: "to move"
      });
    });
  });

  describe('mapToFEResponseCheckVerbs', () => {
    it('should correctly map BEResponseCheckVerbs to FEResponseCheckVerbs', () => {
      const beResponse = {
        rows: [
          { id: 1, baseForm: "go", simplePast: "goes", pastParticiple: "gone", meaning: "to move", 
            baseFormCorrect: "go", simplePastCorrect: "went", pastParticipleCorrect: "gone", 
            baseFormPreset: true, simplePastPreset: false, pastParticiplePreset: false}
        ],
        rowsNumber: 1,
        score: 10
      } as BEModels.BEResponseCheckVerbs;

      const result = mapToFEResponseCheckVerbs(beResponse);
      expect(result).toHaveProperty('code', '0');
      expect(result).toHaveProperty('message', 'OK');
      expect(result.rows).toHaveLength(1);
      expect(result.rowsNumber).toBe(1);
      expect(result.score).toBe(10);
      expect(result.rows[0]).toEqual({
        id: 1,
        baseForm: "go",
        simplePast: "goes",
        pastParticiple: "gone",
        meaning: "to move",
        baseFormCorrect: "go",
        simplePastCorrect: "went",
        pastParticipleCorrect: "gone",
        baseFormPreset: true,
        simplePastPreset: false,
        pastParticiplePreset: false
      });
    });
  });

  describe('mapToFEVerbs', () => {
    it('should correctly map an array of BEVerbs to FEVerbs', () => {
      const beVerbs = [
        { id: 1, baseForm: "go", simplePast: "went", pastParticiple: "gone", meaning: "to move" },
        { id: 2, baseForm: "see", simplePast: "saw", pastParticiple: "seen", meaning: "to perceive" }
      ] as BEModels.BEVerb[];

      const result = mapToFEVerbs(beVerbs);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(beVerbs[0]);
      expect(result[1]).toEqual(beVerbs[1]);
    });
  });

  describe('mapToFECheckVerbs', () => {
    it('should correctly map an array of BECheckVerbs to FECheckVerbs', () => {
      const beCheckVerbs = [
          { id: 1, baseForm: "go", simplePast: "goes", pastParticiple: "gone", meaning: "to move", 
            baseFormCorrect: "go", simplePastCorrect: "went", pastParticipleCorrect: "gone", 
            baseFormPreset: true, simplePastPreset: false, pastParticiplePreset: false}
      ] as BEModels.BECheckVerb[];

      const result = mapToFECheckVerbs(beCheckVerbs);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(beCheckVerbs[0]);
    });
  });

  describe('mapToFEVerb', () => {
    it('should correctly map a single BEVerb to FEVerb', () => {
      const beVerb = { id: 1, baseForm: "go", simplePast: "went", pastParticiple: "gone", meaning: "to move" } as BEModels.BEVerb;

      const result = mapToFEVerb(beVerb);
      expect(result).toEqual(beVerb);
    });
  });

  describe('mapToFECheckVerb', () => {
    it('should correctly map a single BECheckVerb to FECheckVerb', () => {
      const beCheckVerb = { id: 1, baseForm: "go", simplePast: "went", pastParticiple: "gone", meaning: "to move", 
            baseFormCorrect: "go", simplePastCorrect: "goes", pastParticipleCorrect: "gone", 
            baseFormPreset: true, simplePastPreset: false, pastParticiplePreset: false} as BEModels.BECheckVerb;

      const result = mapToFECheckVerb(beCheckVerb);
      expect(result).toEqual(beCheckVerb);
    });
  });

});
