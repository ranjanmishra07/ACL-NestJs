import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { CacheUserDto } from 'src/users/dto/user-dto.';
import {CacheService} from './cache.service';

@Controller('cache')
export class CacheController {
    constructor(private readonly cacheService: CacheService) {}

    // @UseGuards(AuthGuard('local'))
    @Post()
    async setUserCache(@Body() cacheUserDto: CacheUserDto) {
        return await this.cacheService.setUserCache(cacheUserDto);
    }

    @Post('getUserCache')
    async getUserCache(@Body() cacheUserDto: CacheUserDto) {
        const result = await this.cacheService.getUserCache(cacheUserDto.email);
        return result;
    }

}
