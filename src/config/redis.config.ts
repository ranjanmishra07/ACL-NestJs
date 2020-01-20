import * as redisStore from 'cache-manager-redis-store';

export const redisConfig = {
    store: redisStore,
        host: 'localhost',
        port: 6379,
};
