import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export const Overview = () => {
  return (
    <>
      <motion.div
        key="overview"
        className="max-w-3xl mx-auto md:mt-20"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ delay: 0.5 }}
      >
        <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
          <p>
            Welcome to your personal RAG-powered assistant! Upload your files and start asking questions.
          </p>
          <p>
            This application uses Retrieval-Augmented Generation (RAG) to provide accurate and context-aware answers based on the content of your uploaded documents.
          </p>
          <p>
            Simply upload your files, and the chatbot will help you extract insights, answer questions, and provide summaries.
          </p>
        </div>
      </motion.div>
    </>
  );
};