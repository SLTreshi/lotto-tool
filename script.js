---

✅ 3. `script.js`

```js
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function analyzeCSV() {
  const input = document.getElementById("csvInput");
  if (!input.files.length) return alert("CSV එකක් තෝරන්න");

  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.trim().split("\n");
    const allNumbers = [];

    lines.forEach(line => {
      const match = line.match(/2̣,̣5̣/g);
      if (match) allNumbers.push(...match.map(Number));
    });

    if (allNumbers.length === 0) {
      alert("වලංගු CSV එකක් නැහැ");
      return;
    }

    const freq = {};
    allNumbers.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
    });

    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 5).map(e => e[0]);

    document.getElementById("prediction").innerHTML =
      `<h3>ඉදිරිපත් කළ හැකි අංක:</h3><p>${top.join(", ")}</p>`;

    drawChart(sorted.slice(0, 10));
  };
  reader.readAsText(input.files[0]);
}
function drawChart(data) {
  const ctx = document.getElementById('chart').getContext('2d');
  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(e => e[0]),
      datasets: [{
        label: 'අංක පෙනී සිටීම',
        data: data.map(e => e[1]),
        backgroundColor: '#27ae60'
      }]
    }
  });
}
```

---
