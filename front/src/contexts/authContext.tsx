import Toast from "@/components/toast";
import { LoginData, UserData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  setToken: Dispatch<SetStateAction<string>>;
  token: string | undefined;
  register: (userData: UserData) => void;
  login: (loginData: LoginData) => void;
}

const authContext = createContext<authProviderData>({} as authProviderData);

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  const register = (userData: UserData) => {
    api
      .post("/users", userData)
      .then(() => {
        Toast({ message: "usuário criado com sucesso !", isSucess: true });
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        Toast({ message: "Erro ao criar o usuário" });
      });
  };

  const login = (loginData: LoginData) => {
    api
      .post("/login", loginData)
      .then((response) => {
        setCookie(null, "kenziefy.token", response.data.token, {
          maxAge: 60 * 30,
          path: "/"
        });
        Toast({ message: "login realizado com sucesso !", isSucess: true });
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        Toast({ message: "Erro ao logar, verifique se o e-mail e senha estão corretos" });
      });
  };
  return (
    <authContext.Provider value={{ login, register, token, setToken }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
