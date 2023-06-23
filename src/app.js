import express from "express";
import cors from "cors";

const loginInfos=[];

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', (req, res) => {
    console.log(req.body)
    const { username, avatar } = req.body
    loginInfos.push(
        {
            username: username,
            avatar: avatar
        }
    )

    res.send("OK")
})

app.get('/tweets', (req, res) => {
    const tweets = []
    res.send(loginInfos)
})

const PORT = 5000
app.listen(PORT, ()=> console.log(`O servidor está rodando na porta ${PORT}`))
