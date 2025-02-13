import Wrapper from "~/components/Layout/Wrapper";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const words = ["Strength", "Courage", "Growth", "Healing", "Hope"];

export const meta: MetaFunction = () => {
  return [
    { title: "confide" },
    {
      name: "description",
      content:
        "Confide connects those seeking mental health support with those willing to provide help. Join a safe and supportive community today.",
    },
    {
      name: "keywords",
      content:
        "confide, mental health, emotional support, counseling, therapy, community, mental wellness, talk therapy, depression help, anxiety support",
    },
    { name: "author", content: "elliotawe" },
    {
      name: "og:title",
      content: "Confide - A Safe Space for Mental Health Support",
    },
    {
      name: "og:description",
      content:
        "Find mental health support or offer guidance in a caring community.",
    },
    {
      name: "og:image",
      content: "https://confide.onrender.com/confide-log.png",
    },
    { name: "og:type", content: "website" },
    { name: "og:url", content: "https://confide.onrender.com" },
  ];
};
export default function Index() {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setCurrentWord(words[index]);
  }, [index]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Confide",
    url: "https://confide.onrender.com",
    logo: "https://confide.onrender.com/confide-log.png",
    description:
      "Confide connects those seeking mental health support with those willing to provide help. Join a safe and supportive community today.",
    sameAs: [
      "https://github.com/ell20-sys",
      "https://linkedin.com/in/elliot-awe",
      "https://x.com/elliot_awe",
    ],
  };
  return (
    <>
      <Wrapper>
        <div className="flex flex-col items-center justify-center ">
          <header className="text-center">
            <h1 className="text-7xl font-bold text-blue-600 mb-4">
              {/* Strength  */}
              <AnimatePresence mode="wait">
                <AnimatedWord text={currentWord} />
              </AnimatePresence>{" "}
              begins with <br /> Seeking Help
            </h1>
            <p className="text-lg text-gray-700 max-w-lg mx-auto mb-8">
              Empower Yourself: Reach Out and Rise Strong.
            </p>
            <Link
              to="/role"
              className="bg-blue-600 text-white font-bold py-6 px-12 rounded-full hover:bg-blue-300 inline-block transition-colors duration-300 ease-in-out"
            >
              Get Support Now
            </Link>
          </header>
        </div>
      </Wrapper>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </>
  );
}

const AnimatedWord = ({ text }: { text: string }) => (
  <motion.span
    key={text}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="absolue"
  >
    {text}
  </motion.span>
);
