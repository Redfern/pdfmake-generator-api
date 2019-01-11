import generatePdf from './generator';

it('should return a pdf from ', () => {
    const definition = {
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
    };

    const result = 'data:application/pdf;base64,JVBERi0xLjMKJf////';

    generatePdf(definition, response => expect(response).toContain(result));
});