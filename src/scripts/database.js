import { openDB } from 'idb';
 
const DATABASE_NAME = 'StoryApp';
const DATABASE_VERSION = 3;

const STORIES_STORE = 'stories';
 
const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    if (!database.objectStoreNames.contains(STORIES_STORE)) {
      database.createObjectStore(STORIES_STORE, { keyPath: 'id' });
    }
  },
});

const Database = {
  async putStory(story) {
    if (!Object.hasOwn(story, 'id')) {
      throw new Error('`id`is requiredto save.');
    }
    return (await dbPromise).put(STORIES_STORE, story);
  },

  async getStory(id) {
    return (await dbPromise).get(STORIES_STORE, id);
  },

  async getAllStories() {
    const db = await dbPromise;
    const allStories = await db.getAll(STORIES_STORE);
    console.log('Database.getAllStories:', allStories);
    return allStories;
  },

  async deleteStory(id) {
    if (!id) return;
    const db = await dbPromise;
    return db.delete('stories', id);
  },
};

export default Database;