export default async function getCompany(id:string){
    await new Promise((resolve)=>setTimeout(resolve,300))
    
    const response = await fetch(`http://localhost:5000/api/v1/companies/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch company")
    }

    return await response.json()
}