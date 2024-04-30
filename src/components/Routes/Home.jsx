import Logo from '../../assets/logo.png';

function Home() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={Logo} className="max-w-sm rounded-lg shadow-2xl" alt="GradeMasterLogo" />
        <div>
          <h1 className="text-5xl font-bold">Welcome to GradeMaster!</h1>
          <p className="py-6">
            Your go-to tool for tracking assignments, calculating grades, and more!
          </p>
          <p className="pb-4">
            Access your created semesters in the left-hand menu. Haven&apos;t created a semester
            yet? Click the button below to create your first semester!
          </p>
          <button
            className="btn btn-primary"
            onClick={() => document.getElementById('new_semester_modal').showModal()}
          >
            New Semester
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
