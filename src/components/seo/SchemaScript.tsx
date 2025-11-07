/**
 * Schema Script Component
 * Injects JSON-LD structured data into pages
 *
 * Critical for SEO, AEO, and GEO optimization
 */

interface SchemaScriptProps {
  schema: object | object[];
}

/**
 * Render JSON-LD schema in a script tag
 * Place this component in your page layout or component
 *
 * @example
 * <SchemaScript schema={generateFAQSchema(faqs)} />
 */
export function SchemaScript({ schema }: SchemaScriptProps) {
  const schemaArray = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemaArray.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  );
}
