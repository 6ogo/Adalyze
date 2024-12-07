import React, { useState } from 'react';
import { Settings } from 'lucide-react';

interface ChartSettingsProps {
  chartId: string;
  settings: any;
  onSettingsChange: (chartId: string, settings: any) => void;
}

export function ChartSettings({ chartId, settings, onSettingsChange }: ChartSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!settings) return null;

  return (
    <div className="absolute top-4 right-4">
      <div className="relative">
        <button 
          className="p-1 hover:bg-gray-100 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Settings className="h-5 w-5 text-gray-500" />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">Chart Settings</h4>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              {settings.showLegend !== undefined && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${chartId}-legend`}
                    checked={settings.showLegend}
                    onChange={(e) => onSettingsChange(chartId, { ...settings, showLegend: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`${chartId}-legend`} className="ml-2 text-sm text-gray-700">
                    Show Legend
                  </label>
                </div>
              )}

              {settings.showGrid !== undefined && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${chartId}-grid`}
                    checked={settings.showGrid}
                    onChange={(e) => onSettingsChange(chartId, { ...settings, showGrid: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`${chartId}-grid`} className="ml-2 text-sm text-gray-700">
                    Show Grid
                  </label>
                </div>
              )}

              {settings.showValues !== undefined && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${chartId}-values`}
                    checked={settings.showValues}
                    onChange={(e) => onSettingsChange(chartId, { ...settings, showValues: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`${chartId}-values`} className="ml-2 text-sm text-gray-700">
                    Show Values
                  </label>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}