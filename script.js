function calcular() {

  // 🔹 Obtener valores principales
  let horas = parseFloat(document.getElementById("horas").value);
  let to = parseFloat(document.getElementById("to").value);

  // 🔹 Obtener datos de estilos
  let datos = [
    {
      smv: parseFloat(document.getElementById("smv1").value) || 0,
      prod: parseFloat(document.getElementById("prod1").value) || 0
    },
    {
      smv: parseFloat(document.getElementById("smv2").value) || 0,
      prod: parseFloat(document.getElementById("prod2").value) || 0
    },
    {
      smv: parseFloat(document.getElementById("smv3").value) || 0,
      prod: parseFloat(document.getElementById("prod3").value) || 0
    }
  ];

  // 🔴 Validación
  if (!horas || !to) {
    mostrarResultado("Faltan horas o TO", "rojo");
    return;
  }

  let totalAjustado = 0;
  let totalReal = 0;

  // 🔹 Cálculo por estilo
  datos.forEach(d => {
    if (d.smv > 0) {
      let std = (horas * 60) / d.smv;
      let ajustado = std * to;

      totalAjustado += ajustado;
      totalReal += d.prod;
    }
  });

  // 🔴 Validación
  if (totalAjustado === 0) {
    mostrarResultado("Error en SMV", "rojo");
    return;
  }

  // 🔹 Eficiencia
  let eficiencia = (totalReal / totalAjustado) * 100;

  // 🔹 Color
  let color = "rojo";
  if (eficiencia >= 100) color = "verde";
  else if (eficiencia >= 80) color = "amarillo";

  mostrarResultado("Eficiencia: " + eficiencia.toFixed(2) + " %", color);

  // 🔥 Metas
  document.getElementById("meta100").innerText = totalAjustado.toFixed(0);
  document.getElementById("meta95").innerText = (totalAjustado * 0.95).toFixed(0);
  document.getElementById("meta90").innerText = (totalAjustado * 0.90).toFixed(0);
}


// 🔹 Mostrar resultado
function mostrarResultado(texto, color) {
  let r = document.getElementById("resultado");
  r.innerText = texto;
  r.className = "resultado " + color;
}
