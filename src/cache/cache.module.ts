import {CacheService} from './cache.service';
import {Module} from '@nestjs/common';
import {CacheController} from './cache.controller';

@Module({
    providers: [CacheService],
    controllers: [CacheController],
    exports: [CacheService],
})
export class CacheModule {}
