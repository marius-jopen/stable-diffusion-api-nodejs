"use client"
import React, { useState } from 'react';

export default function ImageGenerator() {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Image data received:', data);
            // Optionally, handle the image data (e.g., display the image)
        } else {
            console.error('Failed to fetch the image');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="prompt">Enter a prompt for the image:</label>
                <input
                    className='bg-gray-200'
                    id="prompt"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button className='bg-green-200' type="submit">Generate Image</button>
            </form>
        </div>
    );
}
