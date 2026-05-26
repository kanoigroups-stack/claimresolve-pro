import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import Link from "next/link";
import blogsData from "@/data/blogs.json";

// Generate static pages for all blog posts
export function generateStaticParams() {
  return blogsData.posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogsData.posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Not Found" };
  
  return {
    title: `${post.title} | Tatkal Claims`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogsData.posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Convert markdown-style content to HTML-like structure
  const renderContent = (content: string) => {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let key = 0;
  let currentList: JSX.Element[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc pl-6 mb-4 space-y-1">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      flushList();
      continue;
    }
    
    // Heading level 2
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-slate-900 mt-10 mb-4">
          {line.replace('## ', '')}
        </h2>
      );
    }
    // Heading level 3
    else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={key++} className="text-xl font-semibold text-slate-900 mt-8 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
    }
    // Bullet points
    else if (line.startsWith('- ')) {
      currentList.push(
        <li key={key++} className="text-slate-700 leading-relaxed">
          {line.replace('- ', '')}
        </li>
      );
    }
    // Bold text
    else if (line.startsWith('**') && line.endsWith('**')) {
      flushList();
      elements.push(
        <p key={key++} className="text-slate-900 font-bold leading-relaxed mb-4">
          {line.replace(/\*\*/g, '')}
        </p>
      );
    }
    // Regular paragraph
    else {
      flushList();
      elements.push(
        <p key={key++} className="text-slate-700 leading-relaxed mb-4">
          {line}
        </p>
      );
    }
  }

  // Don't forget to flush any remaining list items at the end
  flushList();

  return elements;
};

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container-main px-4 py-4 flex items-center justify-between">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary-700 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-primary-700 transition-colors">
            Home
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container-main">
            <span className="bg-accent-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 max-w-3xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-main px-4 py-12">
        <div className="flex items-center gap-6 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-200">
          <span className="flex items-center gap-2"><User className="w-4 h-4" />{post.author}</span>
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{post.date}</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{post.readTime}</span>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>
        </div>

        {/* CTA Box */}
        <div className="max-w-3xl mx-auto mt-16 p-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl border border-primary-100">
          <h3 className="text-xl font-bold text-primary-900 mb-2">Facing a similar issue?</h3>
          <p className="text-slate-600 mb-6">Our experts can help you resolve your insurance dispute. Get a free case evaluation today.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#contact" className="btn-primary text-center">Get Free Case Evaluation</Link>
            <a href="tel:+91XXXXXXXXXX" className="btn-secondary text-center">Call Our Experts</a>
          </div>
        </div>

        {/* Related Posts */}
        <div className="max-w-3xl mx-auto mt-16">
          <h3 className="text-xl font-bold text-slate-900 mb-6">More Articles</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {blogsData.posts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group p-4 bg-slate-50 rounded-xl hover:bg-primary-50 transition-colors border border-slate-100"
                >
                  <span className="text-xs font-semibold text-primary-700">{relatedPost.category}</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-primary-700 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h4>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
