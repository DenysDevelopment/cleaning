const URL_GET = 'https://cherguvannya-f8c7b-default-rtdb.firebaseio.com/db.json';
const URL_UPDATE = id => `https://cherguvannya-f8c7b-default-rtdb.firebaseio.com/db/${id}.json`;

async function updateData(url) {
	console.log(data)
	const data = await fetch(url,{
		method: 'PUT',
		body: JSON.stringify({
			name: 'test',
			count: 111,
		})
	});
	console.log(data);

	data.then(data => {
		return console.log(data)
	}).cath(err => {
		returnconsole.log(err)
	})
}

updateData(URL_UPDATE('-MWoF9lGZHUwOWLIwPYx'))
