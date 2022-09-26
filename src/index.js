const URL = "https://api.exchangerate.host";
//https://api.exchangerate.host/2020-04-04?base=ARS
const $formulario = document.divisas;
console.log($formulario);
const $divisaBase = $formulario.base.value;
console.log($divisaBase);

const fecha = new Date();
const fechaActual = fecha.toISOString().split("T")[0];
const $fecha = $formulario.fecha;
$fecha.max = fechaActual;

//document.querySelector("button").onclick = prueba;

function setearDivisas(divisas) {
  const divisasTotales = Object.keys(divisas);
  divisasTotales.forEach((divisa) => {
    const $divisa = document.createElement("option");
    $divisa.value = divisa;
    $divisa.textContent = divisa;
    $formulario.base.appendChild($divisa);
  });
}

try {
  fetch(URL + "/latest")
    .then((response) => response.json())
    .then((data) => setearDivisas(data.rates));
} catch (error) {
  console.error("Error: " + error);
}

function crearItemLista(divisa, valor) {
  const $item = document.createElement("li");
  $item.textContent = `${divisa}: ${valor}`;
  document.querySelector("#lista").appendChild($item);
}

function mostrarCambioDeDivisas(divisas) {
  for (const divisa in divisas) {
    crearItemLista(divisa, divisas[divisa]);
  }
}

function obtenerCambioDeDivisas(divisaBase, fecha) {
  try {
    fetch(`${URL}/${fecha}?base=${divisaBase}`)
      .then((response) => response.json())
      .then((data) => mostrarCambioDeDivisas(data.rates));
  } catch (error) {
    console.error("Error: " + error);
  }
}

function validarFormulario(event) {
  event.preventDefault();
  obtenerCambioDeDivisas($divisaBase, $fecha.value);
}

document.querySelector("#calcular").onclick = validarFormulario;
