define([
    'src/util/Font',
    'src/render/TextRenderer',
    'src/geom/Vec2'
], function (Font,
             TextRenderer,
             Vec2) {
    "use strict";
    describe("TextRenderer tests", function () {

        // Mocking TextRenderer.textSize() to avoid 2D context requirement.
        TextRenderer.prototype.textSize = function (text, font, outline) {
            return new Vec2(text.length * 7, 16);
        };

        var testText = "Lorem ipsum dolor sit amet, consectetur "
            + "adipiscing elit, sed do eiusmod tempor incididunt ut";

        var myFont = new Font(15);

        it("Should throw an exception on missing text input", function () {
            expect(function () {
                var mockTextRenderer = new TextRenderer();
                mockTextRenderer.wrap(null, 20, 100, myFont);
            }).toThrow();
        });

        it("Should output '...' due to wrap height being less than textSize height", function () {
            var mockTextRenderer = new TextRenderer();
            var wrappedText = mockTextRenderer.wrap(testText, testText.length, 15, myFont);
            expect(wrappedText).toEqual("...");
        });

        it("Should output 'Lorem ipsum...' due to wrap width being less than textSize width", function () {
            var mockTextRenderer = new TextRenderer();
            var wrappedText = mockTextRenderer.wrap(testText, testText.length, 16, myFont);
            expect(wrappedText).toEqual("Lorem ipsum...");
        });

        it("Should output every word on testText in different lines", function () {
            var mockTextRenderer = new TextRenderer();
            // Wrap line width less than textSize texture width
            var wrappedLines = mockTextRenderer.wrapLine(testText, 9, null, myFont);
            expect(wrappedLines).toEqual("Lorem\n" +
                "ipsum\n" +
                "dolor\n" +
                "sit\n" +
                "amet,\n" +
                "consectetur\n" +
                "adipiscing\n" +
                "elit,\n" +
                "sed\n" +
                "do\n" +
                "eiusmod\n" +
                "tempor\n" +
                "incididunt\n" +
                "ut");
        });
    })
});