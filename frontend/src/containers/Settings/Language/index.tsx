import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InputSelect } from "@/components/ui/input-select";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  language: z.string().nonempty({ message: "Lütfen geçerli bir dil giriniz" }),
});

const Localization = () => {
  const { t, i18n } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: i18n.language,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values.language)
    i18n.changeLanguage(values.language);
    window.location.reload();
  };

  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
      <div>
        <div className="flex justify-between my-2">
          <h2 className="text-xl md:text-2xl font-semibold">{t("settings.language.title")}</h2>
        </div>
        <p className="leading-7">
          {t("settings.language.description")}
        </p>
        <div className="mt-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputSelect
                control={form.control}
                placeholder={`${t("settings.language.model.language")}*`}
                fieldName="language"
                selectList={[
                  { value: "tr", label: t("settings.language.model.tr") },
                  { value: "en", label: t("settings.language.model.en") },
                ]}
              />
              <Button type="submit" className="col-span-10">
                {t("common.save")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Localization;
