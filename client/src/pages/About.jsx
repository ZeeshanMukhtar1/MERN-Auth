import React from 'react';

function About() {
  return (
    <div className="p-8 bg-[#2c3e50]">
      <h1 className="mb-4 text-3xl font-bold text-center text-white ">
        About the App
      </h1>
      <p className="text-white">
        This Auth app is the boilerplate for a full-stack app with
        authentication. It uses Firebase for authentication and Redux for state
        management. The app is built with Tailwind CSS and uses React Router for
        routing. The backend is built with Express and uses MongoDB for the
        database.
      </p>
      <p className="mt-4 text-white">
        You can use this app as a starting point for building your own app with
        authentication. The app has a simple UI and is easy to customize. Anyone
        can use this app to build their own app with authentication. The app is
        open-source and is available on GitHub. Before copying the code, Just
        give a star to the repo. 😉
      </p>
    </div>
  );
}

export default About;
