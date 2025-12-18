import { FeatureGuideTemplate } from '@/components/docs';
import { Cloud, Zap, Globe, Shield, Code, Server } from 'lucide-react';

export const metadata = {
  title: 'Vercel Blob - Fabrk Docs',
  description:
    'Integrate Vercel Blob for file storage. Zero-config blob storage for Vercel deployments.',
};

export default function VercelBlobPage() {
  return (
    <FeatureGuideTemplate
      code="[0xT4]"
      category="Storage Providers"
      title="Vercel Blob"
      description="Zero config - Native Vercel storage."
      overview="Vercel Blob provides zero-configuration file storage for Vercel deployments. It's the simplest option if you're already on Vercel. Features include automatic CDN delivery, edge caching, simple API, no configuration needed, and seamless integration with Vercel's infrastructure."
      features={[
        {
          icon: Zap,
          title: 'Zero Config',
          description:
            'Works automatically on Vercel. No buckets, no regions to configure.',
        },
        {
          icon: Globe,
          title: 'Edge Caching',
          description:
            'Automatic CDN with edge caching. Fast delivery worldwide.',
        },
        {
          icon: Code,
          title: 'Simple API',
          description:
            'Upload files with one function call. Delete, list, copy supported.',
        },
        {
          icon: Shield,
          title: 'Secure by Default',
          description:
            'HTTPS only. Optional authentication for private blobs.',
        },
        {
          icon: Server,
          title: 'Server & Client',
          description:
            'Upload from server actions or directly from the browser.',
        },
        {
          icon: Cloud,
          title: 'Generous Limits',
          description:
            'Up to 500MB per blob. Unlimited bandwidth on Pro/Enterprise.',
        },
      ]}
      setup={[
        {
          title: 'Connect Vercel Blob',
          description:
            'Go to your Vercel project → Storage → Create Database → Blob.',
        },
        {
          title: 'Install Package',
          description:
            'Install the Vercel Blob SDK.',
          code: `npm install @vercel/blob`,
          language: 'bash',
        },
        {
          title: 'Environment Variables',
          description:
            'Vercel automatically adds BLOB_READ_WRITE_TOKEN when you connect storage.',
          code: `# Auto-added by Vercel (no action needed on Vercel)
# For local development, copy from Vercel Dashboard:
BLOB_READ_WRITE_TOKEN="vercel_blob_..."

# Set Vercel Blob as your storage provider
STORAGE_PROVIDER="vercel-blob"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Upload Files (Server)',
          description: 'Upload files from server actions or API routes.',
          code: `import { put, del } from '@vercel/blob';

// Upload a file
const blob = await put('avatars/user_123.jpg', fileBuffer, {
  access: 'public',
  contentType: 'image/jpeg',
});

console.log(blob.url);
// https://xxxxx.public.blob.vercel-storage.com/avatars/user_123.jpg

// Delete a file
await del(blob.url);`,
          language: 'typescript',
        },
        {
          title: 'Client-Side Upload',
          description: 'Upload directly from the browser.',
          code: `// API Route: src/app/api/upload/route.ts
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json() as HandleUploadBody;

  const response = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async (pathname) => {
      // Authenticate user here
      return {
        allowedContentTypes: ['image/*'],
        maximumSizeInBytes: 5 * 1024 * 1024, // 5MB
      };
    },
    onUploadCompleted: async ({ blob }) => {
      // Save to database
      console.log('Uploaded:', blob.url);
    },
  });

  return NextResponse.json(response);
}`,
          language: 'typescript',
        },
        {
          title: 'Upload Component',
          description: 'React component for client uploads.',
          code: `'use client';
import { upload } from '@vercel/blob/client';
import { useState } from 'react';

export function FileUpload() {
  const [url, setUrl] = useState<string>();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const blob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/upload',
    });

    setUrl(blob.url);
    setUploading(false);
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {url && <img src={url} alt="Uploaded" />}
    </div>
  );
}`,
          language: 'typescript',
        },
        {
          title: 'List and Manage Blobs',
          description: 'List, copy, and manage stored files.',
          code: `import { list, copy, del } from '@vercel/blob';

// List all blobs (paginated)
const { blobs, cursor } = await list({
  prefix: 'avatars/',
  limit: 100,
});

console.log(blobs);
// [{ url, pathname, size, uploadedAt }]

// Copy a blob
const copied = await copy(
  'https://xxx.blob.vercel-storage.com/old.jpg',
  'new-location.jpg',
  { access: 'public' }
);

// Delete multiple blobs
await del([
  'https://xxx.blob.vercel-storage.com/file1.jpg',
  'https://xxx.blob.vercel-storage.com/file2.jpg',
]);`,
          language: 'typescript',
        },
      ]}
    />
  );
}
