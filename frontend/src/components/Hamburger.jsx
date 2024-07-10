import React from "react";

export default function Hamburger({ onClick }) {
    return (
        <>
            <div 
                className="p-2 space-y-1 rounded hover:cursor-pointer shadow-lg w-8 h-8 flex flex-col justify-center items-center"
                onClick={onClick}
            >
                <span className="block w-5 h-0.5 bg-white"></span>
                <span className="block w-5 h-0.5 bg-white"></span>
                <span className="block w-5 h-0.5 bg-white"></span>
            </div>
        </>
    );
}
