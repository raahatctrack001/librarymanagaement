import React from 'react';

const Projects = () => {
  const projects = [
    {
      name: 'Project 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum purus id arcu consectetur, eget mollis ex ultrices.',
      status: 'Completed',
      color: 'bg-blue-500',
    },
    {
      name: 'Project 2',
      description: 'Sed ac arcu consectetur, varius nisi eget, aliquet neque. Nullam id tempor elit, sit amet placerat metus.',
      status: 'In Progress',
      color: 'bg-green-500',
    },
    {
      name: 'Project 3',
      description: 'Pellentesque vel nibh sed velit dapibus vestibulum. Ut lobortis felis nec tellus rhoncus eleifend.',
      status: 'Planned',
      color: 'bg-purple-500',
    },
  ];

  const upcomingProjects = [
    {
      name: 'Upcoming Project 1',
      description: 'Vestibulum non diam aliquet, aliquam nisl non, semper felis. Duis hendrerit, nisi ac semper posuere, est lorem vestibulum eros, in posuere urna quam at tellus.',
      color: 'bg-orange-500',
    },
    {
      name: 'Upcoming Project 2',
      description: 'Cras non justo finibus, consectetur est id, commodo libero. Nam suscipit mauris at augue vestibulum, sit amet dignissim urna fringilla.',
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects && projects.map((project, index) => (
          <div key={index} className={`bg-gray-800 shadow-lg rounded-lg overflow-hidden text-gray-200`}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              <p className="text-gray-100 mb-4">{project.description}</p>
              <p className="text-gray-100">{project.status}</p>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-3xl font-semibold my-8">Upcoming Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {upcomingProjects && upcomingProjects.map((project, index) => (
          <div key={index} className={`bg-gray-200 shadow-lg rounded-lg overflow-hidden text-black`}>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              <p className="text-gray-800 mb-4">{project.description}</p>
              <p className="text-gray-800">Coming Soon</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
