const form = document.getElementById("downton-form");
const puntajeText = document.getElementById("puntaje");
const clasificacionText = document.getElementById("clasificacion");

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

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = {
    respuestaVerbal: Number(document.getElementById("respuestaVerbal").value),
    respuestaMotora: Number(document.getElementById("respuestaMotora").value),
    respiracion: Number(document.getElementById("respiracion").value),
    tonoMuscular: Number(document.getElementById("tonoMuscular").value),
    conciencia: Number(document.getElementById("conciencia").value),
  };

  const total = calcularEscalaDownton(data);
  const resultado = clasificar(total);

  puntajeText.textContent = `Puntuación total: ${total}`;
  clasificacionText.textContent = `Clasificación: ${resultado}`;
});
