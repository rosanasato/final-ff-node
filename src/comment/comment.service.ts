import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'src/utils/errors/EntityNotFoundError';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentService {
 
  private comments: CommentEntity[] = [
    {
      id: 1,
      comment: 'Some comment',
      user_id: '1',
    },
  ];
  
  constructor(private httpService: HttpService) {}

  create(createCommentDto: CreateCommentDto) {    
    const lastId = this.comments[this.comments.length - 1]?.id || 0;

      const newComment = {
        id: lastId + 1,
        ...createCommentDto,
      };

      this.comments.push(newComment);

      return newComment;    
  }

  findAll() {
    return this.comments;
  }

  findOne(id: number) {
    const comment = this.comments.find((comment) => comment.id === id);

    if (comment) {
      return comment;
    }
    
    throw new EntityNotFoundError(`Comentário ${id} não encontrado`);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = this.findOne(id);

    const index = this.comments.indexOf(comment);

    const newComment = {
      ...comment,
      ...updateCommentDto,
    };

    this.comments[index] = newComment;

    return newComment;
  }

  remove(id: number) {
    const comment = this.findOne(id);

    const index = this.comments.indexOf(comment);

    this.comments.splice(index, 1);
  }

  findByUserId(id: string) {
    const comment = this.comments.filter((comment) => comment.user_id === id);

    if (comment) {       
      return comment;
    }
    
    throw new EntityNotFoundError(`Usuário ${id} não encontrado`);

  }

}
