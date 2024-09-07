import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/auth";

const Signin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [test, setTest] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (isLoad) return;
    setIsLoad(true);

    const data = {
      userName: userName,
      password: passWord
    };
    try {
      const response = await axios.post("http://localhost:8030/auth/login", data);
      console.log("Response received", response.data);
      localStorage.setItem('user', response.data);
      signIn(data); // Update authentication state
      navigate('/', { state: { UserInfo: data } });
    } catch (error) {
      setTest("Error during request");
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <div className="bg-cover bg-[url('/public/assets/img/logo3.png')] h-screen ">
    <div className="h-screen flex flex-col justify-center items-center">
<div className="border rounded bg-white rounded-lg shadow-lg p-5">
<div className="flex justify-center">
          <img src="/assets/img/logo1.png" alt="" className="w-52" />
        </div>
  {
    test === "Error during request" ?
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">{test}</h2>
          <div className="space-y-4">
          </div>
        </div>
        :
        <div></div>
  }

        {
          isLoad ?
            <div>
              Sign In ...
            </div>
            : <div className="mt-8">
              <form className="flex flex-col gap-3 w-80" onSubmit={handleSignIn}>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-xs font-bold">Adresse email:</label>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    className="px-3 py-2 border-2 border-gray-400 rounded-lg"
                    id="email"
                    name="username"
                    placeholder="exemple@gmail.com"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="text-xs font-bold">Mot de passe:</label>
                  <input
                    value={passWord}
                    onChange={(e) => setPassWord(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    className="px-3 py-2 border-2 border-gray-400 rounded-lg"
                    placeholder="mot de passe"
                    autoComplete="off"
                    required
                  />
                </div>
                <button type="submit" className="p-4 bg-blue-600 font-bold uppercase text-white text-sm rounded-lg mt-3">
                  Sign in
                </button>
              </form>
            </div>
        }
      </div>
    </div>
    </div>);
};

export default Signin;