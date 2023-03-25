// 1. Import utilities from `astro:content`
import {z,  defineCollection } from 'astro:content';
// 2. Define your collection(s)
const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    publishDate: z.string().transform(str => new Date(str)),
    draft: z.boolean().default(true),
    emoji: z.string(),
    description: z.string(),
    //slug: z.string()
  })
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'posts': postsCollection,
};