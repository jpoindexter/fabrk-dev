/**
 * SEO Library Index
 * Complete SEO, AEO, GEO, and AIEO toolkit
 *
 * Usage:
 * import {
 *   generateFAQSchema,
 *   analyzeContent,
 *   isAICrawler,
 *   analyzeContentComprehensive
 * } from "@/lib/seo";
 */

// Structured Data (JSON-LD) - Core schemas
export {
  generateOrganizationSchema,
  generateSoftwareApplicationSchema,
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebSiteSchema,
} from './structured-data';

// Structured Data (JSON-LD) - Content schemas
export {
  generateArticleSchema,
  generateBlogPostSchema,
  generateHowToSchema,
  generateReviewSchema,
  generateVideoSchema,
  generateCourseSchema,
} from './content-schemas';

// Content Optimization
export {
  calculateReadingTime,
  countWords,
  calculateKeywordDensity,
  calculateReadabilityScore,
  extractHeadings,
  isFeaturedSnippetOptimized,
  analyzeContent,
  scoreContent,
  generateVoiceSearchSuggestions,
  formatForAICitation,
  extractKeyFacts,
} from './content-optimization';

// AI Optimization (GEO + AIEO)
export {
  AI_CRAWLERS,
  generateAIRobotRules,
  isAICrawler,
  getAICrawlerInfo,
  generateCitableFormat,
  generateAIMetadata,
  formatPeopleAlsoAsk,
  generateEntityMarkup,
  optimizeForAIOverview,
  calculateAICitationScore,
  logAICrawler,
  type AIBotConfig,
  type CitableContent,
  type CrawlerLog,
} from './ai-optimization';

// AI Content Analyzer
export {
  analyzeContentComprehensive,
  generateSEOReport,
  type ComprehensiveScore,
} from './ai-content-analyzer';
