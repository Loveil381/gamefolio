import type { Metadata } from 'next';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContactForm } from '@/components/contact/contact-form';
import { StaggerContainer, StaggerItem, SocialLinkAnimation } from '@/components/contact/animations';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch for jobs, game ideas, or just to say hi.',
};

const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Loveil381', color: 'hover:text-amber-500' },
    { name: 'Email', icon: Mail, url: 'mailto:hello@example.com', color: 'hover:text-cyan-500' },
    { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-purple-500' },
    { name: 'Twitter/X', icon: Twitter, url: '#', color: 'hover:text-green-500' },
];

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-16">
            <Container className="max-w-4xl">
                <StaggerContainer className="space-y-12">
                    {/* Header Section */}
                    <div className="text-center space-y-6 flex flex-col items-center">
                        <StaggerItem>
                            <Badge variant="green" className="mb-4">
                                <span className="relative flex h-2 w-2 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
                                </span>
                                Currently open to opportunities
                            </Badge>
                        </StaggerItem>
                        <StaggerItem>
                            <Heading level={1} className="mb-4">Get In Touch</Heading>
                        </StaggerItem>
                        <StaggerItem>
                            <Text variant="secondary" className="max-w-2xl mx-auto text-lg">
                                Whether it&apos;s about a job opportunity, a game idea, or just to say hi — I&apos;d love to hear from you.
                            </Text>
                        </StaggerItem>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Contact Form */}
                        <StaggerItem className="md:col-span-2">
                            <ContactForm />
                        </StaggerItem>

                        {/* Social Links */}
                        <StaggerItem className="space-y-4">
                            <Heading level={3} className="text-xl mb-6">Connect with me</Heading>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <SocialLinkAnimation key={link.name} url={link.url}>
                                            <Card className={`p-4 flex items-center gap-4 border-border hover:bg-surface/80 transition-colors group ${link.color}`}>
                                                <div className="p-2 rounded-full bg-background border border-border group-hover:border-current transition-colors">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium text-text-primary group-hover:text-current transition-colors">
                                                    {link.name}
                                                </span>
                                            </Card>
                                        </SocialLinkAnimation>
                                    );
                                })}
                            </div>
                        </StaggerItem>
                    </div>
                </StaggerContainer>
            </Container>
        </main>
    );
}
