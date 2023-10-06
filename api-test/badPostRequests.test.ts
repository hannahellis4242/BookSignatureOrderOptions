import axios, { AxiosError } from "axios";

const checkBadRequest = (err: AxiosError, expectedMessage: string) => {
  expect(err.code).toBe("ERR_BAD_REQUEST");
  expect(err.response).toBeDefined();
  expect(err.response?.data).toBe(expectedMessage);
};

const testBadRequest = async <T>({ body, expected }: TestCase<T>) => {
  try {
    await axios.post("http://localhost:8080", body);
  } catch (err: any) {
    expect(err).toBeInstanceOf(AxiosError);
    if (err instanceof AxiosError) {
      checkBadRequest(err, expected);
    }
  }
};

interface TestCase<T> {
  description: string;
  body: T;
  expected: string;
}

describe("api", () => {
  describe("invalid post requests", () => {
    const testCases: TestCase<any>[] = [
      {
        description: "no body",
        body: undefined,
        expected: "The problem must be an array",
      },
      {
        description: "body is empty array",
        body: [],
        expected: "The problem must contain at least one signature",
      },
      {
        description: "body contains empty element",
        body: [{}],
        expected: "size is required\ncount is required",
      },
      {
        description: "body element with size but no count",
        body: [{ size: 2 }],
        expected: "count is required",
      },
      {
        description: "body contains count but no size",
        body: [{ count: 2 }],
        expected: "size is required",
      },
      {
        description: "body contains strings",
        body: [{ size: "1", count: "2" }],
        expected: "size must be a number\ncount must be a number",
      },
      {
        description: "body contains zeros",
        body: [{ size: 0, count: 0 }],
        expected: "size must be positive\ncount must be positive",
      },
      {
        description: "body contains negative",
        body: [{ size: -1, count: -2 }],
        expected: "size must be positive\ncount must be positive",
      },
      {
        description: "body contains negative non integers",
        body: [{ size: -1.2, count: -2.5 }],
        expected:
          "size must be positive\nsize must be an integer\ncount must be positive\ncount must be an integer",
      },
      {
        description: "body contains non integers",
        body: [{ size: 1.2, count: 2.5 }],
        expected: "size must be an integer\ncount must be an integer",
      },
    ];
    testCases.forEach((value) =>
      test(value.description, async () => testBadRequest(value))
    );
  });
});
