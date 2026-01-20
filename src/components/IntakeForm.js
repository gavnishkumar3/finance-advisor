import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PlusCircle, Trash2, ArrowRight } from 'lucide-react';

const IntakeForm = ({ onSubmit, isLoading }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      age: 25,
      marital_status: "Single",
      monthly_income_fixed: 0,
      monthly_income_variable: 0,
      monthly_expenses_rent: 0,
      monthly_expenses_needs: 0,
      monthly_expenses_wants: 0,
      liabilities: [], 
      assets: [],      
      risk_tolerance: "Medium",
      primary_goal: ""
    }
  });

  // Dynamic Fields for Assets
  const { fields: assetFields, append: appendAsset, remove: removeAsset } = useFieldArray({
    control,
    name: "assets"
  });

  // Dynamic Fields for Liabilities
  const { fields: liabilityFields, append: appendLiability, remove: removeLiability } = useFieldArray({
    control,
    name: "liabilities"
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      
      {/* SECTION 1: Personal Details */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">1. Personal Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input 
              type="number" 
              {...register("age", { required: true, min: 18 })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
            <select {...register("marital_status")} className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 2: Income & Expenses */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">2. Monthly Finances</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Income (Salary)</label>
            <input type="number" {...register("monthly_income_fixed", { valueAsNumber: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Variable Income (Bonus/Freelance)</label>
            <input type="number" {...register("monthly_income_variable", { valueAsNumber: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rent / EMI</label>
            <input type="number" {...register("monthly_expenses_rent", { valueAsNumber: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Needs (Groceries, Utilities)</label>
            <input type="number" {...register("monthly_expenses_needs", { valueAsNumber: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wants (Travel, Fun)</label>
            <input type="number" {...register("monthly_expenses_wants", { valueAsNumber: true })} className="w-full p-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
      </div>

      {/* SECTION 3: Dynamic Assets */}
      <div>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-xl font-bold text-gray-800">3. Assets</h3>
          <button 
            type="button" 
            onClick={() => appendAsset({ type: "Stock", value: 0 })}
            className="flex items-center gap-2 text-sm text-green-600 font-semibold hover:text-green-700"
          >
            <PlusCircle size={18} /> Add Asset
          </button>
        </div>
        
        <div className="space-y-4">
          {assetFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-end bg-gray-50 p-4 rounded-lg">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500">Asset Type</label>
                <input 
                  {...register(`assets.${index}.type`)} 
                  placeholder="e.g. Stocks, Gold"
                  className="w-full p-2 border border-gray-300 rounded bg-white" 
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500">Current Value</label>
                <input 
                  type="number" 
                  {...register(`assets.${index}.value`, { valueAsNumber: true })} 
                  className="w-full p-2 border border-gray-300 rounded bg-white" 
                />
              </div>
              <button type="button" onClick={() => removeAsset(index)} className="text-red-500 p-2 hover:bg-red-50 rounded">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          {assetFields.length === 0 && <p className="text-gray-400 italic text-sm">No assets added yet.</p>}
        </div>
      </div>
          
      {/* SECTION 4: Dynamic Liabilities */}
      <div>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-xl font-bold text-gray-800">4. Liabilities (Loans)</h3>
          <button 
            type="button" 
            onClick={() => appendLiability({ type: "Personal Loan", monthly_payment: 0, amount_remaining: 0, interest_rate: 0 })}
            className="flex items-center gap-2 text-sm text-red-600 font-semibold hover:text-red-700"
          >
            <PlusCircle size={18} /> Add Loan
          </button>
        </div>
        
        <div className="space-y-4">
          {liabilityFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-red-50 p-4 rounded-lg border border-red-100">
              <div>
                <label className="block text-xs font-medium text-gray-500">Loan Type</label>
                <input {...register(`liabilities.${index}.type`)} className="w-full p-2 border border-gray-300 rounded" placeholder="e.g. Car Loan" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500">Monthly EMI</label>
                <input type="number" {...register(`liabilities.${index}.monthly_payment`, { valueAsNumber: true })} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500">Total Outstanding</label>
                <input type="number" {...register(`liabilities.${index}.amount_remaining`, { valueAsNumber: true })} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="flex gap-2 items-center">
                 <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-500">Interest %</label>
                    <input type="number" step="0.1" {...register(`liabilities.${index}.interest_rate`, { valueAsNumber: true })} className="w-full p-2 border border-gray-300 rounded" />
                 </div>
                 <button type="button" onClick={() => removeLiability(index)} className="text-red-500 mt-4 p-2">
                    <Trash2 size={20} />
                 </button>
              </div>
            </div>
          ))}
          {liabilityFields.length === 0 && <p className="text-gray-400 italic text-sm">No liabilities added yet.</p>}
        </div>
      </div>

      {/* SECTION 5: Goals */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">5. Goals & Risk</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Risk Tolerance</label>
            <select {...register("risk_tolerance")} className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="Low">Low (Safe & Secure)</option>
              <option value="Medium">Medium (Balanced)</option>
              <option value="High">High (Growth Focused)</option>
            </select>
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Primary Financial Goal</label>
             <input 
               type="text" 
               {...register("primary_goal", { required: true })}
               placeholder="e.g. Buy a house in 5 years, Retire early"
               className="w-full p-2 border border-gray-300 rounded-lg"
             />
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-6">
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          {isLoading ? "Generating Plan..." : <>Generate My Financial Plan <ArrowRight /></>}
        </button>
      </div>
    </form>
  );
};

export default IntakeForm;