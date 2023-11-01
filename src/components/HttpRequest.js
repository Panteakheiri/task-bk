const postData = async (path, data) => {
    try {
        const response = await fetch(`http://rezayari.ir:5050/${path}`,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{"Content-Type" : "application/json",
             }
        })
        const json = await response.json()
        return json
    } catch (error) {
        alert("error")
    }
} 
export {postData};

