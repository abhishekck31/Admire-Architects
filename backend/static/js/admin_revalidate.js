/*
 * Refreshes the live website after a save in this dashboard.
 *
 * Why this runs in the browser rather than in Django: PythonAnywhere's free
 * tier only allows outbound requests to whitelisted hosts, so the server
 * cannot call Vercel. The admin's own browser has no such restriction.
 *
 * It fires only when Django reports a successful save, asks this server for a
 * short-lived token, then pings the Next.js revalidate route. Failure is
 * non-fatal: the content is already saved, and the site's 1-hour cache window
 * will pick the change up regardless.
 */
(function () {
  "use strict";

  var BANNER_ID = "admire-revalidate-banner";

  function banner(text, tone) {
    var el = document.getElementById(BANNER_ID);
    if (!el) {
      el = document.createElement("div");
      el.id = BANNER_ID;
      el.style.cssText =
        "position:fixed;right:18px;bottom:18px;z-index:99999;padding:10px 16px;" +
        "border-radius:6px;font:500 13px/1.4 system-ui,sans-serif;color:#fff;" +
        "box-shadow:0 6px 20px rgba(0,0,0,.25);transition:opacity .4s;";
      document.body.appendChild(el);
    }
    el.style.background =
      tone === "error" ? "#b3261e" : tone === "pending" ? "#1a365d" : "#1E3A8A";
    el.textContent = text;
    el.style.opacity = "1";

    if (tone !== "pending") {
      setTimeout(function () {
        el.style.opacity = "0";
      }, 4000);
    }
  }

  function savedSomething() {
    // Django renders a success message after add/change/delete.
    return !!document.querySelector(
      ".messagelist .success, .alert-success, .messagelist li.success"
    );
  }

  function revalidate() {
    banner("Updating live site…", "pending");

    fetch("/admin/revalidate-config/", {
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        if (!res.ok) throw new Error("config " + res.status);
        return res.json();
      })
      .then(function (config) {
        if (!config.enabled) {
          // Not configured yet — stay quiet rather than alarm the client.
          var el = document.getElementById(BANNER_ID);
          if (el) el.style.opacity = "0";
          return null;
        }
        return fetch(config.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Revalidate-Token": config.token,
          },
          body: JSON.stringify({ tags: ["projects", "jobs"] }),
        });
      })
      .then(function (res) {
        if (res === null) return;
        if (!res.ok) throw new Error("revalidate " + res.status);
        banner("Live site updated", "success");
      })
      .catch(function () {
        banner("Saved. Live site will update within the hour.", "error");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      if (savedSomething()) revalidate();
    });
  } else if (savedSomething()) {
    revalidate();
  }
})();
