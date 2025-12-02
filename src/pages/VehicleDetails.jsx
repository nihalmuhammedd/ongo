import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Wrench,
    FileText,
    Upload,
    Calendar,
    AlertCircle,
    CheckCircle2,
    MapPin
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { vehicles, wearAndTearData, maintenanceHistory as initialHistory } from '../data/mockData';
import MaintenanceModal from '../components/MaintenanceModal';

const VehicleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const vehicle = vehicles.find(v => v.id === id) || vehicles[0];
    const [activeTab, setActiveTab] = useState('health');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [history, setHistory] = useState(initialHistory);

    // Filter history for this vehicle
    const vehicleHistory = history.filter(h => h.vehicleId === vehicle.id);

    // Get wear and tear data for this vehicle, fallback to v1 if missing
    const vehicleHealthData = wearAndTearData[vehicle.id] || wearAndTearData['v1'];

    const handleAddMaintenance = (data) => {
        const newRecord = {
            id: `m${Date.now()}`,
            vehicleId: vehicle.id,
            date: data.date,
            type: data.type,
            description: data.description,
            cost: parseFloat(data.cost),
            invoice: data.invoice || 'Pending',
            serviceCenter: {
                name: data.serviceCenter,
                address: '123 Main St', // Placeholder
                phone: '(555) 000-0000' // Placeholder
            }
        };
        setHistory([newRecord, ...history]);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700 border-green-200';
            case 'Maintenance': return 'bg-orange-100 text-orange-700 border-orange-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            <MaintenanceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddMaintenance}
            />

            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{vehicle.name}</h1>
                    <p className="text-sm text-gray-500">ID: {vehicle.id} • {vehicle.type}</p>
                </div>
                <div className={`ml-auto px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column - Stats & Info */}
                <div className="space-y-6">
                    {/* Health Card */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Health</h3>
                        <div className="flex items-center justify-center py-4">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="#f3f4f6"
                                        strokeWidth="12"
                                        fill="transparent"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke={vehicle.health > 80 ? '#22c55e' : vehicle.health > 50 ? '#eab308' : '#ef4444'}
                                        strokeWidth="12"
                                        fill="transparent"
                                        strokeDasharray={351.86}
                                        strokeDashoffset={351.86 - (351.86 * vehicle.health) / 100}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-3xl font-bold text-gray-900">{vehicle.health}%</span>
                                    <span className="text-xs text-gray-500">Overall</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Mileage</p>
                                <p className="font-semibold text-gray-900">{vehicle.mileage.toLocaleString()} km</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Last Service</p>
                                <p className="font-semibold text-gray-900">{vehicle.lastService}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors border border-gray-100 hover:border-blue-100"
                            >
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <Wrench size={18} />
                                </div>
                                <span className="font-medium">Log Maintenance</span>
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-700 transition-colors border border-gray-100 hover:border-purple-100"
                            >
                                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                    <Upload size={18} />
                                </div>
                                <span className="font-medium">Upload Invoice</span>
                            </button>
                            <button
                                onClick={() => alert('Service Request feature coming soon! (Check Driver View for demo data)')}
                                className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-colors border border-gray-100 hover:border-orange-100"
                            >
                                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                    <AlertCircle size={18} />
                                </div>
                                <span className="font-medium">Request Service</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Tabs & Details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('health')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'health'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Wear & Tear
                        </button>
                        <button
                            onClick={() => setActiveTab('maintenance')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'maintenance'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Maintenance History
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm min-h-[400px]">
                        {activeTab === 'health' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Health Trend</h3>
                                    <select className="text-sm border-gray-200 rounded-lg text-gray-500 bg-gray-50 p-2">
                                        <option>Last 12 Months</option>
                                        <option>Last 6 Months</option>
                                    </select>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={vehicleHealthData}>
                                            <defs>
                                                <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} domain={[60, 100]} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="health"
                                                stroke="#3b82f6"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorHealth)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-6 grid grid-cols-3 gap-4">
                                    <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                                        <p className="text-xs text-red-600 font-medium mb-1">Critical</p>
                                        <p className="text-sm text-gray-900">Brake Pads</p>
                                        <div className="w-full bg-red-200 rounded-full h-1.5 mt-2">
                                            <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                                        <p className="text-xs text-yellow-600 font-medium mb-1">Attention</p>
                                        <p className="text-sm text-gray-900">Tire Tread</p>
                                        <div className="w-full bg-yellow-200 rounded-full h-1.5 mt-2">
                                            <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                                        <p className="text-xs text-green-600 font-medium mb-1">Good</p>
                                        <p className="text-sm text-gray-900">Engine Oil</p>
                                        <div className="w-full bg-green-200 rounded-full h-1.5 mt-2">
                                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'maintenance' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">Service History</h3>
                                    <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Download All</button>
                                </div>
                                <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
                                    {vehicleHistory.length > 0 ? (
                                        vehicleHistory.map((record) => (
                                            <div key={record.id} className="relative pl-8">
                                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-blue-500"></div>
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <p className="text-sm text-gray-500">{record.date}</p>
                                                            {record.serviceCenter && (
                                                                <>
                                                                    <span className="text-gray-300">•</span>
                                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                        <MapPin size={12} />
                                                                        {record.serviceCenter.name}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                        <h4 className="text-base font-semibold text-gray-900">{record.type}</h4>
                                                        <p className="text-sm text-gray-600 mt-1">{record.description}</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-medium text-gray-900">${record.cost}</span>
                                                        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                                            <FileText size={14} />
                                                            {record.invoice}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-gray-500 text-sm">
                                            No maintenance history found for this vehicle.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;
