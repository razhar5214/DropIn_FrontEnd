const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

server.get("/me", async (req, res) => {
    res.status(200)
    res.json(req.user)
})

server.post("/api/v1/auth/google", async (req, res) => {
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload();    
    const user = await db.user.upsert({ 
        where: { email: email },
        update: { name, picture },
        create: { name, email, picture }
    })
    req.session.userId = user.id
    res.status(201)
    res.json(user)
})

server.use(async (req, res, next) => {
    const user = await db.user.findFirst({where: { id:  req.session.userId }})
    req.user = user
    next()
})

server.delete("/api/v1/auth/logout", async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
})