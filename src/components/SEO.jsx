import { Helmet } from 'react-helmet-async';
import { Bio, skills } from '../constants/constants';

// Generate skills string for meta tags
const allSkills = skills.flatMap(category =>
    category.skills.map(skill => skill.name)
).join(', ');

export default function SEO({
    title = `${Bio.name} | Full Stack Developer & MERN Stack Expert`,
    description = Bio.description,
    keywords = `${Bio.name}, Himanshu Haldar, Full Stack Developer, MERN Stack Developer, React Developer, Node.js Developer, ${allSkills}`,
    image = 'https://www.himanshuhaldar.online/Himanshu_Favicon.png',
    url = Bio.website,
    type = 'website'
}) {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:creator" content="@HimanshuHaldar3" />
        </Helmet>
    );
}
