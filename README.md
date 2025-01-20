# AI Agent Assistant 🤖

Your AI companion that goes beyond chat - powered by IBM WxTools & cutting-edge LLMs to help you get things done.

<details>
<summary>Table of Contents</summary>

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

</details>

## Features

- 🧠 Intelligent task completion with advanced AI understanding
- ⚡ Real-time assistance for coding, research, and problem-solving
- 🚀 Lightning-fast responses powered by state-of-the-art LLMs
- 🎨 Modern UI with dark/light mode support
- 🔒 Secure authentication via Clerk

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React Framework
- [Clerk](https://clerk.com/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [IBM WxTools](https://ibm.com/wxtools) - AI Backend
- [Lucide Icons](https://lucide.dev/) - Icons
- [Convex](https:convex.dev) - Backend

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/edwardbudaza/agentor.git
cd agentor
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables (see section below)

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
CLERK_SECRET_KEY=sk_xxx
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# IBM WxTools
IBM_API_KEY=your_api_key
IBM_API_URL=your_api_url

# Database
CONVEX_DEPLOYMENT=dev:{your-convex-url}

NEXT_PUBLIC_CONVEX_URL=https://{your-convex-url}.convex.cloud
```

## Usage

1. Visit `http://localhost:3000`
2. Sign up or log in using Clerk authentication
3. Access the AI assistant from your dashboard
4. Start interacting with the AI to complete tasks

## Development

The project follows a standard Next.js structure:

```
agentor/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── dashboard/
├── components/
├── lib/
├── public/
└── styles/
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
