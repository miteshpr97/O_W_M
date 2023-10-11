import React, { useState } from 'react';
import LogisticsAccordion from './LogisticsAccordion';
import MHEAccordion from './MHEAccordion';
import SpecialAccordion from './SpecialAccordion';
import ManAccordion from './ManAccordion';

const Todo = ({JobNo, handleSubmit}) => {
  const [logisticsExpanded, setLogisticsExpanded] = useState(true);
  const [mheExpanded, setMheExpanded] = useState(false);
  const [manExpanded, setmanExpanded] = useState(true);
  const [specialExpanded, setspecialExpanded] = useState(true);



  // const [activeAccordion, setActiveAccordion] = useState(null);
  const [logisticsFormData, setLogisticsFormData] = useState([]);
  const [mheFormData, setMheFormData] = useState([]);
  const [manPowerFormData, setManPowerFormData] = useState([]);
  const [specialFormData, setSpecialFormData] = useState([]);

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL; 

  const handleLogisticsAccordionChange = () => {
    setLogisticsExpanded(!logisticsExpanded);
  };

  const handleMheAccordionChange = () => {
    setMheExpanded(!mheExpanded);
  };

  const handleManAccordionChange = () => {
    setmanExpanded(!manExpanded);
  };

  const handlespecialAccordionChange = () => {
    setspecialExpanded(!specialExpanded);
  };



  const handleSubmitAllData = async () => {
    try {

    
      // Submit Logistics Data
      const logisticsResponse = await fetch(`${REACT_APP_API_URL}api/logistics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logisticsFormData),
      });

      if (logisticsResponse.ok) {
        console.log('Logistics data submitted successfully');
        setLogisticsFormData([]);
      } else {
        console.error('Failed to submit logistics data');
      }

      // Submit MHE Data
      const mheResponse = await fetch(`${REACT_APP_API_URL}http://localhost:3306/api/mhe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mheFormData),
      });

      if (mheResponse.ok) {
        console.log('MHE data submitted successfully');
        setMheFormData([]);
      } else {
        console.error('Failed to submit MHE data');
      }

      // Submit ManPower Data
      const manPowerResponse = await fetch(`${REACT_APP_API_URL}api/manPower`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manPowerFormData),
      });

      if (manPowerResponse.ok) {
        console.log('ManPower data submitted successfully');
        setManPowerFormData([]);
      } else {
        console.error('Failed to submit ManPower data');
      }

      // Submit Special Data
      const specialResponse = await fetch(`${REACT_APP_API_URL}api/special`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(specialFormData),
      });

      if (specialResponse.ok) {
        console.log('Special data submitted successfully');
        setSpecialFormData([]);
      } else {
        console.error('Failed to submit Special data');
      }

      handleSubmit();

    } catch (error) {
      console.error('Network error:', error);
    }   
  };



  return (
    <div>
      {/* Logistics Accordion */}
      <LogisticsAccordion
        expanded={logisticsExpanded}
        onAccordionChange={handleLogisticsAccordionChange}
        formData={logisticsFormData}
        setFormData={setLogisticsFormData}
        jobNo={JobNo} // Pass the JobNo data here
      />

      {/* MHE Accordion */}
      <MHEAccordion
        expanded={mheExpanded}
        onAccordionChange={handleMheAccordionChange}
        formData={mheFormData}
        setFormData={setMheFormData}
        jobNo={JobNo} // Pass the JobNo data here
      />

      {/* ManPower Accordion */}
      <ManAccordion
        expanded={manExpanded}
        onAccordionChange={handleManAccordionChange}
        formData={manPowerFormData}
        setFormData={setManPowerFormData}
        jobNo={JobNo} // Pass the JobNo data here
      />

      {/* Special Accordion */}
      <SpecialAccordion
        expanded={specialExpanded}
        onAccordionChange={handlespecialAccordionChange}
        formData={specialFormData}
        setFormData={setSpecialFormData}
        jobNo={JobNo} // Pass the JobNo data here
      />

      <div style={{display: "flex", justifyContent:"flex-end"}}>
      <button onClick={handleSubmitAllData} style={{
          backgroundColor: '#15698c',
          color: 'white',
          borderRadius: '4px',
          marginTop: "5px",
          padding: '10px 20px',
          fontSize: '18px',
          cursor: 'pointer',
          
        }}>
          Submit  Data
        </button>
      </div>
      

    </div>
  );
};

export default Todo;


