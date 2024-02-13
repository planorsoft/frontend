import * as z from "zod";

const formSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, {
      message: "Please enter a valid name.",
    })
    .max(64, {
      message: "Please enter a valid name.",
    }),
  isCompany: z.boolean(),
  address: z
    .string()
    .max(128, {
      message: "Please enter a valid address.",
    })
    .optional(),
  city: z
    .string()
    .max(64, {
      message: "Please enter a valid city.",
    })
    .optional(),
  district: z
    .string()
    .max(64, {
      message: "Please enter a valid district.",
    })
    .optional(),
  postCode: z
    .string()
    .max(16, {
      message: "Please enter a valid postal code.",
    })
    .optional(),
  country: z
    .string()
    .max(64, {
      message: "Please enter a valid country.",
    })
    .optional(),
  phoneNumber: z
    .string()
    .max(64, {
      message: "Please enter a valid address.",
    })
    .optional(),
  website: z
    .string()
    .max(64, {
      message: "Please enter a valid website.",
    })
    .optional(),
  governmentId: z
    .string()
    .max(64, {
      message: "Please enter a valid TR ID number / Tax number.",
    })
    .optional(),
  isPotantial: z.boolean(),
  currencyCode: z
    .string()
    .max(6, {
      message: "Please enter a valid currency.",
    })
    .optional(),
  contacts: z.array(
    z.object({
      id: z.number(),
      name: z
        .string()
        .min(2, {
          message: "Please enter a valid name.",
        })
        .max(64, {
          message: "Please enter a valid name.",
        }),
      email: z
        .string()
        .max(64, {
          message: "Please enter a valid email.",
        })
        .optional(),
    })
  ),
});

export default formSchema;
