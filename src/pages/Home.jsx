import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/courses`);
        // Show only top 3 courses as "Popular"
        setCourses((res.data || []).slice(0, 3));
      } catch (err) {
        console.error("Error fetching popular courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCourses();
  }, [API_BASE_URL]);

  return (
    <main>
      {/* 🌟 Hero Section */}
      <section className="bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-100 text-blue-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-blue-800 drop-shadow-sm">
            Learn. Create. Succeed. 💡 <br />
            With <span className="text-pink-600">SkillSphere</span>
          </h1>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Explore expert-led courses designed to help you master new skills
            and reach your career goals.
          </p>
          <Link
            to="/courses"
            className="bg-gradient-to-r from-blue-600 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-pink-500 hover:to-blue-600 transition-all duration-300"
          >
            Explore Courses 🚀
          </Link>
        </div>
      </section>

      {/* 📘 Popular Courses */}
      <section className="py-20 bg-gradient-to-br from-white via-yellow-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
            🌟 Popular Courses
          </h2>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin h-12 w-12 border-b-4 border-blue-600 rounded-full"></div>
            </div>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              No courses available yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 👨‍🏫 Instructor Section */}
      <section className="py-20 bg-white border-t border-pink-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-12 text-blue-700">
            Learn from World-Class Instructors ✨
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Dr. Maria Gomez",
                img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60",
                title: "AI & Machine Learning Expert",
              },
              {
                name: "Ethan Clark",
                img: "https://images.unsplash.com/photo-1603415526960-f7e0328b9a9d?auto=format&fit=crop&w=800&q=60",
                title: "Full Stack Developer",
              },
              {
                name: "Lisa Tran",
                img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=60",
                title: "UX/UI Designer",
              },
            ].map((instructor, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-pink-50 to-yellow-50 border border-pink-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={instructor.img}
                  alt={instructor.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-blue-700">
                  {instructor.name}
                </h3>
                <p className="text-gray-600">{instructor.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section className="bg-gradient-to-br from-blue-600 to-pink-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-12 drop-shadow-sm">
            ❤️ What Our Learners Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "SkillSphere helped me land my first web development job!",
                name: "Rahul Sharma",
              },
              {
                quote:
                  "The UI/UX course was amazing and very interactive.",
                name: "Priya Verma",
              },
              {
                quote:
                  "Real-world projects made learning fun and practical.",
                name: "Ankit Kumar",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white text-gray-800 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <p className="italic mb-4 text-gray-700">“{t.quote}”</p>
                <h4 className="font-bold text-pink-600">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
