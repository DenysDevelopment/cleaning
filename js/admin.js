const URL_GET =
  "https://cherguvannya-f8c7b-default-rtdb.firebaseio.com/db.json";
const URL_FOR_ERROR =
  "https://cherguvannya-f8c7b-default-rtdb.firebaseio.com/error.json";
const URL_UPDATE = (id) =>
  `https://cherguvannya-f8c7b-default-rtdb.firebaseio.com/db/${id}.json`;

async function updateData(url, data) {
  const dataResponse = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

async function getData(url) {
  const dataResponse = await fetch(url);
  return dataResponse;
}

// Антонюк Анатолій
// Власюк Андрій
// Гушинець Роман
// Давидюк Назар
// Денисенко Максим
// Максимук Денис
// Мушка Сергій
// Павляшик Олександр
// Приходько Максим
// Римарук Влад
// Хмарук Ілля
// Шеремета Ілля
// Ярмолюк Максим
// Інкін Богдан
// Балецький Олександр !!
// Грошева Юля
// Демченко Павло
// Здрок Андрій
// Кичка Анастасія
// Лавренюк Ілля
// Мороз Денис##
// Олексюк Дмитро
// Пархомчук Денис
// Романюк Тимофій
// Сидорук Олександр
// Смічик Влад
// Ткачук Яна
// Чирук Роман
// Шворак Влад

// fetch(URL_GET,{
// 	method: "POST",
// 	body: JSON.stringify({
// 		name: 'Мороз Денис',
// 		count: 0,
// 		lastDate: '',//new Date().toLocaleDateString().replaceAll('/','.')
// 		countWash: 0,
// 		countSweep: 0,
// 		countFine: 0,
// 	})
// })

const btn = document.querySelector(".submit");

btn.addEventListener("click", () => {
  const users = document.querySelector(".users");
  const role = document.querySelector(".role");

  const nameAndId = users.value.split("/");
  getData(URL_GET)
    .then((data) => data.json())
    .then((data) => {
      updateData(URL_UPDATE(nameAndId[0]), {
        name: nameAndId[1],
        countFine:
          data[nameAndId[0]].countFine > 0
            ? data[nameAndId[0]].countFine - 1
            : data[nameAndId[0]].countFine,
        count: data[nameAndId[0]].count + 1,
        lastDate: new Date().toLocaleDateString().replaceAll("/", "."),
        countWash:
          role.value == "wash"
            ? +data[nameAndId[0]].countWash + 1
            : +data[nameAndId[0]].countWash,
        countSweep:
          role.value == "sweep"
            ? +data[nameAndId[0]].countSweep + 1
            : +data[nameAndId[0]].countSweep,
      });
      new PopUp("success", "Успішно буде черговати").create();
      setTimeout(() => {
        new PopUp().close();
      }, 5000);
    })
    .catch((err) => {
      new PopUp("err", `щось пішло не так, ${err}`).create();
      fetch(URL_FOR_ERROR, {
        methods: "POST",
        body: err,
      });
      setTimeout(() => {
        new PopUp().close();
      }, 5000);
    });
});

//fine
const btnFine = document.querySelector(".submit-fine");

btnFine.addEventListener("click", () => {
  const usersFine = document.querySelector(".users-fine");

  const nameAndId = usersFine.value.split("/");

  getData(URL_GET)
    .then((data) => data.json())
    .then((data) => {
      updateData(URL_UPDATE(nameAndId[0]), {
        name: nameAndId[1],
        countFine: +data[nameAndId[0]].countFine + 1,
        count: data[nameAndId[0]].count,
        lastDate: data[nameAndId[0]].lastDate,
        countWash: +data[nameAndId[0]].countWash,
        countSweep: +data[nameAndId[0]].countSweep,
      });
      new PopUp("success", "Успішно буде черговати").create();
      setTimeout(() => {
        new PopUp().close();
      }, 5000);
    })
    .catch((err) => {
      new PopUp("err", `щось пішло не так, ${err}`).create();
      fetch(URL_FOR_ERROR, {
        method: "POST",
        body: JSON.stringify({ err: err }),
      });
      setTimeout(() => {
        new PopUp().close();
      }, 5000);
    });
});

class PopUp {
  constructor(type = "", textHtml = "") {
    this.textHtml = textHtml;
    this.type = type;
  }

  create() {
    let popUp = document.createElement("div");
    popUp.classList.add("pop-up");
    popUp.innerHTML = this.textHtml;

    document.body.insertAdjacentElement("afterbegin", popUp);

    if (this.type === "success") {
      popUp.classList.add("success");
    }
    if (this.type === "err") {
      popUp.classList.add("err");
    }
  }

  close() {
    document.querySelector(".pop-up").remove();
  }
}
