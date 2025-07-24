```javascript
function processFile() {
  const fileInput = document.getElementById('file-input');
  const resultDiv = document.getElementById('result');
  const type = document.getElementById('lotto-type').value;

  if (!fileInput.files.length) {
    alert("CSV ගොනුවක් තෝරන්න");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const lines = e.target.result.split('\n');
    const numbers = [];

    lines.forEach(line => {
      const cols = line.split(',');
      cols.forEach(col => {
        const num = parseInt(col.trim());
        if (!isNaN(num)) numbers.push(num);
      });
    });

    const freq = {};
    numbers.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
    });

    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 6).map(([n]) => parseInt(n));
    resultDiv.innerHTML = `<h3>getName(type) – වැඩිපුරම ආපු අංක</h3><p>{top.join(', ')}</p>`;

    drawChart(freq);
    showPrediction(freq);
  };

  reader.readAsText(fileInput.files[0]);
}

function getName(type) {
  switch(type) {
    case 'mahajana': return 'Mahajana Sampatha';
    case 'mega': return 'Mega Power';
    case 'dhana': return 'Dhana Nidhanaya';
    case 'govisetha': return 'Govisetha';
    default: return '';
  }
}

function drawChart(freq) {
  const ctx = document.getElementById('chart').getContext('2d');
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const labels = sorted.map(e => e[0]);
  const data = sorted.map(e => e[1]);

  if (window.barChart) window.barChart.destroy();

  window.barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'අංක පැමිණීමේ ගණන',
        data,
        backgroundColor: 'rgba(0,123,255,0.5)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function showPrediction(freq) {
  const entries = Object.entries(freq);
  const weighted = [];

  entries.forEach(([num, count]) => {
    for (let i = 0; i < count; i++) {
      weighted.push(parseInt(num));
    }
  });
const prediction = [];
  while (prediction.length < 6) {
    const pick = weighted[Math.floor(Math.random() * weighted.length)];
    if (!prediction.includes(pick)) prediction.push(pick);
  }

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML += `<h3>අනාගත පුරෝකථිත අංක</h3><p>${prediction.join(', ')}</p>`;
}
```

---
