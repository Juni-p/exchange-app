function probarValidarFecha() {
  console.assert(
    validarFecha("") === "Este campo no puede estar vacío.",
    "Validar fecha no valido que la fecha no sea vacío."
  );
  console.assert(
    validarFecha("1999/11/17") ===
      "Este campo debe tener un formato de fecha valido.",
    "Validar fecha no valido que la fecha tenga un formato valido."
  );
  console.assert(
    validarFecha("2000-11-20") === "",
    "Validar fecha fallo con una fecha valida."
  );
}

function probarValidarDivisaBase() {
  console.assert(
    validarDivisaBase("0") === "Este campo debe tener una divisa seleccionada.",
    "Validar divisa base no valido que se haya seleccionado una divisa."
  );
  console.assert(
    validarDivisaBase("ARS") === "",
    "Validar divisa base fallo con una divisa valida."
  );
}

probarValidarFecha();
probarValidarDivisaBase();
