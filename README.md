# CineSearch | Movie Explorer

A production-grade movie explorer application built with **Next.js 16 (React 19)** and **TypeScript**, leveraging the TMDB API to provide a seamless browsing experience.

##  Getting Started

### Prerequisites

- Node.js 18+ 
- A TMDB API Key (Get one [here](https://www.themoviedb.org/documentation/api))

### Local Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd checkit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   TMDB_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

---

##  Architecture Decisions

### Feature-Based Folder Structure
The project follows a **Feature-Based** architecture (found in `src/features/`). This structure was chosen over a flat `components/` or `hooks/` folder for several reasons:

- **Scalability**: As the app grows, grouping logic by domain (e.g., `movies`, `search`) becomes much easier to maintain than grouping by technical type.
- **Encapsulation**: Components, hooks, and types related to the movie grid are co-located, making it easier to understand dependencies at a glance.
- **Reduced Cognitive Load**: Developers can focus on a single feature area without navigating through unrelated files in global folders.

---

##  Tech Stack

- **Framework**: Next.js 15/16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: TMDB (The Movie Database)
- **Testing**: Vitest & React Testing Library

---

## Performance Optimizations

1. **`next/image` Priority Loading**: 
   Images in the Initial viewport (top 8 results) are loaded with the `priority` attribute. This optimizes the **Largest Contentful Paint (LCP)** by skipping the standard lazy-loading queue for above-the-fold content.
   
2. **ISR Caching & Data Fetching**:
   We utilize Next.js's data fetching with `revalidate: 3600`. This ensures that movie lists are cached for an hour, significantly reducing load times for subsequent visitors while maintaining fresh data.

3. **URL-Driven State**:
   All search queries, years, and pagination states are stored directly in the URL parameters. This allows for **Zero-effort Shareability** and ensures that the browser back/forward buttons work as expected without manual state management.

---

##  Trade-offs & Technical Challenges

### Pagination vs. Infinite Scroll
We chose **Pagination** over Infinite Scroll for two primary reasons:
- **SEO & Indexing**: Each page has a unique URL, making it crawlable by search engines and easier for users to bookmark specific results.
- **Shareability & Predictability**: Users can share a link to "Page 3" of results and see exactly what they expect. Infinite scroll often loses state when navigating back, leading to a frustrating user experience.

### Year-Based Filtering
Unlike genre filtering, which often requires manual processing, TMDB natively supports filtering by release year via the `primary_release_year` parameter.
- **Precision**: By using the native API parameter, we ensure that the entire movie database is filtered correctly (not just the current page of results).
- **Synergy**: This native support allows the Year Filter to work seamlessly in combination with the search query for highly refined results.

---

## Testing

The project includes a suite of unit tests for core interactive components:

```bash
npm run test
```

- **SearchInput**: Verifies URL persistence and input handling.
- **SafeImage**: Validates fallback UIs and loading states.
