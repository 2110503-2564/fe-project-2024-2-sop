'use client'
import Link from "next/link";
import SessionCard from "./SessionCard";
import { SessionItem, SessionResponse } from "@/libs/interfaces.js";
import React, { useState } from 'react';

export default function SessionCatalog({ sessionJson }: { sessionJson: SessionResponse }) {
    const sessionJsonReady = sessionJson;

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [all, setAll] = useState<SessionItem | null>(null);

    console.log(isPopupOpen);

    const handleOpenPopup = (sessionItem: SessionItem) => {
        setAll(sessionItem);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setAll(null);
        setIsPopupOpen(false);
    };

    return (
        <div className="p-6">
            <div className="border-t pt-4 mt-4 overflow-y-scroll flex-1" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                <div className="flex flex-col gap-4">
                    {sessionJsonReady.data.map((sessionItem: SessionItem) => (
                        <SessionCard
                            key={sessionItem.id}
                            sessionItem={sessionItem}
                            popOpen={handleOpenPopup}
                            setAll={setAll}
                        />
                    ))}
                </div>
            </div>

            {isPopupOpen && all && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-28 text-black flex justify-center items-center z-50">
                    <div className="flex justify-center items-center h-screen">
                        <div className="relative w-96 p-6 bg-white border rounded-lg shadow-lg h-[400px]">
                            <h2 className="text-xl font-semibold mb-4 text-center">Booking Form</h2>

                            <div>
                                <h1>Company: {all.companiess.name}</h1>
                            </div>
                            <div>
                                <h1>Session: {all.sessionName}</h1>
                            </div>
                            <div>
                                <h1>Job Position: {all.jobPosition}</h1>
                            </div>

                            <div className="flex flex-col gap-4">
                                <label htmlFor="date" className="font-medium">Select Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    className="p-2 border rounded"
                                />
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                                <button
                                    onClick={handleClosePopup}
                                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                    Back
                                </button>

                                <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Book!!!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
