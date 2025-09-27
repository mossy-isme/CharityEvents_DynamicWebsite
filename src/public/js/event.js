import { getEventById } from "./api.js";

function renderEvent(e) {
    const date = new Date(e.date).toLocaleDateString();
    return `
    <div class="">
      <div class="bg-gray-700 text-gray-100 rounded p-1 text-center text-xs w-fit">${e.category}</div>
      <h1 class="text-4xl font-bold">${e.name}</h1>
      <p class="flex flex-row gap-3"><span class="bg-gray-800 rounded p-1 text-white text-sm my-2">${date}</span> <span class="bg-gray-800 rounded p-1 text-white text-sm my-2">${e.start_time ? e.start_time : ""} ${e.end_time ? "– " + e.end_time : ""}</span> <span class="bg-gray-800 rounded p-1 text-white text-sm my-2">${e.location ?? ""}</span></p>
      <p class="bg-gray-800 rounded w-fit text-white p-1 text-sm"><span class="italic font-semibold">Tickets</span>: ${e.ticket_price == 0 || e.ticket_price === "0.00" ? "Free" : "$" + e.ticket_price}</p>
      <p class="text-lg">${e.description ?? ""}</p>
      <p class="text-sm font-semibold mb-4">Organised by: ${e.organisation}</p>
      <a class="form-row mt-4 self-center bg-gray-800 w-fit hover:bg-gray-700 hover:scale-95 active:scale-105 p-1 rounded text-gray-100 text-sm text-center" href="./search.html">Back to search</a>
    </div>
  `;
}

async function init() {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const mount = document.querySelector("#content");
    if (!id) {
        mount.innerHTML = `<div class="card">No event id provided.</div>`;
        return;
    }
    try {
        const event = await getEventById(id);
        if (!event) {
            mount.innerHTML = `<div class="card">Event not found.</div>`;
            return;
        }
        mount.innerHTML = renderEvent(event);
    } catch (e) {
        console.error(e);
        mount.innerHTML = `<div class="card">Failed to load event.</div>`;
    }
}

init();
