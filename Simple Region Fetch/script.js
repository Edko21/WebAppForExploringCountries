const urlParams = new URLSearchParams(window.location.search);
const region = urlParams.get("region");
const countryName = urlParams.get("name");

    if (region) {
        fetchCountries(region); 
    } else if (countryName) {
        fetchCountryDetails(countryName); 
    } else {
        fetchRegions(); 
    }

function fetchRegions() {
    const regionForm = document.getElementById("region-form");

    if (!regionForm) {
        console.error("Region form element not found");
        return;
    }

    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            const regions = [...new Set(data.map(country => country.region).filter(Boolean))];
            regionForm.innerHTML = regions
                .map(region => `
                    <div class="radio-item">
                        <label>
                            <input type="radio" name="region" value="${region}">
                            ${region}
                        </label>
                    </div>
                `)
                .join("");
            regionForm.innerHTML += `
                <button type="button" id="check-region">Check Region</button>
            `;
            document.getElementById("check-region").addEventListener("click", () => {
                const selectedRegion = document.querySelector('input[name="region"]:checked');
                if (!selectedRegion) {
                    alert("Please select a region.");
                    return;
                }
                const region = selectedRegion.value;
                window.location.href = `secondpage.html?region=${encodeURIComponent(region)}`;
            });
        })
        .catch(error => {
            console.error("Error fetching regions:", error);
        });
}

function fetchCountries(region) {
    const countriesList = document.getElementById("countries-list");
    const searchInput = document.getElementById("search-input");
    const sortOptions = document.getElementsByName("sort");
    const applyFiltersButton = document.getElementById("apply-filters");

    if (!countriesList) return;

    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(response => response.json())
        .then(countries => {
            const renderCountries = (filteredCountries) => {
                countriesList.innerHTML = filteredCountries
                    .map(
                        country => `
                            <div class="card">
                                <img src="${country.flags.png}" alt="${country.name.common}">
                                <h3>${country.name.common}</h3>
                                <button onclick="viewCountry('${country.name.common}')">Check country</button>
                            </div>
                        `
                    )
                    .join("");
            };

            applyFiltersButton.addEventListener("click", () => {
                const searchValue = searchInput.value.toLowerCase();
                const sortOrder = Array.from(sortOptions).find(option => option.checked)?.value;

                let filteredCountries = countries.filter(country =>
                    country.name.common.toLowerCase().includes(searchValue)
                );

                filteredCountries.sort((a, b) => {
                    return sortOrder === "asc"
                        ? a.name.common.localeCompare(b.name.common)
                        : b.name.common.localeCompare(a.name.common);
                });

                renderCountries(filteredCountries);
            });
            renderCountries(countries);
        })
}

function fetchCountryDetails(countryName) {
    const countryDetails = document.getElementById("country-details");

    if (!countryDetails) return;

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            const country = data[0];
            const languages = Object.values(country.languages || {}).join(", ");
            const currencies = Object.values(country.currencies || {}).map(currency => currency.name).join(", ");
            const neighbors = (country.borders || []).join(", ");

            countryDetails.innerHTML = `
                <img src="${country.flags.png}" alt="${country.name.common}">
                <h1>${country.name.common}</h1>
            `;

            const detailsList = document.createElement("div");
            detailsList.classList.add("details-list");
            detailsList.innerHTML = `
                <p><strong>Capital:</strong> <span>${country.capital ? country.capital[0] : "N/A"}</span></p>
                <p><strong>Area:</strong> <span>${country.area.toLocaleString()} km²</span></p>
                <p><strong>Timezones:</strong> <span>${country.timezones.join(", ")}</span></p>
                <p><strong>Languages:</strong> <span>${languages || "N/A"}</span></p>
                <p><strong>Currencies:</strong> <span>${currencies || "N/A"}</span></p>
                <p><strong>Neighbours:</strong> <span>${neighbors || "None"}</span></p>
            `;
            countryDetails.appendChild(detailsList);
        })
}
function viewCountry(countryName) {
    window.location.href = `thirdpage.html?name=${encodeURIComponent(countryName)}`;
}
