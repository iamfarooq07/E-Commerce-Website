import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Settings() {
  return (
    <div className="min-h-screen bg-black flex justify-center items-start py-10">
      <Link
        to="/dashboard"
        className="fixed left-10 top-30 z-50 flex items-center gap-2 text-blue-500 text-lg hover:text-blue-600"
      >
        <FaArrowLeft />
        Back
      </Link>
      <div className="w-[90%] max-w-5xl space-y-6">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block mb-1">
                Username
              </label>
              <input
                id="username"
                placeholder="Enter your username"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="notifications" className="block mb-1">
                Notifications
              </label>
              <select
                id="notifications"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              >
                <option value="all">All</option>
                <option value="important">Only Important</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>
              <label htmlFor="newsletter" className="block mb-1">
                Newsletter Subscription
              </label>
              <select
                id="newsletter"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              >
                <option value="subscribed">Subscribed</option>
                <option value="unsubscribed">Unsubscribed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy Settings Card */}
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="profileVisibility" className="block mb-1">
                Profile Visibility
              </label>
              <select
                id="profileVisibility"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div>
              <label htmlFor="activityStatus" className="block mb-1">
                Show Activity Status
              </label>
              <select
                id="activityStatus"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              >
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded text-white font-semibold">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
