// Simple API client
const API_BASE = "http://localhost:3001/api";

export async function getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error("Failed to load categories");
    return res.json();
}

export async function getHomepageEvents() {
    // default shows current/upcoming per your API
    const res = await fetch(`${API_BASE}/events`);
    if (!res.ok) throw new Error("Failed to load events");
    return res.json();
}

export async function searchEvents({ date = "", location = "", categoryId = "", ticketPriceMax = "" }) {
    const qs = new URLSearchParams();
    if (date) qs.set("date", date);
    if (location) qs.set("location", location);
    if (categoryId) qs.set("categoryId", categoryId);
    if (ticketPriceMax) qs.set("ticketPriceMax", ticketPriceMax);

    const res = await fetch(`${API_BASE}/events/search?` + qs.toString());
    if (!res.ok) throw new Error("Search failed");
    return res.json();
}

export async function getEventById(id) {
    const res = await fetch(`${API_BASE}/events/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Failed to load event");
    return res.json();
}
