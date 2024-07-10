import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const validateInput = (input) => input !== "";

  const handleLogin = () => {
    if (!validateInput(identifier) || !validateInput(password)) {
      return toast.error("Tolong Isi Semua Field");
    }
    if (
      identifier === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      localStorage.setItem("isAuthenticated", true);
      router.replace("/admin");
    } else {
      console.log(process.env.NEXT_PUBLIC_ADMIN_USERNAME);
      toast.error("Login Gagal Tolong Ulangi Lagi");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-neutral font-poppins px-[5%] md:px-0">
      <section className="flex flex-col items-center justify-center md:flex-row md:gap-[100px] bg-white rounded-[20px] p-8 md:p-10 border-4 border-black">
        <div className="flex-shrink-0 w-[150px] md:w-auto"></div>

        <div>
          <p className="flex flex-col text-[30px] font-semibold justify-center items-center text-yellow">
            Admin Login
          </p>

          <form
            className="flex flex-col gap-[0.8rem] mt-5 md:mt-8 text-yellow w-[100vw] max-w-[300px]"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <label className="flex flex-col gap-[0.4rem]">
              Username
              <input
                className="outline outline-1 focus:outline-2 rounded-[3px] text-black py-1 px-1.5 outline-yellow"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-[0.4rem]">
              Password
              <input
                className="outline outline-1 focus:outline-2 rounded-[3px] text-black py-1 px-1.5 outline-yellow"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="!mt-3 py-1 w-[50%] hover:pointer bg-blue-500 rounded-[8px] text-white"
              >
                Login
              </button>
              <button
                type="button"
                className="!mt-3 py-1 w-[50%] hover:pointer bg-red-500 rounded-[8px] text-white"
                onClick={() => router.replace("/")}
              >
                Kembali
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
