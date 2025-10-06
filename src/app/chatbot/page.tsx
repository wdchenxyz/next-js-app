import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const mockMessages = [
  {
    id: "1",
    role: "assistant" as const,
    name: "Atlas",
    timestamp: "10:02 AM",
    content: "Hi there! I'm Atlas, your workspace guide. How can I help you today?",
  },
  {
    id: "2",
    role: "user" as const,
    name: "You",
    timestamp: "10:03 AM",
    content: "Show me a quick summary of our latest analytics report.",
  },
  {
    id: "3",
    role: "assistant" as const,
    name: "Atlas",
    timestamp: "10:04 AM",
    content:
      "The latest dashboard highlights a 14% week-over-week growth in active users. Conversion rate held steady at 3.2%. Would you like the full PDF export?",
  },
]

type Message = (typeof mockMessages)[number]

function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "flex w-full max-w-[80%] flex-col gap-1 text-sm",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div className="text-xs font-medium text-muted-foreground">{message.name}</div>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          )}
        >
          {message.content}
        </div>
        <time className="text-[10px] uppercase tracking-wide text-muted-foreground">
          {message.timestamp}
        </time>
      </div>
    </div>
  )
}

export default function ChatbotPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-10 px-6 py-12">
      <header className="grid gap-2 text-center sm:text-left">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Conversation demo
        </span>
        <h1 className="text-3xl font-semibold sm:text-4xl">Workspace Chatbot</h1>
        <p className="text-base text-muted-foreground">
          An approachable chat surface powered by shadcn/ui building blocks. Wire it up to
          your favorite LLM or API when you’re ready.
        </p>
      </header>

      <Card className="flex flex-1 flex-col">
        <CardHeader>
          <CardTitle>Atlas</CardTitle>
          <CardDescription>
            Ask questions about your workspace data and workflows.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="flex flex-col gap-4 pb-6">
              {mockMessages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="border-t bg-muted/10">
          <form className="flex w-full items-end gap-3">
            <div className="flex-1 space-y-2">
              <label className="text-xs font-medium text-muted-foreground" htmlFor="prompt">
                Message Atlas
              </label>
              <Textarea
                id="prompt"
                placeholder="Type your question..."
                className="min-h-[96px] resize-none"
              />
            </div>
            <Button type="submit" size="lg" className="self-stretch">
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
