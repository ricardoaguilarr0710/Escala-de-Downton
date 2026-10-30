const form = document.getElementById("downton-form");
const puntajeElemento = document.getElementById("puntaje");
const clasificacionElemento = document.getElementById("clasificacion");
const resultCard = document.querySelector(".result-card");

function leerValor(id, valorPorDefecto = 0) {
  const elemento = document.getElementById(id);
  if (!elemento) return valorPorDefecto;

  const valor = Number(elemento.value);
  return Number.isFinite(valor) ? valor : valorPorDefecto;
}

function calcularEscalaDownton(data) {
  const valores = [
    data.respuestaVerbal,
    data.respuestaMotora,
    data.respiracion,
    data.tonoMuscular,
    data.consciencia,
  ];

  return valores.reduce((total, valor) => {
    return total + (Number.isFinite(valor) ? valor : 0);
  }, 0);
}

function clasificar(puntaje) {
  if (puntaje >= 8) {
    return { texto: "Estado estable / sin riesgo importante", nivel: "estable" };
  }
  if (puntaje >= 5) {
    return { texto: "Observación / vigilancia moderada", nivel: "moderado" };
  }
  if (puntaje >= 3) {
    return { texto: "Riesgo clínico significativo", nivel: "riesgo" };
  }
  return { texto: "Se requiere evaluación médica urgente", nivel: "urgente" };
}

function actualizarEstadoResultado(nivel) {
  if (!resultCard) return;

  resultCard.classList.remove("nivel-estable", "nivel-moderado", "nivel-riesgo", "nivel-urgente");
  resultCard.classList.add(`nivel-${nivel}`);
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
    const resultado = clasificar(total);

    puntajeElemento.innerHTML = `<strong>Puntuación total:</strong> ${total}`;
    clasificacionElemento.innerHTML = `<strong>Clasificación:</strong> ${resultado.texto}`;
    actualizarEstadoResultado(resultado.nivel);
  });
}
