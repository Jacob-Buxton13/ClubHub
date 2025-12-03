const form = document.querySelector(".college-search-form");
const searchInput = document.querySelector(".search-input");
const colleges = document.querySelectorAll(".college");

// Reusable function
function filterColleges() {
    const text = searchInput.value.toLowerCase();

    colleges.forEach(college => {
        const collegeName = college.querySelector("summary").textContent.toLowerCase();

        if (collegeName.includes(text)) {
            college.style.display = "";
        } else {
            college.style.display = "none";
        }
    });
}

// Live filtering
searchInput.addEventListener("input", filterColleges);

// Filter on submit
form.addEventListener("submit", function (event) {
    event.preventDefault();
    filterColleges();
});
