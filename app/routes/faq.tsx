import Wrapper from "~/components/Layout/Wrapper";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. Please visit our returns page for more details.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support via me at elliotawe@outlook.com or through our contact form.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we offer international shipping. Please check our shipping policy for more information.",
  },
];

export default function FAQPage() {
  return (
    <Wrapper>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 font-borel">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4">
              <h2 className="text-xl font-semibold">{faq.question}</h2>
              <p className="mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
