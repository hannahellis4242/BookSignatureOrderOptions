import { z } from "zod";
import { SignatureSizeAndCountSchema } from "./SignatureSizeAndCount";

export const ProblemSchema = z
  .array(SignatureSizeAndCountSchema, {
    description: "A list of Signature sizes and counts",
    invalid_type_error: "The problem must be an array",
    required_error: "The problem is required",
  })
  .nonempty({ message: "The problem must contain at least one signature" });

type Problem = z.infer<typeof ProblemSchema>;
export default Problem;
