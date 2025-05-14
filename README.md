# GT^Search

**GT^Search** is a semantic search engine tailored for Georgia Tech resources. Built with React, Vite, and Chakra UI, it leverages the Google Custom Search API to help students and researchers quickly find relevant content across GT-affiliated domains.

## Features

* 🔍 **Semantic Search UI**: Sleek, responsive interface for entering and viewing search results.
* 📈 **Usage Stats**: Tracks daily search limits with automatic 24-hour reset.
* 🌗 **Dark Mode First**: Fully themed with Chakra UI, optimized for dark mode.
* ⚙️ **Google Custom Search API**: Powered by Google’s CSE for robust and fast search results.

## Tech Stack

* React + Vite
* Chakra UI
* React Router
* Google Custom Search API
* ESLint + Prettier for code quality

## Getting Started

### Prerequisites

* Node.js and npm
* Google Custom Search API Key and Search Engine ID

### Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/gt-search.git
   cd gt-search
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your API credentials:

   ```
   VITE_GOOGLE_API_KEY=your_api_key
   VITE_SEARCH_ENGINE_ID=your_cx_id
   ```

4. Run the app:

   ```bash
   npm run dev
   ```

## Folder Structure

* `src/`

  * `components/`: Reusable UI components like SearchBar and SearchResult.
  * `pages/`: Main pages (Home, Results).
  * `context/`: Search context with state management and API logic.
  * `theme/`: Custom Chakra UI theming.

## License

MIT
