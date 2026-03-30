export type ContentType = "gif" | "video" | "pic-meme" | "game";

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  src: string;
}

const files = import.meta.glob("../Media/*.{gif,png,jpg,jpeg,mp4,mov}", {
  eager: true,
  query: "?url",
  import: "default",
});

export const contentItems: ContentItem[] = Object.entries(files).map(
  ([path, url], index) => {
    const filePath = path.toLowerCase();
    const fileName = path.split("/").pop() || `media-${index}`;

    let type: ContentType = "pic-meme";

    if (filePath.endsWith(".gif")) {
      type = "gif";
    } else if (
      filePath.endsWith(".mp4") ||
      filePath.endsWith(".mov")
    ) {
      type = "video";
    } else if (
      filePath.endsWith(".png") ||
      filePath.endsWith(".jpg") ||
      filePath.endsWith(".jpeg")
    ) {
      type = "pic-meme";
    }

    return {
      id: `media-${index}`,
      type,
      title: fileName,
      description: `${type.toUpperCase()} media`,
      src: url as string,
    };
  }
);