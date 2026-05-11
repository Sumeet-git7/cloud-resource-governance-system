const API_BASE = 'http://localhost:3000/requests';

const form = document.getElementById('requestForm');

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const data = {
    requester_name: document.getElementById('requester_name').value,
    department: document.getElementById('department').value,
    resource_type: document.getElementById('resource_type').value,
    purpose: document.getElementById('purpose').value,
    environment: document.getElementById('environment').value,
    duration_days: Number(document.getElementById('duration_days').value),
    usage_estimate: Number(document.getElementById('usage_estimate').value),
    access_justification: document.getElementById('access_justification').value
  };

  const response = await fetch(`${API_BASE}/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  alert(result.message || 'Request Created');

  loadRequests();

});

async function loadRequests() {

  const response = await fetch(`${API_BASE}/all`);

  const requests = await response.json();

  const table = document.getElementById('requestTable');

  table.innerHTML = '';

  requests.forEach(req => {

    table.innerHTML += `
      <tr>
        <td>${req.id}</td>
        <td>${req.requester_name}</td>
        <td>${req.resource_type}</td>
        <td>${req.status}</td>
        <td>${req.cost_category}</td>
      </tr>
    `;

  });

}

loadRequests();
