import { Body, ConflictException, Controller, Post } from '@nestjs/common/'
import { hash } from 'bcryptjs'
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

    const hashedPassword = await hash(password, 8)

    await this.prismaService.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })
  }
}
