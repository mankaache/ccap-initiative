'use client'
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Loader2 } from 'lucide-react';
import { fetchAllOrganisations } from '@/firebase/services/projectService';
import { Input } from './ui/input';
import { useTranslation } from '@/hooks/useTranslation';

interface AutocompleteInputProps {
  // Controlled value props
  value?: string;
  onChange?: (value: string) => void;
  
  placeholder?: string;
  className?: string;
  
  // Additional functionality
  allowCustomValues?: boolean;
  onAddNew?: (newValue: string) => void;
}

export default function AutocompleteInput({
  value = '',
  onChange,
  placeholder = "Type a name...",
  className = '',
  allowCustomValues = true,
  onAddNew
}: AutocompleteInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const {t} = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [allOrgName, setAllOrgName] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Use useMemo to prevent options from being recreated on every render
  const options = useMemo(() => 
    allOrgName.map((obj: any) => obj.name), 
    [allOrgName] // Only recalculate when allOrgName changes
  );

  // Load organizations only once on component mount
  useEffect(() => {
    const loadOrganisations = async () => {
      try {
        setLoading(true);
        const allOrganisations = await fetchAllOrganisations();
        setAllOrgName(allOrganisations as any);
      } catch (err) {
        console.error(err);
        console.error("Failed to fetch organisations");
      } finally {
        setLoading(false);
      }
    };
    
    loadOrganisations();
  }, []); // Empty dependency array - runs only once on mount

  // Sync inputValue with parent value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

 const filteredOptions = inputValue.trim() === '' 
  ? options 
  : options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    
    // Notify parent component of change
    onChange?.(newValue);
  };

  const handleSelectOption = (selectedOption: string) => {
    setInputValue(selectedOption);
    setIsOpen(false);
    onChange?.(selectedOption);
  };

  const handleAddNew = () => {
    if (!inputValue.trim() || !allowCustomValues) return;
    
    setIsOpen(false);
    onAddNew?.(inputValue.trim());
    onChange?.(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
    
    // Enter key to add new value
    if (e.key === 'Enter' && allowCustomValues && inputValue.trim() && 
        !options.some(option => option.toLowerCase() === inputValue.toLowerCase())) {
      handleAddNew();
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  const isExactMatch = options.some(option => 
    option.toLowerCase() === inputValue.toLowerCase()
  );

  return (
    <div className={`relative ${className}`}>
      {/* Input Field */}
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <ChevronDown 
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="px-4 py-3 flex items-center text-sm text-gray-500"><Loader2/> {t('project.loadingInput')}</div>
        </div>
      )}

      {/* Dropdown */}
      {isOpen && !loading && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            <>
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelectOption(option)}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                >
                  <span className="text-gray-800 uppercase">{option}</span>
                  {value === option && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              ))}
              
              {/* Show "Add new" option if input doesn't exactly match any existing option */}
              {allowCustomValues && inputValue.trim() && !isExactMatch && (
                <div
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleAddNew}
                  className="px-4 py-3 hover:bg-green-50 cursor-pointer border-t-2 border-green-200 transition-colors duration-150"
                >
                  <span className="text-green-700 font-medium">
                    {t('project.addoption')} "{inputValue}" {t('project.newOption')}
                  </span>
                </div>
              )}
            </>
          ) : (
            allowCustomValues && inputValue.trim() && (
              <div
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleAddNew}
                className="px-4 py-3 hover:bg-green-50 cursor-pointer transition-colors duration-150"
              >
                <span className="text-green-700 font-medium">
                 {t('project.addoption')} "{inputValue}" {t('project.newOption')}
                </span>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}