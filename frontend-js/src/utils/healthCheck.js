import axios from "@/utils/axios";

export async function healthCheck() {
  try {
    return axios.get("/health");
  } catch (error) {
    return error;
  }
}

export async function healthCheckWithToast(toast) {
  try {
    await healthCheck();
  } catch (error) {
    if (
      error.response.data == "Unhealthy" ||
      error.response.status == 500 ||
      error.response.status == 503
    ) {
      toast({
        title: "Sunucuya erişelimiyor",
        description:
          "Lütfen daha sonra tekrar deneyin, geliştiricilerimiz sorun üzerinde çalışıyor, yaşadığınız kötü tecrübe için özür dileriz.",
        status: "error",
        duration: 12000,
        isClosable: true,
      });
    }

    if (error.data == "Degraded") {
      toast({
        title: "Sunucuya erişimde sorun yaşanıyor",
        description:
          "Uygulamayı kullanırkenki tecrübeniz kötü etkilenebilir, geliştiricilerimiz sorun üzerinde çalışıyor, yaşadığınız kötü tecrübe için özür dileriz.",
        status: "warning",
        duration: 12000,
        isClosable: true,
      });
    }
  }
}
