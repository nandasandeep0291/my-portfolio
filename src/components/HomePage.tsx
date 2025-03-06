import { FC } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
}

const HomePage: FC = () => {
  const projects: Project[] = [
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution built with React and Node.js',
      tech: ['React', 'Node.js', 'MongoDB'],
    },
    {
      title: 'Task Management App',
      description: 'A productive task management application with real-time updates',
      tech: ['React', 'Firebase', 'Tailwind CSS'],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center bg-white/40 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          <img
            src="/images/Sandeep.jpg"
            alt="Sandeep Nanda"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full mx-auto mb-8 border-4 border-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          />

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Software Developer passionate about creating impactful solutions
          </p>

          <div className="flex justify-center space-x-6 mb-12">
            <a href="mailto:your.email@example.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Mail size={24} />
            </a>
            <a href="https://github.com/yourusername" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/sandeep-nanda/" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
