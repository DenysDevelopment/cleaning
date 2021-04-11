const URL = 'https://cherguvannya-f8c7b-default-rtdb.firebaseio.com/db.json';
const out = document.querySelector('.users');
let data;

// function sortByCount(arr) {
// 	return arr.sort((a, b,) => a.count > b.count ? 1 : -1);
// }
function sortByCount(arr) {
	return arr.sort((a, b,) => a.count > b.count ? 1 : -1);
}

function sortByFine(arr) {
	return arr.sort((a, b) => a.countFine > 0 ? 1 : -1);
}


async function getData(url) {
	const dataResponse = await fetch(url);
	return dataResponse;
}

getData(URL)
	.then(data => data.json())
	.then(response => {
		data = response;	
		renderUsers();
	})

function renderUsers() {


	sortByCount(sortByFine(Object.values(data))).forEach(el => {
		out.innerHTML += `<li class='users__item' data-date='${el.lastDate}'>
			<div class="users__fine" style='color:
			${
				el.countFine === 0 ? '#fff' :
				 el.countFine == 1 ? '#ff3838' :
				 el.countFine == 2 ? '#ff1717' : '#ff0000'
			}'
			>Штрафи: ${el.countFine}</div>
			<div class="users__name">${el.name}</div>
			<div class="users__count">Чергував: ${el.count}</div>
			<div class="users__wash">Мив: ${el.countWash}</div>
			<div class="users__sweep">Замітав: ${el.countSweep}</div>
		</li>`
	})
}






