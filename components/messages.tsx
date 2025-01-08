import { Message } from 'ai';
import { PreviewMessage, ThinkingMessage } from './message';
import { useScrollToBottom } from './use-scroll-to-bottom';
import { memo } from 'react';

interface MessagesProps {
  isLoading: boolean;
  messages: any;
  streamMessage: string
}

function PureMessages({
  isLoading,
  messages,
  streamMessage
}: MessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
    >
      {/* {messages.length === 0 && <Overview />} */}

      {messages.map((message: Message, index: number) => (
        <PreviewMessage
          key={index}
          message={message}
          isLoading={isLoading && messages.length - 1 === index}
        />
      ))}

      {isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === 'user' && <ThinkingMessage />}

      {
        isLoading && streamMessage?.length > 0 && <PreviewMessage message={streamMessage} isLoading={isLoading} />
      }

      <div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
      />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.isLoading !== nextProps.isLoading) return false;
  if (prevProps.isLoading && nextProps.isLoading) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (prevProps.streamMessage.length !== nextProps.streamMessage.length) return false;
  return true;
});
