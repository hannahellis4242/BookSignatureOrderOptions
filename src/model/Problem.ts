import { z } from "zod";
import { SignatureSizeAndCountSchema } from "./SignatureSizeAndCount";

export const ProblemSchema = z
  .array(SignatureSizeAndCountSchema)
  .nonempty({ message: "must contain at least one element" });

type Problem = z.infer<typeof ProblemSchema>;
export default Problem;
