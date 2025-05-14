import { FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { FiMonitor, FiPenTool } from "react-icons/fi";
import { AiOutlineCode, AiOutlineDatabase } from "react-icons/ai";

const useCategoryIcon = () => {
  const getIconForCategory = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case "finance":
        return FaMoneyBillWave;
      case "marketing":
        return FaChartLine;
      case "technology":
        return FiMonitor;
      case "design":
        return FiPenTool;
      case "development":
        return AiOutlineCode;
      case "data science":
        return AiOutlineDatabase;
      default:
        return FiMonitor; // Default icon
    }
  };

  return getIconForCategory;
};

export default useCategoryIcon;
