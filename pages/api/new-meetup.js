// call for endpoint /api/new-meetup
// call only for POST request

// since this api routes works on server side, we can store passwords or other secure information

import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    // add data to database
    const client = await MongoClient.connect(
      "mongodb+srv://Bajarangj:Bajarangj@cluster0.wdbi5.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    // create a collection of name meetups for above db
    const meetupCollection = db.collection("meetups");

    // insert data(document) in a collection
    const result = await meetupCollection.insertOne(data);

    console.log(result);

    // close db connection
    client.close();

    res.status(201).json({
      message: "Meetup Inserted!",
    });
  }
};

export default handler;
