import * as mongoose from "mongoose";

let isConnected: boolean = false

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)
  
  if (!process.env.MONGO_DB_URL) {
    throw new Error(
      "Missing MONGO_DB_URL. Copy .env.example to .env.local and set your MongoDB connection string."
    )
  }
  
  if (isConnected) {
    return console.log('MongoDB is already connected')
  }
  
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: 'devflow'
    })
    
    isConnected = true
    
    console.log('MongoDB is already connected')
  } catch(error) {
    console.log('MongoDB connection failed', error)
  }
}
