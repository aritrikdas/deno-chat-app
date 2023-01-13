import { serve } from "https://deno.land/std@0.116.0/http/server.ts";

const msg = () => new TextEncoder().encode("data: hello "+ new Date() +"\r\n");

serve(async (_) => {
  let timerId: number | undefined;
  const body = new ReadableStream({
    start(controller) {
      timerId = setInterval(() => {
      
        controller.enqueue(msg());
      }, 1000);
    },
    cancel() {
      if (typeof timerId === "number") {
        clearInterval(timerId);
      }
    },
  });
  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
});
console.log("Listening on http://localhost:8000");