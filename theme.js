(function () {
  var root = document.documentElement;
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  } catch (e) {}

  function current() { return root.dataset.theme || (mq.matches ? "dark" : "light"); }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    function label() {
      var next = current() === "dark" ? "light" : "dark";
      btn.setAttribute("aria-label", "Switch to " + next + " mode");
      btn.title = "Switch to " + next + " mode";
    }
    btn.hidden = false;
    label();
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
    });
    mq.addEventListener("change", label);
  });
})();
