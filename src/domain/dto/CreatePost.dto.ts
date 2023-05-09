import { Content, ID, Title } from '../types';

export interface CreatePostDto {
  id: ID;
  title: Title;
  content: Content;
  createdAt: Date;
  updatedAt: Date;
}
