Run `docker compose up` in the root of the project to run the application. The app will be available at [localhost:5173](localhost:5173). The port can be changed in the .env file.

To run manually:

```
cd backend
cp .env.example .env       // initialize .env file
docker compose up -d       // run postgres container
npm install                // install dependencies
npx prisma generate        // prisma ORM
npm run start:migrate:dev
```

In new terminal:

```
cd frontend
npm install
npm run dev
```

The app will be available at: http://localhost:5173/
