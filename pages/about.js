import React from "react";
import { client } from "../src/sanity/client";
import Link from "next/link";

export async function getServerSideProps() {
  // Fetch data from external API

  const EVENTS_QUERY = `*[_type == "event" && defined(slug.current)]{_id, name, slug, date}|order(date desc)`;
  const events = await client.fetch(EVENTS_QUERY);
  // Pass data to the page via props
  return {
    props: {
      events,
    },
  };
}

const About = ({ events }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
        Events
      </h2>
      <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 lg:gap-8">
        {events.map((event) => (
          <li
            className="event-card bg-white dark:bg-gray-950 p-4 rounded-lg shadow-md"
            key={event._id}
          >
            <Link
              className="hover:underline"
              href={`/events/${event.slug.current}`}
            >
              <h2 className="text-xl font-semibold">{event?.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {new Date(event?.date).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default About;
