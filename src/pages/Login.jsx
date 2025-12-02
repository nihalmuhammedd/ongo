import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, ShieldCheck, Truck } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (role) => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const userData = role === 'admin'
                ? { name: 'Admin User', role: 'admin', email: 'admin@ongo.com' }
                : { name: 'Alex Johnson', role: 'driver', email: 'alex@ongo.com', id: 'd1' };

            login(userData);

            if (role === 'admin') {
                navigate('/');
            } else {
                navigate('/driver');
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-blue-600 p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <Truck size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Welcome to Ongo</h1>
                    <p className="text-blue-100 mt-2">Vehicle Health & Fleet Management</p>
                </div>

                <div className="p-8">
                    <p className="text-center text-gray-500 mb-8">Select your role to continue</p>

                    <div className="space-y-4">
                        <button
                            onClick={() => handleLogin('admin')}
                            disabled={isLoading}
                            className="w-full p-4 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group flex items-center gap-4 text-left"
                        >
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Fleet Manager</h3>
                                <p className="text-sm text-gray-500">Admin Dashboard Access</p>
                            </div>
                        </button>

                        <button
                            onClick={() => handleLogin('driver')}
                            disabled={isLoading}
                            className="w-full p-4 border-2 border-gray-100 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group flex items-center gap-4 text-left"
                        >
                            <div className="p-3 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <User size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Driver</h3>
                                <p className="text-sm text-gray-500">Job Board & Assignments</p>
                            </div>
                        </button>
                    </div>

                    {isLoading && (
                        <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            Logging in...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
