import React, { useState } from 'react';
import IntakeForm from './IntakeForm';
import FinancialReport from './FinancialReport'; // Use the component we made earlier
import axios from 'axios';
const FinancialAdvisor = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  // This function receives the clean JSON data from the child form
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
    
      const response =await axios.post(`http://127.0.0.1:8000/generate-plan`,formData);
      const data = response.data;      
      // 2. Set the report data to state
      console.log("Received report data:", data);
      setReport(data.report);
      
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong generating the report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-900">AI Wealth Architect</h1>
          <p className="text-gray-600 mt-2">Your autonomous personal finance agent</p>
        </div>

        {/* Conditional Rendering: Show Form OR Show Report */}
        {!report ? (
          <IntakeForm onSubmit={handleFormSubmit} isLoading={loading} />
        ) : (
          <div className="animate-fade-in">
             <button 
               onClick={() => setReport(null)}
               className="mb-4 text-blue-600 hover:underline flex items-center gap-1"
             >
               ← Start Over
             </button>
             <FinancialReport reportContent={report} />
          </div>
        )}

      </div>
    </div>
  );
};

export default FinancialAdvisor;