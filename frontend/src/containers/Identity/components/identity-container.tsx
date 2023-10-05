import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";


interface IdentityContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    type: "login" | "register" | "tenant" | "confirm"; 
}

function IdentityContainer({ children, type } : IdentityContainerProps) {

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
            Hesap oluştur
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Planor
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Planor kullanarak küçük işletmemi çok daha farklı bir seviyeye taşıdım. Excel ile yürüttüğüm işletmemi artık çok daha profosyonel bir şekilde yönetiyor ve gerçekten nereden para kazanıp nereden para kaybettiğimi öğrenebiliyorum.&rdquo;
              </p>
              <footer className="text-sm">Enes Demir</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                { type === "login" && "Giriş yap" }
                { type === "register" && "Kayıt ol" }
                { type === "tenant" && "Alan adını seç" }
                { type === "confirm" && "Hesabını onayla" }
              </h1>
              <p className="text-sm text-muted-foreground">
                { type === "login" || type === "register" && "Lütfen bilgilerinizi giriniz." }
                { type === "tenant" && "Alan adınız türkçe karakter içermemelidir." }
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
