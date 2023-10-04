import { z } from "zod";

export const SignatureSizeAndCountSchema = z.object({
  size: z.number().positive().int(),
  count: z.number().positive().int(),
});

type SignatureSizeAndCount = z.infer<typeof SignatureSizeAndCountSchema>;
export default SignatureSizeAndCount;
