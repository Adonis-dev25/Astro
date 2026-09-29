}

function finish() {
  const pct = Math.round(score / pool.length * 100);
  $("rTitle").textContent = pct >= 85 ? "🏆 Relationship Expert" : pct >= 60 ? "👍 Solid Understanding" : "🌱 Room to Grow";
  $("rScore").textContent = score + " / " + pool.length + " (" + pct + "%) · " + LEVELS[level];
  $("rAdvice").textContent = pct >= 85
    ? "Great knowledge! Now put it into practice: listen well, communicate early, and be the kind of partner you hope to find."
    : pct >= 60
    ? "You understand the basics. Focus on the topics below where you scored lowest, and practice I-statements and honest expectations."
    : "Everyone starts somewhere. Review the explanations, talk with a trusted mentor or counselor, and try again. Growth matters more than perfection.";
  const list = $("rCats"); list.replaceChildren();
  Object.entries(byCat).forEach(([name, v]) => {
    const row = document.createElement("div"); row.className = "cat";
    row.innerHTML = "<span></span><strong></strong>";
    row.children[0].textContent = name; row.children[1].textContent = v.r + " / " + v.t;
    list.appendChild(row);
  });
  $("fill").style.width = "100%"; show("result");
}

document.querySelectorAll("[data-level]").forEach(b => b.addEventListener("click", () => startQuiz(b.dataset.level)));
$("next").addEventListener("click", () => { idx++; idx < pool.length ? render() : finish(); });
$("again").addEventListener("click", () => show("start"));
</script>
</body>
</html>
