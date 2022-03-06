import commentsController from "./comments";

test("Converting speech to text", () => {
  expect(commentsController.speechToText("./audio-file.flac")).toBe(
    "several tornadoes touched down as a line of severe thunderstorms swept through Colorado on Sunday "
  );
});

test("Natural Language Understanding", () => {
  expect(
    commentsController.naturalLanguageUnderstanding(
      "This is a very a beautiful movie"
    )
  ).toBe(true);
});

test("Natural Language Understanding", () => {
  expect(
    commentsController.naturalLanguageUnderstanding(
      "Une horrible affiche"
    )
  ).toBe(false);
});

test("Translating to another language", () => {
  expect(
    commentsController.translation("German", "This is a very a beautiful movie")
  ).toBe("Das ist ein sehr schöner Film");
});

test("Translating to another language", () => {
  expect(commentsController.translation("French", "A horrible poster")).toBe(
    "Une horrible affiche"
  );
});
