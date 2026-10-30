const form = document.getElementById("downton-form");
const puntajeElemento = document.getElementById("puntaje");
const clasificacionElemento = document.getElementById("clasificacion");

function calcularEscalaDownton(data) {
  return (
    data.respuestaVerbal +
    data.respuestaMotora +
    data.respiracion +
    data.tonoMuscular +
    data.consciencia
  );
}

function clasificar(puntaje) {
  if (puntaje >= 8) {
    return "Estado estable / sin riesgo importante";
  } else if (puntaje >= 5) {
    return "Observación / vigilancia moderada";
  } else if (puntaje >= 3) {
    return "Riesgo clínico significativo";
  } else {
    return "Se requiere evaluación médica urgente";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const datos = {
    respuestaVerbal: Number(document.getElementById("respuestaVerbal").value),
    respuestaMotora: Number(document.getElementById("respuestaMotora").value),
    respiracion: Number(document.getElementById("respiracion").value),
    tonoMuscular: Number(document.getElementById("tonoMuscular").value),
    conciencia: Number(document.getElementById("conciencia").value),
  };

  const total = calcularEscalaDownton(datos);
  const clasificacion = clasificar(total);

  puntajeElemento.innerHTML = `<strong>Puntuación total:</strong> ${total}`;
  clasificacionElemento.innerHTML = `<strong>Clasificación:</strong> ${clasificacion}`;
});
