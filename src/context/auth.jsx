import { useContext, createContext, useReducer, useEffect } from "react";

import axios from "axios";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const initialState = {
  isAuthLoading: false,
  isAuthenticated: false,
  currentUser: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_CURRENTUSER":
      return {
        ...state,
        isAuthenticated: true,
        currentUser: payload,
      };
    case "SET_AUTH_LOADING":
      return {
        ...state,
        isAuthLoading: payload,
      };
    case "REMOVE_USER":
      return state;
  }
};

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        dispatch({ type: "SET_AUTH_LOADING", payload: true });
        const token = localStorage.getItem("access_token");

        if (token) {
          const currentUserRes = await axios.get("/auth/me", {
            headers: {
              Authorization: token,
            },
          });
          dispatch({ type: "SET_CURRENTUSER", payload: currentUserRes.data });
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "SET_AUTH_LOADING", payload: false });
      }
    }

    loadCurrentUser();
  }, []);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
