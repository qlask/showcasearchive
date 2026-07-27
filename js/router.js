/* ---------------------------------------------------------------------
   ROUTER
   Routes:
     #browse      -> level grid (default)
     #changelog   -> changelog page
     #/<slug>     -> level detail page (matches a LEVELS[].slug)
   --------------------------------------------------------------------- */
export function currentRoute() {
  const hash = window.location.hash || "#browse";
  if (hash.startsWith("#/")) {
    return { name: "detail", slug: decodeURIComponent(hash.slice(2)) };
  }
  if (hash === "#changelog") return { name: "changelog" };
  return { name: "browse" };
}

export function goTo(hash, onSameRoute) {
  if (window.location.hash === hash) {
    onSameRoute();
  } else {
    window.location.hash = hash;
  }
}

export function initRouter(onRouteChange) {
  window.addEventListener("hashchange", onRouteChange);
  document.querySelectorAll("[data-route]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      goTo("#" + el.dataset.route, onRouteChange);
    });
  });
}
