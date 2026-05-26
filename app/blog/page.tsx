import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import Link from "next/link";
import blogsData from "@/data/blogs.json";

export const metadata = {
  title: "Knowledge Center | Tatkal Claims",
  description: "Expert insights on insurance claim rejection, delays, mis-selling, and dispute resolution.",
};

export default function BlogListPage() {
  const posts = blogsData.posts;

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-main px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary-700 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-900 text-white py-16 md:py-24">
        <div className="container-main px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Knowledge Center</h1>
          <p className="text-lg text-primary-100 max-w-2xl">Expert insights to help you understand your rights and navigate insurance disputes successfully.</p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container-main px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <User className="w-3 h-3" />{post.author}
                    </span>
                    <span className="text-primary-700 font-semibold text-sm group-hover:gap-2 gap-1 transition-all inline-flex items-center">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
