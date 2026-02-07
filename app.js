const $ = (s) => document.querySelector(s);

const searchInput = $("#searchInput"),
    searchBtn = $("#searchBtn");

const results = $("#results"),
    message = $("#message"),
    suggested = $(".suggested-terms")

const api = (url) =>
    fetch(url).then((r) => {
        if (!r.ok) throw 0;
        return r.json();
    });

const setMsg = (t = "") => (message.textContent = t);

const esc = (s = "") => String(s).replaceAll('", "&quot;');

searchBtn.addEventListener("click", search);

searchInput.addEventListener("keyup", (e) => e.key === "Enter" && search());

suggested?.addEventListener("click", (e) => {
    const span = e.target.closest("span[data-term]");
    if (!span) return;

    searchInput.value = span.dataset.term;
    search();
});

async function search() {
    const q = searchInput.value.trim();
    results.innerHTML = "";

    if (!q) return setMsg("Please type a dish name to search!");
    setMsg("Searching recipes...!");

    try {
        const data = await api(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`,
        );
        const meals = data.meals || [];
        if (!meals.length) return setMsg("No recipes found. Try another dish!");
        setMsg(`Found ${meals.length} recipe(s).`);
        results.innerHTML = meals.map(card).join("");
    }
    catch {
        setMsg("Something went wrong. Please try again!")
    }
}

const card = (m) =>
    <div></>