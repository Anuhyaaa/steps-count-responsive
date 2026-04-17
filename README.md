# 🏃 FitStep - Responsive Fitness Website

A complete fitness tracking website built with HTML, CSS, and JavaScript, featuring full responsive design for mobile, tablet, and desktop devices.

![Project Status](https://img.shields.io/badge/status-complete-success)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

## 🌟 Live Demo

Visit the live website: [FitStep Demo](https://anuhyaaa.github.io/steps-count-responsive/)

## 📋 Project Overview

FitStep is a comprehensive fitness tracking website that helps users monitor their health and fitness activities. The project demonstrates modern responsive web design principles and works seamlessly across all devices.

## ✨ Features

### 🏃 Step Tracker
- Uses device motion sensor to track steps
- Real-time calorie calculation
- Progress bar showing daily goal achievement
- Interactive start/stop functionality

### 📊 BMI Calculator
- Instant BMI calculation
- Health category classification
- User-friendly input forms
- Responsive design

### 🥗 Nutrition Guide
- Healthy food suggestions with images
- Categorized meal ideas (Fruits, Vegetables, Proteins)
- Balanced diet tips
- Visual card-based layout

### 💪 Workout Plans
- 6 different workout types
- Difficulty levels and duration
- Exercise descriptions
- Icon-based visual design

### 📈 Progress Tracking
- Weekly summary statistics
- Daily goal tracking with progress bars
- Achievement badges
- Visual progress indicators

### 💡 Health Tips
- 12 practical health tips
- Easy-to-read card format
- Covers hydration, sleep, exercise, nutrition, and more

### ℹ️ About Page
- Fitness benefits information
- Health education content
- Clean, informative layout

## 🎨 Pages

1. **Home** - Hero section with personalized greeting
2. **Step Tracker** - Motion-based step counting
3. **BMI Calculator** - Body Mass Index calculator
4. **Nutrition** - Food and meal guides
5. **Workouts** - Exercise plans and routines
6. **Progress** - Fitness tracking dashboard
7. **Tips** - Health and wellness advice
8. **About** - Project and fitness information

## 📱 Responsive Design

### Mobile (≤768px)
- Single column layout
- Hamburger menu navigation
- Full-width buttons
- Optimized font sizes
- Touch-friendly interface

### Tablet (768px - 1024px)
- 2-3 column grid layouts
- Horizontal navigation
- Balanced spacing
- Optimized for touch and mouse

### Desktop (>1024px)
- 3-4 column grid layouts
- Full navigation bar
- Hover effects
- Maximum content visibility

## 🛠️ Technologies Used

- **HTML5** - Semantic markup, forms, navigation
- **CSS3** - Grid, Flexbox, media queries, animations
- **JavaScript** - DOM manipulation, Device Motion API, localStorage
- **Python** - PowerPoint generation (python-pptx)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)
- Python 3.x (for presentation generation)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Anuhyaaa/steps-count-responsive.git
```

2. Navigate to the project directory
```bash
cd steps-count-responsive
```

3. Open `index.html` in your browser
```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

### Generate PowerPoint Presentation

1. Install python-pptx
```bash
pip install python-pptx
```

2. Run the script
```bash
python3 create_presentation.py
```

3. Open `FitStep_Presentation.pptx`

## 📂 Project Structure

```
steps-count-responsive/
├── index.html              # Home page
├── step-tracker.html       # Step tracking page
├── bmi.html               # BMI calculator page
├── nutrition.html         # Nutrition guide page
├── workouts.html          # Workout plans page
├── progress.html          # Progress tracking page
├── tips.html              # Health tips page
├── about.html             # About page
├── styles.css             # Main stylesheet (responsive)
├── script.js              # JavaScript functionality
├── create_presentation.py # PowerPoint generator
├── FitStep_Presentation.pptx # Generated presentation
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## 💻 Key Code Features

### Responsive CSS
```css
/* Mobile First Approach */
.feature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Mobile Navigation
```javascript
// Hamburger menu toggle
toggleButton.addEventListener("click", () => {
  if (navLinks.classList.contains("is-open")) {
    navLinks.classList.remove("is-open");
  } else {
    navLinks.classList.add("is-open");
  }
});
```

### Step Tracking
```javascript
// Device motion detection
window.addEventListener("devicemotion", (event) => {
  const acceleration = event.accelerationIncludingGravity;
  // Calculate steps based on motion patterns
});
```

## 🎯 Learning Outcomes

This project demonstrates:
- ✅ Responsive web design principles
- ✅ CSS Grid and Flexbox layouts
- ✅ Media queries and breakpoints
- ✅ Mobile-first development approach
- ✅ JavaScript DOM manipulation
- ✅ Device Motion API usage
- ✅ localStorage for data persistence
- ✅ Clean, semantic HTML structure
- ✅ Cross-browser compatibility
- ✅ Accessibility best practices

## 🧪 Testing

The website has been tested on:
- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Edge (Desktop)
- ✅ Various screen sizes (375px - 1920px)

## 📊 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Anuhya Valluri**
- GitHub: [@Anuhyaaa](https://github.com/Anuhyaaa)
- Project: [FitStep](https://github.com/Anuhyaaa/steps-count-responsive)

## 🙏 Acknowledgments

- Unsplash for nutrition images
- Google Fonts (Poppins)
- MDN Web Docs for documentation
- Web development community for inspiration

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for learning responsive web design**

⭐ Star this repository if you found it helpful!
