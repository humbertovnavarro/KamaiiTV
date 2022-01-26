import { Emote as PrismaEmote } from "@prisma/client";
export type ParsedEmote = Omit<PrismaEmote, "bytes">;
export default function emoteParser(
  message: string,
  channelEmotes: Map<string, ParsedEmote>
): Array<string | ParsedEmote> {
  const output: Array<string | ParsedEmote> = [];
  const words = message.split(" ");
  words.forEach((word, index) => {
    const emote = channelEmotes.get(word);
    if (emote) {
      output.push(emote);
      return;
    }
    if (index === words.length - 1) {
      output.push(word);
      return;
    }
    if (word === "") {
      output.push(" ");
      return;
    }
    output.push(word, " ");
  });
  return output;
}
