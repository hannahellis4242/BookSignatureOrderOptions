import axios, { AxiosError } from "axios";

describe.skip("api", () => {
  test("invalid post request", async () => {
    try {
      await axios.post("http://localhost:8080");
    } catch (err: any) {
      expect(err).toBeInstanceOf(AxiosError);
      if (err instanceof AxiosError) {
        expect(err.code).toBe("ERR_BAD_REQUEST");
        expect(err.response).toBeDefined();
        expect(err.response?.data).toBe(
          "Code: invalid_type ~ Path: problem ~ Message: Required"
        );
      }
    }
  });
  test("valid end to end", async () => {
    try {
      const key = await axios
        .post("http://localhost:8080", [
          { size: 1, count: 2 },
          { size: 2, count: 1 },
        ])
        .then(({ data }) => data);
      const solution = await axios
        .get("http://localhost:8080", {
          params: { key },
        })
        .then(({ data }) => data);
      console.log(solution);
      expect(solution).toStrictEqual([
        [1, 1, 2],
        [1, 2, 1],
        [2, 1, 1],
      ]);
    } catch (err) {
      return Promise.reject(err);
    }
  });
});
