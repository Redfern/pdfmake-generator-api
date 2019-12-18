import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import generatePdf from './generator';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/v1/generate-pdf', (req, res) => {
    const docDefinition = req.body;

    generatePdf(docDefinition, response => res.send(response)); // sends a base64 encoded string to client
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`); // eslint-disable-line
});