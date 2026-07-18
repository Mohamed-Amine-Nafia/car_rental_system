import { Clock, Mail, MapPin, Phone } from "lucide-react";

function Footer({ isDarkMode, language }) {
  return (
    <div id="footer" className="p-5 flex flex-col  w-full">
      <h3
        className={`text-xl w-fit md:text-2xl font-medium border-b-2  whitespace-nowrap ${isDarkMode ? "text-ternary border-ternary" : "text-secondary border-secondary"}`}
      >
        {language === "en" ? "CONTACT US" : "تواصل معنا"}
      </h3>
      <div
        className={`flex flex-col mt-6 md:flex-row md:justify-between md:items-center border-2 gap-4  p-5  rounded-xl ${isDarkMode ? "bg-gray-900 border-gray-800 " : "bg-secondary "}`}
      >
        <div className="w-full md:w-1/2">
          <div className="text-ternary text-sm md:text-base">
            <h4 className="inline-flex items-center font-nevera">RENTX</h4>
          </div>
          <div className="text-ternary mt-5 text-sm">
            <span className="text-ternary inline-flex ">
              {language === "en" ? "Contact us:" : "تواصل معنا:"}
            </span>
            <br />
            <span className="inline-flex items-center gap-1.5 mt-3 text-xs">
              <Mail size={17} />
              exmaple@email.com
            </span>{" "}
            <br />
            <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs">
              <Phone size={17} />
              +212600000000
            </span>
            <br />
            <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs">
              <Clock size={17} />
              {language === "en"
                ? "Open: 7 days/week"
                : "مفتوح: 7 أيام/الأسبوع"}
              <span className="text-text-ternary">24h/24h</span>
            </span>
            <br />
            <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs">
              <MapPin size={17} />
              EL WAHDA 01, AV AL HIZAM AL KABIR, NR 223
            </span>
          </div>

          <div
            className={` text-ternary text-xs flex mt-6 items-center gap-1  pb-5 rounded-br-xl rounded-bl-xl ${isDarkMode ? "bg-gray-900 " : "bg-secondary"}`}
          >
            <span className="text-sm">&copy;</span>
            <span>{new Date().getFullYear()}</span>
            <span>
              {language === "en"
                ? "RENTX All rights reserved"
                : "RENTX جميع الحقوق محفوظة"}
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <iframe
            className="w-full h-64 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27001.04946901889!2d-13.233519420898462!3d27.13038620000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc37738ba690eaff%3A0x15d364ef7c9a343d!2sSt%C3%A9%20OUZLAF%20DRIVE!5e1!3m2!1sen!2s!4v1780327682543!5m2!1sen!2s"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
