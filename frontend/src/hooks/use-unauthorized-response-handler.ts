import axios from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast"


export function useUnauthorizedResponseHandler() {
  const { toast } = useToast()

  axios.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    (error) => {
      if (error.code === "ERR_NETWORK") {
        toast({
          title: "Sunucuya erişelimiyor",
          description:
            "Lütfen daha sonra tekrar deneyin, geliştiricilerimiz sorun üzerinde çalışıyor, yaşadığınız kötü tecrübe için özür dileriz.",
          variant: "destructive",
        });
      } else if (error.response?.status === 401) {
        toast({
          title: "Lütfen yeniden giriş yapınız.",
          variant: "destructive",
        });
      } else if (error.response?.status === 403) {
        toast({
          title: "Bu kaynağa erişim yetkiniz bulunmuyor.",
          description: "Lütfen yöneticiniz ile iletişime geçiniz.",
          variant: "destructive",
        });
      }

      return Promise.reject(error);
    }
  );

  return null;
}
