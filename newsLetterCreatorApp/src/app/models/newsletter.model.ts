export interface Newsletter {
  [key: string]: string | Date | null | undefined;
  title: string;
  subject: string;
  content: string;
  preheader: string;
  schedule: Date | null;
  segmentId?: string;
  image?: string;
}
