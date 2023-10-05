import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react";

export async function healthCheck() {
  try {
    return axios.get("/health");
  } catch (error) {
    return error;
  }
}

export async function useHealthCheck() {
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        await healthCheck();
      } catch (error : unknown) {
        if(!(error instanceof AxiosError)) { throw error; }
        
        if(error.code === "ERR_NETWORK") {
          toast({
            title: "İnternet bağlantısı yok",
            description:
              "Lütfen internet bağlantınızı kontrol edin.",
            variant: "destructive",
          });
          return;
        }

        if (
          error.response?.data == "Unhealthy" ||
          error.response?.status == 500 ||
          error.response?.status == 503
        ) {
          toast({
            title: "Sunucuya erişelimiyor",
            description:
              "Lütfen daha sonra tekrar deneyin, geliştiricilerimiz sorun üzerinde çalışıyor, yaşadığınız kötü tecrübe için özür dileriz.",
            variant: "destructive",
          });
          return;
        }
    
        if (error.response?.data == "Degraded") {
          toast({
            title: "Sunucuya erişimde sorun yaşanıyor",
            description:
              "Uygulamayı kullanırkenki tecrübeniz kötü etkilenebilir, geliştiricilerimiz sorun üzerinde çalışıyor, yaşadığınız kötü tecrübe için özür dileriz.",
            variant: "destructive",
          });
          return;
        }
    
      }
    })();
  }, [toast]);
}
