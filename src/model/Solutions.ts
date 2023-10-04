import { z } from "zod";
import { SolutionSchema } from "./Solution";

export const SolutionsSchema = z.array(SolutionSchema);

type Solutions = z.infer<typeof SolutionsSchema>;
export default Solutions;
