import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTenant } from "@/lib/tenant";
import Legal from "./legal";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

interface IdentityContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  type:
    | "login"
    | "register"
    | "confirm"
    | "forgot-password"
    | "forgot-confirm-password";
}

function IdentityContainer({ children, type }: IdentityContainerProps) {
  const tenant = getTenant();
  const theme = useTheme();

  const [usageAggrementOpen, setUsageAggrementOpen] = useState(false);
  const [privacyAggrementOpen, setPrivacyAggrementOpen] = useState(false);

  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {type === "login" && (
          <Link
            to="/register"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Müşteri Ol
          </Link>
        )}
        {type === "register" && (
          <Link
            to="/login"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Giriş yap
          </Link>
        )}
        <div className="relative hidden h-full flex-col bg-muted p-10 dark:text-white text-dark dark:border-r lg:flex">
          <div className="absolute inset-0 dark:bg-zinc-900 bg-zinc-100" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            {theme.theme === "dark" ? (
              <img src="logo.png" alt="Planor Logo" className="w-6 h-6 mr-2" />
            ) : (
              <img src="logo-color.png" alt="Planor Logo" className="w-6 h-6 mr-2" />
            )}
            {tenant ? tenant : "Planor"}
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Planor kullanarak küçük işletmemi çok daha farklı bir
                seviyeye taşıdım. Excel ile yürüttüğüm işletmemi artık çok daha
                profosyonel bir şekilde yönetiyor ve gerçekten nereden para
                kazanıp nereden para kaybettiğimi öğrenebiliyorum.&rdquo;
              </p>
              <footer className="text-sm">Enes Demir</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {type === "login" && tenant && "Giriş yap"}
                {type === "login" && !tenant && "Giriş yap"}
                {type === "register" && tenant && "Müşteri olarak kayıt ol"}
                {type === "register" && !tenant && "Kayıt ol"}
                {type === "confirm" && "Hesabını onayla"}
                {type === "forgot-password" && "Şifremi unuttum"}
                {type === "forgot-confirm-password" && "Şifreni güncelle"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {(type === "login" ||
                  type === "register" ||
                  type === "forgot-password") &&
                  "Lütfen bilgilerinizi giriniz."}
                {type === "confirm" &&
                  "Mail adresine gönderdiğimiz kodu aşağıya girerek hesabını onaylayabilirsin."}
                {type === "forgot-confirm-password" &&
                  "Lütfen yeni şifreni gir."}
              </p>
            </div>
            <div className="grid gap-6">{children}</div>
            {type === "register" && (
              <p className="text-center text-sm text-muted-foreground">
                Devam ederek
                <Button
                  variant="ghost"
                  className="underline p-1 m-1"
                  onClick={() => {
                    setUsageAggrementOpen(true);
                  }}
                >
                  Kullanım sözleşmesi
                </Button>
                ve
                <Button
                  variant="ghost"
                  className="underline p-1 m-1"
                  onClick={() => {
                    setPrivacyAggrementOpen(true);
                  }}
                >
                  Gizlilik sözleşmesini
                </Button>
                kabul etmiş sayılırsınız.
              </p>
            )}
          </div>
        </div>
      </div>
      <Legal
        open={usageAggrementOpen}
        setOpen={setUsageAggrementOpen}
        type="usage"
      />
      <Legal
        open={privacyAggrementOpen}
        setOpen={setPrivacyAggrementOpen}
        type="privacy"
      />
    </>
  );
}

export default IdentityContainer;
