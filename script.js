const form = document.getElementById("downton-form");
const puntajeElemento = document.getElementById("puntaje");
const clasificacionElemento = document.getElementById("clasificacion");

function leerValor(id, valorPorDefecto = 0) {
  const elemento = document.getElementById(id);
  if (!elemento) return valorPorDefecto;

  const valor = Number(elemento.value);
  return Number.isFinite(valor) ? valor : valorPorDefecto;
}

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

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const datos = {
      respuestaVerbal: leerValor("respuestaVerbal"),
      respuestaMotora: leerValor("respuestaMotora"),
      respiracion: leerValor("respiracion"),
      tonoMuscular: leerValor("tonoMuscular"),
      conciencia: leerValor("conciencia"),
    };

    const total = calcularEscalaDownton(datos);
    const clasificacion = clasificar(total);

    puntajeElemento.innerHTML = `<strong>Puntuación total:</strong> ${total}`;
    clasificacionElemento.innerHTML = `<strong>Clasificación:</strong> ${clasificacion}`;
  });
}
