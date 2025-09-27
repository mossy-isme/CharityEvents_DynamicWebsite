<h1>Charity Events Website</h1>

A dynamic web application for managing and showcasing charity events in your city. Built with Node.js, Express, MySQL, HTML, JavaScript, and TailwindCSS.

<h2>Features</h2>
**Home Page**:

Displays organisation info and a list of current/upcoming charity events.

**Search Events**:

Search and filter events by date, location, and category.

**Event Details**:

View full event details, including ticket info and organiser.

**Navigation**:

Consistent menu for easy navigation across all pages.

**RESTful API**:

Backend API for events, categories, and event details.

<h2>Tech Stack</h2>

- Node.js & Express (backend)
- MySQL (database)
- HTML, JavaScript, DOM (frontend)
- TailwindCSS (styling)

<h2>Project Structure</h2>

```
CharityEvents_DynamicWebsite/
├── charityevents_db.sql
├── package.json
├── src/
│   ├── app.js
│   ├── event_db.js
│   ├── public/
│   │   ├── index.html
│   │   ├── search.html
│   │   ├── event.html
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── js/
│   │       ├── api.js
│   │       ├── home.js
│   │       ├── search.js
│   │       └── event.js
│   └── routes/
│       ├── events.js
│       └── categories.js
```

<h2>Setup Instructions</h2>

**Clone the repository**:

`git clone https://github.com/mossy-isme/CharityEvents_DynamicWebsite.git`

`cd CharityEvents_DynamicWebsite`

**Install dependencies**:

`npm install`

**Set up the database**:

Import charityevents_db.sql into your MySQL server.

Update database credentials in src/event_db.js if needed.

**Run the server**:

``node src/app.js``

**Access the website**:

Open your browser and go to ``http://localhost:3001``

<h2>API Endpoints</h2>

`GET /api/events` — List all current/upcoming events

`GET /api/events/search` — Search events by criteria

`GET /api/events/:id` — Get event details

`GET /api/categories` — List event categories

<h2>Author</h2>

Moss Cluney

<h3>License</h3>
  
_For educational use only._
