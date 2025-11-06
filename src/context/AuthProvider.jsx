import { createContext, useState, use } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    localStorage.getItem("user") || null
  );
  const [totpToken, setTotpToken] = useState(
    sessionStorage.getItem("token") || ""
  );
  const [otpStatus, setOtpStatus] = useState(
    localStorage.getItem("otpStatus") || ""
  );
  const [qrStatus, SetQrStatus] = useState(
    localStorage.getItem("qrStatus") || ""
  );
  const [activeRole, setActiveRole] = useState(
    localStorage.getItem("activeRole") || ""
  );
  const [activeOrgId, setActiveOrgId] = useState(
    localStorage.getItem("activeOrgId") || ""
  );
  const [activeOrgName, setActiveOrgName] = useState(
    localStorage.getItem("activeOrgName") || ""
  );

  return (
    <AuthContext
      value={{
        userData,
        setUserData,
        totpToken,
        setTotpToken,
        otpStatus,
        setOtpStatus,
        qrStatus,
        SetQrStatus,
        activeRole,
        setActiveRole,
        activeOrgId,
        setActiveOrgId,
        activeOrgName,
        setActiveOrgName,
      }}
    >
      {" "}
      {children}
    </AuthContext>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return use(AuthContext);
};
