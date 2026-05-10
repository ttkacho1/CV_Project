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
            
            
            // (ZADANIE 8)
            if (isValid) {
                const formData = {
                    imie: imie.value,
                    nazwisko: nazwisko.value,
                    email: email.value,
                    wiadomosc: wiadomosc.value
                };

                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = "Wysyłanie...";
                submitBtn.disabled = true;

                
                const backendURL = "https://formspree.io/f/mzdoypwj";

                
                fetch(backendURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => {
                    if (response.ok) {
                        
                        successMessage.textContent = "Wiadomość została pomyślnie wysłana na serwer!";
                        successMessage.classList.remove("d-none");
                        successMessage.classList.remove("alert-danger");
                        successMessage.classList.add("alert-success");
                        contactForm.reset(); 
                    } else {
                        throw new Error("Błąd sieci");
                    }
                })
                .catch(error => {
                    
                    successMessage.textContent = "Wystąpił błąd podczas wysyłania. Spróbuj ponownie.";
                    successMessage.classList.remove("d-none");
                    successMessage.classList.remove("alert-success");
                    successMessage.classList.add("alert-danger");
                })
                .finally(() => {
                    
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
            }
        });
    }
    // Pobieranie danych z JSON 
    const skillsList = document.getElementById("skills-list");
    const projectsList = document.getElementById("projects-list");

    fetch('/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Błąd podczas ładowania pliku JSON");
            }
            return response.json();
        })
        .then(data => {

            data.umiejetnosci.forEach(skill => {
                const li = document.createElement("li");
                li.textContent = skill;
                skillsList.appendChild(li);
            });


            data.projekty.forEach(project => {
                const li = document.createElement("li");
                li.className = "list-group-item bg-transparent";
                li.innerHTML = `<strong>${project.tytul}</strong> – ${project.opis}`;
                projectsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Wystąpił błąd:", error);
        });
        // Local Storage 
    const notatkaInput = document.getElementById("nowa-notatka");
    const dodajNotatkeBtn = document.getElementById("dodaj-notatke-btn");
    const listaNotatek = document.getElementById("lista-notatek");

    const STORAGE_KEY = "cv_notatki_timur";

    function pobierzNotatki() {
        const zapisane = localStorage.getItem(STORAGE_KEY);
        if (zapisane) {
            return JSON.parse(zapisane);
        } else {
            return [];
        }
    }

    function zapiszNotatki(notatki) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notatki));
    }

    function renderujNotatki() {
        if (!listaNotatek) return;
        
        listaNotatek.innerHTML = "";
        const notatki = pobierzNotatki();

        notatki.forEach((notatka, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center bg-transparent";
            li.textContent = notatka;


            const usunBtn = document.createElement("button");
            usunBtn.className = "btn btn-danger btn-sm";
            usunBtn.textContent = "Usuń";
            usunBtn.onclick = function() {
                usunNotatke(index);
            };

            li.appendChild(usunBtn);
            listaNotatek.appendChild(li);
        });
    }


    if (dodajNotatkeBtn) {
        dodajNotatkeBtn.addEventListener("click", function() {
            const tekst = notatkaInput.value.trim();
            if (tekst !== "") {
                const notatki = pobierzNotatki();
                notatki.push(tekst); 
                zapiszNotatki(notatki); 
                renderujNotatki();
                notatkaInput.value = "";
            }
        });
    }

    function usunNotatke(indeks) {
        const notatki = pobierzNotatki();
        notatki.splice(indeks, 1); 
        zapiszNotatki(notatki); 
        renderujNotatki(); 
    }

    renderujNotatki();

});