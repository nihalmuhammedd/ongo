import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, User } from 'lucide-react';
import { serviceRequests as initialRequests, drivers } from '../data/mockData';
import ServiceRequestCard from '../components/ServiceRequestCard';

const DriverDashboard = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState(initialRequests);

    // Simulating logged-in driver (Alex Johnson)
    const currentDriver = drivers[0];

    const handleAcceptJob = (requestId) => {
        setRequests(prev => prev.map(req =>
            req.id === requestId
                ? { ...req, status: 'Assigned', assignedDriverId: currentDriver.id }
                : req
        ));
    };

    const openRequests = requests.filter(r => r.status === 'Open');
    const myJobs = requests.filter(r => r.assignedDriverId === currentDriver.id && r.status !== 'Completed');

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Driver Dashboard</h1>
                        <p className="text-sm text-gray-500">Welcome back, {currentDriver.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                        <Bell size={20} className="text-gray-600" />
                        {openRequests.length > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                    </div>
                    <img
                        src={currentDriver.avatar}
                        alt={currentDriver.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Open Requests Feed */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                            New Requests
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                {openRequests.length}
                            </span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {openRequests.length > 0 ? (
                            openRequests.map(req => (
                                <ServiceRequestCard
                                    key={req.id}
                                    request={req}
                                    onAccept={handleAcceptJob}
                                    isDriverView={true}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <p className="text-gray-500">No new requests nearby.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* My Active Jobs */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                            My Active Jobs
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {myJobs.length > 0 ? (
                            myJobs.map(req => (
                                <ServiceRequestCard
                                    key={req.id}
                                    request={req}
                                    isDriverView={true}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <p className="text-gray-500">You have no active jobs.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;
