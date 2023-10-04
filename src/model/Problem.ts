import { z } from "zod";
import { SignatureSizeAndCountSchema } from "./SignatureSizeAndCount";

export const ProblemSchema = z.array(SignatureSizeAndCountSchema).nonempty();

type Problem = z.infer<typeof ProblemSchema>;
export default Problem;
