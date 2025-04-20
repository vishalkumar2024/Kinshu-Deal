import { ChevronDown, ChevronUp } from "lucide-react";

const SortableTableHeader = ({ label, fieldKey, sortConfig, requestSort }) => {
  const renderSortArrow = () => {
    if (sortConfig.key === fieldKey) {
      return sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    }
    return null;
  };

  return (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
      onClick={() => requestSort(fieldKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {renderSortArrow()}
      </div>
    </th>
  );
};

export default SortableTableHeader;