/*
 * Refreshes the live website from this dashboard.
 *
 * Two ways in: automatically after a successful save, and a "Publish to site"
 * button for when you want to force it — a save whose ping failed, a change
 * made outside the admin, or simply to reassure yourself the site is current.
 *
 * Why this runs in the browser rather than in Django: PythonAnywhere's free
 * tier only allows outbound requests to whitelisted hosts, so the server
 * cannot call Vercel. The admin's own browser has no such restriction.
 *
 * Failure is never fatal — the content is already saved, and the site's cache
 * window will pick the change up regardless.
 */
(function () {
  "use strict";

  var BANNER_ID = "admire-revalidate-banner";
  var BUTTON_ID = "admire-publish-button";

  var BRAND = "#1E3A8A";
  var BRAND_LIGHT = "#60A5FA";

  function banner(text, tone) {
    var el = document.getElementById(BANNER_ID);
    if (!el) {
      el = document.createElement("div");
      el.id = BANNER_ID;
      el.setAttribute("role", "status");
      el.style.cssText =
        "position:fixed;right:18px;bottom:74px;z-index:99999;padding:10px 16px;" +
        "border-radius:6px;font:500 13px/1.4 system-ui,sans-serif;color:#fff;" +
        "box-shadow:0 6px 20px rgba(0,0,0,.25);transition:opacity .4s;max-width:320px;";
      document.body.appendChild(el);
    }
    el.style.background =
      tone === "error" ? "#b3261e" : tone === "pending" ? "#1a365d" : BRAND;
    el.textContent = text;
    el.style.opacity = "1";

    if (tone !== "pending") {
      setTimeout(function () {
        el.style.opacity = "0";
      }, 4000);
    }
  }

  function setButtonBusy(busy) {
    var button = document.getElementById(BUTTON_ID);
    if (!button) return;
    button.disabled = busy;
    button.style.opacity = busy ? "0.6" : "1";
    button.style.cursor = busy ? "default" : "pointer";
    button.textContent = busy ? "Publishing…" : "Publish to site";
  }

  /**
   * Ask this server for a short-lived token, then hand it to the site's
   * revalidate route. The signing secret itself never reaches the browser.
   */
  function revalidate(silentWhenUnconfigured) {
    setButtonBusy(true);
    banner("Updating live site…", "pending");

    return fetch("/admin/revalidate-config/", {
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        if (!res.ok) throw new Error("config " + res.status);
        return res.json();
      })
      .then(function (config) {
        if (!config.enabled) {
          // Revalidation is not set up. Stay quiet after a save; say so when
          // the button was pressed deliberately.
          if (silentWhenUnconfigured) {
            var el = document.getElementById(BANNER_ID);
            if (el) el.style.opacity = "0";
          } else {
            banner("Live updates are not configured yet.", "error");
          }
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
        banner("Saved. The site will catch up within 10 minutes.", "error");
      })
      .then(function () {
        setButtonBusy(false);
      });
  }

  function savedSomething() {
    // Jazzmin renders Django's success message as .alert-success; the
    // .messagelist selectors cover the stock admin templates.
    return !!document.querySelector(
      ".alert-success, .messagelist .success, .messagelist li.success"
    );
  }

  function signedIn() {
    // Only authenticated pages carry a way out, so this keeps the button off
    // the login screen.
    // Jazzmin renders <form id="logout-form" action="/admin/logout/">; the
    // other selectors cover the stock admin and Jazzmin's password pages.
    // content/tests.py asserts this markup is really there.
    return !!document.querySelector(
      '#logout-form, form[action*="logout"], [href*="logout"]'
    );
  }

  function addButton() {
    if (document.getElementById(BUTTON_ID)) return;

    var button = document.createElement("button");
    button.id = BUTTON_ID;
    button.type = "button";
    button.textContent = "Publish to site";
    button.title =
      "Push the latest content to the live website now, instead of waiting for it to refresh.";
    button.style.cssText =
      "position:fixed;right:18px;bottom:18px;z-index:99998;padding:11px 20px;" +
      "border:0;border-radius:6px;background:" + BRAND + ";color:#fff;" +
      "font:600 12px/1 system-ui,sans-serif;letter-spacing:.08em;" +
      "text-transform:uppercase;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25);" +
      "transition:background .2s,opacity .2s;";

    button.addEventListener("mouseenter", function () {
      if (!button.disabled) button.style.background = BRAND_LIGHT;
    });
    button.addEventListener("mouseleave", function () {
      button.style.background = BRAND;
    });
    button.addEventListener("click", function () {
      revalidate(false);
    });

    document.body.appendChild(button);
  }

  function init() {
    if (!signedIn()) return;
    addButton();
    if (savedSomething()) revalidate(true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
