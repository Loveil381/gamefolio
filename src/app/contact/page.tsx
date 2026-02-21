'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, CheckCircle2, Loader2 } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContactSubject, ContactFormData } from '@/types/contact';

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: ContactSubject.JOB_OPPORTUNITY,
        message: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateForm = () => {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof ContactFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({
            name: '',
            email: '',
            subject: ContactSubject.JOB_OPPORTUNITY,
            message: '',
        });

        // Reset success state after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const socialLinks = [
        { name: 'GitHub', icon: Github, url: 'https://github.com/Loveil381', color: 'hover:text-amber-500' },
        { name: 'Email', icon: Mail, url: 'mailto:hello@example.com', color: 'hover:text-cyan-500' },
        { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-purple-500' },
        { name: 'Twitter/X', icon: Twitter, url: '#', color: 'hover:text-green-500' },
    ];

    const inputClasses = "w-full rounded-md border border-border bg-surface px-4 py-2 text-text-primary placeholder:text-text-secondary focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-colors";

    return (
        <main className="min-h-screen pt-24 pb-16">
            <Container className="max-w-4xl">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-12"
                >
                    {/* Header Section */}
                    <div className="text-center space-y-6 flex flex-col items-center">
                        <motion.div variants={itemVariants}>
                            <Badge variant="green" className="mb-4">
                                <span className="relative flex h-2 w-2 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
                                </span>
                                Currently open to opportunities
                            </Badge>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Heading level={1} className="mb-4">Get In Touch</Heading>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Text variant="secondary" className="max-w-2xl mx-auto text-lg">
                                Whether it&apos;s about a job opportunity, a game idea, or just to say hi — I&apos;d love to hear from you.
                            </Text>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Contact Form */}
                        <motion.div variants={itemVariants} className="md:col-span-2">
                            <Card className="p-6 md:p-8 border-border h-full">
                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-12 text-center h-full"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
                                        >
                                            <CheckCircle2 className="w-16 h-16 text-accent-green mb-4" />
                                        </motion.div>
                                        <Heading level={3} className="text-accent-green mb-2">Message Sent!</Heading>
                                        <Text variant="secondary">Thank you for reaching out. I&apos;ll get back to you soon.</Text>
                                        <Button
                                            variant="outline"
                                            className="mt-6"
                                            onClick={() => setIsSuccess(false)}
                                        >
                                            Send another message
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-medium text-text-primary">Name</label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                    placeholder="John Doe"
                                                />
                                                {errors.name && <p className="text-sm text-red-500 font-medium">{errors.name}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium text-text-primary">Email</label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="text" // using text to prevent browser default validation popups since we have custom validation
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={inputClasses}
                                                    placeholder="john@example.com"
                                                />
                                                {errors.email && <p className="text-sm text-red-500 font-medium">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-medium text-text-primary">Subject</label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className={`${inputClasses} appearance-none cursor-pointer`}
                                            >
                                                {Object.values(ContactSubject).map((subject) => (
                                                    <option key={subject} value={subject}>{subject}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium text-text-primary">Message</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={5}
                                                className={`${inputClasses} resize-none`}
                                                placeholder="Tell me about your project..."
                                            />
                                            {errors.message && <p className="text-sm text-red-500 font-medium">{errors.message}</p>}
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full sm:w-auto mt-2"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                'Send Message'
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </Card>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <Heading level={3} className="text-xl mb-6">Connect with me</Heading>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <motion.a
                                            key={link.name}
                                            href={link.url}
                                            target={link.url.startsWith('http') ? '_blank' : undefined}
                                            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="block"
                                        >
                                            <Card className={`p-4 flex items-center gap-4 border-border hover:bg-surface/80 transition-colors group ${link.color}`}>
                                                <div className="p-2 rounded-full bg-background border border-border group-hover:border-current transition-colors">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium text-text-primary group-hover:text-current transition-colors">
                                                    {link.name}
                                                </span>
                                            </Card>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </main>
    );
}
