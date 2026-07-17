import { X } from "lucide-react";
import { useEffect, useState } from "react";

function Setting({ onClick, language, translations }) {
  const currentTranslations = translations?.[language] || translations || {};

  const [inputData, setInputData] = useState({
    oldPass: "",
    newPass: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setInputData({
      oldPass: "",
      newPass: "",
    });
    setSuccess("");
    setError("");
    try {
      const res = await fetch(
        "http://localhost/car_rental/change-password.php",
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            oldPass: inputData.oldPass,
            newPass: inputData.newPass,
          }),
        },
      );
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error: ${errorText}`);
      }
      const data = await res.json();
      if (data.success) {
        setSuccess(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form
      onSubmit={(e) => handlePasswordChange(e)}
      className="absolute bg-gray-50 px-4 py-6  max-w-1/3 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border border-secondary   text-xs rounded-md"
    >
      <X
        onClick={() => onClick(false)}
        className="absolute top-2 right-2 bg-red-200 rounded-full p-1 cursor-pointer hover:bg-red-400 duration-200 ease-linear"
      />

      <div className="mb-4 pr-6">
        <h3 className="text-sm font-semibold text-secondary">
          {currentTranslations.changePassword || "Change password"}
        </h3>
      </div>

      {success && (
        <p className="bg-green-50 text-green-500 py-2 my-4 border border-green-300 px-2 rounded-sm">
          {success}
        </p>
      )}

      {error && (
        <p className="bg-red-50 text-accent py-2 my-4 border border-red-300 px-2 rounded-sm">
          {error}
        </p>
      )}

      <label htmlFor="old-pass">
        {currentTranslations.oldPassword || "Old password"}:
      </label>
      <input
        value={inputData.oldPass}
        onChange={(e) => handleChange(e)}
        type="text"
        id="old-pass"
        name="oldPass"
        className="w-full bg-gray-100 p-2 rounded-sm border border-gray-200 my-3"
        placeholder={currentTranslations.oldPassword || "Old password"}
      />
      <label htmlFor="new_pass">
        {currentTranslations.newPassword || "New password"}:
      </label>
      <input
        value={inputData.newPass}
        onChange={(e) => handleChange(e)}
        type="text"
        id="new-pass"
        name="newPass"
        className="w-full bg-gray-100 p-2 rounded-sm border border-gray-200 my-3"
        placeholder={currentTranslations.newPassword || "New password"}
      />
      <input
        type="submit"
        value={currentTranslations.save || "Save"}
        className="bg-secondary text-ternary mx-auto inline-flex py-2 px-4 rounded-full mt-3 hover:bg-accent hover:text-secondary duration-200 ease-linear cursor-pointer"
      />
    </form>
  );
}

export default Setting;
