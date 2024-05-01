import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star } from '@mui/icons-material';
import { generateClient } from 'aws-amplify/api';
import { listClasses } from '../../graphql/queries';
import { getSemesterStr } from '../../utils/format';

const client = generateClient();

function SemesterMenuItem({ semester }) {
  const queryKey = [`${semester.id}-classes`];
  const { data: classes } = useQuery({
    queryKey,
    queryFn: async () => {
      const result = await client.graphql({
        query: listClasses,
        authMode: 'userPool',
        variables: {
          filter: {
            classSemesterId: {
              eq: semester.id,
            },
          },
        },
      });
      return result.data.listClasses.items;
    },
    initialData: [],
  });

  return (
    <details id={semester.id}>
      <summary className="group">
        {getSemesterStr(semester)} {semester.current && <Star />}
      </summary>
      <ul>
        <li>
          <Link to={`/semester/${semester.id}`}>Semester Detail</Link>
        </li>
        <li>
          <button
            className="btn btn-ghost group"
            // Set the Value of the semester so that the user doesn't have to choose the semester
            onClick={() => {
              document.getElementById('new_class_modal_semester').value = semester.id;
              document.getElementById('new_class_modal').showModal();
            }}
          >
            New Class
          </button>
        </li>
        {classes.length > 0 &&
          classes.map((cls) => (
            <li key={cls.id}>
              <Link to="/" className="group">
                <span>{cls.code}</span>
              </Link>
            </li>
          ))}
      </ul>
    </details>
  );
}

export default SemesterMenuItem;
