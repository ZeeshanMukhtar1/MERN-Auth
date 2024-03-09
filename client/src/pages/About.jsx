import React from 'react';

function About() {
  return (
    <div className="p-8 bg-gray-100">
      <h1 className="mb-4 text-3xl font-bold text-center">About the App</h1>
      <p className="text-gray-600">
        This Auth app is the boilerplate for a full-stack app with
        authentication. It uses Firebase for authentication and Redux for state
        management. The app is built with Tailwind CSS and uses React Router for
        routing. The backend is built with Express and uses MongoDB for the
        database.
      </p>
      <p className="mt-4 text-gray-600">
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
