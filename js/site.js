/* Carroll Consulting – shared behaviour (loaded with `defer` on every page). */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("primary-nav");

  if (nav && toggle && links) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    // Close on Escape and return focus to the button.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close after choosing a link, or when clicking outside the header.
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target)) setOpen(false);
    });

    // Reset if the viewport grows past the mobile breakpoint while open.
    var mq = window.matchMedia("(min-width: 961px)");
    var onChange = function (e) { if (e.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---------- Contact form ---------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    var submitBtn = form.querySelector("[data-submit]");
    var endpoint = (form.getAttribute("data-endpoint") || "").trim();
    var idleLabel = submitBtn ? submitBtn.textContent : "";

    var show = function (kind, message) {
      if (!status) return;
      status.hidden = false;
      status.className = "form-status is-" + kind;
      status.textContent = message;
    };

    var setBusy = function (busy) {
      if (!submitBtn) return;
      submitBtn.disabled = busy;
      submitBtn.setAttribute("aria-busy", String(busy));
      submitBtn.textContent = busy ? "Sending…" : idleLabel;
    };

    form.addEventListener("submit", function (e) {
      // Native validation has already run; only valid forms reach this handler.
      e.preventDefault();

      if (!endpoint) {
        show("error", "Our online form isn’t connected yet. Please reach out by email instead; your details have not been sent.");
        return;
      }

      setBusy(true);
      if (status) status.hidden = true;

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed: " + res.status);
          form.reset();
          show("success", "Thank you. We’ve received your request and will be in touch shortly.");
        })
        .catch(function () {
          show("error", "Something went wrong and your request was not sent. Please try again or email us directly.");
        })
        .then(function () { setBusy(false); });
    });
  }
})();
