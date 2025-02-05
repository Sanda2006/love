document.addEventListener("DOMContentLoaded", function() {
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const datePicker = document.getElementById("datePicker");
    const dateInput = document.getElementById("dateInput");
    const setDateBtn = document.getElementById("setDateBtn");
    const countdown = document.getElementById("countdown");
    const timer = document.getElementById("timer");

    let noClickCount = 0;

    yesBtn.addEventListener("click", function() {
        document.querySelector(".buttons").style.display = "none";
        datePicker.classList.remove("hidden");
    });

    noBtn.addEventListener("click", function() {
        noClickCount++;
        yesBtn.style.fontSize = `${20 + noClickCount * 10}px`;

        if (noClickCount >= 5) {
            noBtn.style.display = "none";
        }
    });

    setDateBtn.addEventListener("click", function() {
        const selectedDate = new Date(dateInput.value);
        localStorage.setItem("valentineDate", selectedDate);
        datePicker.classList.add("hidden");
        countdown.classList.remove("hidden");
        startCountdown(selectedDate);
    });

    function startCountdown(date) {
        function updateTimer() {
            const now = new Date();
            const diff = date - now;
            if (diff <= 0) {
                timer.textContent = "It's time! 🎉";
                clearInterval(interval);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
    }

    const savedDate = localStorage.getItem("valentineDate");
    if (savedDate) {
        countdown.classList.remove("hidden");
        startCountdown(new Date(savedDate));
    }
});
