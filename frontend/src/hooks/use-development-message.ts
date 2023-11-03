import { isDevelopment } from "@/lib/config";
import { useState } from "react";

const useDevelopmentMessage = () => {
    const [count, setCount] = useState(0);
    if (!isDevelopment() && count === 0) {
        const headerCSS = "text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue; font-size: 30px; white-space: nowrap;"
        console.log("%cPlanor geliştirme aşamasındadır.", headerCSS);

        const bodyCSS = "text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue; font-size: 15px; white-space: nowrap;"
        console.log("%cEğer akra planda neler döndüğüne bu kadar meraklıysan kariyer sayfamıza göz at, sana ihtiyacımız olabilir!", bodyCSS);
        setCount(count + 1);
    }
}

export default useDevelopmentMessage