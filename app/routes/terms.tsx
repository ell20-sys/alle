import Wrapper from "~/components/Layout/Wrapper";

export default function TermsOfServicePage() {
  return (
    <Wrapper>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 font-borel">Terms of Service</h1>
        <p className="mb-4">
          These Terms of Service govern your use of our website and services. By
          accessing or using our website, you agree to be bound by these terms.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4">
          By using our website and services, you agree to comply with and be
          bound by these Terms of Service. If you do not agree with any part of
          these terms, you should not use our website.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">2. Use of Services</h2>
        <p className="mb-4">
          You agree to use our services only for lawful purposes and in
          accordance with these terms. You must not use our services in a manner
          that could damage, disable, or impair our website.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          3. User Responsibilities
        </h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your
          account information and for all activities that occur under your
          account.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          4. Limitation of Liability
        </h2>
        <p className="mb-4">
          To the fullest extent permitted by law, we are not liable for any
          indirect, incidental, or consequential damages arising from your use
          of our services.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">
          5. Changes to Terms
        </h2>
        <p className="mb-4">
          We may update these Terms of Service from time to time. We will notify
          you of any changes by posting the new Terms of Service on our website.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">6. Governing Law</h2>
        <p className="mb-4">
          These terms are governed by and construed in accordance with the laws
          of [Your Country/State], without regard to its conflict of law
          principles.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms of Service, please contact
          us at terms@example.com.
        </p>
      </div>
    </Wrapper>
  );
}
