let countdownTimer;
    let targetDate;

    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const countdownDisplay = document.getElementById('countdown');
    const errorMessage = document.getElementById('error-message');
    const targetDateInput = document.getElementById('targetDate');

    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');
    const currentDateDisplay = document.getElementById('currentDate');
    const currentTimeDisplay = document.getElementById('currentTime');

    // Function to start the countdown
    function startCountdown() {
      targetDate = new Date(targetDateInput.value);
      if (isNaN(targetDate.getTime())) {
        errorMessage.textContent = 'Please select a valid date and time.';
        return;
      }
      errorMessage.textContent = '';

      countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
          clearInterval(countdownTimer);
          countdownDisplay.textContent = 'Time is up!';
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          countdownDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
      }, 1000);
    }

    // Function to reset the countdown
    function resetCountdown() {
      clearInterval(countdownTimer);
      countdownDisplay.textContent = '00d 00h 00m 00s';
      targetDateInput.value = '';
      errorMessage.textContent = '';
    }

    // Event listeners for the buttons
    startBtn.addEventListener('click', startCountdown);
    resetBtn.addEventListener('click', resetCountdown);
// Variable to track smooth rotation of second hand
let totalSecondDegrees = 0;

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  // Hour hand (30 degrees per hour)
  const hourDeg = (hours % 12) * 30 + (minutes / 60) * 30;
  hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;

  // Minute hand (6 degrees per minute)
  const minuteDeg = minutes * 6 + (seconds / 60) * 6;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;

  // Second hand (6 degrees per second, adjusted for milliseconds for smoothness)
  const secondIncrement = (milliseconds / 1000) * 6; // Smooth movement using milliseconds
  totalSecondDegrees += secondIncrement; // Add smooth increment to the total degrees
  secondHand.style.transform = `translate(-50%, -100%) rotate(${totalSecondDegrees}deg)`;
}

// Function to format the date as 'Fri, 06 Dec 2024'
function formatDate(date) {
  const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
  
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const day = date.toLocaleDateString('en-US', { day: '2-digit' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });

  return `${weekday}, ${day} ${month} ${year}`;
}

const now = new Date('2024-12-06');
console.log(formatDate(now)); // Outputs: Fri, 06 Dec 2024





// Function to format the time as '10:30:45 AM'
function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).toUpperCase(); // Converts 'am'/'pm' to uppercase
}

// Function to update current date and time
function updateDateTime() {
  const now = new Date();
  currentDateDisplay.textContent = formatDate(now);
  currentTimeDisplay.textContent = formatTime(now);
}

// Update clock and current date/time every second
setInterval(() => {
  updateClock();
  updateDateTime();
}, 1000);

// Initialize the clock and date/time immediately
updateClock();
updateDateTime();
