import Wrapper from "~/components/Layout/Wrapper";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "alle" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export default function Index() {
  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center ">
        <header className="text-center">
          <h1 className="text-7xl font-bold text-blue-600 mb-4">
            Strength begins <br />
            with <br /> Seeking Help
          </h1>
          <p className="text-lg text-gray-700 max-w-lg mx-auto mb-8">
            Empower Yourself: Reach Out and Rise Strong.
          </p>
            <Link to="/role" className="bg-blue-600 text-white font-bold py-6 px-12 rounded-full hover:bg-blue-300 inline-block transition-colors duration-300 ease-in-out">
              Get Support Now
            </Link>
        </header>
      </div>
    </Wrapper>
  );
}
