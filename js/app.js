import { MAILTO } from "./config.js";
import { initRouter, currentRoute, goTo } from "./router.js";
import { renderStats, initBrowsePage, initDownloadTracking } from "./render-browse.js";
import { renderDetail } from "./render-detail.js";
import { renderChangelog } from "./render-changelog.js";
import { initCopyIdHandler } from "./ui.js";

function setActiveTab(routeName) {
  document.querySelectorAll(".nav-tab").forEach(t => {
    t.classList.toggle("active", t.dataset.route === routeName);
  });
}

function showPage(routeName) {
  document.getElementById("page-browse").hidden = routeName !== "browse";
  document.getElementById("page-changelog").hidden = routeName !== "changelog";
  document.getElementById("page-detail").hidden = routeName !== "detail";
}

function renderRoute() {
  const route = currentRoute();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

  if (route.name === "detail") {
    showPage("detail");
    setActiveTab("browse"); // detail pages are conceptually part of the vault
    renderDetail(route.slug);
    return;
  }
  if (route.name === "changelog") {
    showPage("changelog");
    setActiveTab("changelog");
    return;
  }
  showPage("browse");
  setActiveTab("browse");
}

function initMailtoButtons() {
  ["request-showcase-nav-btn", "request-showcase-hero-btn", "request-showcase-section-btn", "mailto-footer"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = MAILTO;
    });
  });
}

function initBrandHome() {
  document.getElementById("brand-home-btn").addEventListener("click", () => goTo("#browse", renderRoute));
  document.getElementById("hero-browse-link").addEventListener("click", e => {
    e.preventDefault();
    goTo("#browse", renderRoute);
  });
}

/* ---------------------------------------------------------------------
   INIT
   --------------------------------------------------------------------- */
renderStats();
initBrowsePage();
renderChangelog();
initDownloadTracking();
initCopyIdHandler();
initMailtoButtons();
initBrandHome();
initRouter(renderRoute);
renderRoute();
