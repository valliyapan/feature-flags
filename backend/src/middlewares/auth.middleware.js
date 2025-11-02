export default function authenticate(req, res, next) {
    const API_KEY = 'testkey' // usually will be part of .env vars
    const key = req.headers['x-api-key']

    if (!key || key !== API_KEY) return res.status(401).json({message: 'Invalid API Key'})
    next()
}