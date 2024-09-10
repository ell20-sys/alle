import Wrapper from "~/components/Layout/Wrapper";

export default function About() {
  return (
    <Wrapper>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 font-borel">About alle</h1>
        <p className="text-lg mb-6">
              <span className="font-borel">alle</span> is a platform dedicated
              to connecting those seeking mental health support and those
              willing to provide the support. Whether you need help or want to
              offer support, this community is here for you.
            </p>
      </div>
    </Wrapper>
  );
}
