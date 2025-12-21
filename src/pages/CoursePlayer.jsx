import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import confetti from "canvas-confetti";

export default function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [courseRes, lessonRes, progressRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/courses/${id}`),
          axios.get(`${API_BASE_URL}/lessons/${id}`),
          axios.get(`${API_BASE_URL}/progress/${user.id}/${id}`),
        ]);

        setCourse(courseRes.data);
        setLessons(lessonRes.data || []);
        setProgress(progressRes.data?.completed_percent || 0);
      } catch (err) {
        console.error("Error loading course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate, user]);

  const triggerConfetti = () => {
    const end = Date.now() + 2000;
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleNextLesson = async () => {
    const nextIndex = currentLessonIndex + 1;
    const total = lessons.length;
    const newPercent = Math.min(((nextIndex + 1) / total) * 100, 100);

    try {
      await axios.post(`${API_BASE_URL}/progress/update`, {
        userId: user.id,
        courseId: id,
        percent: newPercent,
      });
      setProgress(newPercent);
    } catch (err) {
      console.error("Progress update failed:", err);
    }

    if (nextIndex < total) {
      setCurrentLessonIndex(nextIndex);
    } else {
      handleCourseCompletion();
    }
  };

  const handleCourseCompletion = async () => {
    setIsFinishing(true);
    triggerConfetti();

    try {
      await axios.post(`${API_BASE_URL}/progress/update`, {
        userId: user.id,
        courseId: id,
        percent: 100,
      });

      await axios.post(`${API_BASE_URL}/certificate/issue`, {
        userId: user.id,
        courseId: id,
        certificateUrl: `${window.location.origin}/certificate/${id}`,
      });

      setTimeout(() => navigate(`/certificate/${id}`), 2000);
    } catch (err) {
      console.error("Certificate creation error:", err);
      alert("Error issuing certificate");
    } finally {
      setIsFinishing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  if (!course) return <p className="text-center">Course not found.</p>;

  const currentLesson =
    lessons.length > 0 ? lessons[currentLessonIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 p-10 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-blue-700">{course.title}</h1>
        <p className="text-gray-600 mb-6">{course.description}</p>

        {currentLesson ? (
          <>
            <h2 className="text-xl font-semibold mb-3">
              🎬 {currentLesson.title}
            </h2>
            <iframe
              className="w-full h-96 rounded-lg mb-6"
              src={currentLesson.video_url}
              title={currentLesson.title}
              allowFullScreen
            />
          </>
        ) : (
          <p>No lessons available.</p>
        )}

        <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleNextLesson}
            disabled={isFinishing}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {currentLessonIndex < lessons.length - 1
              ? "Next Lesson →"
              : "Finish Course 🎓"}
          </button>

          {progress >= 100 && (
            <button
              onClick={() => navigate(`/quiz/${id}`)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
            >
              Take Quiz 🧠
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
