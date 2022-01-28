import { emoteDeserializer, emoteSerializer } from "./emoteStrings";
describe("Emote serializer/deserializer", () => {
  test("Serialized and deserializes correctly", () => {
    const message =
      "Wow PogU I got that game too! But I'm too Pepega to play it MonkaU";
    const channelEmotes = new Map<string, Emote>();
    const PogU = {
      id: "12345",
      name: "PogU",
    };
    const Pepega = {
      id: "12346",
      name: "Pepega",
    };
    const MonkaU = {
      id: "12347",
      name: "MonkaU",
    };
    channelEmotes.set(PogU.name, PogU);
    channelEmotes.set(Pepega.name, Pepega);
    channelEmotes.set(MonkaU.name, MonkaU);
    const result = emoteSerializer(message, channelEmotes);
    expect(result).toBe(
      "Wow {emote_12345} I got that game too! But I'm too {emote_12346} to play it {emote_12347}"
    );
    const resultDeserialized = emoteDeserializer(result);
    const arr = [
      "Wow",
      { id: "_12345}" },
      "I",
      "got",
      "that",
      "game",
      "too!",
      "But",
      "I'm",
      "too",
      { id: "_12346}" },
      "to",
      "play",
      "it",
      { id: "_12347}" },
    ];
    expect(resultDeserialized).toStrictEqual(arr);
  });
});
