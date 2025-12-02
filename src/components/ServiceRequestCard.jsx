import React from 'react';
import { MapPin, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const ServiceRequestCard = ({ request, onAccept, isDriverView }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Assigned': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'Completed': return 'bg-green-50 text-green-700 border-green-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                        {request.status}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">{request.type}</h3>
                    <p className="text-sm text-gray-500">{request.vehicleName}</p>
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={14} />
                    {request.postedAt}
                </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {request.description}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg">
                <MapPin size={16} className="text-gray-400 shrink-0" />
                <span className="truncate">{request.location}</span>
            </div>

            {isDriverView && request.status === 'Open' && (
                <button
                    onClick={() => onAccept(request.id)}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
                >
                    <CheckCircle2 size={16} />
                    Accept Job
                </button>
            )}

            {isDriverView && request.status === 'Assigned' && (
                <button
                    disabled
                    className="w-full py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium text-sm flex items-center justify-center gap-2 cursor-default"
                >
                    <Clock size={16} />
                    In Progress
                </button>
            )}
        </div>
    );
};

export default ServiceRequestCard;
