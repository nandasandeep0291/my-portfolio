import { FC } from 'react';
import { X, Twitter, Mail } from 'lucide-react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

interface Post {
  id: string;
  title: string;
  subTitle?: string;
  date: string;
  displayDate: string;
  preview: string;
  content: any;
  readTime: string;
  category: string;
  images: {
    url: string;
    title?: string;
    description?: string;
  }[];
}

interface BlogPostDetailProps {
  post: Post;
  onClose: () => void;
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="text-3xl font-bold mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-2xl font-bold mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl font-bold mb-2">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc pl-6 mb-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal pl-6 mb-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
      <li className="mb-2">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a
        href={node.data.uri}
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

const BlogPostDetail: FC<BlogPostDetailProps> = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl">
          <div className="p-8">
            <button
              onClick={onClose}
              className="float-right p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {post.images && post.images.length > 0 && (
              <img
                src={post.images[0].url}
                alt={post.images[0].title || post.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.displayDate}</span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
              {post.subTitle && (
                <h2 className="text-xl text-gray-600 mb-4">{post.subTitle}</h2>
              )}
            </div>

            <div className="prose max-w-none">
              {documentToReactComponents(post.content, richTextOptions)}
            </div>

            {/* Additional images gallery */}
            {post.images && post.images.length > 1 && (
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                {post.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.title || `Image ${index + 2}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            {/* Share section */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Share this post</h3>
              <div className="flex gap-4">
                <button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
                  <Twitter size={20} />
                </button>
                <button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
                  <Mail size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
