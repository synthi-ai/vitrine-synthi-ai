import { Client, Databases, ImageGravity, Query, Storage } from 'appwrite';
import { Solution, Technology, UseCase, Objective, Author } from '../models/Solution';

// Initialiser le client Appwrite
const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://syd.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6882384d00032ba96226');

export const databases = new Databases(client);
export const storage = new Storage(client);


//NEXT_PUBLIC_APPWRITE_PROJECT_ID = "6882384d00032ba96226"
//NEXT_PUBLIC_APPWRITE_ENDPOINT = "https://syd.cloud.appwrite.io/v1"
        
// IDs de la base de données et des collections
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID || '68823942003cec72f927';
export const COLLECTION_ID_SOLUTIONS = process.env.NEXT_PUBLIC_COLLECTION_ID_SOLUTIONS || '6882399700312fffced9';
export const COLLECTION_ID_TECHNOLOGIES = 'technologies';
export const COLLECTION_ID_USE_CASES = 'use_cases';
export const COLLECTION_ID_OBJECTIFS = 'objectifs';
export const COLLECTION_ID_AUTEURS = 'auteurs';

/**
 * Récupère l'URL d'un fichier depuis Appwrite Storage
 */
export const getFilePreview = (fileId: string) => {
    if (!fileId) return '';
    try {
        return storage.getFilePreview(
            'default', 
            fileId,
            2000,
            2000, 
            ImageGravity.Center, 
            100, 
        ).toString();
    } catch (error) {
        console.error('Erreur lors de la récupération du fichier:', error);
        return '';
    }
};


/**
 * Récupère toutes les solutions actives
 */
export async function getSolutions(): Promise<Solution[]> {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_SOLUTIONS,
            [Query.equal('statut', ['active'])]
        );
        
        return Promise.all(response.documents.map(async doc => {
            // Traitement des images pour obtenir les URLs
            const imageUrls = doc.images ? 
                await Promise.all(doc.images.map((imageId: string) => getFilePreview(imageId))) : 
                [];
            
            // Traitement de l'icône
            const iconUrl = doc.icon ? getFilePreview(doc.icon) : undefined;

            // Construction des tags basés sur la catégorie et d'autres attributs
            const tags = [doc.categorie];
            if (doc.technologies_utilisees && doc.technologies_utilisees.length > 0) {
                // Supposons que technologies_utilisees soit un tableau d'IDs
                // Dans une implémentation réelle, vous pourriez vouloir récupérer les noms des technologies
                tags.push(...doc.technologies_utilisees.slice(0, 2)); // Limiter à 2 technologies pour les tags
            }

            return {
                id: doc.$id,
                slug: doc.slug,
                titre: doc.titre,
                description_courte: doc.description_courte,
                description_longue: doc.description_longue,
                images: imageUrls,
                videos_demo: doc.videos_demo || [],
                technologies_utilisees: doc.technologies_utilisees || [],
                icon: iconUrl,
                categorie: doc.categorie,
                fonctionnalites: doc.fonctionnalites || [],
                objectifs: doc.objectifs || [],
                use_cases: doc.use_cases || [],
                liens_externes: doc.liens_externes || [],
                auteur: doc.auteur,
                date_de_creation: new Date(doc.date_de_creation),
                statut: doc.statut,
                tags: tags
            } as Solution;
        }));
    } catch (error) {
        console.error('Erreur lors de la récupération des solutions:', error);
        return [];
    }
}

/**
 * Récupère une solution par son slug
 */
export async function getSolutionBySlug(slug: string): Promise<Solution | null> {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_SOLUTIONS,
            [Query.equal('slug', slug), Query.equal('statut', ['active'])]
        );
        
        if (response.documents.length === 0) {
            return null;
        }

        const doc = response.documents[0];
        
        // Traitement des images pour obtenir les URLs
        const imageUrls = doc.images ? 
            await Promise.all(doc.images.map((imageId: string) => getFilePreview(imageId))) : 
            [];
        
        // Traitement de l'icône
        const iconUrl = doc.icon ? getFilePreview(doc.icon) : undefined;

        // Récupération des technologies associées
        let technologies: Technology[] = [];
        if (doc.technologies_utilisees && doc.technologies_utilisees.length > 0) {
            const techIds = doc.technologies_utilisees;
            const techResponse = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID_TECHNOLOGIES,
                [Query.equal('$id', techIds)]
            );
            
            technologies = techResponse.documents.map(tech => ({
                id: tech.$id,
                nom: tech.nom,
                type: tech.type,
                icone: tech.icone ? getFilePreview(tech.icone) : undefined,
                url_doc: tech.url_doc
            }));
        }

        // Récupération des cas d'usage associés
        let useCases: UseCase[] = [];
        if (doc.use_cases && doc.use_cases.length > 0) {
            const useCaseIds = doc.use_cases;
            const useCaseResponse = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID_USE_CASES,
                [Query.equal('$id', useCaseIds)]
            );
            
            useCases = await Promise.all(useCaseResponse.documents.map(async useCase => ({
                id: useCase.$id,
                titre: useCase.titre,
                description: useCase.description,
                image: useCase.image ? getFilePreview(useCase.image) : undefined
            })));
        }

        // Récupération des objectifs associés
        let objectives: Objective[] = [];
        if (doc.objectifs && doc.objectifs.length > 0) {
            const objectiveIds = doc.objectifs;
            const objectiveResponse = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID_OBJECTIFS,
                [Query.equal('$id', objectiveIds)]
            );
            
            objectives = await Promise.all(objectiveResponse.documents.map(async objective => ({
                id: objective.$id,
                titre: objective.titre,
                description: objective.description,
                icon: objective.icon ? getFilePreview(objective.icon) : undefined
            })));
        }

        // Récupération de l'auteur
        let author: Author = {
            id: '',
            nom: 'Anonyme',
            poste: '',
            email: ''
        };
        
        if (doc.auteur) {
            const authorResponse = await databases.getDocument(
                DATABASE_ID,
                COLLECTION_ID_AUTEURS,
                doc.auteur
            );
            
            author = {
                id: authorResponse.$id,
                nom: authorResponse.nom,
                poste: authorResponse.poste,
                photo: authorResponse.photo ? getFilePreview(authorResponse.photo) : undefined,
                email: authorResponse.email
            };
        }

        // Construction des tags
        const tags = [doc.categorie];
        if (technologies.length > 0) {
            tags.push(...technologies.slice(0, 2).map(tech => tech.nom));
        }

        return {
            id: doc.$id,
            slug: doc.slug,
            titre: doc.titre,
            description_courte: doc.description_courte,
            description_longue: doc.description_longue,
            images: imageUrls,
            videos_demo: doc.videos_demo || [],
            technologies_utilisees: technologies,
            icon: iconUrl,
            categorie: doc.categorie,
            fonctionnalites: doc.fonctionnalites || [],
            objectifs: objectives,
            use_cases: useCases,
            liens_externes: doc.liens_externes || [],
            auteur: author,
            date_de_creation: new Date(doc.date_de_creation),
            statut: doc.statut,
            tags: tags
        } as Solution;
    } catch (error) {
        console.error('Erreur lors de la récupération de la solution:', error);
        return null;
    }
}