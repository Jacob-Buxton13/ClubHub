const searchInput = document.querySelector(".search-input");
const colleges = document.querySelectorAll(".college");

searchInput.addEventListener("input", function () {
    const text = searchInput.value.toLowerCase();

    colleges.forEach(college => {
        const collegeName = college.querySelector("summary").textContent.toLowerCase();

        if (collegeName.includes(text)) {
            college.style.display = "";
        } else {
            college.style.display = "none";
        }
    });
});
