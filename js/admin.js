const URL_GET = 'https://cherguvannya-f8c7b-default-rtdb.firebaseio.com/db.json';
const URL_UPDATE = id => `https://cherguvannya-f8c7b-default-rtdb.firebaseio.com/db/${id}.json`;

async function updateData(url,data) {
	const dataResponse = await fetch(url,{
		method: 'PUT',
		body: JSON.stringify(data),
	});
}

async function getData(url) {
	const dataResponse = await fetch(url);
	return dataResponse;
}



// fetch(URL_GET,{
// 	method: "POST",
// 	body: JSON.stringify({
// 		name: '',
// 		count: 0,
// 		lastDate: new Date().toLocaleDateString().replaceAll('/','.'),
// 		countWash: 0,
// 		countSweep: 0,
// 	})
// })



// const btn = document.querySelector('.submit');

// btn.addEventListener('click',() => {
// 	const users = document.querySelector('.users');
// 	const role = document.querySelector('.role');

// 	const nameAndId = users.value.split('/');

// 	getData(URL_GET)
// 		.then(data => data.json())
// 		.then(data => {
// 			updateData(URL_UPDATE(nameAndId[0]), {
// 				name: nameAndId[1],
// 				count: data[nameAndId[0]].count + 1,
// 				lastDate: new Date().toLocaleDateString().replaceAll('/','.'),
// 				countWash: role.value == 'wash' ? data[nameAndId[0]].countWash + 1 : data[nameAndId[0]].countWash,
// 				countSweep: role.value == 'sweep' ? data[nameAndId[0]].countSweep + 1 : data[nameAndId[0]].countSweep,
// 		})
// 	})	
// });



