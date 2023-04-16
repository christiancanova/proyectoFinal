const socket = io();
const formLogin = document.getElementById("formLogin");
const emailUser = document.getElementById("email");
const passwordUser = document.getElementById("password");

//url de la api
let baseUrl='http://localhost:8080/';


formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("hiciste en enviar");
  try {
    const user = {
      email: emailUser.value.toLowerCase(),
      password: passwordUser.value,
    };
    await axios.post(`${baseUrl}auth/login`, user);
    window.location.href = "/mensajes";
  } catch (error) {
    alert("Email y/o password incorrectos");
  }
});