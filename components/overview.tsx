"use client"

import { motion } from "framer-motion"
import { Upload, MessageSquare, FileText } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export const Overview = () => {
  const features = [
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Upload Your Files",
      description: "Simply upload your documents to get started.",
      color: "bg-blue-500",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Ask Questions",
      description: "Interact with the chatbot to extract insights and get answers.",
      color: "bg-green-500",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Get Summaries",
      description: "Receive concise summaries of your uploaded content.",
      color: "bg-purple-500",
    },
  ]


  return (
    <motion.div
      key="overview"
      className="max-w-4xl mx-auto mt-10 md:mt-20 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950">
        <CardHeader className="text-center relative z-10">
          <CardTitle className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome to Your Personal RAG Assistant
          </CardTitle>
          <CardDescription className="text-lg">
            Unlock the power of Retrieval-Augmented Generation for accurate, context-aware answers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 mt-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`rounded-full ${feature.color} bg-opacity-10 dark:bg-opacity-20 p-3 mb-4`}>
                  <div className={`${feature.color} rounded-full p-2`}>{feature.icon}</div>
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

