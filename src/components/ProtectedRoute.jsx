import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user?.user);

    if (!user) {
        // Redirect to login page if user is not logged in
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute; 