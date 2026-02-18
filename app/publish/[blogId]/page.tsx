'use client'

import { redirect } from 'next/navigation'
import { publish } from '@/app/actions/blog';
import { use, useEffect, useState, useCallback } from 'react'
import { verifySession } from '@/lib/dal';
import { getContent } from '@/app/actions/blog';
import LoadingSpinner from '@/components/web/loading-spinner';

export default function Publish({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = use(params);
  const [title, setTitle] = useState("");
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts
    const fetchData = async () => {
      try {
        const response = await getContent(blogId);

        if (response && isMounted) {
          setTitle(response.title);
        }
      } catch (error) {
        console.error('Failed to load blog:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup
    };
  }, [blogId]);

  if (IsLoading) {
    return <LoadingSpinner message="Loading…" />
  }

  return (
    <div className="min-h-screen flex justify-center bg-background text-foreground p-10">
      <div className="w-full max-w-2xl bg-card border border-border shadow-lg rounded-xl p-8 flex flex-col gap-6">

        <h1 className="text-3xl font-bold">Publish Blog</h1>
        <form action={publish} className="flex flex-col gap-6">
          {/* Title Preview */}
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">
              Title
            </label>

            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-border bg-background p-3 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">
              Short Description
            </label>
            <textarea
              placeholder="Write a short summary of your blog..."
              className="w-full border border-border bg-background p-3 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>



          {/* Hidden blogId */}
          <input type="hidden" name="blogId" value={blogId} />

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">
              Tags
            </label>
            <input
              name="tags"
              placeholder="e.g. Next.js, Prisma, Web Dev"
              className="w-full border border-border bg-background p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              Visibility
            </label>
            <select
              name="visibility"
              className="w-full border border-border bg-background p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              defaultValue="public"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">

            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-border rounded-md hover:bg-muted transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition"
            >
              Publish
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
