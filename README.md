This is a [Next.js](https://nextjs.org/) product management application with Tailwind CSS. 

> **Note**: This project can run in DEMO mode (without database) or with MySQL database connection.

## Quick Start

### Prerequisites
- Node.js 16+
- npm

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

3. **Run the project:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Configuration

### DEMO Mode (Default - No Database Required)
```env
DEMO_MODE=true
```

Run the project with demo data. Perfect for testing and deployment without a database.

### Database Mode
To connect to a MySQL database:

1. Set in `.env.local`:
   ```env
   DEMO_MODE=false
   MYSQL_HOST=your_host
   MYSQL_USER=your_user
   MYSQL_PASSWORD=your_password
   MYSQL_PORT=3306
   MYSQL_DATABASE=concept_store
   ```

2. Setup database:
   ```bash
   mysql -u your_user -p your_database_name < database/db.sql
   ```

3. Restart the server

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- 📦 Create, read, update, and delete products
- 🎨 Tailwind CSS styling
- ✅ Input validation on all endpoints
- 🔒 Security improvements (Axios, Cloudinary, SSL)
- 📱 Responsive design
- 🔄 Works with or without database

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   ├── products/         # Product pages
│   ├── new/              # Create product page
│   └── layout.jsx        # Root layout
├── components/           # React components
├── libs/                 # Utilities & database
├── data/                 # Demo data (when DEMO_MODE=true)
```

## Demo Data

When `DEMO_MODE=true`, the application uses sample products from `src/data/demo.js`. Changes are not persisted.

**Note**: In demo mode, Create/Update/Delete operations appear to work but don't save data.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `npm run dev -- -p 3001` |
| Module not found | `npm install` |
| Can't connect to MySQL | Verify `.env.local` credentials and MySQL is running |
| DEMO mode not working | Check `DEMO_MODE=true` in `.env.local` |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MySQL Node.js Driver](https://github.com/sidorares/node-mysql2)

## Deploy

The easiest way to deploy is [Vercel](https://vercel.com):

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Works with DEMO_MODE for instant deployment without database setup.
