import { CreatePostDto } from '../dto/CreatePost.dto';
import { Content, ID, Title } from '../types';

export class Post {
  id: ID;
  title: Title;
  content: Content;
  createdAt: Date;
  updatedAt: Date;

  constructor(dto: CreatePostDto) {
    this.id = dto.id;
    this.title = dto.title;
    this.content = dto.content;
    this.createdAt = dto.createdAt;
    this.updatedAt = dto.updatedAt;
  }
}
