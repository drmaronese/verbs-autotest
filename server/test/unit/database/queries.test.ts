import { DatabaseError } from '../../../exceptions/global-exceptions';
import * as VerbsMapper from "../../../mappers/be-verbs-mapper";
import { allVerbs, getVerbsByIds } from '../../../database/queries';
import { pool } from '../../../database/database';

jest.mock('../../../mappers/be-verbs-mapper');
jest.mock('../../../database/database', () => ({
  pool: {
    query: jest.fn()
  }
}));

describe('Verbs Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('allVerbs', () => {
    it('should return mapped BEVerb array when successful', async () => {
      const mockDbVerbs = [
        { id: 1, baseForm: 'walk', simplePast: 'walked', pastParticiple: 'walked', meaning: 'to move by foot' }
      ];

      (pool.query as jest.Mock).mockResolvedValue([mockDbVerbs]);
      (VerbsMapper.mapToBEVerbs as jest.Mock).mockReturnValue(mockDbVerbs);

      const result = await allVerbs();

      expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
      expect(VerbsMapper.mapToBEVerbs).toHaveBeenCalledWith(mockDbVerbs);
      expect(result).toEqual(mockDbVerbs);
    });

    it('should throw a DatabaseError when an error occurs', async () => {
      const errorMessage = 'Database error';
      (pool.query as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(allVerbs()).rejects.toThrow(DatabaseError);
      await expect(allVerbs()).rejects.toThrow('Error reading all verbs from DB');
    });
  });

  describe('getVerbsByIds', () => {
    it('should return mapped BEVerb array when successful', async () => {
      const listIds = [1, 2];
      const mockDbVerbs = [
        { id: 1, baseForm: 'walk', simplePast: 'walked', pastParticiple: 'walked', meaning: 'to move by foot' }
      ];

      (pool.query as jest.Mock).mockResolvedValue([mockDbVerbs]);
      (VerbsMapper.mapToBEVerbs as jest.Mock).mockReturnValue(mockDbVerbs);

      const result = await getVerbsByIds(listIds);

      expect(pool.query).toHaveBeenCalledWith(expect.stringContaining('WHERE id IN (?)'), [listIds]);
      expect(VerbsMapper.mapToBEVerbs).toHaveBeenCalledWith(mockDbVerbs);
      expect(result).toEqual(mockDbVerbs);
    });

    it('should throw a DatabaseError when an error occurs', async () => {
      const errorMessage = 'Database error';
      const listIds = [1, 2];
      (pool.query as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(getVerbsByIds(listIds)).rejects.toThrow(DatabaseError);
      await expect(getVerbsByIds(listIds)).rejects.toThrow('Error reading verb by id from DB');
    });
  });
});
