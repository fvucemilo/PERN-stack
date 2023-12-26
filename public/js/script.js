document.addEventListener('DOMContentLoaded', () => {
  const endpointList = document.getElementById('endpointList');
  const errorContainer = document.getElementById('error-container');

  fetch('/endpoints')
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.message}`);
      }
      return res.json();
    })
    .then((data) => {
      data.forEach((endpoint) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.innerHTML = `
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  ${endpoint.methods
                    .map(
                      (method) =>
                        `<span class="http-method ${method.toLowerCase()}">${method}</span>`
                    )
                    .join(' ')}
                  <strong>${endpoint.path}</strong>
                </div>
                <button
                  class="btn btn-link"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse${endpoint.path.replace(/\//g, '-').replace(/:/g, '_')}"
                  aria-expanded="false"
                  aria-controls="collapse${endpoint.path.replace(/\//g, '-').replace(/:/g, '_')}"
                  onclick="toggleChevron(this)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-bar-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M3.646 4.146a.5.5 0 0 1 .708 0L8 7.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zM1 11.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"/>
                  </svg>
                </button>
              </div>
              <div class="collapse collapse-content" id="collapse${endpoint.path
                .replace(/\//g, '-')
                .replace(/:/g, '_')}">
                <strong>Middlewares:</strong> ${endpoint.middlewares.join(', ')}
              </div>
            `;
        endpointList.appendChild(listItem);
      });

      document.querySelectorAll('button[data-bs-toggle="collapse"]').forEach((button) => {
        const chevron = button.querySelector('svg');
        const collapseDiv = document.querySelector(button.getAttribute('data-bs-target'));

        if (collapseDiv.classList.contains('show')) {
          chevron.classList.remove('bi-chevron-bar-down');
          chevron.classList.add('bi-chevron-bar-up');
        } else {
          chevron.classList.remove('bi-chevron-bar-up');
          chevron.classList.add('bi-chevron-bar-down');
        }
      });
    })
    .catch((err) => {
      console.error('Error fetching API endpoints:', err.message);
      errorContainer.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
    });
});

const toggleChevron = (button) => {
  const chevron = button.querySelector('svg');
  chevron.classList.toggle('bi-chevron-bar-down');
  chevron.classList.toggle('bi-chevron-bar-up');
};
