# Spendly

Spendly - Simplify your spending, maximize your savings with the help of AI.

## Running Locally

> [!NOTE]  
> This project uses [npm] only as a package manager.

1. Clone the repository:

```bash
git clone https://github.com/isonikrish/Spendly
```

2. Navigate to the project directory:

```bash
cd Spendly
```

3. Create a .env file:

   - Copy `.env.example` and rename it to `.env`.

   - Give it your DB connection link and Gemini API KEY

4. Install dependencies:

```bash
npm install
```

5. Run database migrations:

```bash
npx prisma migrate dev --name Initialize the schema
```

6. Generate prisma client

```bash
npx prisma generate
```

7. Start the development server:

```bash
npm run dev
```

## Usage

1. Access the application in your browser:

```bash
http://localhost:3000
```

2. Login using any of the following provided user credentials:

- Email: `testuser@example.com`, Password: `123456`

## Contributors

<a href="https://github.com/isonikrish/Spendly/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=isonikrish/Spendly" />
</a>
