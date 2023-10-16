const SERVER_URI = process.env.NODE_ENV === 'prod' ? 
'https://tastebite-backend.vercel.app' : 'http://localhost:8080'

export default SERVER_URI;