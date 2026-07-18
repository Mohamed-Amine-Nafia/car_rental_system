import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    id: 0,
    q: {
      en: "How do I book a car?",
      ar: "كيف أحجز سيارة؟",
    },
    a: {
      en: "Choose your vehicle, select the rental dates, and send the booking form. Our team will contact you to confirm availability.",
      ar: "اختر سيارتك، حدد تواريخ الكراء، وأرسل نموذج الحجز. سيتواصل معك فريقنا لتأكيد التوفر.",
    },
  },
  {
    id: 1,
    q: {
      en: "Is the online booking final?",
      ar: "هل الحجز عبر الإنترنت نهائي؟",
    },
    a: {
      en: "No. The online form is a booking request. The booking is confirmed after our team checks availability.",
      ar: "لا. النموذج عبر الإنترنت هو طلب حجز. يتم تأكيد الحجز بعد تحقق فريقنا من التوفر.",
    },
  },
  {
    id: 2,
    q: {
      en: "Can I change or cancel my booking?",
      ar: "هل يمكنني تعديل أو إلغاء الحجز؟",
    },
    a: {
      en: "Yes, contact us as soon as possible to change or cancel your booking.",
      ar: "نعم، تواصل معنا في أقرب وقت ممكن لتعديل أو إلغاء حجزك.",
    },
  },
  {
    id: 3,
    q: {
      en: "What documents are required to rent a car?",
      ar: "ما الوثائق المطلوبة لكراء سيارة؟",
    },
    a: {
      en: "A valid driver's license, an ID card or passport, and any other document required by local regulations.",
      ar: "رخصة قيادة سارية، بطاقة تعريف أو جواز سفر، وأي وثيقة أخرى تتطلبها القوانين المحلية.",
    },
  },
  {
    id: 4,
    q: {
      en: "What is the minimum age to rent a car?",
      ar: "ما هو الحد الأدنى للعمر لكراء سيارة؟",
    },
    a: {
      en: "The minimum age is usually 21, but it may vary depending on the vehicle category.",
      ar: "الحد الأدنى للعمر عادة هو 21 سنة، وقد يختلف حسب فئة السيارة.",
    },
  },
  {
    id: 5,
    q: {
      en: "Can foreign tourists rent a car?",
      ar: "هل يمكن للسياح الأجانب كراء سيارة؟",
    },
    a: {
      en: "Yes, visitors can rent a car with a valid driver's license and a passport.",
      ar: "نعم، يمكن للزوار كراء سيارة برخصة قيادة سارية وجواز سفر.",
    },
  },
];

function Faq({ isDarkMode, language }) {
  const [isActive, setActive] = useState(null);

  return (
    <div
      id="faqs"
      className={`mt-10 p-5 ${language === "ar" ? "font-Cairo" : "font-Poppins"}`}
    >
      <div className="flex items-center gap-1.5 text-secondary">
        <h3
          className={`text-xl md:text-2xl font-medium border-b-2 whitespace-nowrap ${language === "ar" ? "font-Cairo" : "font-Poppins"} ${isDarkMode ? "text-ternary border-ternary" : "text-secondary border-secondary"}`}
        >
          {language === "en" ? "FAQS" : "الأسئلة الشائعة"}
        </h3>
        <span
          className={`text-xs md:text-sm whitespace-nowrap ${language === "ar" ? "font-Cairo" : "font-Poppins"} ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
        >
          {language === "en"
            ? "(Frequently asked questions)"
            : "(الأسئلة الشائعة)"}
        </span>
      </div>
      <div className="mt-8 flex flex-col gap-0.5">
        {faqs.map((faq, index) => {
          return (
            <div key={faq.id} className="flex flex-col">
              <h4
                onClick={() => setActive((i) => (i === index ? null : index))}
                className={` text-secondary py-2.5 px-4 cursor-pointer border-b   hover:bg-accent hover:text-secondary duration-200 ease-linear rounded-xl inline-flex items-center justify-between text-sm md:text-base ${isDarkMode ? "bg-gray-900 border-b-gray-900 text-ternary" : "bg-ternary-fade border-b-ternary text-secondary"} } hover:[&>*:nth-child(1)]:text-secondary`}
              >
                {language === "en" ? "Q" : "س"} :{" "}
                {language === "en" ? faq.q.en : faq.q.ar}
                <span
                  className={`${isActive === index ? "rotate-180" : "rotate-0"}  duration-200 ease-linear ${isDarkMode ? "text-ternary" : "text-secondary"}`}
                >
                  <ChevronDown />
                </span>
              </h4>
              <p
                className={`${isActive === index ? "h-fit px-2 py-3" : "h-0"} overflow-hidden  duration-200 ease-linear rounded-xl text-xs md:text-sm ${isDarkMode ? "text-ternary" : "text-secondary"}`}
              >
                {language === "en" ? "A" : "ج"} :{" "}
                {language === "en" ? faq.a.en : faq.a.ar}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Faq;
