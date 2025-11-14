# Narrative Canvas Platform

An AI-powered story generation engine with visual story organization and AI-assisted prose generation.

## Project Setup - Story 1.1 ✓ Complete

### Tech Stack

- **Frontend:** React 19.2+ with TypeScript 5.9+
- **Build Tool:** Vite 7.2+
- **Styling:** Tailwind CSS 4.0
- **Backend:** Convex (serverless backend)
- **AI Provider:** OpenRouter API (Claude 3.5 Sonnet)

### Getting Started

#### Installation

```bash
npm install
```

#### Development - Local IDE

Run both the Vite dev server and Convex backend:

```bash
# Terminal 1: Vite dev server (Hot reload on port 5173)
npm run dev

# Terminal 2: Convex backend (in another terminal)
npm run convex:dev
```

Then open http://localhost:5173

#### Development - Cloud IDE (Claude Code)

For cloud IDE development, use preview deployments:

```bash
# First deploy your Convex backend
npx convex deploy --preview

# This gives you a public URL to use in development
# Update VITE_CONVEX_URL in .env.local with the preview URL

# Then start Vite
npm run dev
```

Access the application through the port forwarding URL provided by Claude Code.

#### Building for Production

```bash
npm run build
npm run preview
```

### Project Structure

```
├── src/
│   ├── main.tsx           # React entry point
│   ├── App.tsx            # Root component
│   ├── index.css          # Tailwind CSS
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   └── types/             # TypeScript type definitions
├── convex/
│   ├── schema.ts          # Convex database schema
│   ├── example.ts         # Example mutations and queries
│   └── actions/           # AI generation actions (Story 4.x)
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── tailwind.config.ts     # Tailwind CSS configuration
```

### Next Stories

- **Story 1.2:** Define Convex Database Schema
- **Story 1.3:** Configure OpenRouter API Integration
- **Story 1.4:** Implement TOON Parser Utility
- **Story 1.5:** Set Up shadcn/ui Component Library

### Convex Documentation

- [Convex Getting Started](https://docs.convex.dev/getting-started)
- [React Integration](https://docs.convex.dev/react)
- [Queries and Mutations](https://docs.convex.dev/database/queries)
- [Actions](https://docs.convex.dev/functions/actions)

### Architecture References

See `/docs` directory for:

- `PRD.md` - Product requirements
- `architecture.md` - Technical architecture decisions
- `epics.md` - Feature breakdown
