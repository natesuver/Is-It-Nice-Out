describe("When I execute computeHowNice", function () {
    it("I expect that when it's 73 degrees out, my function will return 'It is Nice'", function() {
        expect(computeHowNice(73)).toBe("It is nice");
    });
    it("I expect that when it's 35 degrees out, my function will return 'It is chilly'", function() {
        expect(computeHowNice(35)).toBe("It is chilly");
    });
});

describe("When I call weather underground to get zip code info for 06489", function () {
    beforeEach(function() {
        spyOn($,"ajax").and.callFake(function(x) {
            var def = $.Deferred();
            def.resolve({current_observation: {feelslike_f: 73}});
            return(def.promise());
        });
        spyOn(window,"computeHowNice").and.callFake(function() {
            return "It is nice";
        });
    });
    it("I expect that I will be told it is nice", function() {
        var result = executeSearch("06489");
        expect(document.getElementById("hownice").innerHTML).toBe("It is nice");
		expect(computeHowNice).toHaveBeenCalled();
    });
});

describe("When I call weather underground to get zip code info for 44444", function () {
    beforeEach(function() {
        spyOn($,"ajax").and.callFake(function(x) {
            var def = $.Deferred();
            def.reject();
            return(def.promise());
        });
        spyOn(window,"computeHowNice").and.callFake(function() {
            return "It is nice";
        });
    });
    it("I expect that I will be told that I have failed", function() {
        var result = executeSearch("44444");
        expect(document.getElementById("hownice").innerHTML).toBe("OMG FAIL");
		expect(computeHowNice).not.toHaveBeenCalled();
    });
});
