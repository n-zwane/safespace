// Sticky header on scroll
window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");

        // Toggle body scroll when menu is open
        if (navMenu.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll(
        ".feature-card, .feature-highlight, .support-option"
    );

    elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = "translateY(0)";
        }
    });
}

// Initialize elements for animation
document
    .querySelectorAll(".feature-card, .feature-highlight, .support-option")
    .forEach((element) => {
        element.style.opacity = 0;
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

// Listen for scroll events
window.addEventListener("scroll", animateOnScroll);
// Initial check on page load
window.addEventListener("load", animateOnScroll);

// Quick exit functionality
document.querySelectorAll(".exit-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        // Clear any sensitive data from session
        sessionStorage.clear();
        localStorage.clear();
        // Redirect to neutral site
        window.location.href = "https://www.google.com";
    });
});

// Emergency button functionality
const emergencyBtn = document.querySelector(".btn-emergency");
if (emergencyBtn) {
    emergencyBtn.addEventListener("click", function (e) {
        e.preventDefault();
        // Confirm before calling emergency services
        if (confirm("Are you sure you want to contact emergency services?")) {
            window.location.href = "tel:0800428428";
        }
    });
}

// Disguise mode - make the app look like a notes app
function toggleDisguise() {
    document.body.classList.toggle("disguise-mode");
    if (document.body.classList.contains("disguise-mode")) {
        document.title = "My Notes";
        document.querySelector(".safe-logo").textContent = "Notes";
        // Hide emergency elements
        document.querySelectorAll(".btn-emergency, .exit-btn").forEach((el) => {
            el.style.display = "none";
        });
    } else {
        document.title = "SafeSpace - Supporting GBV Survivors";
        document.querySelector(".safe-logo").textContent = "SafeSpace";
        // Show emergency elements
        document.querySelectorAll(".btn-emergency, .exit-btn").forEach((el) => {
            el.style.display = "inline-block";
        });
    }
}

// Add keyboard shortcut for disguise mode (Ctrl+Shift+D)
document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && e.key === "D") {
        toggleDisguise();
    }
});

// Check for low connectivity and adjust interface
function checkConnectivity() {
    if (!navigator.onLine) {
        // Show offline options more prominently
        document.querySelectorAll(".online-only").forEach((el) => {
            el.style.opacity = "0.5";
            el.style.pointerEvents = "none";
        });

        // Show offline message
        const offlineMsg = document.createElement("div");
        offlineMsg.innerHTML =
            "<p>You are currently offline. Some features may not be available. SMS and USSD options are still accessible.</p>";
        offlineMsg.style.cssText =
            "background: #f39c12; color: white; padding: 10px; text-align: center; position: fixed; top: 0; left: 0; width: 100%; z-index: 10000;";
        document.body.prepend(offlineMsg);
    }
}

// Check connectivity on load and when it changes
window.addEventListener("load", checkConnectivity);
window.addEventListener("online", checkConnectivity);
window.addEventListener("offline", checkConnectivity);

// Language preference detection and setting
function detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    const supportedLangs = ["en", "zu", "af", "xh", "nso"];
    const langCode = userLang.split("-")[0];

    if (supportedLangs.includes(langCode)) {
        // Could set language preference here
        document.documentElement.lang = langCode;
    }
}

detectLanguage();

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
    // Add any initialization code here
    console.log("SafeSpace initialized");
});

// AI Chat functionality
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendMessage = document.getElementById("sendMessage");

// Hardcoded responses for GBV queries
const responses = {
    hello: "Hello, I'm here to help with any questions about gender-based violence support in South Africa.",
    hi: "Hello, I'm here to help with any questions about gender-based violence support in South Africa.",
    help: "I can help you with information about reporting GBV, finding shelters, legal resources, and emergency contacts.",
    report: "You can report GBV through: 1) USSD: Dial *134*123# 2) SMS: Text 'HELP' to 34343 3) Online form on our website",
    shelter:
        "We can help you find a safe place. Please visit our 'Find Shelters' section or contact the GBV Emergency Hotline: 0800 428 428",
    emergency:
        "For immediate help, call the GBV Emergency Hotline: 0800 428 428 or Police Emergency: 10111",
    legal: "Legal resources are available through the Legal Aid South Africa (011 877 2000) or Women's Legal Centre (021 424 5660)",
    therapy:
        "You can access counseling services through Lifeline (0861 322 322) or Rape Crisis Cape Town Trust (021 447 9762)",
    safety: "For safety planning tips, download our safety guide from the Resources section or chat with me for immediate advice",
    default:
        "I'm not sure I understand. Could you try asking about reporting, shelters, emergency contacts, legal help, or counseling?",
};

// Toggle chat window
if (chatToggle && chatWindow) {
    chatToggle.addEventListener("click", function () {
        chatWindow.classList.toggle("active");
    });
}

// Close chat window
if (closeChat) {
    closeChat.addEventListener("click", function () {
        chatWindow.classList.remove("active");
    });
}

// Send message function
function sendUserMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    // Add user message to chat
    addMessage(message, "user");

    // Process message and get response
    setTimeout(() => {
        const response = getResponse(message);
        addMessage(response, "bot");
    }, 500);

    // Clear input
    userInput.value = "";
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", `${sender}-message`);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get response based on user input
function getResponse(input) {
    input = input.toLowerCase();

    // Check for keywords and return appropriate response
    if (input.includes("hello") || input.includes("hi")) {
        return responses["hello"];
    } else if (input.includes("report") || input.includes("incident")) {
        return responses["report"];
    } else if (
        input.includes("shelter") ||
        input.includes("safe place") ||
        input.includes("accommodation")
    ) {
        return responses["shelter"];
    } else if (
        input.includes("emergency") ||
        input.includes("urgent") ||
        input.includes("immediate")
    ) {
        return responses["emergency"];
    } else if (
        input.includes("legal") ||
        input.includes("lawyer") ||
        input.includes("rights")
    ) {
        return responses["legal"];
    } else if (
        input.includes("therapy") ||
        input.includes("counsel") ||
        input.includes("counseling") ||
        input.includes("counselling")
    ) {
        return responses["therapy"];
    } else if (
        input.includes("safety") ||
        input.includes("plan") ||
        input.includes("protect")
    ) {
        return responses["safety"];
    } else if (input.includes("help")) {
        return responses["help"];
    } else {
        return responses["default"];
    }
}

// Event listeners for sending messages
if (sendMessage) {
    sendMessage.addEventListener("click", sendUserMessage);
}

if (userInput) {
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendUserMessage();
        }
    });
}
