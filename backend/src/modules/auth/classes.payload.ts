import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {User} from '../user';

export class ClassesPayload {
  @ApiModelProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(5)
  name: string;
  
  @IsNotEmpty()
  user: User;
}