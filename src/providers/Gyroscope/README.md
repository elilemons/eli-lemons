# Gyroscope Provider

A React context provider that encapsulates device orientation (gyroscope) functionality for interactive UI effects.

## Features

- Device orientation tracking with gyroscope
- Permission handling for iOS 13+ devices
- Fallback to mouse movement for desktop devices
- Position data normalization and clamping
- Simple React hook API

## Usage

### Provider Setup

The GyroscopeProvider is already integrated in the application's provider tree. If you need to use it separately, you can wrap your components like this:

```jsx
import { GyroscopeProvider } from '../providers/Gyroscope'

const App = () => (
  <GyroscopeProvider>
    <YourComponent />
  </GyroscopeProvider>
)
```

### Using the Hook

In any component that needs access to gyroscope data:

```jsx
import { useGyroscope } from '../providers/Gyroscope'

const YourComponent = () => {
  const { isSupported, isEnabled, position, requestPermission } = useGyroscope()

  // Use position.x and position.y to create interactive effects
  // position values range from -40 to 40 by default (percentage)

  return (
    <div>
      {!isEnabled && isSupported && <button onClick={requestPermission}>Enable Gyroscope</button>}

      <div
        style={{
          transform: `translate(${position.x}%, ${position.y}%)`,
        }}
      >
        This element will move with device tilt or mouse movement
      </div>
    </div>
  )
}
```

### Demo Component

A ready-to-use demo component is available:

```jsx
import { GyroscopeDemo } from '../components/Gyroscope'

const YourPage = () => (
  <div>
    <h1>Gyroscope Demo</h1>
    <GyroscopeDemo className="custom-class" />
  </div>
)
```

## API Reference

### GyroscopeProvider Props

| Prop      | Type      | Default  | Description                           |
| --------- | --------- | -------- | ------------------------------------- |
| children  | ReactNode | required | Child components                      |
| maxOffset | number    | 40       | Maximum percentage offset from center |

### useGyroscope Hook Return Value

| Property          | Type                     | Description                              |
| ----------------- | ------------------------ | ---------------------------------------- |
| isSupported       | boolean                  | Whether the device supports gyroscope    |
| isEnabled         | boolean                  | Whether gyroscope is currently enabled   |
| position          | { x: number, y: number } | Current position values (percentage)     |
| requestPermission | () => void               | Function to request gyroscope permission |
