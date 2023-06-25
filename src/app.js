import express from "express";
import cors from "cors";

const loginInfos = [];
const arrayTweets = [];

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

    if (loginInfos.find(info => info.username === username)) {
        arrayTweets.unshift(
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

    const novoArray = arrayTweets.map(tweetObj => {
        const { username, tweet } = tweetObj;
        const { avatar } = loginInfos.find(info => info.username === username);

        return {
            username,
            avatar,
            tweet
        };
    });


    if (novoArray.length > 10) {
        // a função slice retorna os últimos 10 elementos
        const lastTenTweets = novoArray.slice(-10);
        res.json(lastTenTweets);
    } else if (novoArray.length < 10) {
        // Caso tenha menos de 10 elementos, retorne o novoArray completo
        res.json(novoArray);
    } else {
        res.json([])
    }
})

const PORT = 5000
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`))