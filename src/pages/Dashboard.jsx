import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { vehicles } from '../data/mockData';

const StatCard = ({ label, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon size={20} className="text-white" />
            </div>
        </div>
        {trend && (
            <p className="text-xs text-green-600 mt-4 font-medium flex items-center gap-1">
                {trend}
            </p>
        )}
    </div>
);

const VehicleCard = ({ vehicle }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Maintenance': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <Link to={`/vehicle/${vehicle.id}`} className="block group">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-100 relative">
                    {/* Placeholder for vehicle image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
                        <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                    </div>
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                        {vehicle.status}
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{vehicle.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{vehicle.type} • {vehicle.mileage.toLocaleString()} km</p>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2 w-24">
                                <div
                                    className={`h-2 rounded-full ${vehicle.health > 80 ? 'bg-green-500' : vehicle.health > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${vehicle.health}%` }}
                                ></div>
                            </div>
                            <span className="text-xs font-medium text-gray-600">{vehicle.health}% Health</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const Dashboard = () => {
    return (
        <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Vehicles"
                    value={vehicles.length}
                    icon={CheckCircle}
                    color="bg-blue-500"
                />
                <StatCard
                    label="Active Now"
                    value={vehicles.filter(v => v.status === 'Active').length}
                    icon={Activity}
                    color="bg-green-500"
                />
                <StatCard
                    label="In Maintenance"
                    value={vehicles.filter(v => v.status === 'Maintenance').length}
                    icon={AlertTriangle}
                    color="bg-orange-500"
                />
                <StatCard
                    label="Scheduled Service"
                    value="2"
                    icon={Clock}
                    color="bg-purple-500"
                    trend="Next: 2 days"
                />
            </div>

            {/* Vehicle List */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Fleet Overview</h2>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map(vehicle => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
