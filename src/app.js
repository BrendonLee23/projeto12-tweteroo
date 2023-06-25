import express from "express";
import cors from "cors";

const loginInfos = [];
const arrayTweets = [];
const lastArray = [];

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

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body

    /*     const userExists = loginInfos.some(user => user.username === username); */

    if (loginInfos.includes(username)) {
        arrayTweets.push(
            {
                username: username,
                tweet: tweet
            }
        )
        res.send('OK');
    } else {
        res.send('UNAUTHORIZED');
    }
})

app.get('/tweets', (req, res) => {
    const { tweet } = req.body;
    lastArray.push(
        [
            {
                username: tweet.username,
                avatar: tweet.avatar,
                tweet: tweet.tweet
            }
        ]
    )

    if (lastArray.length > 10) {
        // a função slice retorna os últimos 10 elementos
        const lastTenTweets = lastArray.slice(-10);
        res.json(lastTenTweets);
    } else if(lastArray.length < 10){
        // Caso tenha menos de 10 elementos, retorne o lastArray completo
        res.json(lastArray);
    } else{
        res.json([])
    }
})

const PORT = 5000
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`))