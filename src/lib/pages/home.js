import { supabase } from '../supabase';
export function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('contact-status');
    const data = {
        // user_type:document.getElementById('').value,
      full_name: document.getElementById('name').value,
      email_id: document.getElementById('email').value,
      message_content: document.getElementById('message').value
    };

    status.textContent = "Sending...";
    status.className = "text-center text-sm font-medium text-primary block";

    const { error } = await supabase.from('contact_inquiries').insert([data]);

    if (error) {
      status.textContent = "Failed to send message.";
      status.classList.add('text-red-500');
    } else {
      status.textContent = "Message sent successfully!";
      status.classList.replace('text-primary', 'text-green-500');
      e.target.reset();
    }
  });
}