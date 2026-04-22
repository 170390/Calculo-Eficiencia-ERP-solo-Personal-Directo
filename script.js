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
  let totalMeta = 0;
  let totalReal = 0;

  datos.forEach(d => {

    totalHoras += d.horas;

    if (d.horas > 0 && d.smv > 0) {

      // 🔥 FORMULA CORRECTA
      let metaEstilo = (d.horas * 60 / d.smv) * to;

      totalMeta += metaEstilo;
      totalReal += d.prod;
    }
  });

  if (totalMeta === 0) {
    mostrar("Error en datos", "rojo");
    return;
  }

  let eficiencia = (totalReal / totalMeta) * 100;

  let color = "rojo";
  if (eficiencia >= 100) color = "verde";
  else if (eficiencia >= 80) color = "amarillo";

  // 🔥 Mostrar resultado correcto
  mostrar(
    "Eficiencia: " + eficiencia.toFixed(2) + "% | Horas: " + totalHoras.toFixed(2),
    color
  );

  // 🔥 METAS
  document.getElementById("meta100").innerText = totalMeta.toFixed(0);
  document.getElementById("meta95").innerText = (totalMeta * 0.95).toFixed(0);
  document.getElementById("meta90").innerText = (totalMeta * 0.90).toFixed(0);
}


// 🔹 Mostrar resultado
function mostrar(texto, color) {
  let r = document.getElementById("resultado");
  r.innerText = texto;
  r.className = "resultado " + color;
}
