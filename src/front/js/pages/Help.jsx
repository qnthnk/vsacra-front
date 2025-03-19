import React, { useState } from 'react';
import { RiHome6Fill } from "react-icons/ri";

const emergencyNumbers = {
    "Aguascalientes": ["911 - Emergencias", "449-970-4075 - Cruz Roja", "449-970-4063 - Protección Civil"],
    "Baja California": ["911 - Emergencias", "686-553-2026 - Cruz Roja", "686-558-1212 - Protección Civil"],
    "Baja California Sur": ["911 - Emergencias", "612-122-8741 - Cruz Roja", "612-125-8740 - Protección Civil"],
    "Campeche": ["911 - Emergencias", "981-816-1111 - Cruz Roja", "981-816-0665 - Protección Civil"],
    "Chiapas": ["911 - Emergencias", "961-612-1616 - Cruz Roja", "961-612-0030 - Protección Civil"],
    "Chihuahua": ["911 - Emergencias", "614-414-3333 - Cruz Roja", "614-414-3345 - Protección Civil"],
    "Ciudad de México": ["911 - Emergencias", "5658-1111 - Locatel", "5683-2222 - Cruz Roja"],
    "Coahuila": ["911 - Emergencias", "844-412-1212 - Cruz Roja", "844-412-3421 - Protección Civil"],
    "Colima": ["911 - Emergencias", "312-312-1122 - Cruz Roja", "312-314-1414 - Protección Civil"],
    "Durango": ["911 - Emergencias", "618-825-8258 - Cruz Roja", "618-813-1234 - Protección Civil"],
    "Estado de México": ["911 - Emergencias", "722-214-2258 - Protección Civil", "722-213-8911 - Bomberos"],
    "Guanajuato": ["911 - Emergencias", "473-732-7845 - Cruz Roja", "473-731-5588 - Protección Civil"],
    "Guerrero": ["911 - Emergencias", "744-484-1325 - Cruz Roja", "744-483-5153 - Protección Civil"],
    "Hidalgo": ["911 - Emergencias", "771-713-7070 - Cruz Roja", "771-714-8622 - Protección Civil"],
    "Jalisco": ["911 - Emergencias", "33-3619-2425 - Cruz Roja", "33-3675-3060 - Protección Civil"],
    "Michoacán": ["911 - Emergencias", "443-312-1818 - Cruz Roja", "443-313-8101 - Protección Civil"],
    "Morelos": ["911 - Emergencias", "777-313-5500 - Cruz Roja", "777-317-6100 - Protección Civil"],
    "Nayarit": ["911 - Emergencias", "311-212-0161 - Cruz Roja", "311-211-2144 - Protección Civil"],
    "Nuevo León": ["911 - Emergencias", "81-8342-7744 - Cruz Roja", "81-2020-5800 - Protección Civil"],
    "Oaxaca": ["911 - Emergencias", "951-514-1212 - Cruz Roja", "951-518-1234 - Protección Civil"],
    "Puebla": ["911 - Emergencias", "222-214-4040 - Cruz Roja", "222-240-7627 - Protección Civil"],
    "Querétaro": ["911 - Emergencias", "442-212-1212 - Cruz Roja", "442-214-1234 - Protección Civil"],
    "Quintana Roo": ["911 - Emergencias", "998-884-1234 - Cruz Roja", "998-884-2664 - Protección Civil"],
    "San Luis Potosí": ["911 - Emergencias", "444-814-1818 - Cruz Roja", "444-815-3435 - Protección Civil"],
    "Sinaloa": ["911 - Emergencias", "667-714-1911 - Cruz Roja", "667-716-1212 - Protección Civil"],
    "Sonora": ["911 - Emergencias", "662-217-0000 - Cruz Roja", "662-214-1234 - Protección Civil"],
    "Tabasco": ["911 - Emergencias", "993-354-1234 - Cruz Roja", "993-356-3456 - Protección Civil"],
    "Tamaulipas": ["911 - Emergencias", "834-315-1212 - Cruz Roja", "834-318-2345 - Protección Civil"],
    "Tlaxcala": ["911 - Emergencias", "246-464-1212 - Cruz Roja", "246-464-3456 - Protección Civil"],
    "Veracruz": ["911 - Emergencias", "229-921-4567 - Cruz Roja", "229-922-5678 - Protección Civil"],
    "Yucatán": ["911 - Emergencias", "999-924-9813 - Protección Civil", "999-924-9824 - Cruz Roja"],
    "Zacatecas": ["911 - Emergencias", "492-922-0000 - Cruz Roja", "492-923-1234 - Protección Civil"],
};

const Help = () => {
    const [selectedState, setSelectedState] = useState(null);

    return (
        <div className="container">
            <h2 className="text-center mb-4">CONTACTAR AYUDA</h2>
            <div className="accordion" id="emergencyAccordion">
                {Object.entries(emergencyNumbers).map(([state, numbers], index) => (
                    <div className="accordion-item" key={index}>
                        <h2 className="accordion-header">
                            <button 
                                className={`accordion-button ${selectedState === state ? '' : 'collapsed'}`} 
                                type="button" 
                                onClick={() => setSelectedState(selectedState === state ? null : state)}
                            >
                                {state}
                            </button>
                        </h2>
                        {selectedState === state && (
                            <div className="accordion-collapse collapse show">
                                <div className="accordion-body">
                                    <ul className="list-group">
                                        {numbers.map((num, i) => (
                                            <li key={i} className="list-group-item">{num}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
             <div style={{ display: 'flex', justifyContent: 'center' }}>
                                  <button className="login-buttonesN" onClick={() => {
                                      const isLoggedIn = true; // Aquí deberías verificar si el usuario está loggeado correctamente
                                      if (isLoggedIn) {
                                          window.location.href = '/home';
                                      } else {
                                          window.location.href = '/login';
                                      }
                                  }}><RiHome6Fill style={{fontSize:"2em"}}/></button>
                              </div>
        </div>
    );
};

export default Help;