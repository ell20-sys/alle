import Wrapper from "~/components/Layout/Wrapper";

export default function PrivacyPolicyPage() {
  return (
    <Wrapper>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 font-borel">Privacy Policy</h1>
        <p className="mb-4">
          This Privacy Policy describes how we handle your personal information
          and data.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We collect personal information that you provide to us directly, such
          as your name, email address, and any other details you provide when
          using our services.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use your information to provide, maintain, and improve our
          services. This includes responding to inquiries, processing
          transactions, and sending you updates and promotional materials.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">3. Data Security</h2>
        <p className="mb-4">
          We implement reasonable security measures to protect your personal
          information from unauthorized access, use, or disclosure. However, no
          method of transmission over the internet or electronic storage is 100%
          secure.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">4. Your Choices</h2>
        <p className="mb-4">
          You may update or delete your personal information by contacting us
          directly. You may also opt-out of receiving promotional communications
          from us.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          5. Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on our website.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at privacy@example.com.
        </p>
      </div>
    </Wrapper>
  );
}
