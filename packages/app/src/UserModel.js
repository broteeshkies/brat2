import MongooseSchema from '@lskjs/db/MongooseSchema';

export default function Message() {
  // { db }
  return new MongooseSchema(
    {
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      info: {
        type: Object,
        // about,
        // image,
        // address,
        // addressNote,
        // coordinates,
        // host, // incircle
        // speakers,
        // sponsors,
      },
      email: {
        type: String,
      },
      role: {
        type: String,
      },
    },
    {
      model: 'User',
      collection: 'user',
    },
  );
}
