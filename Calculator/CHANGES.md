# APP3 – Material-UI Migration & Rick and Morty API Integration

## Summary
Replaced the original FonoAPI phone database with the **Rick and Morty API** (characters). The UI shows character cards with images, a preview window with short description, and a full details page. All styling uses Material-UI (light theme). Search works via button click only (Enter key does not submit).

---

## API Replacement

### Old: FonoAPI (phones)
- Unreliable, required token, spotty image availability

### New: Rick and Morty API (characters)
- **Endpoint:** `https://rickandmortyapi.com/api/character`
- **Free, no auth, CORS enabled**
- Each character includes:
  - `name`, `image` (always present), `species`, `type`, `gender`, `status`
  - `origin.name`, `location.name`
  - `episode` array (count)
  - `created` date

> Why this API? Reliable, hundreds of entries, built-in images, no API key, perfect for demos.

---

## New File: `src/api/charactersApi.js`

### Exported Functions
| Function | Purpose |
|----------|---------|
| `searchCharacters(query)` | Search by name, returns up to 4 transformed character objects |
| `getCharacterById(id)` | Get single character by ID (future use) |
| `getRandomCharacters(count)` | Fetch random characters from page 1 (shuffled) for initial view |

### Data Transformation
The raw API response is transformed to a consistent format:

```js
{
  id: 1,
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/...",
  species: "Human",
  type: "",
  gender: "Male",
  status: "Alive",
  origin: "Earth (C-137)",
  location: "Citadel of Ricks",
  episode_count: 32,
  created: "2017-11-04",

  // UI fields:
  description: "Short blurb (species, status, origin)",
  longDescription: "Full paragraph with all details",
  specifications: [ {species}, {gender}, {status}, {origin}, … ],
  features: ["✔ Alive", "⭐ Frequent appearances", …]
}
```

---

## Component Structure

### New Components

#### `ProductCard.jsx`
- **Props:** `character`, `onClick`
- Shows: character image (200px) + name
- Responsive: full-width mobile, 4 per row desktop
- Hover: lift + shadow
- Image fallback on error

#### `ProductPreview.jsx`
- **Props:** `character`, `onMoreInfo`, `onBack`
- Layout: side-by-side (desktop) / stacked (mobile)
- Shows:
  - Character image (left/top)
  - Name (H4)
  - Short description (`character.description`)
  - Chips: species, status (color-coded), gender
  - "More Info" button → FullProductInfo
  - "← Back" button → list view

#### `FullProductInfo.jsx`
- **Props:** `character`, `onBack`
- Shows:
  - Large image (full-width)
  - Name (H3)
  - Long description paragraph
  - "Character Details" Paper with all key-value specs
  - "Notable Traits" chips (if any)
  - "← Back" button (top)

---

### `cards-search.jsx` (APP3)

**State:**
- `searchTerm` – string
- `characters` – array
- `loading` – boolean
- `error` – string | null
- `viewMode` – "list" | "preview" | "full"
- `selectedCharacter` – object | null

**Flow:**
1. **Mount:** `useEffect` calls `getRandomCharacters(4)` → fills grid with 4 random characters.
2. **Search:** User types query → clicks "Search" button → `handleSearchClick`:
   - Sets loading, clears error/selection
   - Calls `searchCharacters(query)`
   - On success: sets characters (max 4) or shows error
3. **Card click:** → `setViewMode("preview")`, stores selected character
4. **Preview:** User can click "More Info" → `setViewMode("full")`
5. **Full Info:** "← Back" returns to preview
6. **Back buttons:** In preview and full views return to previous level

**Key Details:**
- **Search triggers only on button click** – no Enter key submission
- Title: "APP3" top-left, close (×) button top-right
- Error messages shown via MUI `Alert`
- Loading shown via `CircularProgress`

---

## Material-UI Theme (Light)

**File:** `src/theme.js`

```js
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    background: { default: '#ffffff', paper: '#f5f5f5' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: { fontWeight: 600 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiCard: { defaultProps: { elevation: 2 } },
  },
});
```

- Wraps entire app in `App.jsx`
- `CssBaseline` normalizes styles
- No dark mode – all screens light background

---

## Other Apps (Already Migrated)

### APP1 – `basicAdittion.jsx`
- `TextField` for Number 1 & Number 2
- `Button` to calculate sum
- Result displayed below
- `Paper` container with padding
- Back button: "← Back to Menu"

### APP2 – `calculator.jsx`
- 5×4 grid of buttons
- `TextField` display (readOnly)
- Color-coded buttons (warning, error, primary, success)
- Back button: "← Back to Menu"

---

## Responsive Grid

| Screen | Cards per row |
|--------|---------------|
| Mobile (<600px) | 2 (`xs={6}`) |
| Tablet (≥600px) | 2 (`sm={6}`) |
| Desktop (≥900px) | 4 (`md={3}`) |

Preview and Full views stack on mobile, side-by-side on desktop.

---

## Common Pitfalls & Fixes

### 1. MUI not installed
Run: `npm install` (includes `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)

### 2. `Paper` or `IconButton` not imported
Both are now imported in `cards-search.jsx`.

### 3. Rick and Morty API down (rare)
The app shows error Alert. Network issues will also show error.

### 4. Images fail to load
`onError` handler sets placeholder with character name.

---

## File Changes Summary

| File | Change |
|------|--------|
| `package.json` | Added MUI dependencies |
| `src/theme.js` | Created (light MUI theme) |
| `src/api/charactersApi.js` | Created (Rick and Morty service) |
| `src/Components/ProductCard.jsx` | Created (image + name) |
| `src/Components/ProductPreview.jsx` | Created (preview pane) |
| `src/Components/FullProductInfo.jsx` | Created (full details) |
| `src/Components/cards-search.jsx` | Complete rewrite (MUI, new API) |
| `src/Components/basicAdittion.jsx` | MUI styling (unchanged logic) |
| `src/Components/calculator.jsx` | MUI styling (unchanged logic) |
| `src/App.jsx` | Added ThemeProvider wrapper |
| `CHANGES.md` | This document |

---

## How to Run

```bash
cd "Calculadora/Calculator"
npm install
npm run dev
# Open http://localhost:5173
```

---

## Testing Checklist

- [ ] Home page loads with 3 buttons
- [ ] Click APP3 → APP3 screen opens, shows 4 random character cards
- [ ] Search "Rick" → clicking Search button shows Rick Sanchez + other Ricks
- [ ] Click a card → preview opens with image left, info right (desktop) or stacked (mobile)
- [ ] Click "More Info" → full details page with long description and specs list
- [ ] Back buttons work correctly (preview→list, full→preview)
- [ ] Close (×) button returns to home
- [ ] No errors in browser console

---

## Notes

- **No React Router** – navigation uses `viewMode` state (as in original apps).
- **Beginner-friendly code** – simple state, no Redux, no complex hooks.
- **All text in English** – component names, UI labels, comments.
- **Light theme only** – no dark mode.

---

**Last updated:** 2026-04-26
**API Status:** Rick and Morty API (public, maintained)
