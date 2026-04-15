const findings = [
  {
    id: "F-01",
    title: "Revision periodica de accesos privilegiados no formalizada",
    priority: "Critica",
    status: "Abierto",
    owner: "Identidades",
    due: "2026-04-22",
    summary: "La revision existe de manera informal, pero no se ejecuta con una cadencia visible ni con evidencia consistente.",
    whyItMatters: [
      "Los accesos de alto privilegio pueden mantenerse mas tiempo del necesario.",
      "La organizacion no puede mostrar una supervision sostenida.",
      "El seguimiento queda debil aunque haya una regla general definida.",
    ],
    nextRead: "Definir responsable, frecuencia visible y evidencia minima de seguimiento.",
  },
  {
    id: "F-02",
    title: "Acceso de soporte de terceros sin owner formal de revision",
    priority: "Alta",
    status: "En curso",
    owner: "Terceros",
    due: "2026-05-02",
    summary: "Hay acceso activo de terceros criticos, pero la responsabilidad de revision no esta formalmente asignada.",
    whyItMatters: [
      "La exposicion de terceros queda tolerada sin ownership visible.",
      "La supervision aparece fragmentada entre varias areas.",
      "El seguimiento depende mas de habitos que de un criterio estable.",
    ],
    nextRead: "Clarificar owner, fecha de revision y condicion de cierre.",
  },
  {
    id: "F-03",
    title: "Brecha de trazabilidad sobre acciones administrativas sensibles",
    priority: "Critica",
    status: "Abierto",
    owner: "",
    due: "2026-04-18",
    summary: "La organizacion no puede reconstruir ciertos cambios privilegiados con confianza suficiente.",
    whyItMatters: [
      "La investigacion de incidentes se debilita.",
      "Las decisiones internas se vuelven mas lentas.",
      "La ausencia de owner dificulta iniciar el cierre.",
    ],
    nextRead: "Asignar responsable y cerrar el vacio de seguimiento visible.",
  },
  {
    id: "F-04",
    title: "Pruebas de integridad de backup sin evidencia consistente",
    priority: "Media",
    status: "Mitigado",
    owner: "Infraestructura",
    due: "2026-05-09",
    summary: "Existen backups, pero la prueba periodica de restauracion o integridad no queda demostrada en forma estable.",
    whyItMatters: [
      "La confianza en recuperacion es menor a la esperada.",
      "La preparacion operativa no puede mostrarse rapidamente.",
    ],
    nextRead: "Documentar prueba, fecha y responsable de validacion.",
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
