import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators'; 

export default class movie extends Model {
  static table = 'movie';

  @field('title') title!: string;
  @field('rating') rating!: string;
    @field('year') year!: string;
    @field('genre') genre!: string;
    @field('director') director!: string;
  
}