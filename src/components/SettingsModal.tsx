import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  disks: number;
  setDisks: (disks: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  disks,
  setDisks,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">设置</h2>
        <div className="mb-4">
          <label htmlFor="disks" className="block mb-2">
            圆盘数量:
          </label>
          <input
            type="range"
            id="disks"
            min="3"
            max="8"
            value={disks}
            onChange={(e) => setDisks(parseInt(e.target.value))}
            className="w-full"
          />
          <span>{disks}</span>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          确定
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;