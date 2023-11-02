import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex gap-2 flex-col justify-center items-center">
        <h2 className="mt-10 scroll-m-20 pb-1 text-destructive text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        403 - Yetkiniz bulunmuyor
        </h2>
        <p className="leading-7 m-3">
          Aradığınız sayfayı bulduk ancak bu sayfaya erişmek için yetkiniz bulunmuyor.
        </p>
        <Button onClick={() => { navigate("/login") }}>
          Giriş yapın
        </Button>
      </div>
    </div>
  )
}

export default Forbidden