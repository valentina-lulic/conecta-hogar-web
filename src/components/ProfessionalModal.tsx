interface Profesional {
  nombre: string;
  whatsapp: string;
  telefono: string;
  email: string;
}

interface ProfesionalModalProps {
  profesional: Profesional | null;
  cerrar: () => void;
}


function ProfesionalModal({ profesional, cerrar }: ProfesionalModalProps) {

  if (!profesional) {
    return null;
  }


  return (
    <div 
      className="modal-overlay"
      onClick={cerrar}
    >

      <div 
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button 
          className="close"
          onClick={cerrar}
        >
          ✕
        </button>


        <div className="modal-avatar">
          {profesional.nombre.charAt(0)}
        </div>


        <h2>
          {profesional.nombre}
        </h2>


        <div className="modal-contact">

          <a href={`https://wa.me/${profesional.whatsapp}`}>
            WhatsApp
          </a>


          <a href={`tel:${profesional.telefono}`}>
            {profesional.telefono}
          </a>


          <a href={`mailto:${profesional.email}`}>
            {profesional.email}
          </a>

        </div>

      </div>

    </div>
  );
}


export default ProfesionalModal;