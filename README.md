# CSV Uploader & Data Listing

> [!NOTE]
> A react, test-less, dev version was made [here](https://github.com/necr0z/STETA), before the request for a Svelte version.

This full-stack application allows you to upload a CSV file, store the data in a PostgreSQL database, and view/search the results in a SvelteKit UI. It includes:

### Explanation:
- **`backend/`** → Node+Express+Prisma code for CSV upload & data routes.
- **`frontend/`** → SvelteKit (TypeScript) for the UI, using Tailwind + shadcn-svelte components.
- **`docker-compose.yml`** → Orchestrates containers for Postgres, backend, and frontend.

## **1. Local Setup**

### Requirements
- Node.js (>=18)
- PostgreSQL (local) or Docker for your DB

### Steps

1. **Clone** this repo.
2. **Backend**  
   ```bash
   cd backend
   npm install
   # create or edit .env if needed, e.g. DATABASE_URL
   npx prisma migrate dev
   npm run dev
   # Backend on http://localhost:3000
3. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   # Frontend on http://localhost:5173
4. **Usage**
   
   Visit http://localhost:5173
   
   Upload CSV → Data is stored in Postgres → You can view and search results

## 2. Running Tests

### Backend Tests
```bash
cd backend
npm run test
# Runs Jest + Supertest
```

### Frontend Tests
```bash
cd frontend
npm run test
# Runs Vitest + @testing-library
```

---

## 3. Docker Compose

To spin up **Postgres, backend, and frontend** containers:

```bash
docker-compose build
docker-compose up
```

- **Postgres** on `localhost:5432`
- **Backend** on `localhost:3000`
- **Frontend** on `localhost:4173` 

---

## 4. Project Structure

```plaintext
my-csv-app/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── server.ts
│   │   ├── routes/
│   │   │   ├── csvUpload.ts
│   │   │   ├── dataRoutes.ts
│   │   ├── tests/
│   │   │   ├── csvUpload.test.ts
│   │   │   ├── dataRoutes.test.ts
│   ├── tsconfig.json
│   ├── .env (if applicable)
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── svelte.config.js
    ├── vite.config.ts
    ├── src/
    │   ├── routes/
    │   │   ├── +layout.svelte
    │   │   ├── +page.svelte
    │   │   ├── page.test.ts
    │   ├── lib/
    │   │   ├── components/
    │   │   │   ├── ui/
    │   │   │   │   ├── button/
    │   │   │   │   │   ├── button.svelte
    │   │   │   │   ├── input/
    │   │   │   │   │   ├── input.svelte
    │   │   │   │   │   ├── text-input.svelte
    │   │   │   │   ├── table/
    │   │   │   │   │   ├── table.svelte
    │   ├── tests/
    │   │   ├── text-input.test.ts
    │   │   ├── page.test.ts

```

---

## 5. Future Enhancements

Here are potential improvements to **increase reliability and usability**:

- **Improve CSV Validation**  
  Ensure CSV files have correct headers and valid data before processing.

- **Comprehensive Unit Testing**  
  Expand frontend & backend test coverage for edge cases.

- **Robust Error Handling**  
  Display better error messages when CSV uploads fail or API calls break.

- **Enhanced Pagination & Sorting**  
  Allow sorting by name, email, etc., and load more than just next/prev pages.

- **Production Deployment**  
  Deploy via **Nginx + Docker** or **Vercel** (for frontend) and **Railway/Fly.io** (for backend).

