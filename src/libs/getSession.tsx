import {SessionResponse} from "./interfaces";

export default async function getSessions(sid: string): Promise<SessionResponse> {
    const url = `http://localhost:5000/api/v1/sessions/${sid}`;
    console.log("sid: " + sid)
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        const response = await fetch(url);
        

        if(!response.ok){
            throw new Error("Failed to fetch sessions")
        }
    
        

        return await response.json();
    } 
    catch (error) {
        console.error("Error fetching sessions:", error);
        throw error;
    }
}
