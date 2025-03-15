import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getInputData = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password || (!isLogin && !fullName)) {
            setError('All fields are required!');
            setLoading(false);
            return;
        }

        const user = isLogin ? { email, password } : { fullname: fullName, email, password };

        try {
            const res = await axios.post(
                `${API_END_POINT}/${isLogin ? 'login' : 'register'}`,
                user
            );
            console.log('Response:', res.data);
        } catch (err) {
            console.error('Error details:', {
                status: err.response?.status,
                data: err.response?.data,
                error: err.message
            });
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
            setEmail('');
            setFullName('');
            setPassword('');
        }
    };

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    className="w-[100vw] h-[100vh]"
                    src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*5lyavS59mazOFnb55Z6znQ.png"
                    alt="imgCover"
                />
            </div>
            <form
                onSubmit={getInputData}
                className="absolute flex flex-col w-3/12 my-48 left-0 right-0 mx-auto items-center rounded-md bg-black p-12 opacity-90"
            >
                <h1 className="text-white text-3xl mb-6 font-bold">
                    {isLogin ? 'Login' : 'SignUp'}
                </h1>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex flex-col">
                    {!isLogin && (
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            type="text"
                            placeholder="Full Name"
                            className="outline-none p-3 mt-2 rounded-md bg-gray-800 text-white"
                        />
                    )}
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="outline-none p-3 mt-2 rounded-md bg-gray-800 text-white"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="outline-none p-3 mt-2 rounded-md bg-gray-800 text-white"
                    />
                    <button
                        type="submit"
                        className={`bg-red-500 text-white py-3 mt-4 rounded-md font-bold ${loading ? 'opacity-50' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : isLogin ? 'Login' : 'SignUp'}
                    </button>
                    <p className="text-white text-center mt-2">
                        {isLogin ? 'New to Netflix?' : 'Already have an account?'}{' '}
                        <span
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-red-600 cursor-pointer"
                        >
                            {isLogin ? 'SignUp' : 'Login'}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
