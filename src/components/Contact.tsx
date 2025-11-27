import React, { useRef, useState } from 'react';
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);
    setStatus('idle');

    // Replace these with your actual EmailJS service, template, and public key
    // You can get these from https://dashboard.emailjs.com/
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key';

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
          console.log(result.text);
          setStatus('success');
          form.current?.reset();
      }, (error) => {
          console.log(error.text);
          setStatus('error');
      })
      .finally(() => {
        setIsSending(false);
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <SectionWrapper id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-glow">
                Iniciemos el Futuro
              </span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              ¿Tienes un proyecto en mente o buscas potenciar tu negocio con IA? 
              Conectemos y hagamos realidad tus ideas.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300 group">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                  <Mail className="text-neon-cyan" />
                </div>
                <span>erickseislaboral@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300 group">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-neon-purple/50 transition-colors">
                  <MapPin className="text-neon-purple" />
                </div>
                <span>Arica, Chile</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300 group">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-neon-green/50 transition-colors">
                  <Phone className="text-neon-green" />
                </div>
                <span>+56 9 8499 4011</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-card/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Nombre</label>
                  <input 
                    type="text" 
                    name="user_name"
                    required
                    className="w-full bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Email</label>
                  <input 
                    type="email" 
                    name="user_email"
                    required
                    className="w-full bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Mensaje</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                  placeholder="¿En qué puedo ayudarte?"
                />
              </div>

              <button 
                type="submit"
                disabled={isSending}
                className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple text-black font-bold py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Enviar Mensaje
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-sm justify-center bg-green-400/10 p-3 rounded-lg border border-green-400/20">
                  <CheckCircle size={16} />
                  <span>¡Mensaje enviado con éxito! Te responderé pronto.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm justify-center bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                  <AlertCircle size={16} />
                  <span>Hubo un error al enviar el mensaje. Por favor intenta nuevamente.</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
