export interface FileMetadata {
  filename: string;
  contentType: string;
  contentLength: number;
  tags: string[];
  url?: string;
}
