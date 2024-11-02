import { ApiProperty } from '@nestjs/swagger';

export class FileOutDto {
  public static fromEntity(entity: any): FileOutDto {
    return {
      id: entity.id,
      name: entity.name,
    };
  }
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}
