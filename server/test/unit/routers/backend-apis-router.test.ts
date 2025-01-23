import request from 'supertest';
import express from 'express';
import backendRouter from '../../../routers/backend-apis-router';
import * as apiControllers from '../../../controllers/api-controllers';

jest.mock('../../../controllers/api-controllers');

const app = express();
app.use(backendRouter);

describe('Backend Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /verbs/all', () => {
    it('should call allVerbsController and respond with JSON', async () => {
      const mockResponse = { verbs: [] }; // Mock response
      (apiControllers.allVerbsController as jest.Mock).mockImplementation((req, res) => {
        res.json(mockResponse);
      });

      const response = await request(app).get('/verbs/all');

      expect(apiControllers.allVerbsController).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });
  });

  describe('GET /verbs/quiz', () => {
    it('should call quizVerbsController and respond with JSON', async () => {
      const mockResponse = { quizVerbs: [] }; // Mock response
      (apiControllers.quizVerbsController as jest.Mock).mockImplementation((req, res) => {
        res.json(mockResponse);
      });

      const response = await request(app).get('/verbs/quiz');

      expect(apiControllers.quizVerbsController).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });
  });

  describe('POST /verbs/check', () => {
    it('should call checkVerbsController and respond with JSON', async () => {
      const mockResponse = { checkedVerbs: [] }; // Mock response
      (apiControllers.checkVerbsController as jest.Mock).mockImplementation((req, res) => {
        res.json(mockResponse);
      });

      const response = await request(app).post('/verbs/check').send({ verbs: [
        {
          id: 30, baseForm: "do", simplePast: "did", pastParticiple: "done", meaning: "fare",
          baseFormPreset: false, simplePastPreset: false, pastParticiplePreset: true
        }
      ]});

      expect(apiControllers.checkVerbsController).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });
  });

  describe('Error Handling', () => {
    it('should call next with an error if controller throws', async () => {
      const errorMessage = 'Some error';
      (apiControllers.allVerbsController as jest.Mock).mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const response = await request(app).get('/verbs/all');

      expect(apiControllers.allVerbsController).toHaveBeenCalled();
      expect(response.status).toBe(500); // Assuming error handler returns 500
      expect(response.text).toContain("{\"code\":\"VAT-001\",\"message\":\"Internal server error\"}");
    });
  });
});
