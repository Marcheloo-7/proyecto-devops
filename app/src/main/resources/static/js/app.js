const statusBadge = document.querySelector('#statusBadge');
const appName = document.querySelector('#appName');
const appStatus = document.querySelector('#appStatus');
const lastChecked = document.querySelector('#lastChecked');
const pingResult = document.querySelector('#pingResult');
const refreshStatus = document.querySelector('#refreshStatus');
const pingButton = document.querySelector('#pingButton');
const healthButton = document.querySelector('#healthButton');
const healthResult = document.querySelector('#healthResult');

const formatNow = () => new Intl.DateTimeFormat('es-EC', {
    dateStyle: 'medium',
    timeStyle: 'medium'
}).format(new Date());

const setBadge = (text, className) => {
    statusBadge.textContent = text;
    statusBadge.className = `badge ${className}`;
};

async function requestJson(url) {
    const response = await fetch(url, {
        headers: {
            Accept: 'application/json'
        }
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        throw new Error(data.message || `Error HTTP ${response.status}`);
    }

    return data;
}

async function loadStatus() {
    setBadge('Consultando...', 'badge-muted');

    try {
        const data = await requestJson('/api/status');
        appName.textContent = data.app || 'Proyecto DevOps';
        appStatus.textContent = data.status || 'unknown';
        lastChecked.textContent = formatNow();
        setBadge(data.status === 'running' ? 'Operativo' : 'Revisar', data.status === 'running' ? 'badge-ok' : 'badge-error');
    } catch (error) {
        appName.textContent = 'Proyecto DevOps';
        appStatus.textContent = 'error';
        lastChecked.textContent = formatNow();
        setBadge('Sin conexión', 'badge-error');
    }
}

async function runPing() {
    pingResult.textContent = 'Ejecutando ping...';

    try {
        const data = await requestJson('/api/ping');
        pingResult.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        pingResult.textContent = JSON.stringify({
            status: 'error',
            message: error.message
        }, null, 2);
    }
}

async function runHealthCheck() {
    healthResult.textContent = 'Consultando /actuator/health...';
    document.querySelector('#estado').scrollIntoView({ behavior: 'smooth', block: 'start' });

    try {
        const data = await requestJson('/actuator/health');
        healthResult.textContent = JSON.stringify(data, null, 2);

        const isUp = data.status === 'UP';
        appStatus.textContent = isUp ? 'UP' : data.status || 'unknown';
        lastChecked.textContent = formatNow();
        setBadge(isUp ? 'Health OK' : 'Health revisar', isUp ? 'badge-ok' : 'badge-error');
    } catch (error) {
        healthResult.textContent = JSON.stringify({
            status: 'DOWN',
            message: error.message
        }, null, 2);
        appStatus.textContent = 'DOWN';
        lastChecked.textContent = formatNow();
        setBadge('Health error', 'badge-error');
    }
}

refreshStatus.addEventListener('click', loadStatus);
healthButton.addEventListener('click', runHealthCheck);
pingButton.addEventListener('click', runPing);

loadStatus();
