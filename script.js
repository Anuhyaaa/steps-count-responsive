// Shared behavior for all pages.

document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();
  initMobileNavMenu();
  initHomePersonalization();
  initBMIForm();
  initStepTracker();
  initNutritionImages();
});

function setActiveNavLink() {
  const currentPage = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });
}

function initMobileNavMenu() {
  const toggleButton = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggleButton || !navLinks) {
    return;
  }

  const closeMenu = () => {
    navLinks.classList.remove("is-open");
    toggleButton.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    navLinks.classList.add("is-open");
    toggleButton.setAttribute("aria-expanded", "true");
  };

  // On mobile, the button toggles the vertical menu open and closed.
  toggleButton.addEventListener("click", () => {
    if (navLinks.classList.contains("is-open")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  // Clicking a menu item should close the menu so the page feels tidy on mobile.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Reset the mobile state when the layout grows back to desktop width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

function initHomePersonalization() {
  if (document.body.dataset.page !== "home") {
    return;
  }

  const storageKey = "fitstepUserName";
  const namePrompt = document.getElementById("namePrompt");
  const welcomeState = document.getElementById("welcomeState");
  const userNameInput = document.getElementById("userName");
  const saveNameButton = document.getElementById("saveNameButton");
  const changeNameButton = document.getElementById("changeNameButton");
  const displayName = document.getElementById("displayName");

  if (!namePrompt || !welcomeState || !userNameInput || !saveNameButton || !changeNameButton || !displayName) {
    return;
  }

  // Show either the input form or the saved greeting based on localStorage.
  const renderNameState = () => {
    const savedName = localStorage.getItem(storageKey);

    if (savedName) {
      displayName.textContent = savedName;
      namePrompt.hidden = true;
      welcomeState.hidden = false;
      return;
    }

    userNameInput.value = "";
    namePrompt.hidden = false;
    welcomeState.hidden = true;
    userNameInput.focus();
  };

  // Save the user's name so it is available after reloads.
  const saveName = () => {
    const enteredName = userNameInput.value.trim();

    if (!enteredName) {
      userNameInput.focus();
      return;
    }

    localStorage.setItem(storageKey, enteredName);
    renderNameState();
  };

  // Remove the saved name so the input field appears again.
  const clearName = () => {
    localStorage.removeItem(storageKey);
    renderNameState();
  };

  saveNameButton.addEventListener("click", saveName);
  changeNameButton.addEventListener("click", clearName);

  userNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveName();
    }
  });

  renderNameState();
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

function initNutritionImages() {
  const nutritionImages = document.querySelectorAll(".nutrition-card img");
  if (!nutritionImages.length) {
    return;
  }

  // Hide broken or unavailable images so the card stays clean and aligned.
  const hideBrokenImage = (image) => {
    const card = image.closest(".nutrition-card");
    image.hidden = true;
    image.removeAttribute("src");
    image.classList.add("is-hidden-image");
    if (card) {
      card.classList.add("no-image");
    }
  };

  nutritionImages.forEach((image) => {
    if (!image.getAttribute("src")) {
      hideBrokenImage(image);
      return;
    }

    if (image.complete && image.naturalWidth === 0) {
      hideBrokenImage(image);
      return;
    }

    image.addEventListener("error", () => {
      hideBrokenImage(image);
    });
  });
}