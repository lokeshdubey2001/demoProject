const API_KEY = CONFIG.API_KEY;
const API_URL = CONFIG.API_URL;
const MY_URL = CONFIG.MY_URL;

document.getElementById("urlForm").addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("result").innerHTML = "";
  const url = document.getElementById("urlInput").value;
  checkURL(url);
});

async function checkURL(url) {
  const API_URLS = `${API_URL}/${API_KEY}/${encodeURIComponent(url)}`;
  try {
    const response = await fetch(MY_URL + API_URLS);
    const data = await response.json();
    displayResult(data);
  } catch (error) {
    document.getElementById("result").innerHTML =
      '<p class="error">Error fetching data from API.</p>';
  }
}

function displayResult(data) {
  if (data.success) {
    const isMalicious = data.unsafe ? "Yes" : "No";
    const isPhishing = data.phishing ? "Yes" : "No";
    const malware = data.malware ? "Yes" : "No";

    document.getElementById("result").innerHTML = `
            <p><strong>Malicious:</strong> ${isMalicious}</p>
            <p><strong>Phishing:</strong> ${isPhishing}</p>
            <p><strong>Malware:</strong> ${malware}</p>
            <p><strong>IPQS Risk Score:</strong> ${data.risk_score}</p>
        `;
  } else {
    document.getElementById("result").innerHTML =
      '<p class="error">Invalid URL or failed to check.</p>';
  }
}
