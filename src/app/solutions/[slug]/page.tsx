import { notFound } from 'next/navigation';
import SolutionPage from '@/components/SolutionPage';
import { getSolutionBySlug, getSolutions } from '../../../../lib/appWrite';

// Generate static params for all solutions
export async function generateStaticParams() {
    const solutions = await getSolutions();
    
    return solutions.map((solution) => ({
        slug: solution.slug,
    }));
}

// Revalidate every hour
export const revalidate = 3600;

export default async function SolutionDetailPage({ params }: { params: { slug: string } }) {
    const solution = await getSolutionBySlug(params.slug);

    if (!solution) {
        notFound();
    }

    return <SolutionPage solution={solution} />;
}