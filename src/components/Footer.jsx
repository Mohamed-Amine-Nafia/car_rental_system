import { Clock, Mail, MapPin, Phone } from "lucide-react";

function Footer() {
  return (
    <div id="footer" className="p-5 flex flex-col  w-full">
      <h3 className="text-xl md:text-2xl font-medium border-b-2 w-fit">
        CONTACTEZ NOUS
      </h3>
      <div className="flex flex-col mt-6 md:flex-row md:justify-between md:items-center gap-4 bg-secondary p-5  rounded-xl">
        <div className="w-full md:w-1/2">
          <div className="text-ternary text-sm md:text-base">
            <h4 className="inline-flex items-center font-nevera">OUZLAF</h4>
          </div>
          <div className="text-ternary mt-5 text-sm">
            <span className="text-ternary inline-flex ">Contactez nous:</span>
            <br />
            <span className="inline-flex items-center gap-1.5 mt-3 text-xs">
              <Mail size={17} />
              exmaple@email.com
            </span>{" "}
            <br />
            <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs">
              <Phone size={17} />
              +212664271595
            </span>
            <br />
            <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs">
              <Clock size={17} />
              Ouvert : 7j/7j
              <span className="text-text-ternary">24h/24h</span>
            </span>
            <br />
            <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs">
              <MapPin size={17} />
              EL WAHDA 01, AV AL HIZAM AL KABIR, NR 223
            </span>
          </div>

          <div className="bg-secondary text-ternary text-xs flex mt-6 items-center gap-1  pb-5 rounded-br-xl rounded-bl-xl">
            <span className="text-sm">&copy;</span>
            <span>{new Date().getFullYear()}</span>
            <span>OUZLAF DRIVE Tous droits réservés</span>
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
