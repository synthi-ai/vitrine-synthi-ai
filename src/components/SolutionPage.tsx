import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '../lib/utils';
import { Solution } from '../../models/Solution';

export default function SolutionPage({ solution }: { solution: Solution }) {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-indigo-900 to-gray-900">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 text-blue-400 mb-4">
                            <Link href="/solutions" className="hover:underline">
                                Solutions
                            </Link>
                            <span>/</span>
                            <span>{solution.titre}</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{solution.titre}</h1>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                            {solution.tags.map((tag, index) => (
                                <span key={index} className="text-sm px-3 py-1 bg-indigo-800 rounded-full text-gray-200">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <p className="text-xl text-gray-300 mb-8">{solution.description_courte}</p>
                        
                        {solution.auteur && (
                            <div className="flex items-center gap-4 mb-8">
                                {solution.auteur.photo && (
                                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                        <Image 
                                            src={solution.auteur.photo} 
                                            alt={solution.auteur.nom}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium">{solution.auteur.nom}</p>
                                    <p className="text-sm text-gray-400">{solution.auteur.poste}</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="text-sm text-gray-400">
                                        Créé le {formatDate(solution.date_de_creation)}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Images Gallery */}
            {solution.images && solution.images.length > 0 && (
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {solution.images.map((image, index) => (
                            <div key={index} className="aspect-video relative rounded-lg overflow-hidden">
                                <Image
                                    src={image}
                                    alt={`${solution.titre} - image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Description */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">À propos de cette solution</h2>
                    <div className="prose prose-lg prose-invert max-w-none">
                        {solution.description_longue.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Fonctionnalités */}
            {solution.fonctionnalites && solution.fonctionnalites.length > 0 && (
                <div className="bg-gray-800 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-8">Fonctionnalités clés</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {solution.fonctionnalites.map((feature, index) => (
                                    <div key={index} className="bg-gray-700 p-6 rounded-lg">
                                        <div className="text-blue-400 text-xl mb-2">✓</div>
                                        <p>{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Objectifs */}
            {solution.objectifs && solution.objectifs.length > 0 && (
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Objectifs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {solution.objectifs.map((objective) => (
                                <div key={objective.id} className="flex gap-4">
                                    {objective.icon ? (
                                        <div className="w-12 h-12 relative flex-shrink-0">
                                            <Image
                                                src={objective.icon}
                                                alt={objective.titre}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 bg-indigo-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-2xl">🎯</span>
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-medium mb-2">{objective.titre}</h3>
                                        <p className="text-gray-300">{objective.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {/* Use Cases */}
            {solution.use_cases && solution.use_cases.length > 0 && (
                <div className="bg-gray-800 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-8">Cas d&apos;usage</h2>
                            <div className="grid grid-cols-1 gap-8">
                                {solution.use_cases.map((useCase) => (
                                    <div key={useCase.id} className="bg-gray-700 rounded-lg overflow-hidden">
                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            {useCase.image && (
                                                <div className="aspect-video relative">
                                                    <Image
                                                        src={useCase.image}
                                                        alt={useCase.titre}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <h3 className="text-xl font-medium mb-4">{useCase.titre}</h3>
                                                <p className="text-gray-300">{useCase.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Technologies */}
            {solution.technologies_utilisees && solution.technologies_utilisees.length > 0 && (
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Technologies utilisées</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {solution.technologies_utilisees.map((tech) => (
                                <div key={tech.id} className="text-center">
                                    {tech.icone ? (
                                        <div className="w-16 h-16 mx-auto relative mb-4">
                                            <Image
                                                src={tech.icone}
                                                alt={tech.nom}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 mx-auto bg-indigo-800 rounded-full flex items-center justify-center mb-4">
                                            <span className="text-2xl">🔧</span>
                                        </div>
                                    )}
                                    <h3 className="font-medium">{tech.nom}</h3>
                                    <p className="text-sm text-gray-400">{tech.type}</p>
                                    {tech.url_doc && (
                                        <a 
                                            href={tech.url_doc} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-400 text-sm mt-2 inline-block hover:underline"
                                        >
                                            Documentation
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {/* Vidéos */}
            {solution.videos_demo && solution.videos_demo.length > 0 && (
                <div className="bg-gray-800 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-8">Vidéos de démonstration</h2>
                            <div className="grid grid-cols-1 gap-8">
                                {solution.videos_demo.map((videoUrl, index) => (
                                    <div key={index} className="aspect-video w-full">
                                        <iframe
                                            src={videoUrl}
                                            title={`Vidéo démo ${index + 1}`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full rounded-lg"
                                        ></iframe>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Liens externes */}
            {solution.liens_externes && solution.liens_externes.length > 0 && (
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Ressources additionnelles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {solution.liens_externes.map((lien, index) => (
                                <a
                                    key={index}
                                    href={lien}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-indigo-800 p-4 rounded-lg flex items-center hover:bg-indigo-700 transition-colors"
                                >
                                    <span className="text-xl mr-3">🔗</span>
                                    <span className="truncate">{new URL(lien).hostname}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {/* Contact */}
            <div className="bg-indigo-900 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Intéressé par cette solution ?</h2>
                        <p className="text-xl mb-8">Contactez-nous pour plus d&apos;informations ou pour une démonstration.</p>
                        <a 
                            href={`mailto:${solution.auteur?.email || 'contact@example.com'}`}
                            className="inline-block bg-white text-indigo-900 font-medium px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Nous contacter
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}