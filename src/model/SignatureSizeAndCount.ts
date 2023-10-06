import { z } from "zod";

export const SignatureSizeAndCountSchema = z.object({
  size: z
    .number({
      description: "the number of sheets in the signature",
      invalid_type_error: "size must be a number",
      required_error: "size is required",
    })
    .positive({ message: "size must be positive" })
    .int({ message: "size must be an integer" }),
  count: z
    .number({
      description: "the number of signatures with the gien number of sheets",
      invalid_type_error: "count must be a number",
      required_error: "count is required",
    })
    .positive({ message: "count must be positive" })
    .int({ message: "count must be an integer" }),
});

type SignatureSizeAndCount = z.infer<typeof SignatureSizeAndCountSchema>;
export default SignatureSizeAndCount;
