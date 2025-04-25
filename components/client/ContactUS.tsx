"use client"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import Cards from './card'

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactUs() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        try {
            // Here you would typically send the data to your API
            console.log('Form data:', data)
            toast.success('Message sent successfully!')
            reset()
        } catch (error) {
            toast.error('Failed to send message. Please try again.')
        }
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
                <Cards className="p-8 flex flex-col h-full">
                    <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-grow">
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <Input
                                {...register('name')}
                                placeholder="Your name"
                                className="w-full"
                            />
                            {errors.name && (
                                <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <Input
                                {...register('email')}
                                type="email"
                                placeholder="your.email@example.com"
                                className="w-full"
                            />
                            {errors.email && (
                                <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Subject</label>
                            <Input
                                {...register('subject')}
                                placeholder="What is this regarding?"
                                className="w-full"
                            />
                            {errors.subject && (
                                <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>
                            )}
                        </div>

                        <div className="flex-grow">
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <Textarea
                                {...register('message')}
                                placeholder="Your message"
                                className="w-full min-h-[150px]"
                            />
                            {errors.message && (
                                <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                    </form>
                </Cards>

                <div className="space-y-8">
                    <Cards className="p-8 flex flex-col h-full">
                        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                        <div className="space-y-4 flex-grow">
                            <div>
                                <h3 className="font-medium mb-2">Address</h3>
                                <p className="text-muted-foreground">
                                    123 Urban Street<br />
                                    City, State 12345<br />
                                    United States
                                </p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Email</h3>
                                <p className="text-muted-foreground">contact@urbanaura.com</p>
                            </div>
                            <div>
                                <h3 className="font-medium mb-2">Phone</h3>
                                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </Cards>

                    <Cards className="p-8 flex flex-col h-full">
                        <h2 className="text-2xl font-semibold mb-6">Business Hours</h2>
                        <div className="space-y-2 flex-grow">
                            <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                            <p className="text-muted-foreground">Sunday: Closed</p>
                        </div>
                    </Cards>
                </div>
            </div>
        </div>
    )
}
