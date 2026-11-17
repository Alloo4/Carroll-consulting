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
        // No form service connected yet: open the visitor's email app with the
        // request pre-filled, addressed to Carroll Consulting.
        var to = (form.getAttribute("data-email") || "").trim();
        if (!to) {
          show("error", "Our online form isn’t connected yet. Please reach out by email instead; your details have not been sent.");
          return;
        }
        var data = new FormData(form);
        var val = function (name) { return (data.get(name) || "").toString().trim(); };
        var topics = data.getAll("topics").join(", ");
        var lines = [
          "Name: " + val("first_name") + " " + val("last_name"),
          "Email: " + val("email"),
          "Phone: " + (val("phone") || "Not provided"),
          "Company: " + val("company"),
          "Company size: " + val("company_size"),
          "Help needed with: " + (topics || "Not specified"),
          "How they heard about us: " + (val("source") || "Not specified"),
          "",
          "About the organization or challenge:",
          val("message") || "Not provided"
        ];
        var subject = "Consultation request from " + val("first_name") + " " + val("last_name") + " (" + val("company") + ")";
        window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
        show("success", "Your email app should now open with your request filled in. Press send there to reach us. If nothing opened, email " + to + " directly.");
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
          show("success", "Thank you for reaching out. We’ll be in touch soon to schedule a thoughtful conversation about your organization’s needs.");
        })
        .catch(function () {
          show("error", "Something went wrong and your request was not sent. Please try again or email us directly.");
        })
        .then(function () { setBusy(false); });
    });
  }
})();
