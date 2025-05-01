import Image from 'next/image'
import Cards from './card'

export default function About() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">About Urbanaura</h1>
                <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We are dedicated to creating beautiful, sustainable urban spaces that enhance the quality of life for everyone.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlcyUyMG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D"
                        alt="Urban Design"
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground mb-6">
                        At Urbanaura, we believe in the power of thoughtful urban design to transform communities.
                        Our mission is to create sustainable, inclusive, and beautiful urban spaces that inspire and
                        improve the lives of those who inhabit them.
                    </p>
                    <p className="text-muted-foreground">
                        We combine innovative design with practical solutions to address the unique challenges of
                        modern urban living, always keeping sustainability and community needs at the forefront.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Cards className="p-6 flex flex-col h-full">
                    <div className="text-primary text-4xl mb-4">🌱</div>
                    <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                    <p className="text-muted-foreground flex-grow">
                        We prioritize eco-friendly solutions and sustainable practices in all our projects.
                    </p>
                </Cards>
                <Cards className="p-6 flex flex-col h-full">
                    <div className="text-primary text-4xl mb-4">🤝</div>
                    <h3 className="text-xl font-semibold mb-2">Community</h3>
                    <p className="text-muted-foreground flex-grow">
                        We work closely with communities to ensure our designs meet their needs and aspirations.
                    </p>
                </Cards>
                <Cards className="p-6 flex flex-col h-full">
                    <div className="text-primary text-4xl mb-4">💡</div>
                    <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                    <p className="text-muted-foreground flex-grow">
                        We embrace cutting-edge technology and innovative design solutions.
                    </p>
                </Cards>
            </div>

            <div className="text-center">
                <h2 className="text-3xl font-semibold mb-4">Our Team</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Our diverse team of experts brings together decades of experience in urban planning,
                    architecture, and community development.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Sarah Johnson",
                            role: "Lead Architect",
                            image: "/team-1.jpg"
                        },
                        {
                            name: "Michael Chen",
                            role: "Urban Planner",
                            image: "/team-2.jpg"
                        },
                        {
                            name: "Emma Rodriguez",
                            role: "Community Liaison",
                            image: "/team-3.jpg"
                        }
                    ].map((member, index) => (
                        <Cards key={index} className="p-6 text-center flex flex-col h-full">
                            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                            <p className="text-muted-foreground flex-grow">{member.role}</p>
                        </Cards>
                    ))}
                </div>
            </div>
        </div>
    )
}
