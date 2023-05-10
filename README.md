# StoreOfExperience 
An application to store all your life experiences at one place. You can visit your life experiences at any time and re-live your memories. 

### Programming Language: 
1. Backend: JavaScript, TypeScript
2. Database: PostgreSQL
3. Frontend: HTML5, CSS3, React, JavaScript, TypeScript
4. Microservice: Flask (Python)

### SETUP
(All commands are with respect to the root directory of the project)
> Clone repository
> Copy and configure .env file (cp backend/.env.example backend/.env)
> Install dependencies (cd backend/ && pnpm install)
> Start database (docker compose up postgres)
> Reset prior Typeorm setup (cd backend/ && pnpm typeorm:drop)
> Migrate database (cd backend/ && pnpm migration:run)
> Seed Database (cd backend/ && pnpm seed)
> Test backend ( cd backend/ && pnpm test)
> Start backend (cd backend/ && pnpm dev)

