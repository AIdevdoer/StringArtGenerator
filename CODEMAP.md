# CODEMAP

StringArtGenerator
- **Frontend** (`index.html`, `style.css`, `opencv.js`, `ndarray.js`)
  - Upload image → square crop & grayscale
  - `NonBlockingCalculatePins` → generate evenly spaced pin coordinates
  - `NonBlockingPrecalculateLines` → cache all possible line paths
  - `NonBlockingLineCalculator` → iteratively choose best next pin and draw on canvas
  - Export: line sequence shown in textarea; canvas can be saved as PNG/SVG
- **Backend** (`main.go`)
  - `importPictureAndGetPixelArray` → read image into pixel array
  - `calculatePinCoords` → compute pin positions on circle
  - `precalculateAllPotentialLines` → precompute line coordinates
  - `calculateLines` → pick line sequence by maximizing error reduction
- **Data Flow**
  - Image → Pixel array → Pin coordinates → Line cache → Line sequence → Canvas/SVG/PNG output
