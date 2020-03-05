import { getDigest, pusher } from "utils.js";
const DEST_DOMAIN = 'http://[destinationsite].domain.net'
async function saveDataAcrossSCs() {
	const DATA = JSON.stringify({
		"data-model": [
			{
				"item1": "value1"
			},
			{
				"item2": "value2"
			},
			{
				"item3": "value3"
            }
            // ,
			// {
			// 	"item4": "value4"
			// },
			// {
			// 	"item5": "value5"
			// // },
			// {
			// 	"item6": "value6"
			// },
			// {
			// 	"item7": "value7"
			// }
		]
	});
	const BODY = JSON.stringify({Title: DATA});
	// console.log("BODY", BODY);
	const ID = 1;
	const URL = `${DEST_DOMAIN}/test/_api/web/lists/getbytitle('CORS-Test')/items(${ID})`;
	const DIGEST_OBJ = await getDigest();
	const DIGEST = DIGEST_OBJ.FormDigestValue;
	// console.log("DIGEST",DIGEST);
	const RESULT = await pusher(URL, DIGEST, BODY, "Something, Something, Darkside...");
	// console.log("RESULT",RESULT);
	return RESULT;
}