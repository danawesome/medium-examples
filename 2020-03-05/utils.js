const DEST_URL= "http://[destinationsite].domain.net/_api/contextinfo"

export async function pusher(url,digest,body,custom_err_msg){
	let headers = {
		"Content-Type":"application/json;odata=nometadata",
		"Accept":"application/json;odata=nometadata",
		'X-RequestDigest': undefined,
		'IF-MATCH': "*",
		'X-HTTP-Method': "MERGE",
	};
	if(digest){
		headers["X-RequestDigest"] = digest;
	}
	return fetch(url,{
		method:"POST",
		credentials:"include",
		headers:headers,
		body:body
	})
	.then(resp => {
		if(!resp.ok){
			throw new Error(resp.statusText);
		}
		return resp;
	})
	.then(data => {
		return data;
	})
	.catch(err => {
		if(custom_err_msg){
			console.error(`${custom_err_msg}`,err);
			return `${custom_err_msg}\n${err}`;
		} else {
			return err;
		}
	});
}
export async function getDigest(){
	let url = DEST_URL;
	return fetch(url,{
		method:'post',
		credentials:'include',
		headers:{"Accept":"application/json;odata=nometadata"}
	})
	.then(res => {
		return res.json();
	})
	.then(data => {
		return data;
	})
	.catch(error => console.error(error));
}

export async function fetcher(url,custom_err_msg){
    return fetch(url,{
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type":"application/json;odata=nometadata",
            "Accept":"application/json;odata=nometadata"
        }
    })
    .then(resp => {
        if(!resp.ok){
            throw new Error(resp.statusText);
        }
        return resp.json();
    })
    .then(data => {
        return data;
    })
    .catch(err => {
        if(custom_err_msg){
			console.error(`${custom_err_msg}`,err);
			return `${custom_err_msg}\n${err}`;
		} else {
			return err;
		}
    });
}