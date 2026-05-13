This is a [Next.js](https://nextjs.org/) product management application with Tailwind CSS and MySQL database integration.

## Project Setup

### Prerequisites
- Node.js 16+ or higher
- npm or yarn
- MySQL database running
- Cloudinary account for image uploads

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MYSQL_HOST=your_mysql_host
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_PORT=3306
MYSQL_DATABASE=your_database_name

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

Run the SQL schema to create the products table:

```bash
mysql -u your_user -p your_database_name < database/db.sql
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the production bundle
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint checks

## Security Improvements (May 2026)

### Recent Updates:
- ✅ Updated Axios to latest version (fixed 19 critical vulnerabilities)
- ✅ Updated Cloudinary SDK (fixed arbitrary argument injection)
- ✅ Fixed SSL certificate validation in MySQL connections
- ✅ Added input validation for all API endpoints
- ✅ Added file size and type validation for image uploads (max 5MB)
- ✅ Improved error handling and response consistency
- ✅ Added client-side form validation with better UX
- ✅ Fixed Tailwind CSS configuration for App Router

### API Changes:
All API endpoints now return consistent JSON responses with success flag and data field.

**Old format:**
```json
{ "name": "Product Name", "price": 100 }
```

**New format:**
```json
{ "success": true, "data": { "id": 1, "name": "Product Name", "price": 100 }, "message": "Product created successfully" }
```

## Features

- 📦 Create, read, update, and delete products
- 🖼️ Image upload via Cloudinary
- 🎨 Tailwind CSS for styling
- 🗄️ MySQL database integration
- 🔒 Input validation and security measures
- 📱 Responsive design

## Project Structure

```
Concept-Store/
├── src/
│   ├── app/
│   │   ├── api/                 # API routes
│   │   │   ├── products/        # Product endpoints
│   │   │   └── time/
│   │   ├── products/            # Product pages
│   │   ├── new/                 # Create product page
│   │   ├── layout.jsx
│   │   ├── page.jsx             # Home page
│   │   └── globals.css
│   ├── components/              # React components
│   │   ├── ProductForm.jsx
│   │   ├── ProductCard.jsx
│   │   └── Navbar.jsx
│   └── libs/                    # Utilities
│       ├── mysql.js             # DB connection
│       ├── cloudinary.js        # Image upload
│       └── processImage.js      # Image processing
├── database/
│   └── db.sql                   # Database schema
├── public/
├── package.json
└── tailwind.config.js
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can specify a different port:
```bash
npm run dev -- -p 3001
```

### Database Connection Error
- Verify MySQL server is running
- Check `.env.local` credentials
- Ensure database exists and schema is imported

### Image Upload Issues
- Verify Cloudinary credentials in `.env.local`
- Check image file size (max 5MB)
- Ensure image format is supported (JPEG, PNG, WebP, GIF)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
