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
    // Walidacja formularza
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            
            event.preventDefault(); 
            
            let isValid = true;
            
            
            const imie = document.getElementById("imie");
            const nazwisko = document.getElementById("nazwisko");
            const email = document.getElementById("email");
            const wiadomosc = document.getElementById("wiadomosc");
            
            
            const imieError = document.getElementById("imie-error");
            const nazwiskoError = document.getElementById("nazwisko-error");
            const emailError = document.getElementById("email-error");
            const wiadomoscError = document.getElementById("wiadomosc-error");
            const successMessage = document.getElementById("success-message");
            
            
            [imie, nazwisko, email, wiadomosc].forEach(el => el.classList.remove("is-invalid"));
            successMessage.classList.add("d-none");
            
            
            const hasDigitsRegex = /\d/; 
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
            
            
            if (imie.value.trim() === "") {
                imie.classList.add("is-invalid");
                imieError.textContent = "Pole imię jest wymagane.";
                isValid = false;
            } else if (hasDigitsRegex.test(imie.value)) {
                imie.classList.add("is-invalid");
                imieError.textContent = "Imię nie może zawierać cyfr.";
                isValid = false;
            }
            
            
            if (nazwisko.value.trim() === "") {
                nazwisko.classList.add("is-invalid");
                nazwiskoError.textContent = "Pole nazwisko jest wymagane.";
                isValid = false;
            } else if (hasDigitsRegex.test(nazwisko.value)) {
                nazwisko.classList.add("is-invalid");
                nazwiskoError.textContent = "Nazwisko nie może zawierać cyfr.";
                isValid = false;
            }
            
            
            if (email.value.trim() === "") {
                email.classList.add("is-invalid");
                emailError.textContent = "Pole e-mail jest wymagane.";
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                email.classList.add("is-invalid");
                emailError.textContent = "Podaj poprawny adres e-mail (np. nazwa@domena.pl).";
                isValid = false;
            }
            
            
            if (wiadomosc.value.trim() === "") {
                wiadomosc.classList.add("is-invalid");
                wiadomoscError.textContent = "Wiadomość nie może być pusta.";
                isValid = false;
            }
            
            
            if (isValid) {
                successMessage.classList.remove("d-none");
                contactForm.reset(); 
            }
        });
    }

});