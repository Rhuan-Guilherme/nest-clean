import { Body, ConflictException, Controller, Post } from '@nestjs/common/'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountContoller {
  constructor(private prismaService: PrismaService) {}

  @Post('')
  async handle(@Body() body: any) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      )
    }

    await this.prismaService.user.create({
      data: {
        email,
        name,
        password,
      },
    })
  }
}
