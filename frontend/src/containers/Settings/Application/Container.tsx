import { useAppDispatch, useAppSelector } from "@/store";
import { ApplicationState } from "./types";
import { useEffect } from "react";
import {
  createApplication,
  getCurrentApplication,
  updateApplication,
} from "./actions";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputString from "@/components/ui/input-string";
import { Button } from "@/components/ui/button";
import useTitle from "@/hooks/use-title";
import { useTranslation } from "react-i18next";


const Container = () => {
  const { t } = useTranslation();

  const formSchema = z.object({
    id: z.number(),
    name: z.string().nonempty({ message: t("settings.application.model.name-validation") }),
  });

  useTitle(t("settings.application.title"));
  const dispatch = useAppDispatch();
  const applicationState = useAppSelector<ApplicationState>(
    (state) => state.applicationState
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: "",
    },
  });

  useEffect(() => {
    if (Object.keys(applicationState.application).length <= 0) {
      dispatch(getCurrentApplication());
    }
  }, []);

  useEffect(() => {
    if (applicationState.error) {
      toast({
        title: t("common.error-occured"),
        description: applicationState.error,
        variant: "destructive",
      });
    }
  }, [applicationState.error]);

  useEffect(() => {
    if (Object.keys(applicationState.application).length > 0) {
      form.setValue("id", applicationState.application?.id || 0);
      form.setValue("name", applicationState.application?.name || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationState.application]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.id === 0) {
      dispatch(createApplication(values));
    } else {
      dispatch(updateApplication(values.id, values));
    }
  };

  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
      <div>
        {applicationState.loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-between my-2">
              <h2 className="text-xl md:text-2xl font-semibold">{t("settings.application.title")}</h2>
            </div>
            {Object.keys(applicationState.application).length == 0 ? (
              <Alert>
                <AlertTitle>{t("settings.application.not-found")}</AlertTitle>
                <AlertDescription>
                  {t("settings.application.description")}
                </AlertDescription>
              </Alert>
            ) : (
              <p className="leading-7">
                {t("settings.application.description")}
              </p>
            )}
            <div className="mt-3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <InputString
                    control={form.control}
                    placeholder={`${t("settings.application.model.name")}*`}
                    fieldName="name"
                  />
                  <Button type="submit" className="col-span-10">
                    {t("common.save")}
                  </Button>
                </form>
              </Form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Container;
