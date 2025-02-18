
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { createResources } from '../src/lib/actions/resources';

export async function textParser(file: File) {
    try {

        const buffer = await file.arrayBuffer();
        const pdfLoader = new WebPDFLoader(new Blob([buffer], { type: file.type }));
        const docs = await pdfLoader.load();

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 200,
            chunkOverlap: 20
        });

        const allSplits = await splitter.splitDocuments(docs);

        await createResources(
            allSplits.map((doc) => {
                return {
                    content: doc.pageContent,
                    source: doc.metadata?.source || file.name,
                };
            })
        );

        const successMessage = "Upload successful! Document added to the knowledge base."

        return successMessage

    } catch (error) {
        const errorMessage = "Something went wrong, please try again later"

        console.error(error)

        return errorMessage

    }
}
