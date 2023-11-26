import { TrackPoint } from "../types/types"

export class Gpx {
  gpx: Document
  parser = new DOMParser()

  constructor(gpxStr: string) {
    const doc = this.parser.parseFromString(gpxStr, "text/xml")
    const errorNode = doc.querySelector("parsererror")
    if (errorNode) {
      throw Error("An error occured while parsing the xml document")
    } else {
      this.gpx = doc
    }
  }

  // TODO handle multiple trackseg
  get trackpoints() {
    let points: TrackPoint[] = []
    const trackpts = this.gpx.querySelectorAll("trkpt")
    trackpts.forEach((pt) => {
      points.push({
        ele: Number(pt.querySelector("ele")?.textContent),
        time: pt.querySelector("time")?.textContent || "",
        lat: Number(pt.getAttribute("lat")),
        lon: Number(pt.getAttribute("lon")),
      })
    })
    return points
  }
  get trackName() {
    return this.gpx.querySelector("trk name")?.textContent || ""
  }
}
