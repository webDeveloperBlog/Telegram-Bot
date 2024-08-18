const FORM_DATA = document.querySelector(".form-data");
const ERROR_MESSAGE = "Some error occurred!";
const SUCCESS_MESSAGE = "Sent successfuly!";

FORM_DATA.addEventListener("submit", formSend);

async function formSend(event) {
  event.preventDefault();

  const TOKEN = ""; // TODO use token telegram bot
  const CHAT_ID = ""; // TODO use chat_Id to telegram
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  let message = `
    <b>Test info:</b>
    <b>E-mail: ${this.email.value}</b>
    <b>User text : ${this.userMessage.value}</b>
    `;

  const response = await fetch(URI_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "html",
    }),
  });

  const result = await response.json();

  if (result.ok) {
    showMessage(true);
    FORM_DATA.reset();
  } else {
    showMessage(false);
    console.log(result);
  }
}

function showMessage(isSuccess) {
  let alert = document.querySelector(".alert");
  let text = document.querySelector(".alert p");
  let closeBtn = document.querySelector(".alert span");
  alert.classList.remove("hidden");

  if (isSuccess) {
    alert.classList.add("alert-success");
    text.textContent = SUCCESS_MESSAGE;
  } else {
    alert.classList.add("alert-danger");
    text.textContent = ERROR_MESSAGE;
  }

  closeBtn.addEventListener("click", (e) => {
    alert.classList.add("hidden");
  });
}
