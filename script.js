const findings = [
  {
    id: "F-01",
    title: "Accesos privilegiados revisados sin una cadencia visible",
    priority: "Critica",
    status: "Abierto",
    owner: "Identidades",
    due: "2026-04-22",
    summary: "La revision existe, pero aparece como una practica informal: no se ve frecuencia estable, responsable claro ni evidencia suficiente de continuidad.",
    whyItMatters: [
      "Los accesos de alto privilegio pueden mantenerse activos mas tiempo del necesario.",
      "La organizacion no puede mostrar una supervision sostenida cuando se la pide.",
      "La existencia de una regla general no alcanza si no hay rastro visible de aplicacion.",
    ],
    nextRead: "Definir frecuencia, responsable y evidencia minima para que la revision deje de depender de habitos.",
  },
  {
    id: "F-02",
    title: "Soporte de terceros activo sin responsable formal de revision",
    priority: "Alta",
    status: "En curso",
    owner: "Terceros",
    due: "2026-05-02",
    summary: "Hay acceso activo de terceros criticos, pero la revision sigue repartida entre varias areas y no aparece un owner formal que sostenga el cierre.",
    whyItMatters: [
      "La exposicion de terceros queda tolerada sin una supervision claramente atribuida.",
      "La responsabilidad fragmentada vuelve mas lento cualquier pedido de ajuste o cierre.",
      "El seguimiento depende mas de coordinaciones informales que de un criterio estable.",
    ],
    nextRead: "Formalizar owner, fecha de revision y condicion concreta de cierre para el acceso tercero.",
  },
  {
    id: "F-03",
    title: "Cambios administrativos sensibles sin trazabilidad suficiente",
    priority: "Critica",
    status: "Abierto",
    owner: "",
    due: "2026-04-18",
    summary: "La organizacion no puede seguir algunos cambios administrativos sensibles con un nivel de trazabilidad suficiente para revisar o escalar rapidamente.",
    whyItMatters: [
      "La investigacion de incidentes o desvíos se vuelve mas lenta y menos confiable.",
      "Las decisiones internas pierden velocidad cuando no hay un rastro claro de lo ocurrido.",
      "La ausencia de owner posterga incluso el inicio del cierre.",
    ],
    nextRead: "Asignar responsable y definir el registro minimo necesario para volver trazables estas acciones.",
  },
  {
    id: "F-04",
    title: "Backups presentes, pero validacion de restauracion poco demostrada",
    priority: "Media",
    status: "Mitigado",
    owner: "Infraestructura",
    due: "2026-05-09",
    summary: "Existen backups y el riesgo esta parcialmente contenido, pero la validacion periodica de restauracion o integridad no queda demostrada con la misma consistencia.",
    whyItMatters: [
      "La confianza en recuperacion queda por debajo de lo que la organizacion supone.",
      "La preparacion operativa no puede explicarse con rapidez ante una revision.",
      "Sin evidencia estable, la mitigacion luce mas declarada que demostrada.",
    ],
    nextRead: "Documentar prueba, fecha, alcance y responsable de validacion para consolidar la mitigacion.",
  },
]

const summary = document.getElementById("summary")
const body = document.getElementById("findingsBody")
const detailPanel = document.getElementById("detailPanel")
const priorityFilter = document.getElementById("priorityFilter")
const statusFilter = document.getElementById("statusFilter")

let activeId = null

function uniqueValues(key) {
  return [...new Set(findings.map((f) => f[key]).filter(Boolean))]
}

function badgeClass(priority) {
  return `priority-${priority.toLowerCase()}`
}

function renderSummary(list) {
  const critical = list.filter((f) => f.priority === "Critica").length
  const open = list.filter((f) => f.status === "Abierto").length
  const noOwner = list.filter((f) => !f.owner).length
  const nearDue = list.filter((f) => new Date(f.due) <= new Date("2026-04-25")).length

  summary.innerHTML = [
    { label: "Hallazgos", value: list.length, sub: "Set publico actual" },
    { label: "Criticos", value: critical, sub: "Requieren mayor atencion" },
    { label: "Abiertos", value: open, sub: "Pendientes de cierre" },
    { label: "Cerca de vencer / sin owner", value: `${nearDue}/${noOwner}`, sub: "Senales de lectura" },
  ].map((item) => `
    <article class="summary-card">
      <p class="label">${item.label}</p>
      <p class="value">${item.value}</p>
      <p class="sub">${item.sub}</p>
    </article>
  `).join("")
}

function filteredFindings() {
  return findings.filter((finding) => {
    const priorityOk = !priorityFilter.value || finding.priority === priorityFilter.value
    const statusOk = !statusFilter.value || finding.status === statusFilter.value
    return priorityOk && statusOk
  })
}

function renderTable() {
  const list = filteredFindings()
  renderSummary(list)

  body.innerHTML = list.map((finding) => `
    <tr data-id="${finding.id}" class="${finding.id === activeId ? "active" : ""}">
      <td class="mono">${finding.id}</td>
      <td>${finding.title}</td>
      <td class="${badgeClass(finding.priority)}"><strong>${finding.priority}</strong></td>
      <td>${finding.status}</td>
      <td>${finding.owner || '<span class="badge">Sin asignar</span>'}</td>
      <td class="mono">${finding.due}</td>
    </tr>
  `).join("")

  body.querySelectorAll("tr").forEach((row) => {
    row.addEventListener("click", () => {
      activeId = row.dataset.id
      renderTable()
      renderDetail()
    })
  })

  if (!activeId && list[0]) {
    activeId = list[0].id
    renderTable()
    renderDetail()
  }
}

function renderDetail() {
  const finding = findings.find((item) => item.id === activeId)
  if (!finding) return

  detailPanel.innerHTML = `
    <div class="panel-head">
      <div>
        <p class="panel-kicker">Detalle</p>
        <h2>${finding.title}</h2>
      </div>
      <span class="badge ${badgeClass(finding.priority)}">${finding.priority}</span>
    </div>
    <div class="detail-grid">
      <div class="detail-card">
        <p class="panel-kicker">Lectura ejecutiva</p>
        <p>${finding.summary}</p>
        <ul class="detail-list">
          ${finding.whyItMatters.map((point) => `<li>${point}</li>`).join("")}
        </ul>
      </div>
      <div class="detail-card">
        <p class="panel-kicker">Seguimiento visible</p>
        <p><strong>Estado:</strong> ${finding.status}</p>
        <p><strong>Owner:</strong> ${finding.owner || "Sin asignar"}</p>
        <p><strong>Vencimiento:</strong> ${finding.due}</p>
        <p style="margin-top:12px"><strong>Siguiente foco:</strong> ${finding.nextRead}</p>
      </div>
    </div>
  `
}

function fillFilters() {
  uniqueValues("priority").forEach((value) => {
    priorityFilter.innerHTML += `<option value="${value}">${value}</option>`
  })
  uniqueValues("status").forEach((value) => {
    statusFilter.innerHTML += `<option value="${value}">${value}</option>`
  })
}

priorityFilter.addEventListener("change", () => {
  activeId = null
  renderTable()
})

statusFilter.addEventListener("change", () => {
  activeId = null
  renderTable()
})

fillFilters()
renderTable()
