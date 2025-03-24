import CompanyCatalog from "@/components/CompanyCatalog";
import getCompanies from "@/libs/getCompanies";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default  function Company(){
    const companies =  getCompanies()
    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Travel Partner</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
            <CompanyCatalog companyJson={companies}/>
            </Suspense>
          
        </main>
    );
}