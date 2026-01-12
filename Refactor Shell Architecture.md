# Refactor Shell Architecture

## Todo List & Implementation Plan

This document outlines the plan to refactor the shell architecture, synthesized from the conversation history.

### 1. Core Architecture & Packages
- [ ] **Rename Packages**:
    - `@patriksui-core` -> `@patriksui-shell`
    - `@patriksui-types` -> `@patriksui-shell-types`
- [ ] **Create New Packages**:
    - `@patriksui-apps`: Non-essential apps (Notes, Calendar, Photos, Music).
    - `@patriksui-apps-types`: Type definitions for apps.
    - `@patriksui-desktop`: Entry point app showcasing the desktop variant.
    - `@patriksui-docs`: Entry point app for documentation.
- [ ] **Configuration**:
    - Ensure strict separation of type definitions.
    - Fix the root `dev` script to run all apps in parallel.

### 2. Shell Component & Routing
- [ ] **Shell Component**:
    - Support variants: `app`, `desktop`, `page`, `window`, `sidebar`.
    - Props: `headerContent`, `footerContent`, `mainContent` (overrides), `title`, `wallpaper`.
- [ ] **ShellItem Component**:
    - Props: `title`, `variant` (`page`, `sidebar`, `app`), `icon`.
    - **Routing Logic**:
        - `page` items -> Navbar/Header.
        - `sidebar` items -> Sidebar.
        - `app` items -> Desktop Icons.
        - **Nested Routing**: Support nesting `ShellItem` (e.g., sidebar items inside page items).

### 3. Desktop Variant (MacOS Style)
- [ ] **Window Manager**:
    - Draggable windows with proper controls (Min/Max/Close).
    - Double-click header to maximize/restore.
    - Performance optimization (fix lag).
- [ ] **Dock**:
    - MacOS style, magnification, pinned apps.
    - Hide/Show toggle.
- [ ] **Desktop Icons**:
    - Draggable with grid snapping.
    - Use Lucide icons.
- [ ] **System Features**:
    - **Popup Search**: Cmd+Space shortcut.
    - **Settings App**: Controls library config.
    - **Control Panel**: Quick settings in footer.
    - **Dark Mode**: Automatic detection + Switcher.

### 4. App Variant (iOS Style)
- [ ] **Styling**: Apple Liquid Glass / SwiftUI aesthetics.
- [ ] **Layout**: Grid of apps.

### 5. Documentation
- [ ] **JSDocs**: Add to all library components.
- [ ] **Docs App**: Sidebar layout dynamically displaying documentation structure.

### 6. Cleanup & Polishing
- [ ] Clean up artifacts.
- [ ] Apply "Liquid Glass" styling globally.

---

## Technical Details

### Dependencies
- TypeScript
- React Context
- LocalStorage (for theme/settings)
- Framer Motion (animations)
- Lucide React (icons)

### Implementation Steps
1.  **Refactor Core**: Rename packages and set up workspace.
2.  **Implement Shell**: Update `Shell` and `ShellItem` logic.
3.  **Enhance Desktop**: Fix window manager and implement dock/icons.
4.  **Create Apps**: Setup `@patriksui-apps` and implemented basic apps.
5.  **Setup Entry Points**: Create `@patriksui-desktop` and `@patriksui-docs` apps.
6.  **Verify**: Ensure all features work as requested.

### User Input History
(Synthesized above)