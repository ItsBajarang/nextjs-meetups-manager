// url: ourdomain.com/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import React, { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function index() {
  const router = useRouter();
  const addMeetupHandler = async (newMeetupInfo) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(newMeetupInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.replace("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add New Meetup</title>
        <meta
          name='description'
          content='Place where you can add beautiful informative meetups'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default index;
