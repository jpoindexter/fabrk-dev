import { FeatureGuideTemplate } from '@/components/docs';
import { Cloud, Shield, Globe, DollarSign, Zap, Database } from 'lucide-react';

export const metadata = {
  title: 'Amazon S3 - Fabrk Docs',
  description:
    'Integrate Amazon S3 for file storage. The industry standard for scalable object storage.',
};

export default function S3Page() {
  return (
    <FeatureGuideTemplate
      code="[0xT0]"
      category="Storage Providers"
      title="Amazon S3"
      description="Industry standard - Infinite scale object storage."
      overview="Amazon S3 (Simple Storage Service) is the most widely used cloud object storage service. It powers millions of applications worldwide. Features include 99.999999999% durability, automatic scaling, lifecycle policies, versioning, cross-region replication, and integration with the entire AWS ecosystem."
      features={[
        {
          icon: Shield,
          title: '11 9s Durability',
          description:
            '99.999999999% data durability. Your files are virtually indestructible.',
        },
        {
          icon: Globe,
          title: 'Global CDN',
          description:
            'CloudFront integration for fast delivery worldwide. Edge caching included.',
        },
        {
          icon: DollarSign,
          title: 'Pay Per Use',
          description:
            'Only pay for what you store and transfer. No minimum fees.',
        },
        {
          icon: Database,
          title: 'Storage Classes',
          description:
            'Standard, Intelligent-Tiering, Glacier for different access patterns.',
        },
        {
          icon: Zap,
          title: 'High Performance',
          description:
            'Up to 5,500 requests/sec per prefix. Transfer acceleration available.',
        },
        {
          icon: Cloud,
          title: 'AWS Ecosystem',
          description:
            'Integrates with Lambda, CloudFront, IAM, and 200+ AWS services.',
        },
      ]}
      setup={[
        {
          title: 'Create AWS Account',
          description:
            'Sign up at aws.amazon.com. Free tier includes 5GB S3 storage for 12 months.',
        },
        {
          title: 'Create S3 Bucket',
          description:
            'Go to S3 console and create a new bucket. Choose a unique name and region.',
          code: `# Via AWS CLI (optional)
aws s3 mb s3://your-app-uploads --region us-east-1

# Enable CORS for browser uploads
aws s3api put-bucket-cors --bucket your-app-uploads --cors-configuration '{
  "CORSRules": [{
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": ["https://your-domain.com"],
    "ExposeHeaders": ["ETag"]
  }]
}'`,
          language: 'bash',
        },
        {
          title: 'Create IAM User',
          description:
            'Create an IAM user with S3 permissions. Download the access keys.',
          code: `# IAM Policy (attach to user)
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "s3:PutObject",
      "s3:GetObject",
      "s3:DeleteObject",
      "s3:ListBucket"
    ],
    "Resource": [
      "arn:aws:s3:::your-app-uploads",
      "arn:aws:s3:::your-app-uploads/*"
    ]
  }]
}`,
          language: 'json',
        },
        {
          title: 'Add Environment Variables',
          description: 'Add your AWS credentials to .env.local',
          code: `# AWS S3 Configuration
AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-app-uploads"

# Set S3 as your storage provider
STORAGE_PROVIDER="s3"`,
          language: 'bash',
        },
      ]}
      usage={[
        {
          title: 'Upload Files',
          description: 'Upload files to your S3 bucket.',
          code: `import { storage } from '@/lib/storage';

// Upload a file
const result = await storage.upload({
  file: fileBuffer,
  key: 'uploads/avatar.jpg',
  contentType: 'image/jpeg',
  metadata: {
    userId: 'user_123',
  },
});

console.log(result.url);
// https://your-app-uploads.s3.us-east-1.amazonaws.com/uploads/avatar.jpg`,
          language: 'typescript',
        },
        {
          title: 'Generate Presigned URLs',
          description: 'Create secure, time-limited URLs for uploads or downloads.',
          code: `import { storage } from '@/lib/storage';

// Generate upload URL (client can PUT directly)
const uploadUrl = await storage.createPresignedUpload({
  key: 'uploads/document.pdf',
  contentType: 'application/pdf',
  expiresIn: 3600, // 1 hour
});

// Generate download URL
const downloadUrl = await storage.createPresignedDownload({
  key: 'uploads/document.pdf',
  expiresIn: 3600,
});`,
          language: 'typescript',
        },
        {
          title: 'List and Delete Files',
          description: 'Manage files in your bucket.',
          code: `import { storage } from '@/lib/storage';

// List files in a folder
const files = await storage.list({
  prefix: 'uploads/',
  limit: 100,
});

console.log(files);
// [{ key: 'uploads/avatar.jpg', size: 12345, lastModified: Date }]

// Delete a file
await storage.delete('uploads/old-file.jpg');

// Delete multiple files
await storage.deleteMany([
  'uploads/file1.jpg',
  'uploads/file2.jpg',
]);`,
          language: 'typescript',
        },
      ]}
    />
  );
}
