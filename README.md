#Countries Explorer

---

##Project Snapshot

| | |
|---|---|
| **Project type** | Frontend project |
| **Core focus** | Asynchronous requests, filtering, DOM updates |
| **What it showcases** | Regional browsing, country search, detailed profiles |

---

##Highlights

- **Region Discovery:** Load available regions dynamically from the API.
- **Country Browser:** Display countries and their flags for a selected region.
- **Search and Sort:** Filter by country name and sort results alphabetically in ascending or descending order.
- **Country Details:** Show capital, area, time zones, languages, currencies, and neighboring country codes.
- **Page Navigation:** Pass selected regions and country names through URL query parameters.

> Country information is fetched on demand; the application does not rely on a bundled country dataset.

---

##How It Works

| Component | Responsibility |
|---|---|
| `firstpage.html` | Choose a region returned by the API |
| `secondpage.html` | Browse, search, and sort countries within that region |
| `thirdpage.html` | Display information for a selected country |
| `script.js` | Fetch requests, query parameter parsing, filtering, and dynamic rendering |

### Data Flow

1. Fetch all countries and extract distinct regions.
2. Request countries for the selected region.
3. Filter and sort the downloaded results in the browser.
4. Request full country data when the user selects a country.

---

## Tech Stack & Concepts

| Category | Details |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript |
| **API** | [REST Countries](https://restcountries.com/) |
| **Browser APIs** | Fetch API, DOM API, URLSearchParams |
| **Concepts** | Async data loading, sorting, filtering, dynamic rendering |

---

##Getting Started

```bash
git clone https://github.com/Edko21/WebAppForExploringCountries.git
cd WebAppForExploringCountries
```

Open `Simple Region Fetch/firstpage.html` in a browser, preferably through a local development server. An internet connection is required for live data.

---

##Next Steps

- Add loading indicators and clearer API error messages.
- Handle missing country data and special characters more defensively.
- Add a responsive filter layout and optional favorites list.

---

🔗 **Repository:** [Web App for Exploring Countries](https://github.com/Edko21/WebAppForExploringCountries)
