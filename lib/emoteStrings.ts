import { Emote as PrismaEmote } from "@prisma/client";
export type Emote = Omit<PrismaEmote, "bytes">;
function emoteSerializer(message:string, channelEmotes: Map<string, Emote>): string {
  return message.split(" ").map(word => {
    if (channelEmotes.has(word)) {
      const emote = channelEmotes.get(word);
      return `{emote_${emote?.id}}`;
    }
    return word;
  }).join(" ");
}
function emoteDeserializer(message:string) {
  return message.split(" ").map(word => {
    if (word.match(/{emote_.{1,10}}/)) {
      return {
        id: word.substring(6)
      }
    }
    return word
  });
}
export { emoteDeserializer, emoteSerializer};
