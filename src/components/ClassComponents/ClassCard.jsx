import { Link } from 'react-router-dom';

function ClassCard({ cls }) {
  return (
    <div className="card card-side bg-base-200 shadow-xl w-full md:w-2/5">
      <figure className="w-10 h-full">
        <div className="w-full h-full" style={{ backgroundColor: cls.displayColor }} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{cls.code}</h2>
        <p className="text-sm sm:text-base">{cls.title}</p>
        <div className="card-actions justify-end">
          <Link to={`/class/${cls.id}`}>
            <button className="btn btn-sm sm:btn-md btn-accent">View Class</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
