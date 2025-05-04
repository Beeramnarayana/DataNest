import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators'; // Ensure this import is correct and matches your library setup

export default class Post extends Model {
  static table = 'posts';

  @field('title') title!: string;
  @field('body') body!: string;
  @field('image') image!: string;
   // Ensure the type matches the expected format (e.g., Date for timestamps)
}