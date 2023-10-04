import Problem from "../src/model/Problem";
import solve from "../src/solver/solve";

describe("solve", () => {
  test("only one option", () => {
    const problem: Problem = [{ size: 1, count: 1 }];
    const solutions = solve(problem);
    expect(solutions).toHaveLength(1);
    expect(solutions.at(0)).toStrictEqual([1]);
  });
  test("two options", () => {
    const problem: Problem = [
      { size: 1, count: 1 },
      { size: 2, count: 1 },
    ];
    const solutions = solve(problem);
    expect(solutions).toHaveLength(2);
    expect(solutions.at(0)).toStrictEqual([1, 2]);
    expect(solutions.at(1)).toStrictEqual([2, 1]);
  });
  test("two options with one having a count of 2", () => {
    const problem: Problem = [
      { size: 1, count: 2 },
      { size: 2, count: 1 },
    ];
    const solutions = solve(problem);
    expect(solutions).toHaveLength(3);
    expect(solutions.at(0)).toStrictEqual([1, 1, 2]);
    expect(solutions.at(1)).toStrictEqual([1, 2, 1]);
    expect(solutions.at(2)).toStrictEqual([2, 1, 1]);
  });
  test("duplicates", () => {
    const problem: Problem = [
      { size: 1, count: 1 },
      { size: 2, count: 1 },
      { size: 1, count: 1 },
    ];
    const solutions = solve(problem);
    expect(solutions).toHaveLength(3);
    expect(solutions.at(0)).toStrictEqual([1, 1, 2]);
    expect(solutions.at(1)).toStrictEqual([1, 2, 1]);
    expect(solutions.at(2)).toStrictEqual([2, 1, 1]);
  });
});
