import { IsNotEmpty, IsAlpha, IsOptional } from 'class-validator';

export class userInformationDto {
  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsOptional()
  userId:string
  
}
