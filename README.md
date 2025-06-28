# ScriptSentry

![ScriptSentry Logo](https://img.shields.io/badge/ScriptSentry-AI%20Contract%20Analyzer-blue)

**AI-Powered Contract Safety for Freelancers & Creators**

ScriptSentry is a modern web application that helps freelancers and creators analyze contracts using AI technology. Upload your contract and get instant risk assessment, plain-English summaries, and identification of potentially problematic clauses.

## ✨ Features

- **📄 Smart Contract Analysis** - AI-powered analysis of PDF and DOCX contracts
- **🎯 Risk Assessment** - Visual risk scoring from 1-10 with contextual feedback
- **📋 Plain-English Summaries** - Complex legal language translated to everyday terms
- **🚩 Red-Flagged Clauses** - Identification of potentially problematic contract terms
- **💡 Expert Recommendations** - Actionable advice for contract negotiation
- **🔒 Privacy First** - Files are never stored or shared
- **📱 Responsive Design** - Works seamlessly on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/scriptsentry.git
cd scriptsentry
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

## 🏗️ Project Structure

```
scriptsentry/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/          # Utilities and configurations
│   │   └── hooks/        # Custom React hooks
│   └── index.html        # Main HTML template
├── server/                # Backend Express server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   └── storage.ts        # Data storage interface
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database and validation schemas
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **TanStack Query** - Server state management
- **Wouter** - Lightweight routing
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL** - Production database (via Neon)

### UI/UX
- **Inter & Lora Fonts** - Professional typography
- **Lucide Icons** - Beautiful, consistent icons
- **Framer Motion Ready** - Animation capabilities
- **Dark Mode Support** - Built-in theme switching

## 🎨 Design Philosophy

ScriptSentry follows a luxury legal-tech aesthetic inspired by Linear and Stripe Docs:

- **Typography**: Inter for body text, Lora serif for headings (legal feel)
- **Colors**: Navy primary (#1E293B), Sky blue accent (#0284C7)
- **Spacing**: Generous padding and white space
- **Animations**: Subtle, meaningful transitions
- **Trust**: Privacy messaging and professional polish

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Sync database schema

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=development
```

## 🚀 Deployment

The application is optimized for deployment on platforms like:
- Replit Deployments
- Vercel
- Netlify
- Railway
- Heroku

Build the application:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by leading legal-tech platforms
- Designed for freelancer and creator success

---

**Made with ❤️ for the freelance community**