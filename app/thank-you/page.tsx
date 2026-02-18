export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
      
      <div className="max-w-2xl w-full bg-zinc-900 border border-purple-600 rounded-2xl p-10 text-center">

        <div className="text-5xl mb-6">✅</div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Payment Received
        </h1>

        <p className="text-gray-400 mb-8">
          Thank you for purchasing your HeiyuQuiz license.
          We’re preparing your branded deployment and will contact you shortly.
        </p>

        <div className="bg-black border border-gray-800 rounded-xl p-6 text-left mb-8">
          <p className="text-sm text-gray-400 mb-2">
            What happens next:
          </p>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Confirmation email sent</li>
            <li>• Branding details requested</li>
            <li>• Deployment scheduled within 24 hours</li>
          </ul>
        </div>

        <a
          href="/"
          className="inline-block bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg font-semibold transition"
        >
          Back to Home
        </a>

      </div>

    </main>
  );
}
