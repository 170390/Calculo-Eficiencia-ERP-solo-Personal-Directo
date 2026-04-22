function calcular() {

  let to = parseFloat(document.getElementById("to").value);

  let datos = [
    {
      horas: parseFloat(document.getElementById("h1").value) || 0,
      smv: parseFloat(document.getElementById("smv1").value) || 0,
      prod: parseFloat(document.getElementById("prod1").value) || 0
    },
    {
      horas: parseFloat(document.getElementById("h2").value) || 0,
      smv: parseFloat(document.getElementById("smv2").value) || 0,
      prod: parseFloat(document.getElementById("prod2").value) || 0
    },
    {
      horas: parseFloat(document.getElementById("h3").value) || 0,
      smv: parseFloat(document.getElementById("smv3").value) || 0,
      prod: parseFloat(document.getElementById("prod3").value) || 0
    }
  ];

  if (!to) {
    mostrar("Falta TO", "rojo");
    return;
  }

  let totalHoras = 0;
  let totalAjustado = 0;
  let totalReal = 0;

  datos.forEach(d => {
    totalHoras += d.horas;

    if (d.horas > 0 && d.smv > 0) {
      let std = (d.horas * 60) / d.smv;
      let ajustado = std * to;

      totalAjustado += ajustado;
      totalReal += d.prod;
    }
  });

  // 🔥 Validación importante
  if (totalHoras === 0) {
    mostrar("Ingrese horas por estilo", "rojo");
    return;
  }

  let eficiencia = (totalReal / totalAjustado) * 100;

  let color = "rojo";
  if (eficiencia >= 100) color = "verde";
  else if (eficiencia >= 80) color = "amarillo";

  mostrar("Eficiencia: " + eficiencia.toFixed(2) + " % - " + horasTexto, color);

  document.getElementById("meta100").innerText = totalAjustado.toFixed(0);
  document.getElementById("meta95").innerText = (totalAjustado * 0.95).toFixed(0);
  document.getElementById("meta90").innerText = (totalAjustado * 0.90).toFixed(0);
}

let horasTexto = "Horas totales: " + totalHoras.toFixed(2);

function mostrar(texto, color) {
  let r = document.getElementById("resultado");
  r.innerText = texto + " | Horas totales: " + totalHoras;
  r.className = "resultado " + color;
}
