import { Star } from '@mui/icons-material';
import { getSemesterStr } from '../../utils/format';

function SemesterMenuItem({ semester }) {
  return (
    <details id={semester.id}>
      <summary className="group">
        {getSemesterStr(semester)} {semester.current && <Star />}
      </summary>
      <ul>
        {[1, 2, 3, 4, 5].map((cls) => (
          <li key={cls}>
            <a href="/" className="group">
              <span>{cls}</span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default SemesterMenuItem;
