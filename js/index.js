const URL = "https://cherguvannya-f8c7b-default-rtdb.firebaseio.com/db.json";
const out = document.querySelector(".users");
let data;

// function sortByCount(arr) {
// 	return arr.sort((a, b,) => a.count > b.count ? 1 : -1);
// }
function sortByCount(arr) {
  return arr.sort((a, b) => (a.count > b.count ? 1 : -1));
}

function sortByFine(arr) {
  return arr.sort((a, b) => (a.countFine < 0 ? 1 : -1));
}

async function getData(url) {
  const dataResponse = await fetch(url);
  return dataResponse;
}

getData(URL)
  .then((data) => data.json())
  .then((response) => {
    data = response;
    renderUsers();
  });

function renderUsers() {
  out.innerHTML = "";
  sortByCount(Object.values(data)).forEach((el) => {
    out.innerHTML += `<li class='users__item' data-date='${el.lastDate}'>
			<div class="users__name">${el.name}</div>
			<div class="users__count">Чергував: ${el.count}</div>
			<div class="users__wash">Мив: ${el.countWash}</div>
			<div class="users__sweep">Замітав: ${el.countSweep}</div>
		</li>`;
  });
}

const btnUsertabElem = document.querySelector(".all-user");

btnUsertabElem.addEventListener("click", renderUsers);

//========================================================================================================================================================
//fine

const btnFinetabElem = document.querySelector(".fine");

btnFinetabElem.addEventListener("click", () => {
  out.innerHTML = "";
  sortByFine(sortByCount(Object.values(data))).forEach((el) => {
    if (el.countFine > 0) {
      out.innerHTML += `<li class='users__item' data-date='${el.lastDate}'>
			<div class="users__fine" style='color:
			${
        el.countFine === 0
          ? "#fff"
          : el.countFine == 1
          ? "#ff3838"
          : el.countFine == 2
          ? "#ff1717"
          : "#ff0000"
      }'
			>Штрафи: ${el.countFine}</div>
			<div class="users__name">${el.name}</div>
			<div class="users__count">Чергував: ${el.count}</div>
			<div class="users__wash">Мив: ${el.countWash}</div>
			<div class="users__sweep">Замітав: ${el.countSweep}</div>
		</li>`;
    }
  });
  if (!out.innerHTML.length) {
    out.innerHTML = "<div class='not-found'>Немає штрафів</div>";
  }
});

//========================================================================================================================================================

window.addEventListener("load", async () => {
  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      console.log("Service worker register success", reg);
    } catch (e) {
      console.log("Service worker register fail");
    }
  }

  // await loadPosts()
});

//tabs

const btns = document.querySelectorAll(".btn");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btns.forEach((btn) => btn.classList.remove("btn--active"));
    btn.classList.add("btn--active");
  });
});

//today
const btnTodaytabElem = document.querySelector(".today");

btnTodaytabElem.addEventListener("click", () => {
  out.innerHTML = "";
  sortByFine(sortByCount(Object.values(data))).forEach((el) => {
    if (el.today > 0) {
      out.innerHTML += `<li class='users__item today--active'>
        <div class="users__name">${el.name}</div>
      </li>`;
    }
  });
  if (!out.innerHTML.length) {
    out.innerHTML = "<div class='not-found'>Немає чергових</div>";
  }
});
