

'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import JobApplicationModal from '@/components/JobApplicationModal';
import LoginModal from '@/components/LoginModal';

const CATEGORIES = [
  'View all',
  'Development',
  'Design',
  'Marketing',
  'Customer Service',
  'Operations',
  'Finance',
  'Management'
];

export default function CareersPage() {
  const [selectedCategory, setSelectedCategory] = useState('View all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch jobs from Supabase
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          // .eq('status')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setJobs(data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = selectedCategory === 'View all'
    ? jobs
    : jobs.filter(job => job.department === selectedCategory);

  const handleApply = (job) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const toggleJobDetails = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">DL</span>
              </div>
              <span className="text-gray-900 font-semibold text-lg">Diverse Loopers</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors">Home</a>
              <a href="/about" className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors">About</a>
              <a href="/contact" className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors">Contact</a>
              
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = '/login';
                  }}
                  className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <a href="/login" className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors">
                    Log in
                  </a>
                  <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Sign up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-white border border-blue-300 rounded-full text-sm font-medium text-blue-700">
            We're hiring!
          </span>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Be part of our mission
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            We're looking for passionate people to join us on our mission. We value flat hierarchies, clear communication, and full ownership and responsibility.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-600">No jobs available in this category</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isExpanded={expandedJobId === job.id}
                onToggle={() => toggleJobDetails(job.id)}
                onApply={() => handleApply(job)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Application Modal */}
      {isModalOpen && user && (
        <JobApplicationModal
          job={selectedJob}
          user={user}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </div>
  );
}

function JobCard({ job, isExpanded, onToggle, onApply }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {job.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {job.responsibility || 'Join our team and make an impact'}
          </p>
          
          {/* Basic Info Tags */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {job.type}
            </span>
            {job.department && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {job.department}
              </span>
            )}
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
              {job.salary && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Salary</h4>
                  <p className="text-sm text-gray-600">{job.salary}</p>
                </div>
              )}
              
              {job.eligibility && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Eligibility</h4>
                  <p className="text-sm text-gray-600">{job.eligibility}</p>
                </div>
              )}
              
              {job.responsibility && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Responsibilities</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{job.responsibility}</p>
                </div>
              )}
              
              {job.required_skills && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Required Skills</h4>
                  <p className="text-sm text-gray-600">{job.required_skills}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 ml-6">
          <button
            onClick={onApply}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Apply
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
          
          <button
            onClick={onToggle}
            className="flex items-center gap-2 text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors whitespace-nowrap border border-blue-600"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <svg 
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}