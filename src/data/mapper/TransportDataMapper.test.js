import TransportDataMapper from "./TransportDataMapper";

const mapper = new TransportDataMapper();

function createMockData() {
  return {
    pysakit: ["A", "B", "C", "D", "X"],
    tiet: [
      {
        mista: "A",
        mihin: "B",
        kesto: 1,
      },
      {
        mista: "B",
        mihin: "C",
        kesto: 2,
      },
      {
        mista: "C",
        mihin: "D",
        kesto: 1,
      },
      //This road is not used by any lines
      {
        mista: "A",
        mihin: "D",
        kesto: 3,
      },
    ],
    linjastot: {
      lineOne: ["A", "B", "C", "D"],
      lineTwo: ["C", "D"],
    },
  };
}

test("TransportData mapping integration", () => {
  const mappedTransportData = mapper.map(createMockData());
  expect(mappedTransportData).toBeDefined();
  expect(mappedTransportData.stops).toBeInstanceOf(Map);
  expect(mappedTransportData.lines).toBeInstanceOf(Array);

  validateIncludedLines(mappedTransportData);

  function validateIncludedLines(mappedTransportData) {
    for (const stop of mappedTransportData.stops.values()) {
      if (stop.name === "X") {
        //Unreachable stop
        expect(stop.roads).toHaveLength(0);
        continue
      }
      stop.roads.forEach((road) => {
        expect(road.to).toBeDefined();
        expect(road.to.name).toBeDefined();
        expect(road.to.roads).toBeInstanceOf(Array);
        expect(road.from).toBeDefined();
        expect(road.from.name).toBeDefined();
        expect(road.from.roads).toBeInstanceOf(Array);
        expect(road.duration).toBeDefined();
        expect(road.includesLines).toBeInstanceOf(Array);
        validateIncludesLinesCount(
          road.to.name,
          road.from.name,
          road.includesLines
        );
      });
    }
  }

  function validateIncludesLinesCount(toName, fromName, includesLines) {
    if (
      (toName === "A" && fromName === "D") ||
      (toName === "D" && fromName === "A")
    ) {
      expect(includesLines).toHaveLength(0);
    } else {
      expect(includesLines.length).toBeGreaterThan(0);
    }
  }
});
