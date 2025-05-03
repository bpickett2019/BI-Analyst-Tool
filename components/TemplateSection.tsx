import React from 'react';

const templates = [
  {
    id: 1,
    title: 'Sales Analytics',
    description: 'Conversion funnel, regional performance, top products',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    badge: {
      text: 'Popular',
      color: 'bg-indigo-100 text-primary',
    },
  },
  {
    id: 2,
    title: 'Marketing Performance',
    description: 'Campaign ROI, channel metrics, audience insights',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    badge: {
      text: 'New',
      color: 'bg-green-100 text-success',
    },
  },
];

const TemplateSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow col-span-2">
      <div className="p-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Dashboard Templates</h3>
      </div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {templates.map((template) => (
          <div key={template.id} className="border border-gray-200 rounded-lg hover:border-primary cursor-pointer transition duration-150">
            <img
              src={template.image}
              alt={`${template.title} Template`}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-900">{template.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{template.description}</p>
              <div className="flex items-center mt-2">
                <span className={`px-2 py-1 text-xs rounded-full ${template.badge.color}`}>
                  {template.badge.text}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 text-center">
        <a href="#" className="text-sm font-medium text-primary hover:text-indigo-500">
          Browse all templates
        </a>
      </div>
    </div>
  );
};

export default TemplateSection;
