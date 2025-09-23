'use client'
import AutocompleteInput from '@/components/AutoComplete';
import React, { useState } from 'react';

export default function ParentComponent() {
  const [selectedName, setSelectedName] = useState('');



  const handleNameChange = (value: string) => {
    setSelectedName(value);
    console.log('Selected name:', value);
  };

  const handleAddNewName = (newName: string) => {
    console.log('New name added:', newName);
  };


  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Controlled Autocomplete Example</h2>
        
        {/* Basic usage */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select a name:</label>
          <AutocompleteInput
            value={selectedName}
            onChange={handleNameChange}
            placeholder="Choose or type a name..."
            onAddNew={handleAddNewName}
          />
          <div className="mt-2 p-3 bg-gray-100 rounded">
            <p>Selected value: <strong>{selectedName || 'None'}</strong></p>
          </div>
        </div>

      </div>

      {/* Example of setting value from parent */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-bold mb-2">Set Value from Parent</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedName('Alice Johnson')}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Set to Alice
          </button>
          <button 
            onClick={() => setSelectedName('Bob Smith')}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Set to Bob
          </button>
          <button 
            onClick={() => setSelectedName('')}
            className="px-3 py-1 bg-gray-500 text-white rounded"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}