import { ApiProperty } from "@nestjs/swagger";
import { hashSync } from "bcryptjs";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty()
  @MinLength(8)//tamanho minimo
  @IsNotEmpty()//não pode ser vazia
  @Transform(({value}: {value: string}) => hashSync(value, 10),{//validação com hashs
    groups: ["transform"],
  })
  password: string;
}