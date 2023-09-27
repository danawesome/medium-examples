// FOR paste into a console of source SharePoint site:
const DEST_DOMAIN = 'http://[destinationsite].domain.net'
async function getDigest(){
	let url = `${DEST_DOMAIN}/_api/contextinfo`;
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
const DIGEST_OBJ = await getDigest();
const DIGEST = DIGEST_OBJ.FormDigestValue;
console.log("DIGEST",DIGEST)
async function fetcher(url,custom_err_msg){
    return fetch(url,{
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type":"application/json;odata=nometadata",
			"Accept":"application/json;odata=nometadata",
			"X-RequestDigest":DIGEST
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
let testResult, url;
url = `${DEST_DOMAIN}/test/_api/web/lists/getbytitle('CORS-Test')/items(1)/$select=Title`;
testResult = await fetcher(url);
console.log("results",JSON.parse(testResult.Title));
