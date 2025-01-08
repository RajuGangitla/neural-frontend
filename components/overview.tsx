import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import { MessageIcon, VercelIcon } from './icons';

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
          <div className="flex flex-row justify-center gap-4 items-center">
            <Image
              src="/images/crustdata.png"
              alt="Crustdata Logo"
              width={240}
              height={240}
            />
          </div>
          <p>
            This chatbot is designed to provide seamless support for Crustdata's API users. It utilizes
            Next.js and the AI SDK by Vercel to create an interactive and responsive chat experience.
          </p>
          <p>
            The bot is knowledgeable about Crustdata's API documentation and can assist with queries
            related to API usage, endpoints, and best practices.
          </p>
          <p>
            For more information about Crustdata's APIs, please visit our{' '}
            <Link
              className="font-medium underline underline-offset-4"
              href="https://docs.crustdata.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              API documentation
            </Link>.
          </p>
        </div>
      </motion.div>
    </>
  );
};
