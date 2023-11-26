/*
  Upload GPX button
*/

import { useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { load } from "./gpxSlice"
import { Gpx } from "../../utils/gpx"

const GpxUpload: React.FC = () => {
  const dispatch = useAppDispatch()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [gpxFile, setGpxFile] = useState<File>()

  useEffect(() => {
    if (gpxFile) {
      const reader = new FileReader()
      reader.readAsText(gpxFile)
      reader.onload = function (e: ProgressEvent<FileReader>) {
        if (typeof e.target?.result === "string") {
          const gpx = new Gpx(e.target.result)
          dispatch(load({ trackpoints: gpx.trackpoints, name: gpx.trackName }))
        }
      }
      reader.onerror = function (e) {
        console.log("error whitle reading file")
      }
    }
  }, [gpxFile])

  function handleGpxUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setGpxFile(e.target.files[0])
    }
  }

  return (
    <div>
      <button onClick={() => inputFileRef.current?.click()}>Upload .gpx</button>
      <input
        type="file"
        data-testid="gpx-file-upload"
        style={{ display: "none" }}
        onChange={handleGpxUpload}
        ref={inputFileRef}
      />
    </div>
  )
}

export default GpxUpload
