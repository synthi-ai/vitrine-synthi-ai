export interface Solution {
    id: string;
    slug: string;
    titre: string;
    description_courte: string;
    description_longue: string;
    images: string[];
    videos_demo: string[];
    technologies_utilisees: Technology[];
    icon?: string;
    categorie: 'Robotique' | 'IA' | 'Automatisation' | 'Autres';
    fonctionnalites: string[];
    objectifs: Objective[];
    use_cases: UseCase[];
    liens_externes: string[];
    auteur: Author;
    date_de_creation: Date;
    statut: 'active' | 'draft' | 'archived';
    tags: string[];
}

export interface Technology {
    id: string;
    nom: string;
    type: 'framework' | 'librairie' | 'langage';
    icone?: string;
    url_doc?: string;
}

export interface UseCase {
    id: string;
    titre: string;
    description: string;
    image?: string;
}

export interface Objective {
    id: string;
    titre: string;
    description: string;
    icon?: string;
}

export interface Author {
    id: string;
    nom: string;
    poste: string;
    photo?: string;
    email: string;
}

export interface SolutionFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
}