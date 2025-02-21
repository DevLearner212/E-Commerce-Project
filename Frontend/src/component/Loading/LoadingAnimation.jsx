import React from 'react';

const LoadingAnimation = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="loader border-8 border-t-8 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
    );
};

export default LoadingAnimation;
