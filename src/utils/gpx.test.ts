import { Gpx } from "./gpx"

describe("Gpx", () => {
  test("Gpx parses trackpoint list from gpx-like string", () => {
    const gpxStr = `
    <gpx version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" creator="Openrunner - https://www.openrunner.com">
        <trk>
            <name>MNT 23 - 43 km-12189801</name>
            <trkseg>
                <trkpt lat="45.858760" lon="6.619360">
                    <ele>1100</ele>
                    <time>2023-11-24T13:48:11Z</time>
                </trkpt>
                <trkpt lat="45.857750" lon="6.619440">
                    <ele>1107</ele>
                    <time>2023-11-24T13:49:22Z</time>
                </trkpt>
            </trkseg>
        </trk>
    </gpx>`

    const gpx = new Gpx(gpxStr)
    expect(gpx.trackpoints).toEqual([
      {
        lat: 45.85876,
        lon: 6.61936,
        ele: 1100,
        time: "2023-11-24T13:48:11Z",
      },
      {
        lat: 45.85775,
        lon: 6.61944,
        ele: 1107,
        time: "2023-11-24T13:49:22Z",
      },
    ])
  })
})
