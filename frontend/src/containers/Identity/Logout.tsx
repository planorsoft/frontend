import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="h-screen flex items-center justify-center">
      Çıkış yapılıyor.
    </div>
  );
}

export default Logout;
