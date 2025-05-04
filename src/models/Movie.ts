import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators'; // Ensure this import is correct and matches your library setup

export default class Movie extends Model {
  static table = 'movie';

  @field('title') title!: string;
  @field('rating') rating!: string;
    @field('year') year!: string;
    @field('genre') genre!: string;
    @field('director') director!: string;
   // Ensure the type matches the expected format (e.g., Date for timestamps)
}