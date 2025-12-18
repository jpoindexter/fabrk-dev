import { FeatureGuideTemplate } from '@/components/docs';
import { Cloud, DollarSign, Zap, Globe, Shield, Server } from 'lucide-react';

export const metadata = {
  title: 'Cloudflare R2 - Fabrk Docs',
  description:
    'Integrate Cloudflare R2 for zero-egress storage. S3-compatible with no bandwidth fees.',
};

export default function R2Page() {
  return (
    <FeatureGuideTemplate
      code="[0xT1]"
      category="Storage Providers"
      title="Cloudflare R2"
      description="S3-compatible - Zero egress fees."
      overview="Cloudflare R2 is object storage with zero egress fees, making it significantly cheaper than S3 for high-bandwidth applications. It's fully S3-compatible, so you can use existing tools and SDKs. Features include automatic global distribution via Cloudflare's edge network, no egress charges, S3 API compatibility, and Workers integration."
      features={[
        {
          icon: DollarSign,
          title: 'Zero Egress',
          description:
            'No bandwidth charges. Pay only for storage and operations.',
        },
        {
          icon: Globe,
          title: 'Edge Delivery',
          description:
            'Automatic CDN via Cloudflare\'s 300+ global edge locations.',
        },
        {
          icon: Server,
          title: 'S3 Compatible',
          description:
            'Use existing S3 SDKs and tools. Drop-in replacement for S3.',
        },
        {
          icon: Zap,
          title: 'Workers Integration',
          description:
            'Direct access from Cloudflare Workers for edge computing.',
        },
        {
          icon: Shield,
          title: 'Data Sovereignty',
          description:
            'Choose where your data is stored. EU and US regions available.',
        },
        {
          icon: Cloud,
          title: 'Generous Free Tier',
          description:
            '10GB storage, 1M reads, 10M writes/month free. Forever.',
        },
      ]}
      setup={[
        {
          title: 'Create Cloudflare Account',
          description:
            'Sign up at cloudflare.com. R2 is available on the free plan.',
        },
        {
          title: 'Create R2 Bucket',
          description:
            'Go to R2 in the Cloudflare dashboard and create a new bucket.',
          code: `# Via Wrangler CLI (optional)
npx wrangler r2 bucket create your-app-uploads

# Enable CORS for browser uploads
npx wrangler r2 bucket cors put your-app-uploads --rules '[{
  "allowedOrigins": ["https://your-domain.com"],
  "allowedMethods": ["GET", "PUT", "POST", "DELETE"],
  "allowedHeaders": ["*"],
  "maxAgeSeconds": 3600
}]'`,
          language: 'bash',
        },
        {
          title: 'Generate API Token',
          description:
            'Go to R2 → Manage R2 API Tokens → Create API Token. Select your bucket and permissions.',
        },
        {
          title: 'Add Environment Variables',
          description: 'Add your R2 credentials to .env.local',
          code: `# Cloudflare R2 Configuration
R2_ACCOUNT_ID="your-account-id"
R2_ACCESS_KEY_ID="your-access-key-id"
R2_SECRET_ACCESS_KEY="your-secret-access-key"
R2_BUCKET="your-app-uploads"

# Optional: Custom domain for public access
R2_PUBLIC_URL="https://cdn.your-domain.com"

# Set R2 as your storage provider
STORAGE_PROVIDER="r2"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Upload Files',
          description: 'Upload files to R2 (uses S3-compatible API).',
          code: `import { storage } from '@/lib/storage';

// Upload a file
const result = await storage.upload({
  file: fileBuffer,
  key: 'uploads/avatar.jpg',
  contentType: 'image/jpeg',
});

console.log(result.url);
// https://cdn.your-domain.com/uploads/avatar.jpg`,
          language: 'typescript',
        },
        {
          title: 'Generate Presigned URLs',
          description: 'Create secure URLs for direct uploads.',
          code: `import { storage } from '@/lib/storage';

// Generate upload URL (valid for 1 hour)
const { url, fields } = await storage.createPresignedUpload({
  key: 'uploads/document.pdf',
  contentType: 'application/pdf',
  expiresIn: 3600,
});

// Client can upload directly to R2
await fetch(url, {
  method: 'PUT',
  body: file,
  headers: { 'Content-Type': 'application/pdf' },
});`,
          language: 'typescript',
        },
        {
          title: 'Public Bucket Access',
          description: 'Enable public access via custom domain.',
          code: `// In Cloudflare Dashboard:
// 1. R2 → your-bucket → Settings → Public Access
// 2. Connect a custom domain (recommended)
// 3. Or use r2.dev subdomain (rate limited)

// Files are now accessible at:
// https://cdn.your-domain.com/uploads/file.jpg

// For private files, use presigned URLs:
const privateUrl = await storage.createPresignedDownload({
  key: 'private/sensitive-doc.pdf',
  expiresIn: 300, // 5 minutes
});`,
          language: 'typescript',
        },
      ]}
    />
  );
}
