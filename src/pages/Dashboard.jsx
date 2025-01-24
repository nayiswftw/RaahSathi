import { useAuth } from '@clerk/clerk-react';
import React from 'react'
import { useNavigate } from 'react-router';

function Dashboard() {
    const auth = useAuth();
    const navigate = useNavigate();

    if (!auth.userId) {
        navigate('/auth');
    }

    return (
        <div>

        </div>
    )
}

export default Dashboard
