import express from 'express';
import messagesRouter from './messages';


const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use('/messages', messagesRouter);


app.get('/', (req, res) => {
    res.send('Welcome to the Messages API!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
