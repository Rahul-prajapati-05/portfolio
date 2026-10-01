// ========================================
// MOBILE NAVBAR
// ========================================

const navbar = document.querySelector(".navbar");
const nav = document.querySelector(".navbar nav");

const menuBtn = document.createElement("button");

menuBtn.innerHTML = "☰";
menuBtn.className = "menu-btn";
menuBtn.setAttribute("aria-label", "Open menu");

navbar.insertBefore(menuBtn, nav);


// OPEN / CLOSE MENU

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("show");

});


// ========================================
// CLOSE MENU AFTER CLICK
// ========================================

const navLinks = document.querySelectorAll(".navbar nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("show");

    });

});


// ========================================
// ACTIVE NAVBAR LINK
// ========================================

window.addEventListener("scroll", () => {

    let current = "";

    const sections =
        document.querySelectorAll("section[id]");

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


// ========================================
// SMOOTH SCROLL
// ========================================

navLinks.forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ========================================
// PROJECT CARD HOVER
// ========================================

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-7px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0)";

    });

});


// ========================================
// CURRENT YEAR
// ========================================

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}
// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector(".submit-btn");

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        const formData = new FormData(contactForm);

        try {

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (result.success) {

                formStatus.textContent =
                    "✓ Message sent successfully!";

                formStatus.style.color = "#16a34a";

                contactForm.reset();

                submitButton.textContent =
                    "Message Sent ✓";

            } else {

                formStatus.textContent =
                    "Something went wrong. Please try again.";

                formStatus.style.color = "#dc2626";

                submitButton.disabled = false;

                submitButton.textContent =
                    "Send Message →";
            }

        } catch (error) {

            formStatus.textContent =
                "Unable to send message. Please try again.";

            formStatus.style.color = "#dc2626";

            submitButton.disabled = false;

            submitButton.textContent =
                "Send Message →";
        }

    });

}