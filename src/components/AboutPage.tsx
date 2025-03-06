import { FC } from 'react';
import { ArrowRight } from 'lucide-react';

interface Experience {
  company: string;
  logo: string;
  role: string;
  period: string;
  industry: string;
  companyInfo: string;
  description: string;
  website: string;
  bgColor: string;
}

const AboutPage: FC = () => {
  const experiences: Experience[] = [
    {
      company: 'Company Name 1',
      logo: '/images/rover_logo.png',
      role: 'Senior Software Developer',
      period: '2022 - Present',
      industry: 'FinTech',
      companyInfo: 'A leading fintech company revolutionizing digital payments across Asia. The company processes over $10B in annual transactions and serves 5M+ customers.',
      description: 'Developing core payment infrastructure and leading the modernization of legacy systems.',
      website: 'https://company1.com',
      bgColor: 'from-blue-500/20 to-indigo-500/20',
    },
    {
      company: 'Company Name 2',
      logo: '/images/natix_logo.jpeg',
      role: 'Software Engineer',
      period: '2020 - 2022',
      industry: 'E-commerce',
      companyInfo: 'One of Southeast Asia\'s fastest-growing e-commerce platforms with presence in 6 countries. Specializes in B2B wholesale and retail solutions.',
      description: 'Built scalable e-commerce solutions focusing on inventory and order management systems.',
      website: 'https://company2.com',
      bgColor: 'from-purple-500/20 to-pink-500/20',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          {/* Personal Introduction */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
          <div className="prose max-w-none mb-12">
            <p className="text-gray-600 text-lg">
              I'm Sandeep Nanda, a business and strategy professional with experience across product, operations, and GTM strategy. My career has spanned startups, scale-ups, and enterprises, where I have successfully led initiatives that drive growth, streamline operations, and enhance business performance.
              Currently, I work at Rover, leading strategic programs that optimize operations and improve efficiency. With a background in engineering, product, and data, I bring a structured, data-driven approach to problem-solving while remaining adaptable to changing business needs.
              Having worked across India, Germany, and Spain, I have developed a global perspective on scaling businesses, navigating diverse markets, and executing strategic transformations. My MBA from ESADE Business School further strengthens my ability to align technology, business, and strategy for long-term success.
              I am always open to senior leadership opportunities where I can contribute my expertise in strategy, operations, and business transformation to drive sustainable impact.

              Let's connect!
            </p>
          </div>

          {/* Experience Section */}
          <h3 className="text-2xl font-semibold mb-8">Professional Journey</h3>
          <div className="grid grid-cols-1 gap-6 mb-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br ${exp.bgColor}`}
              >
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                    {/* Company Logo and Name */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-sm">
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2"
                        >
                          {exp.company}
                          <ArrowRight size={16} className="inline-block" />
                        </a>
                        <p className="text-gray-600 font-medium">{exp.role}</p>
                        <span className="inline-block mt-1 text-sm text-gray-500">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Industry Badge */}
                    <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-blue-600">
                      {exp.industry}
                    </span>
                  </div>

                  {/* Company Info and Role */}
                  <div className="space-y-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">About {exp.company}</h5>
                      <p className="text-gray-600">{exp.companyInfo}</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">My Role</h5>
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['React', 'Node.js', 'JavaScript', 'TypeScript', 'AWS', 'Docker', 'Git', 'CI/CD'].map((skill, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                <span className="relative z-10 font-medium text-gray-700">{skill}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
