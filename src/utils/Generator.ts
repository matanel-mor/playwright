import { faker } from '@faker-js/faker';

export default class Generator {
      static generateRandomName(length?: number): string {
            const name = faker.person.firstName();
            if (length) {
                  return name.slice(0, length);
            }
            return name;
      }
}