// ================= EMAILJS INIT =================
(function () {
    emailjs.init("S_hOvFUyhNP_nUHLx"); // Public Key
})();

// ================= SELECT ELEMENTS =================
const form = document.querySelector(".contact form");
const statusText = document.querySelector(".form-status");
const button = document.getElementById("sendBtn");
const btnText = document.querySelector(".btn-text");
const loader = document.querySelector(".loader");

// ================= FORM SUBMIT =================
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
        statusText.textContent = "❌ Please fill all fields";
        statusText.style.color = "red";
        return;
    }

    // Loading state
    button.disabled = true;
    btnText.style.display = "none";
    loader.style.display = "inline-block";
    statusText.textContent = "";

    // ================= SEND MAIN MESSAGE =================
    emailjs.send(
        "service_rxj28mc",
        "template_v3wfh05", // main template
        { name, email, message }
    )
    .then(() => {

        // ================= AUTO-REPLY =================
        emailjs.send(
            "service_rxj28mc",
            "template_gdx1qoo", // 🔁 replace with auto-reply template id
            { name, email }
        );

        // ================= SUCCESS UI =================
        statusText.textContent = "✅ Thank you! Your message has been sent.";
        statusText.style.color = "green";
        statusText.classList.add("success");

        loader.style.display = "none";
        button.disabled=false;

        btnText.textContent = "Message Sent ✔";
        btnText.style.display = "inline";

        form.reset();
    })
    .catch(() => {
        statusText.textContent = "❌ Something went wrong. Please try again.";
        statusText.style.color = "red";
        button.disabled = false;
        btnText.style.display = "inline";
        loader.style.display = "none";
    });
});
