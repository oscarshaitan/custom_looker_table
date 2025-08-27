// Looker Studio Community Viz (Developer Mode)
const dscc = window.dscc;

const style = `
  <style>
    .rt-wrap { overflow:auto; }
    table { border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: 6px; text-align: center; }
    thead th {
      height: 120px; /* room for rotated labels */
      vertical-align: bottom;
      white-space: nowrap;
    }
    .rot90 {
      display: inline-block;
      transform: rotate(-90deg);
      transform-origin: bottom left;
    }
    tbody td { text-align: right; }
    tbody td:first-child { text-align: left; }
  </style>
`;

function draw(data) {
  const rows = data.tables.DEFAULT || data.tables.main || [];
  const f = data.fields || {};
  const dim = (f.dimension && f.dimension[0]) || { id: 'dimension', name: 'Dimension' };
  const mA  = (f.metric_a  && f.metric_a[0])  || { id: 'metric_a',  name: 'Metric A' };
  const mB  = (f.metric_b  && f.metric_b[0])  || { id: 'metric_b',  name: 'Metric B' };

  const header = `
    <thead>
      <tr>
        <th>${dim.name}</th>
        <th><span class="rot90">${mA.name}</span></th>
        <th><span class="rot90">${mB.name}</span></th>
      </tr>
    </thead>
  `;

  const body = `
    <tbody>
      ${rows.map(r => `
        <tr>
          <td>${r[dim.id] ?? ''}</td>
          <td>${r[mA.id]  ?? ''}</td>
          <td>${r[mB.id]  ?? ''}</td>
        </tr>
      `).join('')}
    </tbody>
  `;

  const el = document.getElementById('root');
  el.innerHTML = `${style}<div class="rt-wrap"><table>${header}${body}</table></div>`;
}

(function init() {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  dscc.subscribeToData(draw, { transform: dscc.tableTransform });
})();
