import React, { Fragment } from "react";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups Manager</title>
        <meta
          name='description'
          content='Application which is giving informations about all meetups in Maharashtra'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export const getStaticProps = async () => {
  // here we can call to the API and return data as a props and we can use that data in the page component. the pgae compoonet will get called adter execution of getStaticProps() method, so fetched API data will be accessible to componet when it renders first time only

  // add data to database
  const client = await MongoClient.connect(
    "mongodb+srv://Bajarangj:Bajarangj@cluster0.wdbi5.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  // create a collection of name meetups for above db
  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          id: meetup._id.toString(),
          title: meetup.title,
          image: meetup.image,
          description: meetup.description,
          address: meetup.address,
        };
      }),
      //as getStaticProps only execute when we build our app, the revalidate helps to fetch data after every 10 seconds from the API, so that our app will be upto date with the database
      revalidate: 1,
    },
  };
};
// // alternative to getServerSideProps
// export async function getServerSideProps(context) {

//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
