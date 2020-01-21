import { Injectable } from '@nestjs/common';
import {CacheUserDto} from '../users/user-dto.';
import {redisConfig} from '../config/redis.config';
import {stringify} from 'querystring';

// tslint:disable-next-line:no-var-requires
const cacheManager = require('cache-manager');
// tslint:disable-next-line:no-var-requires
const redisStore = require('cache-manager-redis-store');

const redisCache = cacheManager.caching(redisConfig);

export class CacheService {
    async setUserCache(cacheUserDto: CacheUserDto): Promise<string> {
        redisCache.set(cacheUserDto.email, cacheUserDto, { ttl: 90000 }, (err) => {
            if (err) {
                throw err;
            }

            // tslint:disable-next-line:no-shadowed-variable
            redisCache.get(cacheUserDto.email, (err, result) => {
                // tslint:disable-next-line:no-console
                console.log(result);
            });
        });
        return 'Hello World!';
    }

    async getUserCache(userId: string): Promise<any> {
        const {err, result} = await redisCache.get(userId);
        return result;
    }
}
