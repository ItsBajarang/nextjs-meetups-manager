import React, { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function index({ meetupData }) {
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name='description' content={meetupData.description} />
      </Head>
      <MeetupDetail
        key={meetupData.id}
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </Fragment>
  );
}

// this function is only there in case of getStaticProps function and we are dynamically taking values from URL (it is used in dynamic pages which tells for which dynamic parameter value, this page need to pregenerated)
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://Bajarangj:Bajarangj@cluster0.wdbi5.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  // create a collection of name meetups for above db
  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: (await meetups).map((meetup) => {
      return {
        params: {
          meetupId: meetup._id.toString(),
        },
      };
    }),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://Bajarangj:Bajarangj@cluster0.wdbi5.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  // create a collection of name meetups for above db
  const meetupCollection = db.collection("meetups");

  const meetup = await meetupCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
};
export default index;
