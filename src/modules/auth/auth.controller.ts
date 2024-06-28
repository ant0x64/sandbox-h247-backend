import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, TokenDto } from '../../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Authorize' })
  @ApiResponse({
    type: TokenDto,
  })
  async index(@Body() authDto: AuthDto): Promise<TokenDto> {
    /** @todo: Implement User Service */
    if (authDto.login !== 'login' || authDto.password !== 'password') {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.authService.generateToken({ sub: authDto.login }),
    };
  }
}
