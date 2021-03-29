import { default as deleteUser } from './delete.test.js';
import { default as getUser } from './get.test.js';
import { default as postUser } from './post.test.js';
import { default as putUser } from './put.test.js';

describe('USER', function (){
    deleteUser();
    getUser();
    postUser();
    putUser();
});