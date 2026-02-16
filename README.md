# Interactive Turkey Map - React Native

A production-ready, interactive Turkey Map component built with React Native, featuring smooth animations and city selection functionality.

## Features

✨ **Interactive City Selection** - Tap any city to toggle selection
🎨 **Smooth Color Transitions** - Animated color changes using react-native-reanimated
📱 **Fully Responsive** - Adapts to all screen sizes using SVG viewBox
🗺️ **81 Cities Support** - Complete coverage of all Turkish provinces
🔄 **Reset Functionality** - Clear all selections with one tap
📊 **Selection Counter** - Real-time display of selected cities
🎯 **Visual Feedback** - Toast notifications and city chips

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **react-native-svg** - SVG rendering for the map
- **react-native-reanimated** - Smooth 60fps animations
- **lucide-react-native** - Beautiful icons
- **Expo** - Development and build tooling

## Installation

All dependencies are already installed. Just run:

```bash
npm start
```

Then press:
- `a` for Android
- `i` for iOS
- `w` for Web

## Project Structure

```
map/
├── components/
│   └── TurkeyMap.js          # Main interactive map component
├── constants/
│   └── turkeyPaths.js        # SVG path data for all 81 cities
├── App.js                     # Root component
└── package.json
```

## Component Architecture

### TurkeyMap.js
- **State Management**: Uses `useState` for selected cities tracking
- **Animation**: Individual `CityPath` components with color interpolation
- **Interaction**: Touch handlers for city selection/deselection
- **UI Elements**: Header, map, selected cities list, reset button

### turkeyPaths.js
- Array of 81 city objects
- Each contains: `id` (plate code), `name`, `d` (SVG path)

## Customization

### Colors
Edit the color constants in `TurkeyMap.js`:
```javascript
const idleColor = '#D1D5DB';      // Unselected city color
const selectedColor = '#22C55E';   // Selected city color
```

### Animation Duration
Adjust the timing in the `useEffect`:
```javascript
colorProgress.value = withTiming(isSelected ? 1 : 0, { duration: 300 });
```

### ViewBox Dimensions
Modify the SVG viewBox to match your path data:
```javascript
<Svg viewBox="0 0 1000 500">
```

## Adding Complete City Data

The `turkeyPaths.js` file currently contains placeholder data for 10 cities. To add all 81 cities:

1. Obtain accurate SVG path data from:
   - Turkey GeoJSON files (convert to SVG)
   - Open-source Turkey map SVG files
   - Government geographic data portals

2. Replace the placeholder paths with real data:
```javascript
{
  id: '01',
  name: 'Adana',
  d: 'M520,380 L540,375...' // Your actual path data
}
```

3. Ensure all paths fit within the viewBox (0 0 1000 500)

## Clean Architecture Principles

✅ **Separation of Concerns** - Data, UI, and logic are separated
✅ **Reusable Components** - `CityPath` is isolated and reusable
✅ **Single Responsibility** - Each component has one clear purpose
✅ **Maintainability** - Easy to update colors, animations, or data

## Performance Optimizations

- Animated components use `useSharedValue` for 60fps animations
- Color interpolation happens on the UI thread
- Minimal re-renders with proper state management
- ScrollView for handling large city lists

## License

MIT

## Notes

This is a demonstration project. For production use, ensure you have:
- Accurate SVG path data for all 81 Turkish cities
- Proper scaling and positioning of city boundaries
- Testing on multiple device sizes
- Accessibility features (labels, screen reader support)
