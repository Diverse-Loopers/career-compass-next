"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [formState, setFormState] = useState({
    userType: "student",
    name: "",
    email: "",
    query: "",
  });
  const [submit, setSubmit] = useState("Send Message");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    setSubmit("Submitting..")

    // const subject = encodeURIComponent(`New Inquiry from ${formState.name} (${formState.userType})`);
    // const body = encodeURIComponent(
    //   `Name: ${formState.name}\n` +
    //   `Email: ${formState.email}\n` +
    //   `User Type: ${formState.userType}\n\n` +
    //   `Query:\n${formState.query}`
    // );
    const data ={
       full_name: `${formState.name}` ,
    email_id: `${formState.email}` ,
    //   `User Type: ${formState.userType},
      message_content:`${formState.query}`
    }

    
   try {
  const { error } = await supabase.from('contact_inquiries').insert([data]);

  if (error) {
    setMessage({
      text: "Failed to submit your query. Try email: contact@diverseloopers.com",
      type: "error"
    });
  } else {
    setMessage({
      text: "Our team will contact you soon. Thank you!",
      type: "success"
    });

    // ✅ Reset form ONLY on success
    setFormState({
      userType: "student",
      name: "",
      email: "",
      query: "",
    });
  }

} catch (error) {
  setMessage({
    text: "Something went wrong. Try again later.",
    type: "error"
  });
}


    setSubmit("Send Message")
  };

  return (
    <section className="bg-slate-100/50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Heading */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold font-manrope text-slate-900 tracking-tighter">Start Your Journey</h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">Tell us about yourself and we&apos;ll help you get started on your professional path.</p>
        </div>

        {/* Form Card */}
        <div className="max-w-xl mx-auto bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* User Type Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 font-manrope uppercase tracking-widest pl-1">I am:</label>
              <div className="relative group">
                <select
                  value={formState.userType}
                  onChange={(e) => setFormState({ ...formState, userType: e.target.value })}
                  className="w-full appearance-none bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-2xl px-6 py-4 font-manrope text-lg font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="student">Student</option>
                  <option value="business">Business</option>
                  <option value="institute">Institute</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-2xl font-bold">keyboard_arrow_down</span>
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 font-manrope uppercase tracking-widest pl-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-2xl px-6 py-4 font-manrope text-lg font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-300 placeholder:font-medium"
              />
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 font-manrope uppercase tracking-widest pl-1">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-2xl px-6 py-4 font-manrope text-lg font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-300 placeholder:font-medium"
              />
            </div>

            {/* Query */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 font-manrope uppercase tracking-widest pl-1">Query</label>
              <textarea
                placeholder="Tell us more about your interests..."
                rows={4}
                required
                value={formState.query}
                onChange={(e) => setFormState({ ...formState, query: e.target.value })}
                className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-2xl px-6 py-4 font-manrope text-lg font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-slate-300 placeholder:font-medium resize-none leading-relaxed"
              ></textarea>
            </div>

            {/* Submit button */}
            <button
            
              type="submit"
              
              className="w-full bg-slate-900 text-white font-extrabold font-manrope text-lg tracking-wide py-5 rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-slate-900/20 hover:bg-slate-800 transition-all hover:-translate-y-1 active:scale-[0.98] duration-300 flex justify-center items-center gap-2 group"
            >
              {submit}
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <p className={`text-center text-sm font-medium ${message.text ? "block" : "hidden"} ${message.type === "success" ? "text-green-600" : "text-red-500"}`}>
{message.text}
</p>
          </form>
        </div>

        {/* Bottom Contact Details */}
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom duration-1000">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Have questions? Reach out to us</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            <a href= "https://mail.google.com/mail/?view=cm&fs=1&to=contact@diverseloopers.com" target="_blank" className="flex items-center gap-3 group text-indigo-700 font-extrabold font-manrope text-lg">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-indigo-500 text-xl font-variation-settings-fill-1">mail</span>
              </div>
              contact@diverseloopers.com
            </a>
            <a
              href="https://www.linkedin.com/company/diverse-loopers/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group text-indigo-700 font-extrabold font-manrope text-lg"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-indigo-500 text-xl font-variation-settings-fill-1">
                  share
                </span>
              </div>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
