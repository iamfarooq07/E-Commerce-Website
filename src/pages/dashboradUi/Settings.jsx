import { useState } from "react";
import { useEcommerceAuth } from "../../contexts/EcommerceAuthContext";
import { toast } from "react-toastify";

export default function Settings() {
  const { user, updateProfile, updatePassword } = useEcommerceAuth();

  const [profile, setProfile] = useState({ name: user?.name || "", email: user?.email || "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    const result = await updateProfile(profile);
    setSavingProfile(false);
    if (result?.success) {
      toast.success("Profile updated successfully");
    } else {
      toast.error(result?.message || "Failed to update profile");
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSavingPassword(true);
    const result = await updatePassword(passwords.currentPassword, passwords.newPassword);
    setSavingPassword(false);
    if (result?.success) {
      toast.success("Password updated successfully");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      toast.error(result?.message || "Failed to update password");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-start py-10">
      <div className="w-[90%] max-w-5xl space-y-6">

        {/* Profile Settings */}
        <form onSubmit={handleProfileSave} className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Name</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={savingProfile}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-2 rounded text-white font-semibold"
            >
              {savingProfile ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>

        {/* Password Settings */}
        <form onSubmit={handlePasswordSave} className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm">Current Password</label>
              <input
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                type="password"
                placeholder="Current password"
                required
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">New Password</label>
              <input
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                type="password"
                placeholder="New password"
                required
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Confirm Password</label>
              <input
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                type="password"
                placeholder="Confirm new password"
                required
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={savingPassword}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-2 rounded text-white font-semibold"
            >
              {savingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>

        {/* Admin Info */}
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Admin Info</h2>
          <p className="text-gray-400 text-sm">Role: <span className="text-white capitalize">{user?.role}</span></p>
          <p className="text-gray-400 text-sm mt-1">Member since: <span className="text-white">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</span></p>
        </div>
      </div>
    </div>
  );
}
