import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { createResources } from '../src/lib/actions/resources';

async function textParser() {
    try {
        const testPDF = "./public/test.pdf";

        const pdfLoader = new PDFLoader(testPDF);
        const docs = await pdfLoader.load();

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 200,
            chunkOverlap: 20
        });

        const allSplits = await splitter.splitDocuments(docs);

        const dbResult = await createResources(
            allSplits.map((doc) => ({
                content: doc.pageContent,
                source: doc.metadata.source,
            }))
        );

        console.log(" status:", dbResult,)
    } catch (error) {
        console.error(error)
    }
}

textParser()