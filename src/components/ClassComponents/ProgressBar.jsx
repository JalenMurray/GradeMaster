import { useEffect, useState } from 'react';
import { formatFloat } from '../../utils/format';

const COLOR_ZONES = ['#FF0000', '#FFC100', '#FFFF00', '#D6FF00', '#63FF00'];

function ProgressBar({ score }) {
  const [barColor, setBarColor] = useState('');

  useEffect(() => {
    if (score >= 90) {
      setBarColor(COLOR_ZONES[4]);
    } else if (score >= 85) {
      setBarColor(COLOR_ZONES[3]);
    } else if (score >= 77) {
      setBarColor(COLOR_ZONES[2]);
    } else if (score >= 70) {
      setBarColor(COLOR_ZONES[1]);
    } else {
      setBarColor(COLOR_ZONES[0]);
    }
  }, [score]);

  return (
    <div className="w-5/6 h-12 bg-white border-1 border-black rounded-[20px] mt-12">
      <div
        className="h-full justify-center items-center text-center rounded-[20px]"
        style={{ backgroundColor: barColor, width: `${score}%`, maxWidth: '100%' }}
      >
        <h5 className="m-auto pt-[6px] font-bold text-[24px]">{formatFloat(score, 2)}%</h5>
      </div>
    </div>
  );
}

export default ProgressBar;
