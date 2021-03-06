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

//add
const btn = document.querySelector(".submit");

btn.addEventListener("click", () => {
  const users = document.querySelector(".users");
  const role = document.querySelector(".role");

  const nameAndId = users.value.split("/");
  getData(URL_GET)
    .then((data) => data.json())
    .then((data) => {
      const date = document.querySelector("#date").value.split("-");
      if (date.length === 1) {
        new PopUp("err", "Ви не поставили дату").create();
        setTimeout(() => {
          new PopUp().close();
        }, 5000);
        return;
      }
      updateData(URL_UPDATE(nameAndId[0]), {
        name: nameAndId[1],
        countFine:
          data[nameAndId[0]].countFine > 0
            ? +data[nameAndId[0]].countFine - 1
            : +data[nameAndId[0]].countFine,
        count: data[nameAndId[0]].count + 1,
        lastDate: `${date[2]}.${date[1]}.${date[0]}`,
        countWash:
          role.value == "wash"
            ? +data[nameAndId[0]].countWash + 1
            : +data[nameAndId[0]].countWash,
        countSweep:
          role.value == "sweep"
            ? +data[nameAndId[0]].countSweep + 1
            : +data[nameAndId[0]].countSweep,
        today: false,
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
        today: data[nameAndId[0]].today,
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
    const out = document.querySelector(".out-modal");
    const popUp = document.createElement("div");
    popUp.classList.add("pop-up");
    popUp.innerHTML = this.textHtml;

    out.insertAdjacentElement("beforeend", popUp);

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

//remove
const removeBtn = document.querySelector(".remove-btn");

removeBtn.addEventListener("click", () => {
  const users = document.querySelector(".remove .users");
  const role = document.querySelector(".remove .role");

  const nameAndId = users.value.split("/");
  getData(URL_GET)
    .then((data) => data.json())
    .then((data) => {
      if (data[nameAndId[0]].count <= 0) {
        new PopUp("err", "В нього немає чергуваннь для видалення").create();
        setTimeout(() => {
          new PopUp().close();
        }, 5000);
        return;
      }
      updateData(URL_UPDATE(nameAndId[0]), {
        name: nameAndId[1],
        countFine: data[nameAndId[0]].countFine,
        count: data[nameAndId[0]].count - 1,
        lastDate: "",
        countWash:
          role.value == "wash"
            ? +data[nameAndId[0]].countWash - 1
            : +data[nameAndId[0]].countWash,
        countSweep:
          role.value == "sweep"
            ? +data[nameAndId[0]].countSweep - 1
            : +data[nameAndId[0]].countSweep,
        today: false,
      });
      new PopUp("success", "Не буде чергувати").create();
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

//today
const todayBtn = document.querySelector(".submit-today");

todayBtn.addEventListener("click", () => {
  const users = document.querySelector(".today .users");
  const nameAndId = users.value.split("/");
  getData(URL_GET)
    .then((data) => data.json())
    .then((data) => {
      if (data[nameAndId[0]].today) {
        new PopUp("err", "Він буде чергувати").create();
        setTimeout(() => {
          new PopUp().close();
        }, 5000);
        return;
      }
      updateData(URL_UPDATE(nameAndId[0]), {
        name: nameAndId[1],
        countFine: data[nameAndId[0]].countFine,
        count: data[nameAndId[0]].count,
        lastDate: "",
        countWash: +data[nameAndId[0]].countWash,
        countSweep: +data[nameAndId[0]].countSweep,
        today: true,
      });
      new PopUp("success", "Буде чергувати").create();
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
