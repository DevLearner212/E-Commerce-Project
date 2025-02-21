import React, { useState } from 'react';

const demo = () => {
    const [selectedColor, setSelectedColor] = useState('#ffffff'); // Default color

    const handleColorChange = (e) => {
        setSelectedColor(e.target.value);
    };

    return (
        <div class="flex">
            <span class="mr-3">Color</span>
            <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button class="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
        </div>
    );
};

export default demo;
