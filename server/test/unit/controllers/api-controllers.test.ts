import { Request, Response } from "express";
import { allVerbsController, quizVerbsController, checkVerbsController } from "../../../controllers/api-controllers";
import * as VerbsMapper from "../../../mappers/fe-verbs-mapper";
import allVerbs from '../../../services/apis/verbs-all-service';
import checkVerbs from '../../../services/apis/verbs-check-service';
import quizVerbs from '../../../services/apis/verbs-quiz-service';

jest.mock('../../../services/apis/verbs-all-service');
jest.mock('../../../services/apis/verbs-check-service');
jest.mock('../../../services/apis/verbs-quiz-service');
jest.mock('../../../mappers/fe-verbs-mapper');

describe('Verbs Controllers', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
    };
  });

  describe('allVerbsController', () => {
    it('should return all verbs', async () => {
      const mockResponse = { verbs: [] }; // Mock response from allVerbs
      (allVerbs as jest.Mock).mockResolvedValue(mockResponse);
      (VerbsMapper.mapToFEResponseVerbs as jest.Mock).mockReturnValue(mockResponse);

      await allVerbsController(req as Request, res as Response);

      expect(allVerbs).toHaveBeenCalled();
      expect(VerbsMapper.mapToFEResponseVerbs).toHaveBeenCalledWith(mockResponse);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('quizVerbsController', () => {
    it('should return quiz verbs', async () => {
      const mockResponse = { quizVerbs: [] }; // Mock response from quizVerbs
      (quizVerbs as jest.Mock).mockResolvedValue(mockResponse);
      (VerbsMapper.mapToFEResponseCheckVerbs as jest.Mock).mockReturnValue(mockResponse);

      await quizVerbsController(req as Request, res as Response);

      expect(quizVerbs).toHaveBeenCalled();
      expect(VerbsMapper.mapToFEResponseCheckVerbs).toHaveBeenCalledWith(mockResponse);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe('checkVerbsController', () => {
    it('should return checked verbs', async () => {
      const mockResponse = { checkedVerbs: [] }; // Mock response from checkVerbs
      req.body = { verbs: ['verb1', 'verb2'] }; // Sample input
      (checkVerbs as jest.Mock).mockResolvedValue(mockResponse);
      (VerbsMapper.mapToFEResponseCheckVerbs as jest.Mock).mockReturnValue(mockResponse);

      await checkVerbsController(req as Request, res as Response);

      expect(checkVerbs).toHaveBeenCalledWith(req.body.verbs);
      expect(VerbsMapper.mapToFEResponseCheckVerbs).toHaveBeenCalledWith(mockResponse);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });
  });
});
