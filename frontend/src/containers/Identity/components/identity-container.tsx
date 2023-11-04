import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTenant } from "@/lib/tenant";


interface IdentityContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    type: "login" | "register" | "confirm"; 
}

function IdentityContainer({ children, type } : IdentityContainerProps) {
  const tenant = getTenant();

  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        { type === "login" && (
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
        { type === "register" && (
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
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img
              src="logo.png"
              alt="Planor Logo"
              className="w-6 h-6 mr-2"
            />
            { (type === "login" || type === "register") ? tenant.charAt(0).toUpperCase() + tenant.slice(1) : "Planor" }
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Planor kullanarak küçük işletmemi çok daha farklı bir seviyeye taşıdım. Excel ile yürüttüğüm işletmemi artık çok daha profosyonel bir şekilde yönetiyor ve gerçekten nereden para kazanıp nereden para kaybettiğimi öğrenebiliyorum.&rdquo;
              </p>
              <footer className="text-sm">ABC Şirketi</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                { (type === "login" && tenant) && "Giriş yap" }
                { (type === "login" && !tenant) && "Giriş yap" }
                { (type === "register" && tenant) && "Müşteri olarak kayıt ol" }
                { (type === "register" && !tenant) && "Kayıt ol" }
                { type === "confirm" && "Hesabını onayla" }
              </h1>
              <p className="text-sm text-muted-foreground">
                { (type === "login" || type === "register") && "Lütfen bilgilerinizi giriniz." }
                { type === "confirm" && "Mail adresine gönderdiğimiz kodu aşağıya girerek hesabını onaylayabilirsin." }
              </p>
            </div>
            <div className="grid gap-6">
              { children }
            </div>
            { type === "login" || type === "register" && ( 
              <p className="px-8 text-center text-sm text-muted-foreground">
                Devam ederek{" "}
                <Link
                  to="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Kullanım sözleşmesi
                </Link>{" "}
                ve{" "}
                <Link
                  to="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Gizlilik sözleşmesini
                </Link>
                {" "}kabul etmiş sayılırsınız.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default IdentityContainer;
