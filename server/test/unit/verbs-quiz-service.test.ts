import quizVerbs from "../../services/apis/verbs-quiz-service"; // Adjust the import path as necessary
import { allVerbs } from "../../database/queries";
import { InternalServerError } from "../../exceptions/global-exceptions";
import { getPropNumber } from "../../commons/configuration-properties";
import * as utilsModule from "../../commons/utils";

jest.mock("../../database/queries", () => ({
  allVerbs: jest.fn(),
}));
jest.mock("../../commons/configuration-properties", () => ({
  getPropNumber: jest.fn(),
}));
//jest.mock("../../commons/utils");
/* jest.mock("../../commons/utils", () => ({
  randomNumberRange: jest.fn(),
}));
 */
/* jest.mock("../../mappers/be-verbs-mapper", () => ({
  mapToBECheckVerbsResponse: jest.fn(),
}));
 */
describe("quizVerbs", () => {
  const mockVerbs = [
    { id: 1, baseForm: "be", simplePast: "was", pastParticiple: "been", meaning: "to exist" },
    { id: 2, baseForm: "have", simplePast: "had", pastParticiple: "had", meaning: "to possess" },
    { id: 3, baseForm: "do", simplePast: "did", pastParticiple: "done", meaning: "to perform" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the correct number of quiz verbs", async () => {
    (getPropNumber as jest.Mock).mockReturnValue(2);
    (allVerbs as jest.Mock).mockResolvedValue(mockVerbs);

    const response = await quizVerbs();
    
    expect(response.rows).toHaveLength(2);
    expect(allVerbs).toHaveBeenCalledTimes(1);
  });

  it("should throw an InternalServerError if quiz rows number is greater than total verbs", async () => {
    (getPropNumber as jest.Mock).mockReturnValue(5);
    (allVerbs as jest.Mock).mockResolvedValue(mockVerbs);

    await expect(quizVerbs()).rejects.toThrow(InternalServerError);
    await expect(quizVerbs()).rejects.toThrow("Quiz rows number greater than total verbs");
  });

  it("should handle the case where quiz rows number is equal to total verbs", async () => {
    (getPropNumber as jest.Mock).mockReturnValue(3);
    (allVerbs as jest.Mock).mockResolvedValue(mockVerbs);
    
    const response = await quizVerbs();
    
    expect(response.rows).toHaveLength(3);
    expect(allVerbs).toHaveBeenCalledTimes(1);
  });

  it("should randomly select verbs without repetition", async () => {
    (getPropNumber as jest.Mock).mockReturnValue(3);
    (allVerbs as jest.Mock).mockResolvedValue(mockVerbs);
    
    const randomNumberRangeMock = jest.requireMock("../../commons/utils").randomNumberRange;
    randomNumberRangeMock.mockImplementation((min: number, max: number) => Math.floor((min + max) / 2)); // returns middle index

    const response = await quizVerbs();
    
    expect(response.rows).toHaveLength(3);
    expect([...new Set(response.rows.map((item: any) => item.id))].length).toBe(3); // All verbs must be unique
  });

  it("should correctly set the base form, simple past or past participle", async () => {
    (getPropNumber as jest.Mock).mockReturnValue(1);
    (allVerbs as jest.Mock).mockResolvedValue(mockVerbs);
    //(randomNumberRange as jest.Mock).mockReturnValue(0); // Always set baseForm
    //jest.requireMock("../../commons/utils").randomNumberRange.mockReturnValue(0); // Always set baseForm
    jest
      .spyOn(utilsModule, "randomNumberRange")
      .mockImplementation(() => 0);
    /* jest.doMock('../../commons/utils', () => {
        return {
          __esModule: true,
          randomNumberRange: () => 0
        };
      }); */

    const response = await quizVerbs();

    expect(response.rows[0].baseForm).toEqual("be");
    expect(response.rows[0].baseFormPreset).toBe(true);
    expect(response.rows[0].simplePastPreset).toBe(false);
    expect(response.rows[0].pastParticiplePreset).toBe(false);
  });
});
