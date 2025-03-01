import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthRequestDto } from '../dtos/auth-request.dto';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Permission } from '../../shared/rbac/permissions.decorator';
import { Public } from '../../shared/decorators/public.decorator';

@Public()
@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Permission('auth:register')
  @ApiBody({ type: AuthRequestDto, description: 'User registration' })
  @ApiResponse({ type: AuthResponseDto })
  async register(
    @Body() registerUserDto: AuthRequestDto,
  ): Promise<AuthResponseDto> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @Permission('auth:login')
  @ApiBody({ type: AuthRequestDto, description: 'User login' })
  @ApiResponse({ type: AuthResponseDto, description: 'User login response' })
  async login(@Body() loginUserDto: AuthRequestDto): Promise<AuthResponseDto> {
    return this.authService.login(loginUserDto);
  }
}
