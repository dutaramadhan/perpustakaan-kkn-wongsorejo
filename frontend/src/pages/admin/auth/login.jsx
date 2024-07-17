import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/admin",
    });

    if (result.error) {
      toast.error("Login Gagal Tolong Ulangi Lagi");
    } else {
      window.location.href = result.url;
    }
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-neutral font-poppins px-[5%] md:px-0">
      <section className="flex flex-col items-center justify-center bg-white rounded-[20px] p-8 md:p-10 border-4 border-black">
        <div className="flex-shrink-0 w-[150px] md:w-auto"></div>
    
        <div>
            <p className="flex flex-col text-[30px] font-semibold justify-center items-center text-yellow">
              Admin Login
            </p>
      <form onSubmit={handleSignIn} className="flex flex-col gap-[0.8rem] mt-5 md:mt-8 text-yellow w-full max-w-[300px]">
      <label className="flex flex-col gap-[0.4rem]">
          Username
        <input
          className="outline outline-1 focus:outline-2 rounded-[3px] text-black py-1 px-1.5 outline-yellow"
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        </label>
        <label className="flex flex-col gap-[0.4rem]">
          Password
        <input
          className="outline outline-1 focus:outline-2 rounded-[3px] text-black py-1 px-1.5 outline-yellow"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </label>
        <div className="flex flex-col items-center">
        <button className="!mt-3 py-1 w-[50%] hover:pointer bg-blue-500 rounded-[8px] text-white" type="submit">Login</button>
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
};

export default LoginPage;
