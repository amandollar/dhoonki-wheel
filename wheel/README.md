# Shopping Wheel - React Vite App

A beautiful spinning wheel component for a shopping website with five different sections offering various deals and discounts.

## Features

- 🎯 Interactive spinning wheel with 5 sections
- 🎨 Beautiful gradient design with glassmorphism effects
- 🎁 Shopping deals: 50% OFF, Free Shipping, 25% OFF, Buy 1 Get 1, 10% OFF
- ✨ Smooth animations and transitions
- 📱 Responsive design
- 🎪 Result modal with prize display

## Sections

1. **50% OFF** - 🛍️ (Red)
2. **Free Shipping** - 🚚 (Teal)
3. **25% OFF** - 💰 (Blue)
4. **Buy 1 Get 1** - 🎁 (Green)
5. **10% OFF** - 🎯 (Yellow)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- React 18
- Vite
- Styled Components
- CSS3 Animations

## How to Use

1. Click the "SPIN THE WHEEL!" button
2. Watch the wheel spin with realistic physics
3. Wait for the wheel to stop
4. See your prize in the modal
5. Click "Claim Prize" to close the modal

## Customization

You can easily customize the wheel by modifying the `sections` array in `src/components/SpinningWheel.jsx`:

```javascript
const sections = [
  { name: "Your Deal", color: "#YourColor", icon: "🎯" },
  // Add more sections...
]
```

## License

This project is open source and available under the MIT License. 