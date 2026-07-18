function RentalSteps({ isDarkMode, language }) {
  return (
    <div id="rental-steps" className="p-5">
      <div className="flex gap-1.5 items-center">
        <h2
          className={`text-xl md:text-2xl font-medium border-b-2  whitespace-nowrap ${isDarkMode ? "text-ternary border-ternary" : "text-secondary border-secondary"}`}
        >
          {language === "en" ? "STEPS" : "الخطوات"}
        </h2>
        <span
          className={`text-xs md:text-sm whitespace-nowrap ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
        >
          {language === "en" ? "(How it works)" : "(كيف تعمل الخدمة)"}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
        <div
          className={`p-5 rounded-xl hover:bg-accent duration-200 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-ternary-fade border-ternary"} border-2 `}
        >
          <h4
            className={` md:text-lg ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            {language === "en" ? "1. Choose your vehicle" : "1. اختر سيارتك"}
          </h4>
          <p
            className={`text-xs md:text-sm mt-2 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            {language === "en"
              ? "Browse our fleet and select the vehicle that suits you."
              : "تصفح أسطولنا واختر السيارة التي تناسبك."}
          </p>
        </div>
        <div
          className={`p-5 rounded-xl hover:bg-accent duration-200 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary border-2 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-ternary-fade border-ternary"}`}
        >
          <h4
            className={` md:text-lg ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            {language === "en" ? "2. Select your dates" : "2. اختر التواريخ"}
          </h4>
          <p
            className={`text-xs md:text-sm mt-2 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            {language === "en"
              ? "Enter your preferred pickup and return dates."
              : "حدد تواريخ الاستلام والإرجاع التي تناسبك."}
          </p>
        </div>
        <div
          className={`p-5 rounded-xl hover:bg-accent duration-200 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary border-2 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-ternary-fade border-ternary"}`}
        >
          <h4
            className={` md:text-lg ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            {language === "en" ? "3. Send a booking request" : "3. أرسل طلب الحجز"}
          </h4>
          <p
            className={`text-xs md:text-sm mt-2 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            {language === "en"
              ? "Fill in your details and send your request."
              : "املأ معلوماتك وأرسل طلبك."}
          </p>
        </div>
        <div
          className={`p-5 rounded-xl hover:bg-accent duration-200 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary border-2 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-ternary-fade border-ternary"}`}
        >
          <h4
            className={` md:text-lg ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            {language === "en" ? "4. Request confirmation" : "4. تأكيد الطلب"}
          </h4>
          <p
            className={`text-xs md:text-sm mt-2 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            {language === "en"
              ? "Our team will contact you to confirm vehicle availability."
              : "سيتواصل معك فريقنا لتأكيد توفر السيارة."}
          </p>
        </div>
        <div
          className={`p-5 rounded-xl hover:bg-accent duration-200 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary border-2 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-ternary-fade border-ternary"}`}
        >
          <h4
            className={` md:text-lg ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            {language === "en" ? "5. Visit the agency" : "5. توجه إلى الوكالة"}
          </h4>
          <p
            className={`text-xs md:text-sm mt-2 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            {language === "en"
              ? "Bring the required documents and finalize the rental contract."
              : "أحضر الوثائق المطلوبة وأكمل عقد الكراء."}
          </p>
        </div>
        <div
          className={`p-5 rounded-xl hover:bg-accent duration-200 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary border-2 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-ternary-fade border-ternary"}`}
        >
          <h4
            className={` md:text-lg ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            {language === "en" ? "6. Pick up your vehicle" : "6. استلم سيارتك"}
          </h4>
          <p
            className={`text-xs md:text-sm mt-2 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            {language === "en"
              ? "Take your car and enjoy your trip."
              : "استلم سيارتك واستمتع برحلتك."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RentalSteps;
