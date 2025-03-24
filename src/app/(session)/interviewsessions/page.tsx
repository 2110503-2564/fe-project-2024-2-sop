import SessionCatalog from "@/components/SessionsCatalog";
import getSessions from "@/libs/getSessions";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default async function Session() {
  

    const sessions = await getSessions();
    return (
      <div className="min-h-screen bg-white">
        <main className="text-center p-5">
          <div className="flex flex-col justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Book Your Interview</h1>
          </div>
          <div className="space-y-8">
              <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <SessionCatalog sessionJson={sessions} />
              </Suspense>
            </div>
        </main>
      </div>
    );
    
}
