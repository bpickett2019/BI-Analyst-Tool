import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  onDateRangeChange?: (startDate: Date, endDate: Date) => void;
  className?: string;
}

export function DateRangePicker({ onDateRangeChange, className = '' }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date>(new Date(2025, 2, 12)); // March 12, 2025
  const [endDate, setEndDate] = useState<Date>(new Date(2025, 3, 11)); // April 11, 2025
  const [compareMode, setCompareMode] = useState<boolean>(true);

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      
      if (onDateRangeChange) {
        onDateRangeChange(date, endDate);
      }
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setEndDate(date);
      
      if (onDateRangeChange) {
        onDateRangeChange(startDate, date);
      }
    }
  };

  const toggleCompareMode = () => {
    setCompareMode(prev => !prev);
  };

  const applyFilter = () => {
    if (onDateRangeChange) {
      onDateRangeChange(startDate, endDate);
    }
    alert(`Applied date range: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 h-full ${className}`}>
      <h3 className="text-sm font-medium mb-3">Date Range Filter</h3>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Time Period</span>
          <div className="relative">
            <button className="flex items-center gap-1 text-xs font-medium text-gray-700 px-2 py-1.5 border border-gray-200 rounded-button hover:bg-gray-50">
              Last 30 Days
              <i className="ri-arrow-down-s-line"></i>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">From</span>
            <div className="datepicker-container">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="MMM dd, yyyy"
                className="text-xs border border-gray-200 rounded pl-6 pr-2 py-1.5 w-28 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <i className="ri-calendar-line text-gray-400 text-xs datepicker-icon"></i>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">To</span>
            <div className="datepicker-container">
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="MMM dd, yyyy"
                className="text-xs border border-gray-200 rounded pl-6 pr-2 py-1.5 w-28 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
              <i className="ri-calendar-line text-gray-400 text-xs datepicker-icon"></i>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">Compare to</span>
          <label className="toggle">
            <input type="checkbox" checked={compareMode} onChange={toggleCompareMode} />
            <span className="slider"></span>
          </label>
        </div>
        
        <button 
          onClick={applyFilter}
          className="w-full mt-2 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-button text-xs font-medium hover:bg-primary/90"
        >
          <i className="ri-filter-3-line"></i>
          Apply Filter
        </button>
      </div>
    </div>
  );
}