import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { HashUtil } from 'src/common/utils/hash.util';

@Module({
  imports: [
    JwtModule.register({
      secret: HashUtil.jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
