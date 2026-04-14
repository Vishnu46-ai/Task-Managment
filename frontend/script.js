const API = "http://13.51.167.214:3000";
async function fetchTasks() {
  const res = await fetch(`${API}/tasks`);
  const data = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  data.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `${task.task} <button onclick="deleteTask(${task.id})">X</button>`;
    list.appendChild(li);
  });
}

async function addTask() {
  const task = document.getElementById('taskInput').value;
  await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task })
  });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
  fetchTasks();
}

fetchTasks();