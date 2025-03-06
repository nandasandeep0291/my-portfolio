import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

const previewClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN!,
  host: 'preview.contentful.com',
});

export const getPosts = async (page: number, perPage: number) => {
  try {
    const skip = (page - 1) * perPage;
    const response = await client.getEntries({
      content_type: 'blog',
      limit: perPage,
      skip: skip,
      order: '-sys.createdAt',
    });
    return response;
  } catch (error) {
    console.error('Contentful Error:', error);
    throw error;
  }
};

export const getPreviewPosts = async () => {
  try {
    const response = await previewClient.getEntries({
      content_type: 'blog',
      order: '-sys.createdAt',
    });
    return response;
  } catch (error) {
    console.error('Contentful Preview Error:', error);
    throw error;
  }
};

export default client;
