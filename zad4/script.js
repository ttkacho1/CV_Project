// Numer indeksu: 66848
document.addEventListener("DOMContentLoaded", function() {
    
    
    const themeBtn = document.getElementById("theme-toggle-btn");
    const themeStylesheet = document.getElementById("theme-stylesheet");

    themeBtn.addEventListener("click", function() {
        if (themeStylesheet.getAttribute("href") === "red.css") {
            themeStylesheet.setAttribute("href", "green.css");
            themeBtn.textContent = "Zmień motyw na Czerwony";
        } else {
            themeStylesheet.setAttribute("href", "red.css");
            themeBtn.textContent = "Zmień motyw na Zielony";
        }
    });

    
    const toggleSectionBtn = document.getElementById("toggle-section-btn");
    const doswiadczenieContent = document.getElementById("doswiadczenie-content");

    toggleSectionBtn.addEventListener("click", function() {
        
        if (doswiadczenieContent.style.display === "none") {
            doswiadczenieContent.style.display = "block";
            toggleSectionBtn.textContent = "Ukryj sekcję";
        } else {
            doswiadczenieContent.style.display = "none";
            toggleSectionBtn.textContent = "Pokaż sekcję";
        }
    });

});