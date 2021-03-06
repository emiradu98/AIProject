import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../user';
import { Classes } from 'modules/class';

export class CommentsPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(1)
  text: string;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  class: Classes;


}
