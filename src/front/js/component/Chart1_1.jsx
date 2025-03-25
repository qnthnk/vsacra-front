import React from 'react'
import EXC from "../../img/Bar-Chart-Vertical.png"
import { useEffect, useState } from 'react';
import axios from 'axios';

const Chart1_1 = () => {
     const { store, actions } = useContext(Context);
      const [detector, setDetector] = useState(false);
      const [payload, setPayload] = useState({
          full_name: "",
          email: "",
          phone_number: "",
          role: "",
      });
       useEffect(() => {
              actions.viewContacts();
          }, [detector]);
  return (
    <div>
      

          <div>
            <img src={EXC} alt="Bar Chart" />
            <ul>
              {nationality.map((nationality, index) => (
                <li key={index}>{nationality}</li>
              ))}
            </ul>
          </div>

    </div>
  )
};

export default Chart1_1