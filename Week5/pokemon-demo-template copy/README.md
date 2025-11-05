# Pokédex React App – Project Guide

Welcome to the Pokédex React App! This project will help you practice modern React concepts, including component-based architecture, routing, context for theming, and API integration. You'll start with the provided template and build out a fully functional Pokédex, similar to the completed version in `pokemon-demo-solution`.

---

## Project Purpose

The goal of this project is to create a responsive Pokédex web application using React and Material UI (MUI). Users will be able to browse a list of Pokémon, view details for each Pokémon, and toggle between light and dark themes. This project will help you learn:

- How to structure a React app with reusable components
- How to use React Router for navigation
- How to manage global state with React Context
- How to fetch and display data from an external API (PokéAPI)
- How to apply theming with Material UI

---

## Project Structure and File Overview

Here's a breakdown of the key files and their roles:

### Root Files

- **App.js**: The main application component. Sets up routing, theming, and the navigation bar.
- **index.js**: Entry point for the React app. Wraps the app in the theme context provider and router.

### `components/` Directory

- **PokemonList.js**: Displays a list of Pokémon fetched from the PokéAPI.
- **PokemonCard.js**: Represents a single Pokémon in the list, showing its name and image. Clicking it navigates to the detail page.
- **PokemonDetail.js**: Shows detailed information about a selected Pokémon, including stats and abilities.

### `context/` Directory

- **ThemeContext.js**: Provides a context for toggling between light and dark themes using Material UI's theming system.

---

## How Routing Works

The app uses [React Router](https://reactrouter.com/) for navigation:

- `/` – The home route displays the full list of Pokémon.
- `/:name` – The detail route displays information for the Pokémon with the given name.

Navigation is handled by the `<Routes>` and `<Route>` components in `App.js`. The navigation bar at the top allows users to return to the home page and toggle the theme.

---

## Steps to Complete the Project

Follow these steps to transform the template into a fully functional Pokédex:

### 1. **Implement Routing**

- In `App.js`, set up routes for the home page (`/`) and the Pokémon detail page (`/:name`).
- Use the navigation bar to allow users to return home and toggle the theme.

### 2. **Build the Pokémon List**

- In `components/PokemonList.js`, fetch the list of Pokémon from the PokéAPI (`https://pokeapi.co/api/v2/pokemon?limit=...`).
- Store the list in state and render a `PokemonCard` for each Pokémon.

### 3. **Create the Pokémon Card Component**

- In `components/PokemonCard.js`, display the Pokémon's name and image.
- Make the card clickable, navigating to the detail page for that Pokémon using React Router's `<Link>`.

### 4. **Build the Pokémon Detail Page**

- In `components/PokemonDetail.js`, use the route parameter to fetch detailed data for the selected Pokémon from the PokéAPI.
- Display the Pokémon's image, stats, types, and abilities in a visually appealing way.

### 5. **Apply Theming and Styling**

- Use Material UI components for layout and styling.
- Ensure the theme toggle works throughout the app, updating colors and backgrounds as appropriate.

### 6. **Polish and Test**

- Make sure navigation works smoothly between the list and detail pages.
- Test the theme toggle and ensure all components respond to theme changes.
- Check responsiveness and visual consistency.

---

## Tips

- Use React hooks (`useState`, `useEffect`, `useContext`) for state and side effects.
- Refer to the [Material UI documentation](https://mui.com/) for component usage and theming.
- Use the PokéAPI documentation for details on available endpoints and data structure.

---