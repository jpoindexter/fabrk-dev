const colorPattern = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})(?![0-9a-fA-F])(?=[$\s'"),.;:}\]>/]|$)/;
const functionPattern = /(rgb|rgba|hsl|hsla)\(/i;
const allowedDirectories = ["/emails/", "/public/", "/sample_landing/"];

function isAllowedFile(filename) {
  return allowedDirectories.some((dir) => filename.includes(dir));
}

function literalContainsColor(node) {
  if (typeof node.value !== "string") return false;
  if (!colorPattern.test(node.value) && !functionPattern.test(node.value)) return false;
  return true;
}

function report(context, node) {
  context.report({
    node,
    message: "Use design tokens instead of hard-coded color values.",
  });
}

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow hard-coded hex/rgb/hsl colors in UI files",
    },
    schema: [],
  },
  create(context) {
    const filename = context.getFilename();
    if (isAllowedFile(filename)) {
      return {};
    }

    return {
      Literal(node) {
        if (literalContainsColor(node)) {
          report(context, node);
        }
      },
      TemplateElement(node) {
        const value = node.value?.raw ?? "";
        if ((colorPattern.test(value) || functionPattern.test(value)) && !isAllowedFile(filename)) {
          report(context, node);
        }
      },
      JSXAttribute(node) {
        if (node.value && node.value.type === "Literal" && typeof node.value.value === "string") {
          if (colorPattern.test(node.value.value) || functionPattern.test(node.value.value)) {
            report(context, node);
          }
        }
      },
    };
  },
};
