import React, { useState } from 'react';

const faqs = [
    { question: "¿Qué documentos necesito para regularizar mi situación migratoria?", answer: "El Instituto Nacional de Migración (INAMI) ofrece opciones para regularizar la estancia por razones humanitarias, vínculo familiar, documento vencido, y realizar actividades no autorizadas.Los documentos que necesitas para regularizar tu situación migratoria en México dependen de la razón por la que solicites la regularización.   " },
    { question: "¿Cómo solicitar asilo o refugio en este país?", answer: "Para solicitar refugio en México, puedes acudir a la Comisión Mexicana de Ayuda a Refugiados (COMAR) o al Instituto Nacional de Migración (INM)" },
    { question: "¿Cuáles son los requisitos para obtener una visa de trabajo?", answer: "Los requisitos para obtener una visa de trabajo varían según el país y el tipo de visa.Para aplicar para una visa de trabajador permanente en Estados Unidos, se debe: Presentar los formularios y documentos requeridos, Pagar las tarifas de procesamiento, Acudir a una entrevista de visa, Realizar exámenes médicos.  " },
    { question: "¿Qué hacer si mi visa está por expirar?", answer: "Si tu visa de turista para Estados Unidos está por expirar, debes renovarla en un consulado o embajada de Estados Unidos en el extranjero. " },
    { question: "¿Dónde puedo obtener asistencia legal gratuita?", answer: "En México, puedes obtener asistencia legal gratuita en la Defensoría Pública, Locatel, el DIF, y el INAPAM" },
    { question: "¿Dónde puedo buscar empleo como migrante?", answer: "Para buscar trabajo como migrante, puedes consultar vacantes en la Organización Internacional para las Migraciones (OIM), el Instituto Nacional de Migración (INM), y otras fuentes" },
    { question: "¿Qué derechos laborales tengo como trabajador migrante?", answer: "Los trabajadores migrantes tienen acceso a todos los derechos laborales, independientemente de su situación migratoria." },
    { question: "¿Existen programas de capacitación o becas para migrantes?", answer: "Sí, existen programas de becas y capacitación para migrantes, tanto en México como en otros países. En mexico existe el programa 3x1 para migrantes consulta mas informacion en www.gob.mx" },
    { question: "¿Cómo acceder a servicios de salud pública como migrante?", answer: "Los migrantes tienen derecho a recibir atención médica gratuita en caso de urgencia, y pueden acceder a servicios de salud pública. " },
    { question: "Cuáles son mis derechos como migrante en este país", answer: "Las personas migrantes en México tienen derecho a los mismos derechos humanos que cualquier otro ciudadano, como la libertad de expresión, la igualdad y la no discriminación" },
    { question: "¿Dónde puedo recibir atención psicológica o emocional?", answer: "Puedes recibir atención psicológica o emocional en el IMSS, la Defensoría UNAM, la Línea de la Vida, el Consejo Ciudadano, y otros servicios" },
    { question: "¿Qué hacer en caso de una emergencia médica?", answer: "En caso de una emergencia médica, debes llamar al 911 o acudir a la sala de emergencias. Si la persona está en riesgo de vida o puede empeorar en el camino al hospital, es importante actuar con rapidez. " }
];

const FreqAskedQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Preguntas Frecuentes</h2>
      <div className="accordion">
        {faqs.map((faq, index) => (
          <div className="card mb-2" key={index}>
            <div className="card-header bg-primary text-white" onClick={() => toggleFAQ(index)} style={{ cursor: 'pointer' }}>
              <h5 className="mb-0">{faq.question}</h5>
            </div>
            <div className={`collapse ${openIndex === index ? 'show' : ''}`}>
              <div className="card-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreqAskedQuestions;