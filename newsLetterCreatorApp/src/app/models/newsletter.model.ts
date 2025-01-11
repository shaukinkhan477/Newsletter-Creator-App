export interface Newsletter {
  title: string;
  subject: string;
  content: string;
  preheader: string;
  schedule: Date | null;
  segmentId: string;
}
