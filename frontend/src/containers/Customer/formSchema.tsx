import * as z from "zod";

const formSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, {
      message: "Lütfen geçerli bir isim giriniz.",
    })
    .max(64, {
      message: "Lütfen geçerli bir isim giriniz.",
    })
    .nonempty({
      message: "Lütfen geçerli bir isim giriniz.",
    }),
  isCompany: z.boolean(),
  address: z
    .string()
    .min(2, {
      message: "Lütfen geçerli bir adres giriniz.",
    })
    .max(128, {
      message: "Lütfen geçerli bir adres giriniz.",
    })
    .nonempty({
      message: "Lütfen geçerli bir adres giriniz.",
    }),
  city: z
    .string()
    .min(2, {
      message: "Lütfen geçerli bir şehir giriniz.",
    })
    .max(64, {
      message: "Lütfen geçerli bir şehir giriniz.",
    })
    .nonempty({
      message: "Lütfen geçerli bir şehir giriniz.",
    }),
  district: z
    .string()
    .max(64, {
      message: "Lütfen geçerli bir ilçe giriniz.",
    })
    .optional(),
  postCode: z
    .string()
    .max(16, {
      message: "Lütfen geçerli bir posta kodu giriniz.",
    })
    .optional(),
  country: z
    .string()
    .min(2, {
      message: "Lütfen geçerli bir ülke giriniz.",
    })
    .max(64, {
      message: "Lütfen geçerli bir ülke giriniz.",
    })
    .nonempty({
      message: "Lütfen geçerli bir ülke giriniz.",
    }),
  phoneNumber: z
    .string()
    .max(64, {
      message: "Lütfen geçerli bir adres giriniz.",
    })
    .optional(),
  website: z
    .string()
    .max(64, {
      message: "Lütfen geçerli bir website giriniz.",
    })
    .optional(),
  governmentId: z
    .string()
    .min(10, {
      message: "Lütfen geçerli bir TCKNO / Vergi no giriniz.",
    })
    .max(64, {
      message: "Lütfen geçerli bir TCKNO / Vergi no giriniz.",
    })
    .nonempty({
      message: "Lütfen geçerli bir TCKNO / Vergi no giriniz.",
    }),
  isPotantial: z.boolean(),
  currencyCode: z
    .string()
    .max(6, {
      message: "Lütfen geçerli bir kur giriniz.",
    })
    .optional(),
});

export default formSchema;
