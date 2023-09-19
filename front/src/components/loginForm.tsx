import { useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { LoginData, loginSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { HiOutlineRefresh } from "react-icons/hi"; // Importe o ícone do Heroicons

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema)
  });

  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onFormsubmit = async (formData: LoginData) => {
    console.log(formData);
    setIsLoading(true);

    setTimeout(async () => {
      await login(formData);
      setIsLoading(false);
      router.push("/");
    }, 3000);
  };

  const formVariants = {
    hidden: {
      opacity: 0,
      x: -100
    },
    visible: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: -100
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      className="user-form-container"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={formVariants}
      transition={{ duration: 0.5 }}>
      <p className="text-4xl mt-6 font-semibold">Login</p>
      <form className="space-y-6 w-[90%]" onSubmit={handleSubmit(onFormsubmit)}>
        <div>
          <label htmlFor="email" className="user-form-label">
            E-mail
          </label>
          <div className="mt-2">
            <input
              type="email"
              placeholder="example@.com"
              className="user-form-input"
              {...register("email")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="user-form-label">
            Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              placeholder="Sua senha"
              className="user-form-input"
              {...register("password")}
            />
          </div>
          <Link href={"/resetPassword"} className="user-form-link">
            Esqueceu a senha ? Clique aqui
          </Link>
        </div>
        <div>
          <motion.button
            type="submit"
            className="user-form-button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap">
            {isLoading ? <HiOutlineRefresh className="animate-spin" /> : "Entrar"}
          </motion.button>
        </div>
      </form>

      <Link href={"/register"} className="user-form-link mt-4">
        Não é cadastrado ainda? Clique aqui
      </Link>
    </motion.div>
  );
};

export default LoginForm;
