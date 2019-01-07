import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pdfMakePrinter from 'pdfmake/src/printer';

const fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

const app = express();
app.use(cors());
app.use(bodyParser.json())

app.post('/v1/generate-pdf', (req, res) => {
    const docDefinition = req.body;

    generatePdf(docDefinition, (response) => res.send(response)); // sends a base64 encoded string to client
});

const generatePdf = (docDefinition, callback) => {
    try {
      const printer = new pdfMakePrinter(fonts);
      const doc = printer.createPdfKitDocument(docDefinition);
      
      let chunks = [];
  
      doc.on('data', (chunk) => {
        chunks.push(chunk);
      });
    
      doc.on('end', () => {
        const result = Buffer.concat(chunks);
        callback('data:application/pdf;base64,' + result.toString('base64'));
      });
      
      doc.end();
      
    } catch(err) {
      throw(err);
    }
};

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});