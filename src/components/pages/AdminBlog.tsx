'use client'

import React, { useState } from 'react'
import { blogApi, uploadImage } from '@/lib/api-client'
import type { BlogPost } from '@/lib/types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Eye, Upload, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AdminBlog() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const queryClient = useQueryClient();
  
  const { data: posts = [] } = useQuery({
    queryKey: ['adminBlogPosts'],
    queryFn: () => blogApi.list('-publish_date'),
  });

  const createPostMutation = useMutation({
    mutationFn: (data: Omit<BlogPost, 'id'>) => blogApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPostsPreview'] });
      setIsCreating(false);
      toast.success('Blog post aangemaakt');
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BlogPost> }) => blogApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPostsPreview'] });
      setEditingPost(null);
      toast.success('Blog post bijgewerkt');
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: string) => blogApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPostsPreview'] });
      toast.success('Blog post verwijderd');
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      return await uploadImage(file);
    } catch {
      toast.error('Fout bij uploaden afbeelding');
      return null;
    }
  };

  if (isCreating || editingPost) {
    return (
      <BlogForm
        post={editingPost}
        onCancel={() => {
          setIsCreating(false);
          setEditingPost(null);
        }}
        onSubmit={(data) => {
          if (editingPost) {
            updatePostMutation.mutate({ id: editingPost.id, data });
          } else {
            createPostMutation.mutate(data);
          }
        }}
        onImageUpload={handleImageUpload}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Beheer</h1>
            <p className="text-gray-600 mt-1">Beheer je blog posts</p>
          </div>
          <div className="flex gap-2">
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Nieuwe Post
          </Button>
          <Button variant="outline" onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/admin/blog/login" }} className="gap-2">
            <LogOut className="w-4 h-4" />
            Uitloggen
          </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-48 h-32 object-cover"
                    />
                  ) : (
                    <div className="w-48 h-32 bg-gray-200 flex items-center justify-center">
                      <Eye className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg text-gray-900">{post.title}</h3>
                        {post.published ? (
                          <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Gepubliceerd</span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">Concept</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{post.excerpt}</p>
                      <p className="text-xs text-gray-500">
                        {post.publish_date ? new Date(post.publish_date).toLocaleDateString('nl-NL') : 'Geen datum'} · {post.read_time || 'Onbekend'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPost(post)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (window.confirm(`Weet je zeker dat je "${post.title}" wilt verwijderen?`)) {
                            deletePostMutation.mutate(post.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogForm({
  post,
  onCancel,
  onSubmit,
  onImageUpload,
}: {
  post: BlogPost | null
  onCancel: () => void
  onSubmit: (data: Omit<BlogPost, 'id'>) => void
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<string | null | undefined>
}) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image_url: post?.image_url || '',
    read_time: post?.read_time || '',
    published: post?.published ?? true,
    publish_date: post?.publish_date || new Date().toISOString().split('T')[0],
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageChange = async (e) => {
    setIsUploading(true);
    const url = await onImageUpload(e);
    if (url) {
      setFormData({ ...formData, image_url: url });
    }
    setIsUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {post ? 'Blog Post Bewerken' : 'Nieuwe Blog Post'}
          </h1>
          <Button variant="outline" onClick={onCancel}>
            Annuleren
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Blog post titel"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="bijvoorbeeld-mijn-blog-post"
                />
                <p className="text-xs text-gray-500 mt-1">Geen spaties, gebruik koppeltekens</p>
              </div>

              <div>
                <Label htmlFor="excerpt">Samenvatting</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Korte samenvatting voor de preview"
                />
              </div>

              <div>
                <Label htmlFor="content">Inhoud</Label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  className="bg-white"
                />
              </div>

              <div>
                <Label htmlFor="image">Afbeelding</Label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <Label htmlFor="image" className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <Upload className="w-4 h-4" />
                    {isUploading ? 'Uploaden...' : 'Upload afbeelding'}
                  </Label>
                  {formData.image_url && (
                    <img src={formData.image_url} alt="Preview" className="w-32 h-20 object-cover rounded" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="readTime">Leestijd</Label>
                  <Input
                    id="readTime"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    placeholder="bijv. 5 min"
                  />
                </div>
                <div>
                  <Label htmlFor="publishDate">Publicatiedatum</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={formData.publish_date}
                    onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">Gepubliceerd</Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              {post ? 'Bijwerken' : 'Aanmaken'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuleren
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}