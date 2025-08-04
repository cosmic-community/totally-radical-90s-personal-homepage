'use client'

import { useState } from 'react'

interface FormData {
  visitorName: string;
  email: string;
  homepageUrl: string;
  message: string;
  location: string;
}

export default function GuestbookForm() {
  const [formData, setFormData] = useState<FormData>({
    visitorName: '',
    email: '',
    homepageUrl: '',
    message: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.visitorName.trim() || !formData.message.trim()) {
      alert('Please fill in your name and message!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          visitorName: '',
          email: '',
          homepageUrl: '',
          message: '',
          location: ''
        });
        // Refresh the page after a short delay to show the new entry
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting guestbook entry:', error);
      alert('Oops! Something went wrong. Please try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-6">
        <div className="animate-bounce text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-comic text-neon-green glow-text animate-pulse">
          TOTALLY AWESOME!
        </h3>
        <p className="font-serif text-lg mt-2">
          Thanks for signing my guestbook! You're totally RADICAL! 🌈
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-comic font-bold text-neon-purple mb-1">
            Your Name (Required) *
          </label>
          <input
            type="text"
            name="visitorName"
            value={formData.visitorName}
            onChange={handleChange}
            required
            className="w-full p-2 border-4 border-neon-pink font-pixel bg-white text-black"
            placeholder="Enter your totally cool name!"
          />
        </div>
        
        <div>
          <label className="block font-comic font-bold text-neon-purple mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border-4 border-neon-blue font-pixel bg-white text-black"
            placeholder="your.email@awesome.com"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-comic font-bold text-neon-purple mb-1">
            Your Homepage URL
          </label>
          <input
            type="url"
            name="homepageUrl"
            value={formData.homepageUrl}
            onChange={handleChange}
            className="w-full p-2 border-4 border-neon-green font-pixel bg-white text-black"
            placeholder="http://your.radical.homepage"
          />
        </div>
        
        <div>
          <label className="block font-comic font-bold text-neon-purple mb-1">
            Your Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border-4 border-neon-orange font-pixel bg-white text-black"
            placeholder="Your awesome city"
          />
        </div>
      </div>
      
      <div>
        <label className="block font-comic font-bold text-neon-purple mb-1">
          Your Message (Required) *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full p-2 border-4 border-neon-cyan font-pixel bg-white text-black resize-none"
          placeholder="Write something totally RADICAL! Tell me about your favorite 90s stuff!"
        />
      </div>
      
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-90s px-8 py-3 font-comic text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '🚀 SENDING...' : '✨ SIGN MY GUESTBOOK! ✨'}
        </button>
      </div>
    </form>
  );
}