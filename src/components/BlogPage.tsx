import { FC, useState, useEffect } from 'react';
import { ArrowRight, Search, Twitter, ChevronLeft, ChevronRight } from 'lucide-react';
import contentfulClient, { getPosts, getPreviewPosts } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import BlogPostDetail from './BlogPostDetail';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';


const POSTS_PER_PAGE = 6;

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

const BlogPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = isPreview
          ? await getPreviewPosts()
          : await getPosts(currentPage, POSTS_PER_PAGE);

        const formattedPosts = response.items.map((item: any) => ({
          id: item.sys.id,
          title: item.fields.title,
          subTitle: item.fields.subTitle,
          date: item.sys.createdAt,
          displayDate: new Date(item.sys.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          preview: item.fields.preview,
          content: item.fields.content,
          readTime: item.fields.readTime,
          category: item.fields.category,
          images:
            item.fields.images?.map((image: any) => ({
              url: image.fields?.file?.url,
              title: image.fields?.title,
              description: image.fields?.description,
            })) || [],
        }));

        setPosts(formattedPosts);
        setTotalPages(Math.ceil(response.total / POSTS_PER_PAGE));
      } catch (err) {
        setError('Failed to fetch blog posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, isPreview]);

  const filteredAndSortedPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.subTitle &&
          post.subTitle.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Search and Sort Section */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {!loading && (
            <p className="text-gray-600 mb-6">
              Found {filteredAndSortedPosts.length} post
              {filteredAndSortedPosts.length === 1 ? '' : 's'}
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
  <div className="flex items-center justify-center min-h-[400px] bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
    <LoadingSpinner />
  </div>
)}

{error && (
  <div className="flex flex-col items-center justify-center min-h-[400px] bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
    <div className="text-red-600 mb-4 text-lg font-medium">{error}</div>
    <button 
      onClick={() => window.location.reload()}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
    >
      Try Again
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  </div>
)}

        {/* Blog Content */}
        {!loading && !error && (
          <div className="space-y-12">
            {/* Latest Posts Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredAndSortedPosts.slice(0, 2).map((post) => (
                  <div 
                    key={post.id}
                    className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {post.images && post.images.length > 0 && (
                      <img 
                        src={post.images[0].url}
                        alt={post.images[0].title || post.title}
                        className="w-full h-56 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">{post.displayDate}</span>
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                      </div>
                      <span className="inline-block mb-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.preview}</p>
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                      >
                        Read More <ArrowRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Posts List */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Posts</h2>
              <div className="space-y-4">
                {filteredAndSortedPosts.slice(2).map((post) => (
                  <div
                    key={post.id}
                    className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-6 flex flex-col md:flex-row gap-4">
                      {post.images && post.images.length > 0 && (
                        <div className="md:w-48 flex-shrink-0">
                          <img
                            src={post.images[0].url}
                            alt={post.images[0].title || post.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-start mb-2">
                          <div>
                            <span className="inline-block mb-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {post.category}
                            </span>
                            <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-4">
                            <span>{post.displayDate}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{post.preview}</p>
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                        >
                          Read More <ArrowRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Blog Post Detail Modal */}
      {selectedPost && (
        <BlogPostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default BlogPage;
