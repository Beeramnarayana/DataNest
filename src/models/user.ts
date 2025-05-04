// filepath: c:\Users\beera\OneDrive\Desktop\DataNest\src\models\user.ts
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'user';

  @field('name') name!: string;
  @field('email') email!: string;
  @field('password') password!: string;
}