# 📝 YourBlog - Modern Blogging Platform

A full-stack blogging platform built with Next.js 16, featuring a rich text editor, user authentication, and a clean, modern UI. Create, edit, and publish your stories with ease.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.3-2D3748?style=flat-square&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 📖 Content Management
- **Rich Text Editor** - Powered by TipTap with support for:
  - Bold, italic, and text formatting
  - Headings and paragraphs
  - Placeholder text
  - Real-time JSON content storage
- **Draft System** - Save work in progress and publish when ready
- **Blog Publishing** - Advanced publish flow with:
  - Title customization
  - Short descriptions
  - Tags management
  - Public/Private visibility controls

### 🔐 Authentication & Security
- User registration and login
- Secure password hashing with bcrypt
- JWT-based session management
- Protected routes with middleware
- Session verification (DAL - Data Access Layer)

### 👤 User Features
- Personal blog dashboard
- User profile management
- Blog ownership verification
- Favorites and likes system
- Comment on blogs

### 🎨 UI/UX
- Modern, responsive design
- Built with Radix UI components
- Custom menubar and navigation
- Tailwind CSS v4 for styling
- Lucide React icons
- Dark mode support (via CSS variables)

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16.1](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Library**: [React 19.2](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Component Library**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Rich Text Editor**: [TipTap](https://tiptap.dev/)

### Backend
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Supabase)
- **ORM**: [Prisma 7.3](https://www.prisma.io/)
- **Database Adapters**: 
  - `@prisma/adapter-neon`
  - `@prisma/adapter-pg`
- **Authentication**: 
  - [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for JWT tokens

### Development Tools
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linting**: ESLint with Next.js config
- **Type Safety**: TypeScript with strict mode

## 📁 Project Structure

```
blogs/
├── app/
│   ├── (Auth)/           # Authentication pages
│   │   ├── signin/       # Sign in page
│   │   └── signup/       # Sign up page
│   ├── (dashboard)/      # Dashboard pages
│   │   ├── about/        # About page
│   │   └── page.tsx      # Dashboard home
│   ├── actions/          # Server actions
│   │   └── blog.ts       # Blog-related actions
│   ├── api/              # API routes
│   ├── create/           # Blog creation
│   │   ├── e/[blogId]/   # Edit blog by ID
│   │   └── new-story/    # Create new blog
│   ├── publish/          # Blog publishing
│   │   └── [blogId]/     # Publish specific blog
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ui/              # Reusable UI components
│   └── web/             # Web-specific components
├── lib/
│   ├── dal.ts           # Data Access Layer (session verification)
│   ├── db.ts            # Prisma client instance
│   └── session.ts       # Session management utilities
├── prisma/
│   └── schema.prisma    # Database schema
├── repository/
│   └── blogRepo.ts      # Blog repository pattern
└── services/            # Business logic services
```

## 🗄️ Database Schema

### User Model
- User authentication and profile
- Relationships: blogs, comments, favorites, likes

### Blog Model
- Blog content (JSON and HTML)
- Draft/Published status
- Author relationship
- Engagement metrics (likes, favorites, comments)

### Comment Model
- Blog comments
- Author relationship
- Like system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or Supabase account)
- pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Piyush6949/Blogs.git
   cd blogs
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   SECRET_KEY="your-secret-key-here"
   ```

4. **Generate Prisma Client**
   ```bash
   pnpm prisma generate
   ```

5. **Run database migrations**
   ```bash
   pnpm prisma migrate dev
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `SECRET_KEY` | JWT secret key for authentication | ✅ |

## 🎯 Key Features Implementation

### Server Actions
The project uses Next.js Server Actions for data mutations:
- `save()` - Save blog draft
- `edit()` - Edit existing blog
- `publish()` - Publish blog with metadata
- `getContent()` - Fetch blog with authorization

### Session Management
- Encrypted session cookies
- JWT token-based authentication
- Session verification middleware
- Protected route guards

### Rich Text Editor
- TipTap editor with custom extensions
- JSON content storage
- Extensible formatting options
- Real-time preview

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


Built with ❤️ using Next.js 16 and modern web technologies
