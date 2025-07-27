import Image from 'next/image';
import Link from 'next/link';
import { getSolutions } from '../../../lib/appWrite';

export const revalidate = 3600; // Revalidate every hour

export default async function SolutionsPage() {
  const solutions = await getSolutions();
  
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Solutions Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-blue-400 mb-4">Nos solutions</p>
          <h1 className="text-4xl font-bold mb-8">Solutions Technologiques</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {solutions.map((solution) => (
            <Link 
              href={`/solutions/${solution.slug}`} 
              key={solution.id}
              className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:transform hover:scale-105"
            >
              <div className="bg-indigo-900 p-4">
                <div className="h-40 w-full relative bg-purple-800 rounded-lg overflow-hidden">
                  {solution.images && solution.images.length > 0 ? (
                    <Image
                      src={solution.images[0]}
                      alt={solution.titre}
                      fill
                      className="object-cover"
                    />
                  ) : solution.icon ? (
                    <Image
                      src={solution.icon}
                      alt={solution.titre}
                      fill
                      className="object-contain p-4"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-purple-200 text-5xl">🤖</div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {solution.tags.map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-indigo-700 rounded-full text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mt-4 text-white">{solution.titre}</h3>
                <p className="text-gray-300 text-sm mt-2 line-clamp-2">{solution.description_courte}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}