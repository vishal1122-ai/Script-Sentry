# ScriptSentry - Project Structure

## 📁 Organized Folder Architecture

```
scriptsentry/
├── 📁 client/                    # Frontend React Application
│   ├── 📁 src/
│   │   ├── 📁 components/        # Reusable UI Components
│   │   │   ├── 📁 ui/           # shadcn/ui base components
│   │   │   ├── FileUploader.tsx  # Contract upload component
│   │   │   ├── SummaryBox.tsx    # Contract summary display
│   │   │   ├── FlaggedClausesList.tsx # Risk clause identification
│   │   │   ├── RiskScoreDial.tsx # Visual risk assessment
│   │   │   ├── LoadingOverlay.tsx # Analysis progress overlay
│   │   │   ├── Header.tsx        # Navigation header
│   │   │   └── Footer.tsx        # Site footer
│   │   ├── 📁 pages/            # Page Components
│   │   │   ├── home.tsx         # Main landing/analysis page
│   │   │   └── not-found.tsx    # 404 error page
│   │   ├── 📁 lib/              # Utilities & Configuration
│   │   │   ├── queryClient.ts   # TanStack Query setup
│   │   │   └── utils.ts         # Helper functions
│   │   ├── 📁 hooks/            # Custom React Hooks
│   │   │   ├── use-mobile.tsx   # Mobile detection
│   │   │   └── use-toast.ts     # Toast notifications
│   │   ├── App.tsx              # Main app component
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles & variables
│   └── index.html               # HTML template
├── 📁 server/                   # Backend Express Server
│   ├── index.ts                 # Server entry point
│   ├── routes.ts                # API route definitions
│   ├── storage.ts               # Data storage interface
│   └── vite.ts                  # Vite dev server integration
├── 📁 shared/                   # Shared Types & Schemas
│   └── schema.ts                # Database & validation schemas
├── 📁 attached_assets/          # User-provided assets
├── 📄 Configuration Files
│   ├── package.json             # Dependencies & scripts
│   ├── tsconfig.json            # TypeScript configuration
│   ├── tailwind.config.ts       # Tailwind CSS setup
│   ├── vite.config.ts           # Vite build configuration
│   ├── postcss.config.js        # PostCSS processing
│   ├── components.json          # shadcn/ui component config
│   ├── drizzle.config.ts        # Database ORM configuration
│   ├── .gitignore               # Git ignore patterns
│   ├── .env.example             # Environment variables template
│   ├── README.md                # Project documentation
│   ├── FOLDER_STRUCTURE.md      # This file
│   └── replit.md                # Project context & preferences
```

## 🏗️ Architecture Principles

### Frontend Organization
- **Components**: Modular, reusable UI components with single responsibility
- **Pages**: Route-specific components that compose multiple components
- **Lib**: Shared utilities, configurations, and helper functions
- **Hooks**: Custom React hooks for reusable stateful logic

### Backend Organization
- **Clean separation**: Express server with modular route handling
- **Storage abstraction**: Interface-based storage for easy database switching
- **Type safety**: Full TypeScript coverage with shared schemas

### Styling Architecture
- **Global styles**: CSS variables and base styles in `index.css`
- **Component styles**: Tailwind CSS utility classes
- **Design system**: shadcn/ui components with consistent theming
- **Typography**: Inter (body) + Lora (headings) for professional feel

### Configuration Management
- **Environment**: Template-based `.env` setup with examples
- **Build tools**: Optimized Vite configuration for development and production
- **Type checking**: Strict TypeScript configuration
- **Database**: Drizzle ORM with PostgreSQL schema definitions

## 🚀 Development Workflow

1. **Start Development**: `npm run dev` (starts both frontend and backend)
2. **Component Development**: Create in `client/src/components/`
3. **Page Development**: Add to `client/src/pages/` and register in `App.tsx`
4. **API Development**: Add routes in `server/routes.ts`
5. **Database Changes**: Update `shared/schema.ts` and run `npm run db:push`

## 📦 Production Ready

- ✅ Complete `.gitignore` for security
- ✅ Environment template with no sensitive data
- ✅ Comprehensive documentation
- ✅ Type-safe architecture
- ✅ Production build scripts
- ✅ Clean folder organization
- ✅ No hardcoded secrets or endpoints