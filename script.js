// Shared behavior for all pages.

document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();
  initBMIForm();
  initStepTracker();
});

function setActiveNavLink() {
  const currentPage = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });
}

function initBMIForm() {
  const form = document.getElementById("bmiForm");
  if (!form) {
    return;
  }

  const resultText = document.getElementById("bmiResult");
  const categoryText = document.getElementById("bmiCategory");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const heightCm = Number(document.getElementById("height").value);
    const weightKg = Number(document.getElementById("weight").value);

    if (!heightCm || !weightKg) {
      resultText.textContent = "Please enter valid height and weight values.";
      categoryText.textContent = "";
      return;
    }

    const heightMeters = heightCm / 100;
    const bmi = weightKg / (heightMeters * heightMeters);
    const roundedBmi = bmi.toFixed(1);

    let category = "Normal weight";
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 25) {
      category = "Normal weight";
    } else if (bmi < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    resultText.textContent = `Your BMI is ${roundedBmi}.`;
    categoryText.textContent = `Category: ${category}`;
  });
}

function initStepTracker() {
  const trackerSection = document.getElementById("stepTrackerSection");
  if (!trackerSection) {
    return;
  }

  const stepsValue = document.getElementById("stepsCount");
  const caloriesValue = document.getElementById("caloriesBurned");
  const progressFill = document.getElementById("stepsProgress");
  const permissionButton = document.getElementById("motionButton");
  const statusText = document.getElementById("motionStatus");
  const goalValue = 10000;

  // Tracking state is controlled by one boolean so the button can toggle on and off.
  let isTracking = false;
  // These values help us estimate step changes from motion spikes.
  let steps = 0;
  let lastStepTime = 0;
  let filteredMagnitude = 0;

  const updateDisplay = () => {
    stepsValue.textContent = steps;
    caloriesValue.textContent = (steps * 0.04).toFixed(2);
    const progress = Math.min((steps / goalValue) * 100, 100);
    progressFill.style.width = `${progress}%`;
  };

  const handleMotion = (event) => {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) {
      return;
    }

    const magnitude = Math.sqrt(
      acceleration.x * acceleration.x +
        acceleration.y * acceleration.y +
        acceleration.z * acceleration.z
    );

    filteredMagnitude = filteredMagnitude * 0.8 + magnitude * 0.2;
    const motionSpike = Math.abs(magnitude - filteredMagnitude);
    const now = Date.now();

    // Count a step when motion crosses the threshold and enough time has passed.
    if (motionSpike > 1.8 && now - lastStepTime > 350) {
      steps += 1;
      lastStepTime = now;
      updateDisplay();
    }
  };

  const updateButtonState = () => {
    permissionButton.textContent = isTracking ? "Stop Tracking" : "Start Tracking";
  };

  const startTracking = () => {
    if (isTracking) {
      return;
    }

    window.addEventListener("devicemotion", handleMotion);
    isTracking = true;
    updateButtonState();
    statusText.textContent = "Motion tracking is active.";
  };

  const stopTracking = () => {
    if (!isTracking) {
      return;
    }

    window.removeEventListener("devicemotion", handleMotion);
    isTracking = false;
    updateButtonState();
    statusText.textContent = "Motion tracking is stopped.";
  };

  const requestPermission = async () => {
    if (isTracking) {
      stopTracking();
      return;
    }

    if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
      try {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission === "granted") {
          startTracking();
        } else {
          statusText.textContent = "Motion permission was denied.";
        }
      } catch (error) {
        statusText.textContent = "Unable to request motion permission.";
      }
      return;
    }

    startTracking();
  };

  updateDisplay();
  updateButtonState();

  if (permissionButton) {
    permissionButton.addEventListener("click", requestPermission);
  }

  if (window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission !== "function") {
    statusText.textContent = "Tap the button to start step tracking.";
  } else {
    statusText.textContent = "Mobile devices may ask for motion permission.";
  }
}