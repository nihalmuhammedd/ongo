export const vehicles = [
    {
        id: 'v1',
        name: 'Ford Transit - FLT001',
        status: 'Active',
        health: 92,
        lastService: '2023-10-15',
        mileage: 45000,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000',
        type: 'Van'
    },
    {
        id: 'v2',
        name: 'Toyota Hilux - FLT002',
        status: 'Maintenance',
        health: 65,
        lastService: '2023-09-20',
        mileage: 82000,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000', // Placeholder
        type: 'Pickup'
    },
    {
        id: 'v3',
        name: 'Mercedes Sprinter - FLT003',
        status: 'Active',
        health: 88,
        lastService: '2023-11-01',
        mileage: 28000,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000', // Placeholder
        type: 'Van'
    }
];

export const wearAndTearData = {
    'v1': [
        { month: 'Jan', health: 100 },
        { month: 'Feb', health: 98 },
        { month: 'Mar', health: 97 },
        { month: 'Apr', health: 95 },
        { month: 'May', health: 94 },
        { month: 'Jun', health: 92 },
        { month: 'Jul', health: 90 },
        { month: 'Aug', health: 88 },
        { month: 'Sep', health: 85 },
        { month: 'Oct', health: 82 },
        { month: 'Nov', health: 80 },
        { month: 'Dec', health: 78 },
    ],
    'v2': [
        { month: 'Jan', health: 95 },
        { month: 'Feb', health: 92 },
        { month: 'Mar', health: 88 },
        { month: 'Apr', health: 85 },
        { month: 'May', health: 80 },
        { month: 'Jun', health: 75 },
        { month: 'Jul', health: 70 },
        { month: 'Aug', health: 68 },
        { month: 'Sep', health: 65 },
        { month: 'Oct', health: 65 }, // Maintenance happened
        { month: 'Nov', health: 65 },
        { month: 'Dec', health: 65 },
    ],
    'v3': [
        { month: 'Jan', health: 98 },
        { month: 'Feb', health: 97 },
        { month: 'Mar', health: 96 },
        { month: 'Apr', health: 95 },
        { month: 'May', health: 94 },
        { month: 'Jun', health: 93 },
        { month: 'Jul', health: 92 },
        { month: 'Aug', health: 91 },
        { month: 'Sep', health: 90 },
        { month: 'Oct', health: 89 },
        { month: 'Nov', health: 88 },
        { month: 'Dec', health: 88 },
    ]
};

export const maintenanceHistory = [
    {
        id: 'm1',
        vehicleId: 'v1',
        date: '2023-10-15',
        type: 'Routine Service',
        description: 'Oil change, filter replacement, brake check.',
        cost: 250,
        invoice: 'INV-2023-001',
        serviceCenter: {
            name: 'QuickFix Auto',
            address: '123 Mechanic Ln, Garage City',
            phone: '(555) 123-4567'
        }
    },
    {
        id: 'm2',
        vehicleId: 'v1',
        date: '2023-06-10',
        type: 'Tire Replacement',
        description: 'Replaced all 4 tires.',
        cost: 800,
        invoice: 'INV-2023-002',
        serviceCenter: {
            name: 'Tire Master',
            address: '45 Rubber Rd, Skid Marks',
            phone: '(555) 987-6543'
        }
    }
];

export const drivers = [
    {
        id: 'd1',
        name: 'Alex Johnson',
        status: 'Available',
        rating: 4.8,
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60'
    },
    {
        id: 'd2',
        name: 'Sarah Connor',
        status: 'Busy',
        rating: 4.9,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60'
    },
    {
        id: 'd3',
        name: 'Mike Ross',
        status: 'Available',
        rating: 4.5,
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60'
    }
];

export const serviceRequests = [
    {
        id: 'sr1',
        vehicleId: 'v2',
        vehicleName: 'Toyota Hilux - FLT002',
        type: 'Breakdown',
        description: 'Engine overheating, stuck on highway.',
        location: 'Highway 101, Exit 24',
        status: 'Open',
        assignedDriverId: null,
        postedAt: '10 mins ago'
    },
    {
        id: 'sr2',
        vehicleId: 'v3',
        vehicleName: 'Mercedes Sprinter - FLT003',
        type: 'Flat Tire',
        description: 'Rear left tire flat. Spare is missing.',
        location: 'Downtown Delivery Hub',
        status: 'Assigned',
        assignedDriverId: 'd2',
        postedAt: '1 hour ago'
    }
];
