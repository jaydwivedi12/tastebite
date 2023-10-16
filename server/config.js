let CLIENT_URI;
const env = process.env.NODE_ENV;

if (env === "development") {
  CLIENT_URI = 'http://localhost:3000';
} else {
  CLIENT_URI = 'https://tastebite-jay.vercel.app';
}

export default CLIENT_URI;
