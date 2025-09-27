import {getHomepageEvents} from "./api.js";

function eventCard(e) {
    const date = new Date(e.date).toLocaleDateString();
    return `
    <article class="text-black bg-gray-400 rounded p-2">
      <div class="bg-gray-700 text-gray-100 rounded p-1 text-center text-xs w-fit">${e.category}</div>
      <h3 class="text-lg font-bold">${e.name}</h3>
      <p class="meta text-sm">${date} ${e.start_time ? "• " + e.start_time : ""} • ${e.location ?? ""} • ${e.ticket_price == 0 || e.ticket_price === "0.00" ? "Free" : "$" + e.ticket_price} </p>
      <p class="mb-2">${e.description ?? ""}</p>
      <a class="form-row mt-4 self-center bg-gray-800 w-fit hover:bg-gray-700 hover:scale-95 active:scale-105 p-1 rounded text-gray-100 text-sm text-center" href="./event.html?id=${encodeURIComponent(e.id)}">View details</a>
    </article>
  `;
}

async function init() {
    const mount = document.querySelector("#events");
    mount.innerHTML = `<div class="card">Loading…</div>`;
    try {
        const events = await getHomepageEvents();
        if (!events.length) {
            mount.innerHTML = `<div class="card">No upcoming events.</div>`;
            return;
        }
        mount.innerHTML = events.map(eventCard).join("");
    } catch (err) {
        console.error(err);
        mount.innerHTML = `<div class="card">Failed to load events.</div>`;
    }
}

init();
