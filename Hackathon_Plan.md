# 🚀 15-Hour Hackathon Execution Plan: Project ANCHOR

With 15 hours left, parallel execution without merge conflicts is critical. This plan splits the work into two distinct streams. By separating the **UI/Design System** from the **Feature Logic & Pages**, both of you can work simultaneously in different directories. 

## 🎨 The Aesthetic: "Feel Good" Glassmorphism
To maintain a consistent glassmorphism vibe across the app, you will rely on a shared CSS architecture. 
- **Core principles**: Translucent backgrounds (`rgba(255, 255, 255, 0.1)`), background blur (`backdrop-filter: blur(10px)`), subtle white borders, and soft shadows.
- **Ambiance**: Vibrant, warm gradient backgrounds (e.g., sunset colors or deep oceanic blues/purples) behind the glass elements to make them pop.

---

## 🧑‍💻 Work Split (No Merge Conflicts)

### 🔴 Developer A: The "Glass" Architect (UI/UX & Layout)
**Focus**: You are responsible for how the app looks and feels. You will build the foundational glass components and the overall layout skeleton. 
**Your Sandbox** (Do not edit files outside these):
- `src/components/ui/` (Buttons, Cards, Inputs)
- `src/layouts/` (Navbar, Sidebar, Main wrapper)
- `src/styles/` or `src/index.css` (Global CSS, Animations, Gradients)

**Tasks (Hours 1-5):**
1. Setup the global animated gradient background in `index.css`.
2. Build reusable glassmorphism components:
   - `GlassCard.jsx`
   - `GlassButton.jsx`
   - `GlassInput.jsx`
3. Build the main layout wrapper (`MainLayout.jsx`) with a glass Navbar.

**Tasks (Hours 6-12):**
1. Add micro-animations (framer-motion or CSS transitions) for hover states.
2. Refine the typography (use a clean font like Inter or Outfit) and spacing.
3. Assist Developer B by styling the pages they are building.

---

### 🔵 Developer B: The Engine (Pages, Routing & Logic)
**Focus**: You are responsible for what the app does. You will build the pages, handle routing, and implement the core hackathon idea logic/API integrations.
**Your Sandbox** (Do not edit files outside these):
- `src/pages/` (Home, Dashboard, etc.)
- `src/features/` (Specific business logic)
- `src/App.jsx` & `src/main.jsx` (Routing setup)
- `src/services/` (API calls, Mock Data)

**Tasks (Hours 1-5):**
1. Setup React Router in `App.jsx`.
2. Create dummy page files in `src/pages/` (e.g., `Home.jsx`, `Dashboard.jsx`).
3. Import Developer A's `MainLayout` to wrap your routes. *Communication checkpoint here.*

**Tasks (Hours 6-12):**
1. Build out the core functionality of the idea using placeholder UI or importing Developer A's components (e.g., `<GlassCard>`).
2. Integrate any APIs, Firebase, or backend services.
3. Manage state (React Context or Zustand).

---

## 🤝 Rules of Engagement to AVOID Merge Conflicts

1. **The "App.jsx" Rule**: Developer B owns `App.jsx`. Developer A should NOT touch it. If Developer A needs to test a layout, do it inside a component or ask Developer B to mount it.
2. **Strict Folder Boundaries**: 
   - Developer A lives in `src/components/` and `src/styles/`.
   - Developer B lives in `src/pages/` and `src/services/`.
3. **Component Contract**: Developer A builds `<GlassCard title="..." />`. Developer B uses it in `Home.jsx`. If Developer B needs a new prop, they ask Developer A to add it, rather than modifying the component themselves.
4. **Git Workflow**:
   - Dev A branch: `feature/design-system`
   - Dev B branch: `feature/core-logic`
   - Merge into `main` every 3 hours. Since you are touching different files, Git will auto-merge seamlessly.

## 🏁 The Final 3 Hours (Hours 12-15)
- **Code Freeze**: Stop building new features.
- **Integration**: Bring Dev A's final polished components into Dev B's logic pages.
- **Bug Squashing**: Fix state issues, routing bugs, and broken UI.
- **Pitch Prep**: Record a flawless 2-minute demo video. Do not rely on live demos if the app is fragile!
