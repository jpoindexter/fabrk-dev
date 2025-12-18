import { FeatureGuideTemplate } from '@/components/docs';
import { Database, Shield, Globe, Zap, Code, Server } from 'lucide-react';

export const metadata = {
  title: 'Supabase Storage - Fabrk Docs',
  description:
    'Integrate Supabase Storage for file uploads. S3-compatible with row-level security and CDN.',
};

export default function SupabaseStoragePage() {
  return (
    <FeatureGuideTemplate
      code="[0xT2]"
      category="Storage Providers"
      title="Supabase Storage"
      description="Database-integrated storage - RLS policies for files."
      overview="Supabase Storage integrates seamlessly with Supabase Auth and Database. It provides S3-compatible storage with row-level security policies, making it ideal when you're already using Supabase. Features include RLS for files, automatic image transformations, CDN delivery, and integration with Supabase Auth."
      features={[
        {
          icon: Shield,
          title: 'Row Level Security',
          description:
            'Apply database-style RLS policies to files. Control access with SQL.',
        },
        {
          icon: Database,
          title: 'Auth Integration',
          description:
            'Works with Supabase Auth. User-scoped file access out of the box.',
        },
        {
          icon: Globe,
          title: 'Smart CDN',
          description:
            'Global CDN with automatic cache invalidation. Fast worldwide.',
        },
        {
          icon: Zap,
          title: 'Image Transforms',
          description:
            'Resize, crop, and optimize images on-the-fly via URL params.',
        },
        {
          icon: Code,
          title: 'Simple API',
          description:
            'Easy-to-use JavaScript client. Upload in one line of code.',
        },
        {
          icon: Server,
          title: 'S3 Compatible',
          description:
            'Use standard S3 tools for migrations or bulk operations.',
        },
      ]}
      setup={[
        {
          title: 'Create Supabase Project',
          description:
            'Sign up at supabase.com. Free tier includes 1GB storage.',
        },
        {
          title: 'Create Storage Bucket',
          description:
            'Go to Storage in your Supabase dashboard and create a bucket.',
          code: `-- Create a bucket via SQL (optional)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Or use the Dashboard:
-- 1. Storage → New Bucket
-- 2. Name: "avatars"
-- 3. Public: Yes (for profile pictures)`,
          language: 'sql',
        },
        {
          title: 'Configure RLS Policies',
          description:
            'Set up row-level security for your bucket.',
          code: `-- Allow authenticated users to upload their own avatar
CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read access to avatars
CREATE POLICY "Public avatar access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Allow users to update their own avatar
CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);`,
          language: 'sql',
        },
        {
          title: 'Add Environment Variables',
          description: 'Add your Supabase credentials to .env.local',
          code: `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."  # For server-side operations

# Set Supabase as your storage provider
STORAGE_PROVIDER="supabase"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Upload Files',
          description: 'Upload files with the Supabase client.',
          code: `import { storage } from '@/lib/storage';

// Upload a file (server-side)
const result = await storage.upload({
  bucket: 'avatars',
  path: \`\${userId}/avatar.jpg\`,
  file: fileBuffer,
  contentType: 'image/jpeg',
});

console.log(result.url);
// https://xxx.supabase.co/storage/v1/object/public/avatars/user_123/avatar.jpg`,
          language: 'typescript',
        },
        {
          title: 'Client-Side Upload',
          description: 'Upload directly from the browser.',
          code: `'use client';
import { createClient } from '@/lib/supabase/client';

async function uploadAvatar(file: File, userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(\`\${userId}/avatar.jpg\`, file, {
      cacheControl: '3600',
      upsert: true, // Replace if exists
    });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(data.path);

  return publicUrl;
}`,
          language: 'typescript',
        },
        {
          title: 'Image Transformations',
          description: 'Transform images on-the-fly.',
          code: `import { storage } from '@/lib/storage';

// Get transformed image URL
const thumbnailUrl = storage.getPublicUrl('avatars', 'user_123/avatar.jpg', {
  transform: {
    width: 100,
    height: 100,
    resize: 'cover',
    quality: 80,
  },
});

// URL format:
// https://xxx.supabase.co/storage/v1/render/image/public/avatars/user_123/avatar.jpg
//   ?width=100&height=100&resize=cover&quality=80

// Available transforms:
// - width, height (pixels)
// - resize: 'cover' | 'contain' | 'fill'
// - quality: 1-100 (JPEG/WebP)
// - format: 'webp' | 'png' (auto-detect by default)`,
          language: 'typescript',
        },
      ]}
    />
  );
}
