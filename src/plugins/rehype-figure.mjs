// Turns a standalone markdown image with a title into a <figure> with a
// <figcaption>. Usage in markdown:
//
//   ![alt text](/image.jpg "This becomes the caption")
//
// Only paragraphs that contain a single image (ignoring whitespace) are
// converted, so inline images inside a sentence are left untouched.
export default function rehypeFigure() {
  const isWhitespace = (node) =>
    node.type === "text" && node.value.trim() === "";

  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;

      for (const child of node.children) {
        if (child.tagName !== "p") {
          walk(child);
          continue;
        }

        const meaningful = child.children.filter((c) => !isWhitespace(c));
        if (
          meaningful.length !== 1 ||
          meaningful[0].type !== "element" ||
          meaningful[0].tagName !== "img"
        ) {
          continue;
        }

        const img = meaningful[0];
        const caption = img.properties?.title;
        if (!caption) continue;

        child.tagName = "figure";
        child.properties = {};
        child.children = [
          img,
          {
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: [{ type: "text", value: String(caption) }],
          },
        ];
      }
    };

    walk(tree);
  };
}
