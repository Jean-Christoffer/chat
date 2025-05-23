import { sql } from 'drizzle-orm';
import {
    index,
    text,
    varchar,
    timestamp,
    pgTable,
    vector,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { nanoid } from '@/lib/utils';

export const resources = pgTable(
    'resources',
    {
        id: varchar('id', { length: 191 })
            .primaryKey()
            .$defaultFn(() => nanoid()),
        createdAt: timestamp('created_at')
            .notNull()
            .default(sql`now()`),

        updatedAt: timestamp('updated_at')
            .notNull()
            .default(sql`now()`),

        content: text('content').notNull(),
        source: text('source').notNull(),
        embedding: vector('embedding', { dimensions: 1536 }).notNull(),
    },
    (table) => [
        {
            embeddingIndex: index('embeddingIndex').using(
                'hnsw',
                table.embedding.op('vector_cosine_ops')
            ),
        },
    ]
);

// Schema for resources - used to validate API requests
export const insertResourceSchema = createSelectSchema(resources)
    .extend({})
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        embedding: true,
    });

// Type for resources - used to type API request params and within Components
export type NewResourceParams = z.infer<typeof insertResourceSchema>;