import React, { useState } from 'react';
import { Clock, Calendar, ArrowRight, X, BookOpen, Share2, Sparkles } from 'lucide-react';
import { BlogPost, ActivePage } from '../types';
import { BLOG_POSTS } from '../data/mockData';

interface BlogsViewProps {
  onNavigate: (page: ActivePage) => void;
}

export const BlogsView: React.FC<BlogsViewProps> = ({ onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="w-full bg-[#F8F5ED] min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#145C3A] block mb-2">
            The Botanical Journal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1E1E] mb-3">
            Our Latest News & Skincare Guides
          </h1>
          <p className="text-sm text-gray-600">
            Dermatologist tips, ingredient spotlights, and mindful beauty rituals to nourish your natural glow.
          </p>
        </div>

        {/* Featured Post */}
        <div 
          onClick={() => setSelectedPost(BLOG_POSTS[0])}
          className="bg-white rounded-3xl overflow-hidden border border-[#E9DDC8] shadow-sm hover:shadow-md transition-all mb-12 cursor-pointer group grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-7 aspect-16/10 lg:aspect-auto relative overflow-hidden bg-[#FAF8F3]">
            <img
              src={BLOG_POSTS[0].image}
              alt={BLOG_POSTS[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <span className="absolute top-4 left-4 px-3.5 py-1 bg-[#145C3A] text-white rounded-full text-xs font-bold">
              Featured Masterclass
            </span>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{BLOG_POSTS[0].category}</span>
                <span>•</span>
                <span>{BLOG_POSTS[0].readTime}</span>
                <span>•</span>
                <span>{BLOG_POSTS[0].date}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E] group-hover:text-[#145C3A] transition-colors">
                {BLOG_POSTS[0].title}
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                {BLOG_POSTS[0].excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#145C3A]">
                By {BLOG_POSTS[0].author}
              </span>
              <span className="text-xs font-bold text-[#145C3A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Masterclass <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* All Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl overflow-hidden border border-[#E9DDC8] shadow-sm hover:shadow-md transition-all flex flex-col cursor-pointer group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-[#FAF8F3]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#145C3A] text-white text-[11px] font-bold shadow-2xs">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1E1E1E] group-hover:text-[#145C3A] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#145C3A]">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 border border-[#E9DDC8] shadow-2xl relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-500 hover:text-black hover:bg-[#FAF8F3]"
              aria-label="Close article"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-[#E8F0E7] text-[#145C3A] text-xs font-bold uppercase mb-3">
              {selectedPost.category}
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1E1E1E] mb-4">
              {selectedPost.title}
            </h2>

            <div className="flex items-center gap-3 text-xs text-gray-500 pb-6 border-b border-[#E9DDC8] mb-6">
              <span>By {selectedPost.author}</span>
              <span>•</span>
              <span>Published: {selectedPost.date}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <img
              src={selectedPost.image}
              alt=""
              className="w-full aspect-16/9 object-cover rounded-2xl mb-6 shadow-xs"
            />

            <div className="text-sm sm:text-base text-[#1E1E1E]/80 leading-relaxed space-y-4">
              <p className="font-medium text-[#145C3A] text-lg">
                {selectedPost.excerpt}
              </p>
              <p>
                True skin barrier repair begins with understanding lipid balance. When your stratum corneum is intact, transepidermal water loss is minimized, resulting in naturally bouncy, plump skin that reflects light evenly without artificial primers.
              </p>
              <p>
                Always apply active serums containing water-binding humectants (like low molecular weight hyaluronic acid) to damp skin, and immediately seal with cold-pressed botanical lipids like jojoba or squalane.
              </p>
              <p>
                Never neglect daily broad-spectrum UV protection, regardless of cloud cover. UV radiation accounts for over 80% of preventable premature skin aging and hyperpigmentation breakdown.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E9DDC8] flex justify-between items-center">
              <span className="text-xs text-gray-500">Share this beauty ritual with friends</span>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2 bg-[#145C3A] text-white rounded-full text-xs font-bold"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
