function validarFecha(fecha) {
  const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;
  if (fecha.length === 0) {
    return "Este campo no puede estar vacío.";
  }
  if (!formatoFecha.test(fecha)) {
    return "Este campo debe tener un formato de fecha valido.";
  }
  return "";
}

function validarDivisaBase(divisa) {
  if (divisa === "0") {
    return "Este campo debe tener una divisa seleccionada.";
  }
  return "";
}

const URL = "https://api.exchangerate.host";

setearFechaActual();
obtenerDivisas();

function setearDivisas(divisas) {
  const divisasTotales = Object.keys(divisas);
  divisasTotales.forEach((divisa) => {
    const $divisa = document.createElement("option");
    $divisa.value = divisa;
    $divisa.textContent = divisa;
    document.divisas["divisa-base"].appendChild($divisa);
  });
}

function setearFechaActual() {
  const fecha = new Date();
  const fechaActual = fecha.toISOString().split("T")[0];
  const $fecha = document.divisas.fecha;
  $fecha.max = fechaActual;
}

function obtenerDivisas() {
  try {
    fetch(URL + "/latest")
      .then((response) => response.json())
      .then((data) => setearDivisas(data.rates));
  } catch (error) {
    console.error("Error: " + error);
  }
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

  const $formulario = document.divisas;
  const $divisaBase = $formulario["divisa-base"].value;
  const $fecha = $formulario.fecha.value;

  const errorFecha = validarFecha($fecha);
  const errorDivisaBase = validarDivisaBase($divisaBase);

  const errores = {
    fecha: errorFecha,
    "divisa-base": errorDivisaBase,
  };

  eliminarErrores();

  const esExito = manejarErrores(errores) === 0;

  if (esExito) {
    obtenerCambioDeDivisas($divisaBase, $fecha);
  }
}

function eliminarErrores() {
  const $errores = document.querySelectorAll("li");
  for (let $error of $errores) {
    $error.remove();
  }
}

function manejarErrores(errores) {
  const llaves = Object.keys(errores);
  const $errores = document.querySelectorAll(".errores");

  let contadorErrores = 0;

  llaves.forEach((llave, index) => {
    const error = errores[llave];

    if (error) {
      contadorErrores++;
      document.divisas[llave].classList.add("error");

      const $error = document.createElement("li");
      $error.textContent = error;

      $errores[index].appendChild($error);
    } else {
      document.divisas[llave].classList.remove("error");
    }
  });

  return contadorErrores;
}

document.querySelector("#calcular").onclick = validarFormulario;
