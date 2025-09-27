import { getCategories, searchEvents } from "./api.js";

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

async function loadCategories() {
    const select = document.querySelector("#category");
    try {
        const cats = await getCategories();
        for (const c of cats) {
            const opt = document.createElement("option");
            opt.value = c.id;
            opt.textContent = c.name;
            select.appendChild(opt);
        }
    } catch (e) {
        console.error(e);
    }
}

async function runSearch() {
    const date = document.querySelector("#date").value;
    const location = document.querySelector("#location").value.trim();
    const categoryId = document.querySelector("#category").value;
    const ticketPriceMax = document.querySelector("#ticketPriceMax").value;
    const mount = document.querySelector("#results");
    mount.innerHTML = `<div class="card">Searching…</div>`;
    try {
        const results = await searchEvents({ date, location, categoryId, ticketPriceMax });
        if (!results.length) {
            mount.innerHTML = `<div class="card">No results.</div>`;
            return;
        }
        mount.innerHTML = results.map(eventCard).join("");
    } catch (e) {
        console.error(e);
        mount.innerHTML = `<div class="card">Search failed.</div>`;
    }
}

function init() {
    loadCategories();
    document.querySelector("#doSearch").addEventListener("click", runSearch);
}
init();
