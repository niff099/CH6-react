import { jwtDecode } from "jwt-decode";
import { Children, createContext, useContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login");
    }
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.data.token;

      localstorage.setItem("token", token);
      setIsAuthenticated(true);
      setUser(jwtDecode(token));
      navigate("/");
    } catch (error) {
      throw new Error(err.message || "Login Failed");
    }

    localStorage.setItem("token", token);
    setisAuthenticated(true);
    setUser(jwtDecode(token));
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setisAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("error in useAuth function");
  }
};

export default AuthProvider;
