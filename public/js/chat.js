const formMessages = document.getElementById("formMessages");
const showMessages = document.getElementById("showMessages");
const body = document.getElementById("body");
const typeUser = document.getElementsByName("typeUser");

// obtener las cookies
const getCookie = (name) => {
  const doc = `;${document.cookie}`;
  const dataCookie = doc.split(`;${name}=`);
  if (dataCookie.length === 2) return dataCookie.pop().split(";").shift();
};

const getToken = getCookie("token");
let messages;
//mostrar mensajes anteriores si existen o si no hay mostra mensaje = ningun mensaje
const chatMessages = async () => {
  let res = await axios.get(`${baseUrl}chat`, {
    headers: {
      "authorization-token": getToken,
    },
  });
  messages = res.data;
  if (messages.length !== 0) {
    showMessages.innerHTML = messages
      .map((user) => {
        return `<p><span class="form-text-email">${user.email}</span> <span class="form-text-date">${user.date}</span> (<span class="form-text-user">${user.user}</span>): ${user.body}</p>`;

      })
      .join("");
  }
};
chatMessages(); //llamar a la funcion mostra mensajes guardados

//formulario envio de mensajes con el email del usuario que este logeado
formMessages.addEventListener("submit", async (e) => {
  e.preventDefault();
  // obtener valor de tipo de usuario
  let user;
  for (let i = 0; i < typeUser.length; i++) {
    if (typeUser[i].checked) {
      user = typeUser[i].value;
      break;
    }
  }
  //obtener email de la cookies
  let getEmail = document.cookie
    .split(";")[1]
    .replace("email=", "")
    .replace("%40", "@");

  const newMessage = {
    date: new Date().toLocaleString(),
    email: getEmail.trim(),
    user,
    body: body.value,
  };
  // enviar un nuevo mensaje
  socket.emit("addMessage", newMessage);
  // guardar en la base de datos el mensaje
  await axios.post(`${baseUrl}chat`, newMessage, {
    headers: {
      "authorization-token": getToken,
    },
  });
  body.value = "";
});
//recibir mensajes nuevos y mostrarlos
socket.on("addMessage", (message) => {
  showMessages.innerHTML += `<p><span class="form-text-email">${message.email}</span> <span class="form-text-date">${message.date}</span> (<span class="form-text-user">${message.user}</span>): ${message.body}</p>`;
});