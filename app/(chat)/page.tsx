import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";

export default async function Page() {
  return (
    <>
      <Chat />
      <DataStreamHandler id={"1234"} />
    </>
  );
}
