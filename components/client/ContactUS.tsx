"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Mail, Phone, MapPin } from 'lucide-react'

export function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            // Reset form after submission
            setFormData({ name: '', email: '', message: '' })
            alert('Thank you for your message! We will get back to you soon.')
        }, 1000)
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Have questions or want to learn more about our services? We&apos;d love to hear from you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column - Contact Info */}
                <div className="space-y-8">
                    <Card className="p-8 flex flex-col h-full">
                        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                        <div className="space-y-4 flex-grow">
                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium mb-2">Address</h3>
                                    <p className="text-muted-foreground">
                                        123 Urban Street<br />
                                        City, State 12345<br />
                                        United States
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Mail className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium mb-2">Email</h3>
                                    <p className="text-muted-foreground">contact@urbanaura.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Phone className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium mb-2">Phone</h3>
                                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                    </Card>


                </div>

                {/* Right Column - Contact Form */}
                <Card className="p-8">
                    <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium">
                                Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your email address"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-sm font-medium">
                                Message
                            </label>
                            <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
                                placeholder="How can we help you?"
                                rows={5}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    )
}