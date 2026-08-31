import { createContext, useContext, useEffect, useState } from "react";
import * as api from "./api";
import { saveToken, loadToken, clearToken } from "./storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [restoring, setRestoring] = useState(true);

  // on boot, see if a stored token is still good
  useEffect(() => {
    (async () => {
      try {
        const stored = await loadToken();
        if (stored) {
          const { user } = await api.getMe(stored);
          setToken(stored);
          setUser(user);
        }
      } catch (err) {
        // expired or revoked -- start clean
        await clearToken();
      } finally {
        setRestoring(false);
      }
    })();
  }, []);

  async function handleAuth(result) {
    await saveToken(result.token);
    setToken(result.token);
    setUser(result.user);
  }

  const value = {
    user,
    token,
    restoring,
    signIn: async (email, password) =>
      handleAuth(await api.login(email, password)),
    signUp: async (email, password) =>
      handleAuth(await api.signup(email, password)),
    signOut: async () => {
      await clearToken();
      setToken(null);
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
