import { ZoomParallax } from '../ui/ZoomParallax';

const images = [
    { src: '/webp/fotos-nacho/4J4B8483.webp', alt: 'Instituto Hutchison Ports' },
    { src: '/webp/fotos-nacho/DJI_20250926023427_0054_D.webp', alt: 'Puerto Hutchison' },
    { src: '/webp/fotos-nacho/4J4B8556.webp', alt: 'Formación profesional' },
    { src: '/webp/fotos-nacho/DJI_20250927073857_0009_D.webp', alt: 'Vista aérea puerto' },
    { src: '/webp/fotos-nacho/4J4B8787.webp', alt: 'Equipo Instituto HP' },
    { src: '/webp/fotos-nacho/DJI_20251001140512_0022_D.webp', alt: 'Operaciones portuarias' },
    { src: '/webp/fotos-nacho/4J4B8793.webp', alt: 'Liderazgo portuario' },
];

export default function ZoomParallaxSection() {
    return <ZoomParallax images={images} />;
}
