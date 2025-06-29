# ScriptSentry - AI-Powered Contract Analyzer

## Overview

ScriptSentry is a full-stack web application that provides AI-powered contract analysis for freelancers and creators. The application allows users to upload contracts (PDF or DOCX) and receive plain-English summaries, red-flagged clauses identification, and risk assessment scoring.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with custom configuration
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development**: Hot reload with Vite middleware integration

## Key Components

### Frontend Components
1. **FileUploader**: Handles drag-and-drop and click-to-upload functionality
2. **SummaryBox**: Displays plain-English contract summaries
3. **FlaggedClausesList**: Shows identified problematic clauses with risk levels
4. **RiskScoreDial**: Visual risk assessment with circular progress indicator
5. **LoadingOverlay**: Progress tracking during AI analysis
6. **Header/Footer**: Navigation and branding components

### Backend Infrastructure
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Route Registration**: Modular route organization with Express
- **Vite Integration**: Development server with HMR support
- **Error Handling**: Centralized error middleware

### Database Schema
- **Users Table**: Basic user management with username/password
- **Schema Validation**: Zod integration with Drizzle for type safety

## Data Flow

1. **File Upload**: User uploads contract via drag-and-drop or file picker
2. **Processing**: Simulated AI analysis with progress tracking
3. **Analysis Results**: Display of summary, flagged clauses, and risk score
4. **Export**: PDF export functionality for analysis results

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **@radix-ui/***: Comprehensive UI component primitives
- **@tanstack/react-query**: Server state management
- **drizzle-orm & drizzle-kit**: Type-safe database ORM
- **express**: Backend web framework
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **typescript**: Type safety across the stack
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations in `./migrations` directory

### Environment Configuration
- **Development**: `NODE_ENV=development` with Vite dev server
- **Production**: `NODE_ENV=production` with built assets
- **Database**: `DATABASE_URL` environment variable required

### Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server startup
- `npm run db:push`: Database schema synchronization

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

Recent Changes:
- June 28, 2025: Enhanced UI with luxury legal-tech design improvements
  - Added Lora serif font for headings to create professional legal feel
  - Enhanced Risk Score Dial with contextual messaging and improved visual design
  - Added privacy assurance messaging to file uploader
  - Implemented staggered animations for results display
  - Enhanced typography hierarchy with font-legal class
  - Added hover states and transition effects for cards
  - Improved recommendations section with bullet styling
  - Added colorblind-friendly icons for risk levels

## Changelog

Changelog:
- June 28, 2025. Initial setup and luxury UI enhancements