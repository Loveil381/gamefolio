'use client';

import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { SuccessIconAnimation, SuccessContainerAnimation } from './animations';
import { ContactSubject, ContactFormData } from '@/types/contact';

export function ContactForm() {
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

    const inputClasses = "w-full rounded-md border border-border bg-surface px-4 py-2 text-text-primary placeholder:text-text-secondary focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-colors";

    return (
        <Card className="p-6 md:p-8 border-border h-full">
            {isSuccess ? (
                <SuccessContainerAnimation>
                    <SuccessIconAnimation>
                        <CheckCircle2 className="w-16 h-16 text-accent-green mb-4" />
                    </SuccessIconAnimation>
                    <Heading level={3} className="text-accent-green mb-2">Message Sent!</Heading>
                    <Text variant="secondary">Thank you for reaching out. I&apos;ll get back to you soon.</Text>
                    <Button
                        variant="outline"
                        className="mt-6"
                        onClick={() => setIsSuccess(false)}
                    >
                        Send another message
                    </Button>
                </SuccessContainerAnimation>
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
                                type="text"
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
    );
}
