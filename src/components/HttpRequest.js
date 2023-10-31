const postData = async (path, data) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTg3MzgyODcsImlzcyI6InJlemF5YXJpLmlyIiwiYXVkIjoicmV6YXlhcmkuaXIifQ.NGrtQZ4vako1lZlAbbU2yjlX9q-mHfe1C6yCyTghYB8"
    try {
        const response = await fetch(`http://rezayari.ir:5050/${path}`,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{"Content-Type" : "application/json",
            "authorization" : `berear ${token}`, }
        })
        const json = await response.json()
        return json
    } catch (error) {
        alert("error")
    }
    
} 
export {postData};

