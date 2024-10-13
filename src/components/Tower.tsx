import React from 'react';

interface TowerProps {
  disks: number[];
  onClick: () => void;
  isSelected: boolean;
  maxDisks: number;
}

const Tower: React.FC<TowerProps> = ({ disks, onClick, isSelected, maxDisks }) => {
  return (
    <div
      className={`flex flex-col-reverse items-center w-32 h-64 border-b-4 border-gray-800 cursor-pointer ${
        isSelected ? 'bg-blue-200' : ''
      }`}
      onClick={onClick}
    >
      {disks.map((size, index) => (
        <div
          key={index}
          className="h-6 rounded-md"
          style={{
            width: `${(size / maxDisks) * 100}%`,
            backgroundColor: `hsl(${(size / maxDisks) * 360}, 70%, 50%)`,
          }}
        />
      ))}
    </div>
  );
};

export default Tower;