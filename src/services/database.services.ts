import { Collection, Db, MongoClient } from 'mongodb'

class MongoDBClient {
  private client: MongoClient
  private db: Db | null = null
  private dbName: string

  constructor(dbName: string, url: string = 'mongodb://localhost:27017') {
    this.dbName = dbName
    this.client = new MongoClient(url)
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect()
      this.db = this.client.db(this.dbName)
      console.log('Connected successfully to server')
    } catch (error) {
      console.error('Failed to connect to the MongoDB server:', error)
      throw error
    }
  }

  getCollection(collectionName: string): Collection {
    if (!this.db) {
      throw new Error('Not connected to database.')
    }
    return this.db.collection(collectionName)
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close()
      console.log('Connection closed.')
    }
  }
}
export default MongoDBClient
// async function main() {
//   const mongoDBClient = new MongoDBClient('myProject')
//   try {
//     await mongoDBClient.connect()
//     const collection = mongoDBClient.getCollection('documents')
//     // Interaction with 'collection' could include find, insert, update, etc.
//     console.log('Operation completed.')
//   } catch (error) {
//     console.error('An error occurred:', error)
//   } finally {
//     await mongoDBClient.close()
//   }
// }
