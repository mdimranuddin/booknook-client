export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="section-title">Privacy Policy</h1>
        <p className="mt-3 opacity-70">Last updated: November 2026</p>
      </div>

      <div className="card bg-base-100">
        <div className="card-body space-y-4">
          <h2 className="text-2xl font-bold">What we collect</h2>
          <p>
            When you register or sign in with Google, BookNook stores your name,
            your email address and your profile photo link. When you add or
            borrow a book, we also store the book details and the borrow dates.
          </p>

          <h2 className="text-2xl font-bold">How we use it</h2>
          <p>
            We use this information only to log you in, to show your name and
            photo in the app, and to keep track of the books you added and
            borrowed. We do not sell your data and we do not share it with
            advertisers.
          </p>

          <h2 className="text-2xl font-bold">Where it is stored</h2>
          <p>
            Your data is stored in a MongoDB database. Passwords are never saved
            as plain text. Sign in with Google gives us only your basic profile
            (name, email and photo).
          </p>

          <h2 className="text-2xl font-bold">Your choices</h2>
          <p>
            You can ask us to delete your account and your data at any time by
            writing to support@booknook.com.
          </p>

          <h2 className="text-2xl font-bold">About this project</h2>
          <p>
            BookNook is a learning project built as a web development
            assignment, so please do not enter any sensitive information.
          </p>
        </div>
      </div>
    </div>
  );
}
