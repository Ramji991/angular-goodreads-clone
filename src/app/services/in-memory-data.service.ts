import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books = [
      {
        id: 1,
        title: 'Book One',
        author: 'Author One',
        coverImage: 'link1.jpg',
        description: 'Description One',
        averageRating: 4.5,
        reviews: [],
      },
      {
        id: 2,
        title: 'Book Two',
        author: 'Author One',
        coverImage: 'link2.jpg',
        description: 'Description Two',
        averageRating: 4.0,
        reviews: [],
      },
      {
        id: 3,
        title: 'Book Three',
        author: 'Author Two',
        coverImage: 'link3.jpg',
        description: 'Description Three',
        averageRating: 3.5,
        reviews: [],
      },
      //
      // Add more mock books here
    ];
    return { books };
  }
}
