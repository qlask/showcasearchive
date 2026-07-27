import { LEVELS, BADGE_CLASS } from "./config.js";
import { icons } from "./icons.js";
import { countFor, totalDownloads, trackDownload } from "./storage.js";
import { showToast } from "./ui.js";
import { goTo } from "./router.js";

const grid = document.getElementById("level-grid");
const searchInput = document.getElementById("search-input");
const chipRow = document.getElementById("chip-row");
const totalDownloadsEl = document.getElementById("total-downloads");

let activeFilter = "all";
let query = "";

/* ---------------------------------------------------------------------
   STATS (static counts, computed once)
   --------------------------------------------------------------------- */
export function renderStats() {
  document.getElementById("stat-total-levels").textContent = LEVELS.length;
  document.getElementById("stat-total-creators").textContent = new Set(LEVELS.map(l => l.creator)).size;
  document.getElementById("stat-total-formats").textContent = new Set(LEVELS.map(l => l.type)).size;
  updateTotalDownloadsDisplay();
}

export function updateTotalDownloadsDisplay() {
  if (!totalDownloadsEl) return;
  totalDownloadsEl.textContent = totalDownloads().toLocaleString();
  totalDownloadsEl.classList.remove("bump");
  void totalDownloadsEl.offsetWidth; // restart the animation
  totalDownloadsEl.classList.add("bump");
}

/* ---------------------------------------------------------------------
   GRID
   --------------------------------------------------------------------- */
function cardTemplate(lv) {
  return `
    <article class="card" data-slug="${lv.slug}" tabindex="0" role="link" aria-label="Open details for ${lv.name}">
      <div class="card-preview">
        <img src="${lv.gif}" alt="Preview of ${lv.name}" loading="lazy">
        <span class="badge-type ${BADGE_CLASS[lv.type]}">.${lv.type}</span>
        <span class="badge-diff">${lv.diff}</span>
      </div>
      <div class="card-body">
        <div>
          <div class="card-title">${lv.name}</div>
          <div class="card-creator">by ${lv.creator}</div>
        </div>
        <div class="card-meta">
          <span>${icons.file()} ${lv.size}</span>
          <span>${icons.cube()} ${lv.objects} objects</span>
          <span class="level-download-count" data-level="${lv.slug}">
            ${icons.download()} ${countFor(lv.slug).toLocaleString()} downloads
          </span>
        </div>
        <div class="id-row" onclick="event.stopPropagation()">
          <span class="id-label">ID:</span>
          <span class="id-value">${lv.id}</span>
          <button class="copy-id-btn" data-copy-id="${lv.id}" type="button" aria-label="Copy level ID ${lv.id}" title="Copy ID">
            ${icons.clipboard()}
          </button>
        </div>
        <div class="card-footer">
          <a class="dl-btn" href="${lv.file}" data-slug="${lv.slug}" data-name="${lv.name}" download target="_blank" rel="noopener">
            ${icons.download()} Download .${lv.type}
          </a>
        </div>
      </div>
    </article>
  `;
}

export function renderGrid(list) {
  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="block-mark"></div>
        <p class="title">No files match that search</p>
        <p class="hint">Try a different name, or browse all formats.</p>
      </div>`;
    return;
  }
  grid.innerHTML = list.map(cardTemplate).join("");
}

function applyFilters() {
  const filtered = LEVELS.filter(lv => {
    const matchesType = activeFilter === "all" || lv.type === activeFilter;
    const matchesQuery = (lv.name + " " + lv.creator).toLowerCase().includes(query.toLowerCase());
    return matchesType && matchesQuery;
  });
  renderGrid(filtered);
}

/* ---------------------------------------------------------------------
   EVENT WIRING
   --------------------------------------------------------------------- */
export function initBrowsePage() {
  renderGrid(LEVELS);

  grid.addEventListener("click", e => {
    if (e.target.closest(".dl-btn")) return; // handled by the global download listener
    const card = e.target.closest(".card");
    if (card) goTo("#/" + card.dataset.slug, () => {});
  });

  grid.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".card");
    if (!card) return;
    e.preventDefault();
    goTo("#/" + card.dataset.slug, () => {});
  });

  chipRow.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    applyFilters();
  });

  searchInput.addEventListener("input", e => {
    query = e.target.value;
    applyFilters();
  });
}

/* Single delegated listener handles every download button on the page,
   including the one rendered later on the detail page. */
export function initDownloadTracking() {
  document.addEventListener("click", e => {
    const btn = e.target.closest(".dl-btn");
    if (!btn) return;
    const slug = btn.dataset.slug;
    const name = btn.dataset.name;
    const newCount = trackDownload(slug);
    updateTotalDownloadsDisplay();
    showToast(`Downloading "${name}" — ${newCount.toLocaleString()} total downloads for this level`);
    document.querySelectorAll(`.level-download-count[data-level="${slug}"]`).forEach(el => {
      el.innerHTML = `${icons.download()} ${newCount.toLocaleString()} downloads`;
    });
    document.querySelectorAll(`.level-download-count-b[data-level="${slug}"]`).forEach(el => {
      el.textContent = newCount.toLocaleString();
    });
    if (btn.getAttribute("href") === "#") {
      e.preventDefault(); // placeholder — swap `file` in LEVELS with a real URL to enable this
    }
  });
}
