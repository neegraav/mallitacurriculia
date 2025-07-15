const malla = {
  "1er semestre": [
    "Historia del derecho",
    "Historia y evolución de las instituciones civiles",
    "Introducción a la economía",
    "Electivo de comunicación"
  ],
  "2do semestre": [
    "Historia institucional de Chile",
    "Fundamentos filosóficos del derecho",
    "Teoría de la ley y de las personas",
    "Teoría constitucional - Derecho político",
    "Argumentación jurídica y debate"
  ],
  "3er semestre": [
    "Acto jurídico",
    "Organización y atribución de los tribunales",
    "Derecho constitucional orgánico",
    "Teoría del delito",
    "Negociación y ética profesional",
    "Electivo desarrollo del pensamiento"
  ],
  "4to semestre": [
    "Bienes",
    "Teoría del proceso",
    "Derecho y garantías constitucionales",
    "Derecho internacional público",
    "Teoría de la reacción penal",
    "Taller de integración 1"
  ],
  "5to semestre": [
    "Teoría de las obligaciones",
    "Procedimientos civiles de cognición",
    "Derecho individual del trabajo",
    "Delitos en particular 1",
    "Electivo de desarrollo personal"
  ],
  "6to semestre": [
    "Fuentes de las obligaciones",
    "Procedimientos de ejecución y cautela",
    "Derecho mercantil",
    "Derecho colectivo del trabajo y seguridad social",
    "Delitos en particular 2",
    "Electivo de responsabilidad social"
  ],
  "7mo semestre": [
    "Derecho de familia",
    "Responsabilidad civil",
    "Derecho societario",
    "Derecho administrativo 1",
    "Derecho procesal penal",
    "Taller de litigación"
  ],
  "8vo semestre": [
    "Derecho sucesorio",
    "Procedimientos especiales orales",
    "Contratación mercantil",
    "Derecho administrativo 2",
    "Derecho tributario 1",
    "Taller de integración 2",
    "Objetivo de especialización 1"
  ],
  "9no semestre": [
    "Recursos",
    "Seminario de investigación jurídica",
    "Reorganización y liquidación patrimonial",
    "Derecho tributario 2",
    "Clínica jurídica (A+S)",
    "Optativo de especialización 2"
  ],
  "10mo semestre": [
    "Taller de integración 3"
  ]
};

const prerrequisitos = {
  // 2do
  "Historia institucional de Chile": ["1er semestre"],
  "Fundamentos filosóficos del derecho": ["1er semestre"],
  "Teoría de la ley y de las personas": ["1er semestre"],
  "Teoría constitucional - Derecho político": ["1er semestre"],
  "Argumentación jurídica y debate": ["1er semestre"],

  // 3ro
  "Acto jurídico": ["Historia y evolución de las instituciones civiles"],
  "Organización y atribución de los tribunales": ["1er semestre"],
  "Derecho constitucional orgánico": ["Teoría constitucional - Derecho político"],
  "Teoría del delito": ["1er semestre"],

  // 4to
  "Bienes": ["Historia y evolución de las instituciones civiles", "Teoría de la ley y de las personas"],
  "Teoría del proceso": ["3er semestre"],
  "Derecho y garantías constitucionales": ["Teoría constitucional - Derecho político", "Teoría constitucional - Derecho político"],
  "Derecho internacional público": ["Teoría constitucional - Derecho político"],
  "Teoría de la reacción penal": ["Teoría del delito"],
  "Taller de integración 1": ["Acto jurídico", "Organización y atribución de los tribunales"],

  // 5to
  "Teoría de las obligaciones": ["Acto jurídico"],
  "Procedimientos civiles de cognición": ["Teoría del proceso"],
  "Derecho individual del trabajo": ["Derecho y garantías constitucionales"],
  "Delitos en particular 1": ["Teoría de la reacción penal"],

  // 6to
  "Fuentes de las obligaciones": ["Acto jurídico"],
  "Procedimientos de ejecución y cautela": ["Teoría del proceso"],
  "Derecho mercantil": ["Acto jurídico", "Bienes"],
  "Derecho colectivo del trabajo y seguridad social": ["5to semestre"],
  "Delitos en particular 2": ["Delitos en particular 1"],

  // 7mo
  "Derecho de familia": ["Teoría de la ley y de las personas"],
  "Responsabilidad civil": ["Teoría de las obligaciones"],
  "Derecho societario": ["Teoría de las obligaciones"],
  "Derecho administrativo 1": ["Derecho y garantías constitucionales"],
  "Derecho procesal penal": ["Procedimientos civiles de cognición"],
  "Taller de litigación": ["Procedimientos civiles de cognición"],

  // 8vo
  "Derecho sucesorio": ["Teoría de la ley y de las personas", "Electivo de comunicación", "Acto jurídico"],
  "Procedimientos especiales orales": ["Teoría del proceso", "Procedimientos civiles de cognición"],
  "Contratación mercantil": ["Fuentes de las obligaciones"],
  "Derecho administrativo 2": ["Derecho y garantías constitucionales"],
  "Taller de integración 2": ["Taller de integración 1", "Responsabilidad civil", "Taller de litigación"],

  // 9no
  "Recursos": ["Teoría del proceso", "Procedimientos civiles de cognición"],
  "Seminario de investigación jurídica": ["8vo semestre"],
  "Reorganización y liquidación patrimonial": ["Fuentes de las obligaciones", "Derecho societario"],
  "Clínica jurídica (A+S)": ["8vo semestre"],

  // 10mo
  "Taller de integración 3": ["9no semestre"]
};

const aprobados = new Set();

function crearMalla() {
  const contenedor = document.getElementById('malla');
  for (let semestre in malla) {
    const divSem = document.createElement('div');
    divSem.className = 'semestre';
    const h2 = document.createElement('h2');
    h2.textContent = semestre;
    divSem.appendChild(h2);

    malla[semestre].forEach(ramo => {
      const divRamo = document.createElement('div');
      divRamo.textContent = ramo;
      divRamo.className = 'ramo';
      if (!prerrequisitos[ramo]) {
        divRamo.classList.add("unlocked");
      } else {
        divRamo.classList.add("locked");
      }

      divRamo.addEventListener('click', () => {
        if (!divRamo.classList.contains('unlocked')) return;
        divRamo.classList.remove('unlocked');
        divRamo.classList.add('approved');
        aprobados.add(ramo);
        desbloquearRamos();
      });

      divSem.appendChild(divRamo);
    });

    contenedor.appendChild(divSem);
  }
}

function desbloquearRamos() {
  document.querySelectorAll('.ramo.locked').forEach(ramo => {
    const nombre = ramo.textContent;
    const requisitos = prerrequisitos[nombre];
    if (!requisitos) return;

    const cumplido = requisitos.every(req => aprobados.has(req) || aprobados.has(req.replace("º semestre", "semestre")));
    if (cumplido) {
      ramo.classList.remove('locked');
      ramo.classList.add('unlocked');
    }
  });
}

crearMalla();
