# NodeJS api to create and return pdf

This is a simple api I wrote in node to create a PDF using pdfmake and post the results back to the client in base64 format.

## How to use

First run `npm install` to download the packages.

Then run `npm start` to run the api, this will fire the api up on http://localhost:5001, this runs with nodemon to support hot reloading.

To start without hot reloading run `npm run start:production`.

## What is pdfmake?

Pdfmake is a pdf generating package purely wrote in javascript, this can be used directly on the client side, or on the server like this via node.

One large reason to render this on the server is because the pdfmake package is over 2MB overall and can harm client side performance, I originally used it this way and I was getting a performance report of 2/100 because of it in lighthouse.

## Endpoints

There is only one endpoint of `/v1/generate-pdf`, this is a POST endpoint and accepts a JSON object body (noted below).

## Posting data for the PDF

You need to post the endpoint /v1/generate-pdf the object pdfmake requires

e.g.

```
{
    content: [
        {
            text: 'this is the title of the pdf',
            style: 'header'
        }
    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            alignment: 'center'
        }
    }
}
```

You can learn more about these at http://pdfmake.org/

## Rendering the PDF on the client side

An example of how to display this PDF in e.g. javascript / react would be:

```
import axios from 'axios';
import download from 'downloadjs'

const definition = {
    content: [
        text: 'this is the title of the pdf',
        style: 'header'
    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true,
            alignment: center
        }
    }
}

axios.post('http://localhost:5001/v1/generate-pdf', definition)
    .then(function (response) {
        const content = response.headers['content-type'];
        download(response.data, 'file.pdf', content)
    })
    .catch(function (error) {
        console.log(error)
    })
```

There will be many ways this could be done, this is just a was I have used it in react.