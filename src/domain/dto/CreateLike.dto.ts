import { ID } from '../types';

export interface CreateLikeDto {
  postId: ID;
  userId: ID;
  createdAt: Date;
}
