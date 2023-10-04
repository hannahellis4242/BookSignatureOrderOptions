import { z } from "zod";

export const SolutionSchema = z.array(z.number().positive().int());

type Solution = z.infer<typeof SolutionSchema>;
export default Solution;
