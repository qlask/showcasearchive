/* =====================================================================
   LEVEL VAULT — edit this array to add, remove, or update levels.
   This is the ONLY place levels come from. There is no upload form,
   no database, and no public submission path on this site — the
   maintainer adds every entry here directly in the source.

   `slug` is the "technical name" used in the level's detail URL:
   https://qlask.github.io/showcasevault/#/<slug>
   Keep it lowercase, no spaces (use hyphens). It must be unique.

   `description` is optional long-form info shown on the detail page.
   `uploadDate` is optional, format "YYYY-MM-DD" — shown under the
   Technical name section on the detail page. Leave it out (or "")
   if you don't know the upload date.
   Adding/editing/removing entries here is the only thing needed —
   the grid, search, filters, and detail pages update automatically.
   ===================================================================== */
export const LEVELS = [
  {
    slug: "error",
    name: "Error",
    creator: "iLsane, arcania",
    type: "gdr2",
    size: "358 B",
    objects: "25,062",
    diff: "Easy Demon",
    gif: "https://i.imgur.com/rQlZE5s.png",
    file: "https://drive.google.com/file/d/1k-vDNXN7Ucn-genQrRKJJdpqvKYHu3t6/view?usp=sharing",
    description: "A showcase of an Easy Demon collab from iLsane and arcania.",
    id: "56455318",
    uploadDate: "2026-07-24"
  },
  {
    slug: "machina-deluxe",
    name: "Machina Deluxe",
    creator: "siNK",
    type: "gdr2",
    size: "299 B",
    objects: "19,273",
    diff: "Easy Demon",
    gif: "https://i.imgur.com/PjV3Zhw.png",
    file: "https://drive.google.com/file/d/1f4c2cKLhPKoa-4yT_CFegqWATEh4ckxp/view?usp=sharing",
    description: "bro i used this song",
    id: "126502545",
    uploadDate: "2026-07-25"
  },
  {
    slug: "blackpill",
    name: "Blackpill",
    creator: "yyene",
    type: "gdr2",
    size: "410 B",
    objects: "14,422",
    diff: "Easy Demon",
    gif: "https://i.imgur.com/fbpJsGV.png",
    file: "https://drive.google.com/file/d/1OYA1mvqoA9gw4Z5IQtWDuR1f0z7R2HtY/view?usp=drive_link",
    description: "An Easy Demon by yyene.",
    id: "145216304",
    uploadDate: "2026-07-26"
  }
];

/* =====================================================================
   CHANGELOG — edit this array to add a new changelog entry. Newest
   entries should go at the top of the array; they render in that order.
   `tag` controls the pill color: "added" | "fixed" | "changed"
   ===================================================================== */
export const CHANGELOG = [
  {
    date: "2026-07-26",
    tag: "added",
    title: "Level detail pages + Changelog tab",
    body: "Every card now opens its own detail page at a dedicated URL based on the level's technical name (slug). Added this Changelog tab so future updates are tracked in one place."
  },
  {
    date: "2026-07-26",
    tag: "added",
    title: "Blackpill added to the vault",
    body: "Added yyene's Blackpill to the archive, including auto-generated preview and object count."
  },
  {
    date: "2026-07-24",
    tag: "changed",
    title: "Vault launched",
    body: "Initial release of Showcase Vault with Error and Machina Deluxe."
  }
];

/* Badge class + tag class lookups, shared across render modules */
export const BADGE_CLASS = { gdr: "badge-gdr", gdr2: "badge-gdr2", gmd: "badge-gmd" };
export const TAG_CLASS = { added: "tag-added", fixed: "tag-fixed", changed: "tag-changed" };

/* The single way anyone outside the source can propose a level */
export const MAILTO =
  "mailto:urujoshuaofficial@gmail.com?subject=" +
  encodeURIComponent("Level Showcase Request") +
  "&body=" +
  encodeURIComponent(
    "Level name:\nCreator:\nFile type (.gdr / .gdr2 / .gmd):\nYouTube/video link (if any):\n\nWhy this level deserves a showcase:\n"
  );
