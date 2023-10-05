import axios from "@/utils/axios";

export function useUnauthorizedResponseHandler(navigate, toast) {
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
          status: "error",
          duration: 12000,
          isClosable: true,
        });
      }
      if (error.response?.status === 401) {
        navigate("/login");
        toast({
          title: "Oturum süreniz doldu, lütfen yeniden giriş yapınız.",
          status: "error",
          duration: 12000,
          isClosable: true,
        });
      }
      if (error.response?.status === 403) {
        toast({
          title: "Bu kaynağa erişim yetkiniz bulunmuyor.",
          description: "Lütfen yöneticiniz ile iletişime geçiniz.",
          status: "error",
          duration: 12000,
          isClosable: true,
        });
      }

      return Promise.reject(error);
    }
  );
}
