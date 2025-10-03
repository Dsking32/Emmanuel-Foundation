import React from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">MySchool</h1>
        <div className="space-x-6">
          <a href="#" className="hover:text-gray-200">Home</a>
          <a href="#" className="hover:text-gray-200">About</a>
          <a href="#" className="hover:text-gray-200">Admissions</a>
          <a href="#" className="hover:text-gray-200">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col justify-center items-center text-center p-10">
        <h2 className="text-4xl font-bold text-green-600">Tailwind is working!</h2>
        <p className="max-w-2xl text-lg mb-6">
          Your future starts here. Apply now, check your admission status, and
          view your results online — all in one place.
        </p>
        <button className="bg-white text-blue-700 px-6 py-3 rounded font-semibold shadow hover:bg-gray-100 transition">
          Apply Now
        </button>
      </header>

      {/* About Section */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold mb-4">About Our School</h3>
        <p className="max-w-3xl mx-auto text-gray-600">
          We are dedicated to academic excellence and holistic education.
          Students can easily apply for admission, check admission lists, and
          view their results online through our platform.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white text-center py-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} MySchool. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
