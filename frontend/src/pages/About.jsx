import React from 'react';

const About = () => {
  const developers = [
    {
      name: 'Raahat Khan',
      role: 'Project Manager',
      bio: 'Raahat is an experienced project manager with a passion for leading teams to success. With a background in software development, he ensures projects are delivered on time and within budget. He has a keen eye for detail and is dedicated to delivering high-quality results.',
      contact: 'rk2942@dseu.ac.in',
      photoUrl: 'https://via.placeholder.com/150'
    },
    {
      name: 'Pankaj',
      role: 'Lead Developer',
      bio: 'Pankaj is a talented software engineer with expertise in full-stack development. He leads the development team with his innovative ideas and technical skills. Jane is committed to creating scalable and efficient solutions to complex problems.',
      contact: 'pk2942@dseu.ac.in',
      photoUrl: 'https://via.placeholder.com/150'
    },
    {
      name: 'Priyansh',
      role: 'Frontend Developer',
      bio: 'Priyansh is a creative frontend developer with a passion for user interface design and user experience. With a keen eye for detail and a knack for problem-solving, he strives to create intuitive and visually appealing web applications.',
      contact: 'pr2942@dseu.ac.in',
      photoUrl: 'https://via.placeholder.com/150'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Meet Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {developers && developers.map((developer, index) => (
          <div key={index} className="bg-gray-200 shadow-lg rounded-3xl py-5 overflow-hidden hover:bg-slate-400">

            <div className="p-6 ">
              <div className="mb-4 bg-gray-600 py-5">
                <img src={developer.photoUrl} alt={developer.name} className="w-36  h-36 rounded-full mx-auto" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{developer.name}</h2>
              <p className="text-gray-600 mb-4">{developer.role}</p>
              <p className="text-gray-800">{developer.bio}</p>
            </div>
            <div className="bg-gray-100 px-6 py-4">
              <p className="text-sm text-gray-700">{developer.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
