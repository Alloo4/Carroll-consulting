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

    var to = (form.getAttribute("data-email") || "").trim();

    // Collect the answers once, with readable labels for the email Imani receives.
    var collect = function () {
      var data = new FormData(form);
      var val = function (name) { return (data.get(name) || "").toString().trim(); };
      var name = val("first_name") + " " + val("last_name");
      return {
        subject: "Consultation request from " + name + " (" + val("company") + ")",
        fields: {
          "Name": name,
          "Email": val("email"),
          "Phone": val("phone") || "Not provided",
          "Company": val("company"),
          "Company size": val("company_size") || "Not specified",
          "Help needed with": data.getAll("topics").join(", ") || "Not specified",
          "How they heard about us": val("source") || "Not specified",
          "About the organization or challenge": val("message") || "Not provided"
        },
        replyTo: val("email"),
        honey: val("_honey")
      };
    };

    // Backup: open the visitor's email app with the request filled in.
    var openEmailApp = function (info) {
      var lines = Object.keys(info.fields).map(function (k) { return k + ": " + info.fields[k]; });
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(info.subject) + "&body=" + encodeURIComponent(lines.join("\n"));
    };

    form.addEventListener("submit", function (e) {
      // Native validation has already run; only valid forms reach this handler.
      e.preventDefault();
      var info = collect();

      if (!endpoint) {
        if (!to) {
          show("error", "Our online form isn’t connected yet. Please reach out by email instead; your details have not been sent.");
          return;
        }
        openEmailApp(info);
        show("success", "Your email app should now open with your request filled in. Press send there to reach us. If nothing opened, email " + to + " directly.");
        return;
      }

      var payload = {};
      Object.keys(info.fields).forEach(function (k) { payload[k] = info.fields[k]; });
      payload._subject = info.subject;
      payload._replyto = info.replyTo;
      payload._template = "table";
      payload._captcha = "false";
      payload._honey = info.honey;

      setBusy(true);
      if (status) status.hidden = true;

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (json) {
            if (!res.ok || String(json.success) === "false") throw new Error(json.message || ("Request failed: " + res.status));
          });
        })
        .then(function () {
          form.reset();
          show("success", "Thank you for reaching out. We’ll be in touch soon to schedule a thoughtful conversation about your organization’s needs.");
        })
        .catch(function () {
          show("error", "We couldn’t send your request just now, so we’ve opened your email app with it filled in instead. If nothing opened, please email " + (to || "us") + " directly.");
          if (to) openEmailApp(info);
        })
        .then(function () { setBusy(false); });
    });
  }
})();
