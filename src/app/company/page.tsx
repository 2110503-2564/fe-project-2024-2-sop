'use client'
import { useState, useEffect } from "react";
import CompanyCatalog from "@/components/CompanyCatalog";
import getCompanies from "@/libs/getCompanies";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { Company } from "@/libs/interfaces";

export default function Companies() {
    const [selectedSize, setSelectedSize] = useState<string>("All"); 
    const [companies, setCompanies] = useState<{ count: number; data: Company[] } | null>(null);

    useEffect(() => {
        async function fetchCompanies() {
            const data = await getCompanies(); // 🔹 รอข้อมูลจาก API
            setCompanies(data);
        }
        fetchCompanies();
    }, []);

    const companySizes = ["All", "Large", "Medium", "Small"];

    return (
        <main className="text-center p-5 min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">Company</h1>

            
            <div className="flex justify-center space-x-4 my-5">
                {companySizes.map((size) => (
                    <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            selectedSize === size
                                ? "bg-blue-600 text-white shadow-lg"
                                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>

            
            {companies ? (
                <CompanyCatalog companyJson={companies} selectedSize={selectedSize} />
            ) : (
                <p>Loading...<LinearProgress /></p>
            )}
        </main>
    );
}
