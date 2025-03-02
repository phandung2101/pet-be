import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constant/jwt.constant';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // Tùy chọn: Bạn có thể truy vấn cơ sở dữ liệu để lấy thêm thông tin
    // const user = await this.userService.findById(payload.sub);
    
    return { 
      userId: payload.sub, 
      username: payload.username,
      roles: payload.roles
    };
  }
}