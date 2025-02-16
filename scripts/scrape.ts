

import 'cheerio';
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { createResources } from '../src/lib/actions/resources';
import { db } from '../src/db/index.js';
import { eq } from 'drizzle-orm'
import { resources } from '../src/db/schema/resources.js';

const url = process.argv[2];

async function scrape() {

    try {
        if (!url) {
            console.error('Missing required parameters')
        }

        const ifDataExists = await db
            .select()
            .from(resources)
            .where(eq(resources.source, url));

        if (ifDataExists.length > 0) {
            return console.log('Data already exists for the url')
        }

        const pTagSelector = 'p';

        const cheerioLoader = new CheerioWebBaseLoader(url, { selector: pTagSelector });

        const docs = await cheerioLoader.load();

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 2000, // 1000 characters
            chunkOverlap: 100,
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
scrape()

