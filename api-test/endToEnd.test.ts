import axios, { AxiosError } from "axios";

describe.skip("api", () => {
  test("end to end", async () => {
    try {
      const key = await axios
        .post("http://localhost:8080", [
          { size: 1, count: 2 },
          { size: 2, count: 1 },
        ])
        .then(({ data }) => data);
      const solution = await axios
        .get(`http://localhost:8080/${key}`)
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
