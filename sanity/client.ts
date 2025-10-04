import { createClient } from 'next-sanity';
import { config } from './config';

export const sanityClient = createClient(config);

export async function getBlogPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    }
  }`;
  
  return sanityClient.fetch(query);
}

export async function getBlogPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    }
  }`;
  
  return sanityClient.fetch(query, { slug });
}
